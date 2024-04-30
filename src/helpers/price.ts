import { Product } from '@prisma/client'

export const calculatePrice = (product: Product) => {
  if (product.discountPercentage === 0) {
    return Number(product.price)
  }

  const discount = (Number(product.price) * product.discountPercentage) / 100
  return Number(product.price) - discount
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(price)
}
