import CategoryList from '@/components/categoryList'
import Header from '@/components/header'
import ProductsList from '@/components/products/productsList'
import Search from '@/components/search'
import { Button } from '@/components/ui/button'
import db from '@/utils/prisma'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'

export default async function Home() {
  const products = await db.product.findMany({
    where: {
      discountPercentage: { gt: 0 },
    },
    take: 4,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  })
  return (
    <main className="">
      <Header />
      <div className="px-5 py-4">
        <Search />
      </div>
      <div className="px-5 py-4">
        <CategoryList />
      </div>
      <div className="px-5 py-4">
        <Image
          src="/banner.png"
          alt="logo"
          width={0}
          height={0}
          className="h-auto w-full object-contain"
          sizes="100vw"
          quality={100}
        />
      </div>
      <div className="pt-4">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-bold">Pedidos Recomendados</h2>
          <Button
            variant="ghost"
            className="flex items-center p-0 text-sm font-medium text-red-500 hover:bg-transparent hover:text-red-600"
          >
            <span>Ver todos</span> <ChevronRight size={16} />
          </Button>
        </div>
        <ProductsList products={products} />
      </div>
    </main>
  )
}
