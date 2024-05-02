import Quanty from '@/components/products/detail/product-quanty'
import Routeback from '@/components/products/detail/route-back'
import { Button } from '@/components/ui/button'
import { calculatePrice, formatPrice } from '@/helpers/price'
import { ArrowDown, Clock, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import Motoboy from '@/components/restaurant/ui/motoboy'
import { Prisma } from '@prisma/client'
import ProductItem from '../productItem'

interface ProductDetailProps {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: true
    }
  }>

  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true
    }
  }>[]
}
export default function ProductDetail({
  products,
  complementaryProducts,
}: ProductDetailProps) {
  return (
    <div className="relative ">
      <div>
        <Image
          src={products.imageUrl}
          alt="logo"
          width={300}
          height={300}
          className="h-[300px] w-full object-cover"
        />
      </div>
      <Routeback />
      <div className="absolute right-4 top-4 rounded-full bg-white/70 p-1 text-xs text-white  shadow hover:bg-white">
        <Link href="/">
          <Button className="hover:bg-transparent" variant="ghost">
            <Heart color="#000" size={16} />
          </Button>
        </Link>
      </div>
      <div className="relative mt-[-40px] flex flex-col rounded-3xl bg-white p-5">
        <div className="flex items-center gap-2">
          <Image
            src={products.restaurant.imageUrl}
            alt="logo"
            className="h-[40px] w-[40px] rounded-full object-cover"
            width={20}
            height={20}
          />
          <h2 className="text-xs font-bold text-muted-foreground">
            {products.restaurant.name}
          </h2>
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{products.name}</h1>
        </div>
        <div className="flex justify-between">
          <div className="mt-2 flex flex-col">
            <h3 className="text-sm font-bold">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">
                  {formatPrice(calculatePrice(products))}
                </span>
                {products.discountPercentage && (
                  <div className=" rounded-full bg-red-500 px-2 py-[2px] text-xs text-white shadow">
                    <span className="flex items-center gap-1">
                      <ArrowDown size={16} />
                      {products.discountPercentage}%
                    </span>
                  </div>
                )}
              </div>
            </h3>
            {products.discountPercentage > 0 && (
              <span className="text-[10px] text-muted-foreground">
                DE {formatPrice(Number(products.price))}
              </span>
            )}
          </div>
          <div>
            <Quanty />
          </div>
        </div>
        <div className="mt-12">
          <Card>
            <CardContent className="flex justify-around py-4">
              <div>
                <p className="flex items-center  gap-2 text-lg font-bold">
                  Frete{' '}
                  <span>
                    <Motoboy />
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {Number(products.restaurant.deliveryFee) > 0
                    ? formatPrice(Number(products.restaurant.deliveryFee))
                    : 'Grátis'}
                </p>
              </div>
              <div>
                <p className="flex items-center  gap-2 text-lg font-bold">
                  Entrega{' '}
                  <span>
                    <Clock size={13} />
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {products.restaurant.deliveryTimeMinutes} min
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-4 flex flex-col gap-3">
          <h2 className="mt-4 text-lg font-bold">Sobre</h2>
          <p className="text-sm">{products.description}</p>
        </div>
        <div className="mt-4">
          <h1 className="mt-4 text-lg font-bold">Complementos</h1>
          <div className="flex gap-4 overflow-x-auto px-0 py-1 pl-5 [&::-webkit-scrollbar]:hidden">
            {complementaryProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
