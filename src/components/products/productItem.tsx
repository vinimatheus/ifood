import { calculatePrice, formatPrice } from '@/helpers/price'
import { Prisma } from '@prisma/client'
import { ArrowDown } from 'lucide-react'
import Image from 'next/image'

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true
        }
      }
    }
  }>
}

export default function ProductItem({ product }: ProductItemProps) {
  return (
    <div className="min-w-[150px] space-y-2">
      <div className="relative h-[150px] w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="rounded-lg object-cover shadow-md"
        />
        {product.discountPercentage && (
          <div className="absolute left-1 top-1 rounded-full bg-red-500 px-2 py-[2px] text-xs text-white shadow">
            <span className="flex items-center gap-1">
              <ArrowDown size={16} />
              {product.discountPercentage}%
            </span>
          </div>
        )}
      </div>
      <div>
        <h2 className="truncate text-sm font-bold">{product.name}</h2>
      </div>
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-bold">
          {formatPrice(Number(product.price))}
        </h3>
        {product.discountPercentage > 0 && (
          <span className="text-xs text-muted-foreground line-through">
            {formatPrice(calculatePrice(product))}
          </span>
        )}
      </div>
      <div>
        <span className="block text-xs">{product.restaurant.name}</span>
      </div>
    </div>
  )
}
