import { Suspense } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductList from '../components/ProductList'

export default function ProductsPage() {
  return (
    <>
      <Navbar defaultExpanded />
      <Suspense>
        <ProductList />
      </Suspense>
      <Footer />
    </>
  )
}
