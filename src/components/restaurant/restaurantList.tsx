import { Prisma } from '@prisma/client'
import RestaurantItem from './restaurantItem'

interface RestaurantProps {
  restaurant: Prisma.RestaurantGetPayload<{
    select: {
      id: true
      name: true
      imageUrl: true
      deliveryFee: true
    }
  }>[]
}

export default async function RestaurantList({ restaurant }: RestaurantProps) {
  return (
    <div className="flex gap-4 overflow-x-auto py-1 pl-5 [&::-webkit-scrollbar]:hidden">
      {restaurant.map((restaurant) => (
        <RestaurantItem key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  )
}
