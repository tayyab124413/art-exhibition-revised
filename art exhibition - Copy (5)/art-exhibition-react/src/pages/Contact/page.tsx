import { useState, FormEvent } from 'react'
import Navbar from '../../components/Navbar/page'
import Footer from '../../components/Footer/page'
import Header from '../../components/Header/page'
import { useToast } from '../../context/ToastContext'

export default function Contact() {
  const { showToast } = useToast()
  const [form, setForm] = useState({ name: '', email: '', subject: 'general', message: '' })

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    showToast('✓ Message sent! We\'ll respond within 24 hours.', 5000)
    setForm({ name: '', email: '', subject: 'general', message: '' })
  }

  const infoCards = [
    { icon: '📍', title: 'Our Location', lines: ['123 Gallery Lane, Art City, AC 45678'] },
    { icon: '✉️', title: 'Email Us', lines: ['info@myartexhibition.com', 'support@myartexhibition.com'] },
    { icon: '📞', title: 'Call Us', lines: ['+1 234 567 8900', 'Mon–Sat, 9am – 6pm'] },
    { icon: '🕐', title: 'Gallery Hours', lines: ['Mon – Fri: 10am – 8pm', 'Sat – Sun: 11am – 6pm'] },
  ]

  return (
    <>
      <Navbar />
      <div className="page fade-in">
        <Header
          badge="✦ Get In Touch"
          title="Contact"
          titleAccent="Us"
          subtitle="We'd love to hear from you. Questions, feedback, or want to feature your art – reach out!"
        />

        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div className="form-container" style={{ flex: 2, maxWidth: '600px' }}>
            <h2>Send a Message</h2>
            <p>Fill in the form and we'll get back to you within 24 hours.</p>
            <form id="contact-form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="contact-name">Full Name</label>
                <input type="text" id="contact-name" placeholder="Your Name" required
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label htmlFor="contact-email">Email Address</label>
                <input type="email" id="contact-email" placeholder="name@example.com" required
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label htmlFor="contact-subject">Subject</label>
                <div className="select-container">
                  <select id="contact-subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>
                    <option value="general">General Inquiry</option>
                    <option value="buy">Purchase / Acquire Artwork</option>
                    <option value="artist">Become a Featured Artist</option>
                    <option value="visit">Plan a Visit</option>
                    <option value="feedback">Feedback &amp; Suggestions</option>
                    <option value="press">Press &amp; Media</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="contact-message">Message</label>
                <textarea id="contact-message" placeholder="Type your message here…" required
                  value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
              </div>
              <button type="submit" className="lg-button accent-button" style={{ width: '100%' }}>Send Message ✉️</button>
            </form>
          </div>

          <div style={{ flex: 1, minWidth: '240px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {infoCards.map(card => (
              <div className="stat-card" key={card.title} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{ fontSize: '1.8rem' }}>{card.icon}</div>
                <h3 style={{ margin: 0 }}>{card.title}</h3>
                {card.lines.map(line => <p key={line} style={{ margin: 0 }}>{line}</p>)}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
