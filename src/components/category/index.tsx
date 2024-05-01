import db from '@/utils/prisma'
import CategoryItem from './categoryItem'

export default async function CategoryList() {
  const categories = await db.category.findMany()

  return (
    <div className="grid grid-cols-2 gap-3">
      {categories.map((category) => (
        <div key={category.id}>
          <CategoryItem category={category} />
        </div>
      ))}
    </div>
  )
}
