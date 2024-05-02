import { Prisma } from '@prisma/client'
import Image from 'next/image'
import Motoboy from './ui/motoboy'
import { Clock4, Heart, Star } from 'lucide-react'
import { Button } from '../ui/button'

interface RestaurantItemProps {
  restaurant: Prisma.RestaurantGetPayload<{
    select: {
      id: true
      name: true
      imageUrl: true
      deliveryFee: true
    }
  }>
}

export default function RestaurantItem({ restaurant }: RestaurantItemProps) {
  return (
    <div className="min-w-[250px] space-y-2">
      <div className="relative h-[150px] w-full">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
          className="rounded-lg object-cover shadow-md"
        />
        <div className="absolute left-1 top-1 rounded-full bg-white px-2 py-[2px] text-xs  text-white shadow">
          <span className="flex items-center gap-1 text-black">
            <Star color="#F59E0B" size={16} />
            5.0
          </span>
        </div>
        <div className="text-xsx absolute right-1 top-1 rounded-full bg-black/50 p-1 shadow">
          <Button size="icon" variant="ghost">
            <Heart color="#fff" size={16} />
          </Button>
        </div>
      </div>
      <div>
        <h2 className="truncate text-sm font-bold">{restaurant.name}</h2>
      </div>
      <div className="flex justify-between">
        <p className="flex items-center gap-2 text-sm font-bold">
          <span>
            <Motoboy />
          </span>
          Entrega gratís
        </p>
        <p className="flex items-center gap-2 text-sm font-bold">
          <span>
            <Clock4 size={16} />
          </span>
          {Number(restaurant.deliveryFee)} min
        </p>
      </div>
    </div>
  )
}
