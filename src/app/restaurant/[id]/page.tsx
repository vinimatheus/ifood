import Routeback from '@/components/products/detail/route-back'
import ProductItem from '@/components/products/productItem'
import Motoboy from '@/components/restaurant/ui/motoboy'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { formatPrice } from '@/helpers/price'
import db from '@/utils/prisma'
import { Clock, Heart, Star } from 'lucide-react'
import Image from 'next/image'

interface RestaurntDetailProps {
  params: {
    id: string
  }
}

export default async function Page({ params: { id } }: RestaurntDetailProps) {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: true,
    },
  })

  const products = await db.product.findMany({
    where: {
      restaurantId: id,
    },
    include: {
      restaurant: true,
    },
  })

  if (!restaurant) return

  return (
    <div className="relative ">
      <div>
        <div>
          <Image
            src={restaurant.imageUrl}
            alt="logo"
            width={300}
            height={300}
            className="h-[300px] w-full object-cover"
          />
        </div>
        <Routeback />
        <div className="absolute right-4 top-4 rounded-full bg-white/70 p-1 text-xs text-white  shadow hover:bg-white">
          <Button className="hover:bg-transparent" variant="ghost">
            <Heart color="#000" size={16} />
          </Button>
        </div>
      </div>
      <div className="relative mt-[-40px] rounded-3xl bg-white p-5">
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <Image
              src={restaurant.imageUrl}
              alt="logo"
              className="h-[40px] w-[40px] rounded-full object-cover"
              width={20}
              height={20}
            />
            <h2 className="text-lg font-bold">{restaurant.name}</h2>
          </div>
          <div className="rounded-full bg-black px-4 py-[4px] text-xs  text-white shadow">
            <span className="flex items-center gap-1 text-white">
              <Star color="#F59E0B" size={16} />
              5.0
            </span>
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
                  {Number(restaurant.deliveryFee) > 0
                    ? formatPrice(Number(restaurant.deliveryFee))
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
                  {restaurant.deliveryTimeMinutes} min
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8 flex justify-center gap-4">
          {restaurant.categories.map((category) => (
            <div
              className="min-w-[100px] rounded-full bg-[#F3F4F6] p-2 text-center"
              key={category.id}
            >
              <p className="text-lg font-bold text-muted-foreground">
                {category.name}
              </p>
            </div>
          ))}
        </div>
        <div>
          <p className="mt-8 text-lg font-bold">Os mais populares</p>
          <div className="flex gap-4 overflow-x-auto px-0 py-1 pl-5 [&::-webkit-scrollbar]:hidden">
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
