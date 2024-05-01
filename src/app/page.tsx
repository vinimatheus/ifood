import Banner from '@/components/banner'
import CategoryList from '@/components/category'
import Header from '@/components/header'
import Produtos from '@/components/products'
import Restaurante from '@/components/restaurant'
import Search from '@/components/search'

export default async function Home() {
  return (
    <main className="">
      <Header />
      <div className="px-5 py-4">
        <Search />
      </div>
      <div className="px-5 py-4">
        <CategoryList />
      </div>
      <div className="px-5 py-4">
        <Banner src="/banner.png" alt="banner" />
      </div>
      <div className="pt-4">
        <Produtos />
      </div>
      <div className="px-5 py-4">
        <Banner src="/banner2.png" alt="banner" />
      </div>
      <div className="pt-4">
        <Restaurante />
      </div>
    </main>
  )
}
