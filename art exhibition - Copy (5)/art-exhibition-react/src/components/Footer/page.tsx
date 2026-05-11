import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div>
          <h2>🎨 My Art <span>Exhibition</span></h2>
          <p>Connecting people through the universal language of art since 2026.</p>
          <div className="social-links">
            <a href="#" className="social-link">f</a>
            <a href="#" className="social-link">𝕏</a>
            <a href="#" className="social-link">in</a>
            <a href="#" className="social-link">▶</a>
          </div>
        </div>
        <div>
          <h3>Explore</h3>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
          <NavLink to="/artists">Artists</NavLink>
          <NavLink to="/about">About Us</NavLink>
        </div>
        <div>
          <h3>Account</h3>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Register</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>
        <div>
          <h3>Contact Info</h3>
          <p>📍 123 Gallery Lane, Art City</p>
          <p>✉️ info@myartexhibition.com</p>
          <p>📞 +1 234 567 8900</p>
        </div>
      </div>
      <hr className="footer-divider" />
      <div className="footer-bottom">
        <span>© 2026 My Art Exhibition. All Rights Reserved.</span>
        <span>Designed with ❤️ for art lovers</span>
      </div>
    </footer>
  )
}
