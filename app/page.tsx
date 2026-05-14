import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SecondSection from './components/SecondSection'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main style={{ position: 'relative' }}>
      <Navbar />
      <div>
        <div style={{ position: 'sticky', top: 0, zIndex: 1 }}>
          <Hero />
        </div>
        <SecondSection />
      </div>
      <Footer />
    </main>
  )
}
