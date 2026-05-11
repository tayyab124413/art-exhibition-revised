import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/page'
import Footer from '../../components/Footer/page'
import Header from '../../components/Header/page'

const artists = [
  { img: '/images/image1.png', name: 'Jane Doe', style: 'Abstract & Fluid Art', bio: 'Specializes in abstract fluid art and advanced color theory. Her works explore emotion through vivid compositions.' },
  { img: '/images/image2.png', name: 'John Smith', style: 'Classic Realism', bio: 'A master of classic renaissance portraiture, capturing the human form with extraordinary precision and depth.' },
  { img: '/images/exhibit_hall.png', name: 'Alan Wake', style: 'Modern Sculpture', bio: 'A modern sculptor defining space and form through innovative three-dimensional works in bronze and steel.' },
  { img: '/images/image1.png', name: 'Maria Chen', style: 'Impressionism', bio: 'A contemporary impressionist whose landscapes and seascapes transport viewers to serene, timeless places.' },
  { img: '/images/image2.png', name: 'Leo Fontaine', style: 'Surrealism', bio: "Blending surrealism with photorealism, Leo's work challenges perception and invites deep contemplation." },
  { img: '/images/exhibit_hall.png', name: 'Sophia R.', style: 'Installation Art', bio: 'An installation artist who transforms everyday objects into profound statements on modern society.' },
]

const stats = [
  { icon: '🎨', label: 'Registered Artists', target: 48 },
  { icon: '🌍', label: 'Countries', target: 22 },
  { icon: '🏅', label: 'Awards Won', target: 34 },
  { icon: '🖼️', label: 'Total Works', target: 240 },
]

export default function Artists() {
  const navigate = useNavigate()
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const el = entry.target as HTMLSpanElement
        const target = parseInt(el.getAttribute('data-target') || '0')
        let cur = 0
        const inc = target / 60
        const timer = setInterval(() => {
          cur += inc
          if (cur >= target) { cur = target; clearInterval(timer) }
          el.textContent = Math.floor(cur).toLocaleString()
        }, 25)
        observer.unobserve(el)
      })
    }, { threshold: 0.3 })

    counterRefs.current.forEach(el => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <div className="page fade-in">
        <Header
          badge="✦ The Creative Minds"
          title="Our"
          titleAccent="Featured Artists"
          subtitle="Meet the talented creators whose passion and vision have shaped some of the world's most breathtaking artworks."
        />

        <h2 className="section-title">Artist Profiles</h2>
        <div className="card-container">
          {artists.map((artist, i) => (
            <div className={`card fade-in-${(i % 3) + 1}`} key={artist.name}>
              <img src={artist.img} alt={artist.name} />
              <h3>{artist.name}</h3>
              <p><strong style={{ color: 'var(--brand-accent)' }}>{artist.style}</strong></p>
              <p>{artist.bio}</p>
              <a onClick={() => navigate('/contact')} style={{ cursor: 'pointer' }}>Enquire →</a>
            </div>
          ))}
        </div>

        <div className="stats-grid mt-20 fade-in-3">
          {stats.map((stat, i) => (
            <div className="stat-card" key={stat.label}>
              <div className="stat-icon">{stat.icon}</div>
              <div>
                <span className="stat-label">{stat.label}</span>
                <span
                  className="stat-value"
                  ref={el => { counterRefs.current[i] = el }}
                  data-target={stat.target}
                >0</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <button className="lg-button accent-button" onClick={() => navigate('/contact')}>
            ✉️ Become a Featured Artist
          </button>
        </div>
      </div>
      <Footer />
    </>
  )
}
