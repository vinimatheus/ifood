import ProductItem from './productItem'
import { Prisma } from '@prisma/client'

interface ProductItemProps {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true
        }
      }
    }
  }>[]
}

export default async function ProductsList({ products }: ProductItemProps) {
  return (
    <div className="flex gap-4 overflow-x-auto py-1 pl-5 [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  )
}
