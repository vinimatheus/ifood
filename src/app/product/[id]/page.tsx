import ProductDetail from '@/components/products/detail'
import db from '@/utils/prisma'

interface ProductDetailProps {
  params: {
    id: string
  }
}

export default async function Page({ params: { id } }: ProductDetailProps) {
  const products = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  })

  const complementaryProducts = await db.product.findMany({
    where: {
      category: {
        name: 'Sucos',
      },
      restaurantId: products?.restaurantId,
    },
    take: 14,
    include: {
      restaurant: true, // Include the restaurant data
    },
  })

  if (!products) return

  return (
    <ProductDetail
      products={products}
      complementaryProducts={complementaryProducts}
    />
  )
}
