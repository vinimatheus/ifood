import db from '@/utils/prisma'
import { Button } from '../ui/button'
import ProductsList from './productsList'
import { ChevronRight } from 'lucide-react'

export default async function Produtos() {
  const products = await db.product.findMany({
    where: {
      discountPercentage: { gt: 0 },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  })

  return (
    <div>
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
  )
}
