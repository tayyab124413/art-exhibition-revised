import { useState, FormEvent } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import Navbar from '../../components/Navbar/page'
import Footer from '../../components/Footer/page'
import { useToast } from '../../context/ToastContext'

export default function Signup() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (password !== confirm) {
      showToast('⚠ Passwords do not match. Please try again.')
      return
    }
    showToast('✓ Account created! Redirecting to login…')
    setTimeout(() => navigate('/login'), 1500)
  }

  return (
    <>
      <Navbar />
      <div className="page fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
        <div className="form-container fade-in" style={{ maxWidth: '500px', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>✨</div>
            <h2 style={{ marginBottom: '6px' }}>Create Your Account</h2>
            <p style={{ margin: 0 }}>Join us and explore the world of art. Completely free.</p>
          </div>
          <form id="signup-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" placeholder="John Doe" required value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="name@example.com" required value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Create a strong password" required value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div>
              <label htmlFor="confirm-password">Confirm Password</label>
              <input type="password" id="confirm-password" placeholder="Re-enter your password" required value={confirm} onChange={e => setConfirm(e.target.value)} />
            </div>
            <div style={{ flexDirection: 'row', alignItems: 'flex-start', gap: '10px', marginBottom: '24px', display: 'flex' }}>
              <input type="checkbox" id="terms" style={{ width: 'auto', padding: 0, marginTop: '3px' }} required />
              <label htmlFor="terms" style={{ fontWeight: 400, cursor: 'pointer', fontSize: '0.9rem' }}>
                I agree to the{' '}
                <a href="#" className="link-button" style={{ fontSize: '0.9rem' }}>Terms of Service</a> and{' '}
                <a href="#" className="link-button" style={{ fontSize: '0.9rem' }}>Privacy Policy</a>
              </label>
            </div>
            <button type="submit" className="lg-button accent-button" style={{ width: '100%' }}>Create Account ✨</button>
          </form>
          <p className="text-center mt-20">
            Already have an account? <NavLink to="/login" className="link-button">Sign in →</NavLink>
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}
