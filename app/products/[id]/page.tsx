import Navbar from '../../components/Navbar'
import ProductDetail from '../../components/ProductDetail'
import Footer from '../../components/Footer'

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <main style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <Navbar defaultExpanded />
      <ProductDetail productId={id} />
      <Footer />
    </main>
  )
}
