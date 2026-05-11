import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/page'
import Footer from '../../components/Footer/page'
import Header from '../../components/Header/page'

export default function About() {
  const navigate = useNavigate()

  return (
    <>
      <Navbar />
      <div className="page fade-in">
        <Header
          badge="✦ Our Story"
          title="About Our"
          titleAccent="Exhibition"
          subtitle="Preserving history, fostering creativity, and building an inclusive artistic community since 2026."
        />

        <h2 className="section-title">Who We Are</h2>
        <div className="card-container fade-in-2">
          {[
            { icon: '🎯', title: 'Our Mission', text: 'To provide an inspiring environment where individuals from all walks of life can appreciate, learn about, and connect through the power of fine art.' },
            { icon: '📜', title: 'Our History', text: 'Founded in 2026, we\'ve curated a global collection of classical and modern masterpieces, partnering with over 48 artists across 22 countries.' },
            { icon: '🔭', title: 'Our Vision', text: 'To become a global hub of cultural expression and modern inspiration for future generations of artists, collectors, and art enthusiasts worldwide.' },
          ].map(item => (
            <div className="card" key={item.title}>
              <div style={{ padding: '32px 24px 8px', fontSize: '2.5rem', textAlign: 'center' }}>{item.icon}</div>
              <h3 style={{ textAlign: 'center', padding: '0 18px' }}>{item.title}</h3>
              <p style={{ padding: '8px 18px 24px', textAlign: 'center' }}>{item.text}</p>
            </div>
          ))}
        </div>

        <hr className="divider" />
        <h2 className="section-title fade-in-3">The Team Behind the Art</h2>
        <div className="card-container">
          {[
            { img: '/images/image1.png', name: 'Alexandra Mills', role: 'Chief Curator', bio: '15 years of experience curating international exhibitions and discovering emerging talent.' },
            { img: '/images/image2.png', name: 'Marcus Reyes', role: 'Gallery Director', bio: 'Oversees operations and builds partnerships with museums and galleries worldwide.' },
            { img: '/images/exhibit_hall.png', name: 'Priya Nair', role: 'Creative Director', bio: 'Responsible for the aesthetic identity and spatial design of all our exhibitions.' },
          ].map((member, i) => (
            <div className={`card fade-in-${i + 1}`} key={member.name}>
              <img src={member.img} alt={member.name} />
              <h3>{member.name}</h3>
              <p><strong style={{ color: 'var(--brand-accent)' }}>{member.role}</strong></p>
              <p>{member.bio}</p>
              <a onClick={() => navigate('/contact')} style={{ cursor: 'pointer' }}>Get in Touch →</a>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <button className="lg-button accent-button" onClick={() => navigate('/contact')}>✉️ Contact Us</button>
          <button className="lg-button border-button" onClick={() => navigate('/gallery')} style={{ marginLeft: '12px' }}>🖼️ View Gallery</button>
        </div>
      </div>
      <Footer />
    </>
  )
}
