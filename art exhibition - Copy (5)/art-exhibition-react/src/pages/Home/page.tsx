import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/page'
import Footer from '../../components/Footer/page'
import Header from '../../components/Header/page'

export default function Home() {
  const navigate = useNavigate()

  const quickLinks = [
    { icon: '🔑', label: 'Login', path: '/login' },
    { icon: '✨', label: 'Register', path: '/signup' },
    { icon: 'ℹ️', label: 'About Us', path: '/about' },
    { icon: '✉️', label: 'Contact', path: '/contact' },
    { icon: '🖼️', label: 'Art Gallery', path: '/gallery' },
    { icon: '🎨', label: 'Artists', path: '/artists' },
    { icon: '📊', label: 'Dashboard', path: '/dashboard' },
    { icon: '🛒', label: 'My Cart', path: '/cart' },
  ]

  return (
    <>
      <Navbar />
      <div className="page">
        <Header
          badge="✦ Our Gallery is Open"
          title="Welcome to Our"
          titleAccent="Gallery"
          subtitle="Experience the finest collections of timeless art pieces curated from across the globe. Every artwork tells a story."
        >
          <div className="flex-center">
            <button className="lg-button accent-button" onClick={() => navigate('/gallery')}>
              Browse Gallery
            </button>
            <button
              className="lg-button"
              onClick={() => navigate('/artists')}
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              Meet Artists
            </button>
          </div>
        </Header>

        <div className="text-center mb-20">
          <h2 className="section-title">Quick Navigation</h2>
        </div>
        <div className="action-grid fade-in-2">
          {quickLinks.map(link => (
            <button key={link.path} className="action-btn" onClick={() => navigate(link.path)}>
              <div className="action-btn-icon">{link.icon}</div>
              {link.label}
            </button>
          ))}
        </div>

        <hr className="divider" />
        <h2 className="section-title">Featured Highlights</h2>
        <div className="card-container fade-in-3">
          <div className="card">
            <img src="/images/image1.png" alt="Abstract Art" />
            <h3>Abstract Thoughts</h3>
            <p>Dive into the colorful world of modern abstraction and color theory.</p>
            <a onClick={() => navigate('/gallery')} style={{ cursor: 'pointer' }}>View Collection →</a>
          </div>
          <div className="card">
            <img src="/images/image2.png" alt="Classic Portrait" />
            <h3>Classic Masterpieces</h3>
            <p>Historical portraits and paintings preserved with exceptional care.</p>
            <a onClick={() => navigate('/gallery')} style={{ cursor: 'pointer' }}>View Collection →</a>
          </div>
          <div className="card">
            <img src="/images/exhibit_hall.png" alt="Exhibition Hall" />
            <h3>Grand Hall</h3>
            <p>A tour of our main exhibition hall with stunning art installations.</p>
            <a onClick={() => navigate('/gallery')} style={{ cursor: 'pointer' }}>View Collection →</a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
