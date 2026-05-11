import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/page'
import Footer from '../../components/Footer/page'
import Header from '../../components/Header/page'
import { useCart } from '../../context/CartContext'
import { useToast } from '../../context/ToastContext'

type Category = 'all' | 'abstract' | 'classic' | 'sculpture' | 'landscape'

const artworks = [
  { id: 'art1', img: '/images/image1.png', name: 'Abstract Thoughts', artist: 'Jane Doe', year: 2024, category: 'abstract' as Category, price: 1200 },
  { id: 'art2', img: '/images/image2.png', name: 'Classic Realism Portrait', artist: 'John Smith', year: 1802, category: 'classic' as Category, price: 3500 },
  { id: 'art3', img: '/images/exhibit_hall.png', name: 'Modern Bronze Sculpture', artist: 'Alan Wake', year: 2019, category: 'sculpture' as Category, price: 5800 },
  { id: 'art4', img: '/images/exhibit_hall.png', name: 'Grand Hall Exhibition', artist: 'Maria Chen', year: 2023, category: 'landscape' as Category, price: 2100 },
  { id: 'art5', img: '/images/image1.png', name: 'Color Symphony', artist: 'Sophia R.', year: 2022, category: 'abstract' as Category, price: 900 },
  { id: 'art6', img: '/images/image2.png', name: 'Renaissance Echoes', artist: 'Leo Fontaine', year: 1920, category: 'classic' as Category, price: 4200 },
]

const filters: { label: string; value: Category }[] = [
  { label: 'All', value: 'all' },
  { label: 'Abstract', value: 'abstract' },
  { label: 'Classic', value: 'classic' },
  { label: 'Sculpture', value: 'sculpture' },
  { label: 'Landscape', value: 'landscape' },
]

export default function Gallery() {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { showToast } = useToast()
  const [activeFilter, setActiveFilter] = useState<Category>('all')

  function handleAddToCart(art: typeof artworks[0]) {
    addToCart(art.id, art.name, art.price, art.img)
    showToast(`🛒 "${art.name}" added to cart!`)
  }

  const filtered = activeFilter === 'all' ? artworks : artworks.filter(a => a.category === activeFilter)

  return (
    <>
      <Navbar />
      <div className="page fade-in">
        <Header
          badge="✦ Curated Collection"
          title="Our"
          titleAccent="Gallery"
          subtitle='Explore our finest selections of art — from classic masterpieces to contemporary works. Click "Add to Cart" to acquire a piece.'
        />

        <div className="flex-between mb-30">
          <h2 className="section-title">All Artworks</h2>
          <div className="flex-center" style={{ gap: '10px', flexWrap: 'wrap' }}>
            {filters.map(f => (
              <button
                key={f.value}
                className={`sm-button ${activeFilter === f.value ? 'accent-button' : 'border-button'} filter-btn`}
                onClick={() => setActiveFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="card-container" id="gallery-grid">
          {filtered.map((art, i) => (
            <div className={`card gallery-card fade-in-${(i % 3) + 1}`} key={art.id}>
              <img src={art.img} alt={art.name} />
              <h3>{art.name}</h3>
              <p>{art.artist} · {art.year} · {art.category.charAt(0).toUpperCase() + art.category.slice(1)}</p>
              <div style={{ padding: '0 18px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ color: 'var(--brand-accent)', fontSize: '1.1rem' }}>${art.price.toLocaleString()}</strong>
                <button className="sm-button accent-button" onClick={() => handleAddToCart(art)}>🛒 Add to Cart</button>
              </div>
              <a href="#" onClick={e => e.preventDefault()}>View Details →</a>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <button className="lg-button accent-button" onClick={() => navigate('/cart')}>🛒 View My Cart</button>
          <button className="lg-button border-button" onClick={() => navigate('/dashboard')} style={{ marginLeft: '12px' }}>📊 Manage Collection</button>
        </div>
      </div>
      <Footer />
    </>
  )
}
