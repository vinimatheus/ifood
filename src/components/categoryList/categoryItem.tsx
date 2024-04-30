import { Category } from '@prisma/client'
import Image from 'next/image'

interface CategoryItemProps {
  category: Category
}

export default async function CategoryItem({ category }: CategoryItemProps) {
  return (
    <div className="flex h-12 w-full items-center gap-3 rounded-full bg-white px-4 py-3 shadow-md">
      <Image src={category.imageUrl} alt="logo" width={30} height={30} />
      <span className="text-sm font-semibold">{category.name} </span>
    </div>
  )
}
