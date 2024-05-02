import { ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'
import RestaurantList from './restaurantList'
import db from '@/utils/prisma'

export default async function Restaurante() {
  const restaurant = await db.restaurant.findMany({
    where: {
      deliveryFee: { gt: 0 },
    },
    take: 10,
  })

  return (
    <div>
      <div className="flex items-center justify-between px-5">
        <h2 className="font-bold">Restaurantes Recomendados</h2>
        <Button
          variant="ghost"
          className="flex items-center p-0 text-sm font-medium text-red-500 hover:bg-transparent hover:text-red-600"
        >
          <span>Ver todos</span> <ChevronRight size={16} />
        </Button>
      </div>
      <RestaurantList restaurant={restaurant} />
    </div>
  )
}
