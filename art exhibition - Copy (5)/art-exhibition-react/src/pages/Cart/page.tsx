import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/page'
import Footer from '../../components/Footer/page'
import { useCart } from '../../context/CartContext'
import { useToast } from '../../context/ToastContext'

export default function Cart() {
  const navigate = useNavigate()
  const { cart, addToCart, removeFromCart, changeQty, clearCart, checkoutCart } = useCart()
  const { showToast } = useToast()

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)

  function handleCheckout() {
    showToast('✓ Order placed successfully! Thank you for your purchase.', 5000)
    setTimeout(() => { checkoutCart() }, 1500)
  }

  function handleClearCart() {
    if (window.confirm('Clear your entire cart?')) {
      clearCart()
      showToast('Cart cleared.')
    }
  }

  const featuredPicks = [
    { id: 'art1', name: 'Abstract Thoughts', artist: 'Jane Doe', year: 2024, price: 1200, img: '/images/image1.png' },
    { id: 'art2', name: 'Classic Realism Portrait', artist: 'John Smith', year: 1802, price: 3500, img: '/images/image2.png' },
  ]

  return (
    <>
      <Navbar />
      <div className="page fade-in">
        <div className="flex-between mb-30">
          <div>
            <h1>Shopping Cart 🛒</h1>
            <p style={{ margin: 0 }}>Review your selected artworks below.</p>
          </div>
          <button className="sm-button border-button" onClick={() => navigate('/gallery')}>← Continue Shopping</button>
        </div>

        <div className="cart-layout">
          <div className="cart-items-col">
            {cart.length === 0 ? (
              <p className="text-center" style={{ padding: '60px 0', fontSize: '1.1rem', color: 'var(--text-muted)' }}>
                Your cart is empty.{' '}
                <button className="link-button" onClick={() => navigate('/gallery')}>Browse Gallery →</button>
              </p>
            ) : (
              cart.map(item => (
                <div className="cart-item" key={item.id}>
                  <img src={item.img} alt={item.name} />
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p style={{ margin: 0, color: 'var(--brand-accent)', fontWeight: 700 }}>${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="cart-item-controls">
                    <button className="tiny-button border-button" onClick={() => changeQty(item.id, -1)}>−</button>
                    <span style={{ fontWeight: 700, minWidth: '28px', textAlign: 'center' }}>{item.qty}</span>
                    <button className="tiny-button border-button" onClick={() => changeQty(item.id, 1)}>+</button>
                    <button className="tiny-button danger-button" onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                  <div className="cart-item-total">${(item.price * item.qty).toFixed(2)}</div>
                </div>
              ))
            )}
          </div>

          <div className="cart-summary-col">
            {cart.length > 0 && (
              <div className="cart-summary-box">
                <div className="flex-between"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
                <div className="flex-between"><span>Shipping</span><span style={{ color: 'var(--brand-accent)' }}>Free</span></div>
                <hr className="divider" style={{ margin: '14px 0' }} />
                <div className="flex-between" style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                  <span>Total</span><span style={{ color: 'var(--brand-accent)' }}>${total.toFixed(2)}</span>
                </div>
                <button className="lg-button accent-button" style={{ width: '100%', marginTop: '20px' }} onClick={handleCheckout}>
                  Proceed to Checkout →
                </button>
                <button
                  className="sm-button"
                  style={{ width: '100%', marginTop: '10px', background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border-light)' }}
                  onClick={handleClearCart}
                >
                  Clear Cart
                </button>
              </div>
            )}

            <div style={{ marginTop: '24px' }}>
              <h3 className="section-title" style={{ fontSize: '1.1rem' }}>You May Also Like</h3>
              {featuredPicks.map(pick => (
                <div className="card" key={pick.id} style={{ width: '100%', marginBottom: '16px' }}>
                  <img src={pick.img} alt={pick.name} style={{ height: '160px' }} />
                  <h3 style={{ padding: '14px 14px 0' }}>{pick.name}</h3>
                  <p style={{ padding: '6px 14px 0' }}>By {pick.artist} · {pick.year}</p>
                  <div style={{ padding: '0 14px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: 'var(--brand-accent)', fontSize: '1.1rem' }}>${pick.price.toLocaleString()}</strong>
                    <button
                      className="sm-button accent-button"
                      onClick={() => { addToCart(pick.id, pick.name, pick.price, pick.img); showToast(`🛒 "${pick.name}" added to cart!`) }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
