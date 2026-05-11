import { useState, FormEvent } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import Navbar from '../../components/Navbar/page'
import Footer from '../../components/Footer/page'
import { useToast } from '../../context/ToastContext'

export default function Login() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      showToast('⚠ Please fill in all fields.')
      return
    }
    showToast('✓ Signing you in…')
    setTimeout(() => navigate('/dashboard'), 1000)
  }

  return (
    <>
      <Navbar />
      <div className="page fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
        <div className="form-container fade-in" style={{ maxWidth: '480px', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🔑</div>
            <h2 style={{ marginBottom: '6px' }}>Welcome Back</h2>
            <p style={{ margin: 0 }}>Sign in to access your account and the dashboard.</p>
          </div>
          <form id="login-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email Address</label>
              <input
                type="email" id="email" placeholder="name@example.com" required
                value={email} onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password" id="password" placeholder="Enter your password" required
                value={password} onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', display: 'flex' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 400, cursor: 'pointer' }}>
                <input type="checkbox" style={{ width: 'auto', padding: 0 }} /> Remember me
              </label>
              <a href="#" className="link-button" style={{ fontSize: '0.88rem' }}>Forgot password?</a>
            </div>
            <button type="submit" className="lg-button accent-button" style={{ width: '100%' }}>Sign In →</button>
          </form>
          <p className="text-center mt-20">
            Don't have an account? <NavLink to="/signup" className="link-button">Create one free →</NavLink>
          </p>
          <hr className="divider" style={{ margin: '20px 0' }} />
          <p className="text-center" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            By signing in you agree to our{' '}
            <a href="#" className="link-button" style={{ fontSize: '0.85rem' }}>Terms</a> and{' '}
            <a href="#" className="link-button" style={{ fontSize: '0.85rem' }}>Privacy Policy</a>.
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}
