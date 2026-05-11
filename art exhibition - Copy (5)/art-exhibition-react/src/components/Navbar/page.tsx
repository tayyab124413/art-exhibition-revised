import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const { cartCount } = useCart()

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark')
      setDarkMode(true)
    }
  }, [])

  function toggleMenu() {
    setMenuOpen(prev => !prev)
  }

  function toggleDark() {
    if (darkMode) {
      document.documentElement.removeAttribute('data-theme')
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.setAttribute('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
    }
    setDarkMode(prev => !prev)
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <nav>
      <NavLink to="/home" className="nav-brand" onClick={closeMenu}>
        🎨 My Art <span>Exhibition</span>
      </NavLink>

      <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
        {menuOpen ? '✕' : '☰'}
      </button>

      <ul id="nav-menu" className={menuOpen ? 'open' : ''}>
        <li><NavLink to="/home" onClick={closeMenu}>Home</NavLink></li>
        <li><NavLink to="/gallery" onClick={closeMenu}>Gallery</NavLink></li>
        <li><NavLink to="/artists" onClick={closeMenu}>Artists</NavLink></li>
        <li><NavLink to="/about" onClick={closeMenu}>About</NavLink></li>
        <li><NavLink to="/contact" onClick={closeMenu}>Contact</NavLink></li>
        <li><NavLink to="/dashboard" onClick={closeMenu}>Dashboard</NavLink></li>
        <li>
          <NavLink to="/cart" onClick={closeMenu}>
            🛒 Cart{' '}
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </NavLink>
        </li>
        <li className="dropdown">
          <a href="#">Account ▾</a>
          <div className="dropdown-menu">
            <NavLink to="/login" onClick={closeMenu}>🔑 Login</NavLink>
            <NavLink to="/signup" onClick={closeMenu}>✨ Register</NavLink>
          </div>
        </li>
        <li>
          <button
            className="nav-btn-login"
            style={{ fontSize: '1.1rem', padding: '7px 12px' }}
            title="Toggle dark mode"
            onClick={toggleDark}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </li>
      </ul>
    </nav>
  )
}
