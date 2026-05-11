import { useEffect, useRef, useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/page'
import Footer from '../../components/Footer/page'
import { useToast } from '../../context/ToastContext'

type ArtworkStatus = 'On Display' | 'Archived' | 'Loaned' | 'Restoration'

interface Artwork {
  id: number
  name: string
  artist: string
  year: number
  status: ArtworkStatus
}

const initialArtworks: Artwork[] = [
  { id: 1, name: 'Abstract Thoughts', artist: 'Jane Doe', year: 2024, status: 'On Display' },
  { id: 2, name: 'Classic Realism Portrait', artist: 'John Smith', year: 1802, status: 'Archived' },
  { id: 3, name: 'Modern Bronze Sculpture', artist: 'Alan Wake', year: 2019, status: 'On Display' },
  { id: 4, name: 'The Persistence of Memory', artist: 'Salvador Dali', year: 1931, status: 'Loaned' },
  { id: 5, name: 'Starry Night Replica', artist: 'Vincent V.', year: 1889, status: 'Restoration' },
  { id: 6, name: 'Waterlilies Series', artist: 'Claude M.', year: 1906, status: 'On Display' },
]

const statusBadge: Record<ArtworkStatus, string> = {
  'On Display': 'badge badge-success',
  'Archived': 'badge badge-muted',
  'Loaned': 'badge badge-info',
  'Restoration': 'badge badge-warning',
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])

  const [artworks, setArtworks] = useState<Artwork[]>(initialArtworks)
  const [search, setSearch] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showOrdersModal, setShowOrdersModal] = useState(false)
  const [showStatsModal, setShowStatsModal] = useState(false)
  const [addForm, setAddForm] = useState({ name: '', artist: '', year: '', price: '', status: 'On Display' as ArtworkStatus })
  const [editForm, setEditForm] = useState({ name: 'Abstract Thoughts', artist: 'Jane Doe', year: '2024', status: 'On Display' as ArtworkStatus })

  const stats = [
    { icon: '🖼️', label: 'Total Artworks', target: 48 },
    { icon: '🎨', label: 'Artists', target: 12 },
    { icon: '👥', label: 'Visitors This Month', target: 1840 },
    { icon: '📦', label: 'Pending Orders', target: 7 },
    { icon: '💰', label: 'Revenue ($)', target: 24600 },
  ]

  // Animated counters
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

  // Canvas chart
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const data = [135, 210, 172, 260, 198, 330, 295]
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const max = Math.max(...data)
    const W = canvas.width, H = canvas.height
    const pad = { top: 30, bottom: 48, left: 52, right: 20 }
    const cW = W - pad.left - pad.right
    const cH = H - pad.top - pad.bottom
    const gap = cW / data.length
    const bW = gap * 0.6
    ctx.clearRect(0, 0, W, H)
    for (let g = 0; g <= 5; g++) {
      const gy = pad.top + (cH / 5) * g
      ctx.strokeStyle = '#e8e8e0'; ctx.lineWidth = 1
      ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(W - pad.right, gy); ctx.stroke()
      ctx.fillStyle = '#999'; ctx.font = '11px Inter,sans-serif'; ctx.textAlign = 'right'
      ctx.fillText(String(Math.round(max * (5 - g) / 5)), pad.left - 6, gy + 4)
    }
    data.forEach((val, i) => {
      const bH = (val / max) * cH
      const x = pad.left + i * gap + (gap - bW) / 2
      const y = pad.top + cH - bH
      const gr = ctx.createLinearGradient(0, y, 0, y + bH)
      gr.addColorStop(0, '#d4af37'); gr.addColorStop(1, '#9a7b1a')
      ctx.fillStyle = gr
      const r = 5
      ctx.beginPath()
      ctx.moveTo(x + r, y); ctx.lineTo(x + bW - r, y)
      ctx.quadraticCurveTo(x + bW, y, x + bW, y + r)
      ctx.lineTo(x + bW, y + bH); ctx.lineTo(x, y + bH)
      ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y)
      ctx.closePath(); ctx.fill()
      ctx.fillStyle = '#333'; ctx.font = 'bold 11px Inter,sans-serif'; ctx.textAlign = 'center'
      ctx.fillText(String(val), x + bW / 2, y - 8)
      ctx.fillStyle = '#888'; ctx.font = '12px Inter,sans-serif'
      ctx.fillText(labels[i], x + bW / 2, H - 12)
    })
  }, [])

  function handleAddArtwork(e: FormEvent) {
    e.preventDefault()
    const newArt: Artwork = {
      id: artworks.length + 1,
      name: addForm.name,
      artist: addForm.artist,
      year: parseInt(addForm.year),
      status: addForm.status,
    }
    setArtworks(prev => [...prev, newArt])
    setShowAddModal(false)
    showToast(`✓ "${addForm.name}" added to collection!`)
    setAddForm({ name: '', artist: '', year: '', price: '', status: 'On Display' })
  }

  function handleDeleteArtwork(id: number, name: string) {
    if (window.confirm(`Delete "${name}"? This cannot be undone.`)) {
      setArtworks(prev => prev.filter(a => a.id !== id))
      showToast(`"${name}" deleted.`)
    }
  }

  const filtered = artworks.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.artist.toLowerCase().includes(search.toLowerCase())
  )

  const quickActions = [
    { icon: '➕', label: 'Add Artwork', action: () => setShowAddModal(true) },
    { icon: '🖼️', label: 'View All Artworks', action: () => navigate('/gallery') },
    { icon: '✏️', label: 'Update Artwork', action: () => setShowUpdateModal(true) },
    { icon: '🎨', label: 'Manage Artists', action: () => navigate('/artists') },
    { icon: '📩', label: 'Messages', action: () => navigate('/contact') },
    { icon: '📦', label: 'Orders / Bookings', action: () => setShowOrdersModal(true) },
    { icon: '📊', label: 'User Statistics', action: () => setShowStatsModal(true) },
    { icon: '🔒', label: 'Logout', action: () => navigate('/login') },
  ]

  return (
    <>
      <Navbar />
      <div className="page fade-in">
        <div className="flex-between mb-30">
          <div>
            <h1>Admin Dashboard</h1>
            <p style={{ margin: 0 }}>Welcome back! Here's your exhibition overview.</p>
          </div>
          <div className="flex-center">
            <button className="sm-button accent-button" onClick={() => setShowAddModal(true)}>+ Add Artwork</button>
            <button className="sm-button border-button" onClick={() => navigate('/gallery')}>View Gallery</button>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid fade-in-2">
          {stats.map((s, i) => (
            <div className="stat-card" key={s.label}>
              <div className="stat-icon">{s.icon}</div>
              <div>
                <span className="stat-label">{s.label}</span>
                <span className="stat-value" ref={el => { counterRefs.current[i] = el }} data-target={s.target}>0</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="dash-section fade-in-3">
          <h2 className="section-title">Quick Actions</h2>
          <div className="action-grid">
            {quickActions.map(a => (
              <button className="action-btn" key={a.label} onClick={a.action}>
                <div className="action-btn-icon">{a.icon}</div>
                {a.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="dash-section">
          <h2 className="section-title">Weekly Visitor Trend</h2>
          <div className="chart-wrapper">
            <canvas ref={canvasRef} id="visits-chart" width={780} height={300} />
          </div>
        </div>

        {/* Artwork Table */}
        <div className="dash-section">
          <div className="flex-between mb-16">
            <h2 className="section-title">Artwork Inventory</h2>
            <input
              type="text"
              placeholder="🔍 Search artworks…"
              style={{ maxWidth: '240px', padding: '8px 14px', fontSize: '0.9rem' }}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="table-container">
            <table className="data-table" id="artworks-table">
              <thead>
                <tr>
                  <th className="col-id">ID</th>
                  <th className="col-name">Artwork Name</th>
                  <th className="col-artist">Artist</th>
                  <th className="col-year">Year</th>
                  <th className="col-status">Status</th>
                  <th className="col-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(art => (
                  <tr key={art.id}>
                    <td>{art.id}</td>
                    <td className="artwork-name">{art.name}</td>
                    <td>{art.artist}</td>
                    <td>{art.year}</td>
                    <td><span className={statusBadge[art.status]}>{art.status}</span></td>
                    <td className="table-actions">
                      <button className="tiny-button accent-button" onClick={() => setShowUpdateModal(true)}>Edit</button>
                      <button className="tiny-button danger-button" onClick={() => handleDeleteArtwork(art.id, art.name)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Log */}
        <div className="dash-section">
          <h2 className="section-title">Recent Activity</h2>
          <div className="table-container">
            <table>
              <thead><tr><th>Time</th><th>Action</th><th>User</th><th>Details</th></tr></thead>
              <tbody>
                <tr><td>Today 09:32</td><td><span className="badge badge-success">Added</span></td><td>Admin</td><td>New artwork "Waterlilies Series" added</td></tr>
                <tr><td>Today 08:14</td><td><span className="badge badge-info">Updated</span></td><td>Admin</td><td>Status of "Starry Night Replica" → Restoration</td></tr>
                <tr><td>Yesterday 17:45</td><td><span className="badge badge-warning">Loaned</span></td><td>Admin</td><td>"Persistence of Memory" loaned to City Museum</td></tr>
                <tr><td>Yesterday 12:00</td><td><span className="badge badge-muted">Archived</span></td><td>Admin</td><td>"Classic Realism Portrait" archived</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ADD ARTWORK MODAL */}
      {showAddModal && (
        <div className="modal-overlay open">
          <div className="modal-box">
            <button className="modal-close" onClick={() => setShowAddModal(false)}>✕</button>
            <h2 style={{ marginBottom: '6px' }}>Add New Artwork</h2>
            <p>Fill in the details to add a new piece to the collection.</p>
            <form onSubmit={handleAddArtwork}>
              <div><label>Artwork Name</label><input type="text" placeholder="e.g. Starry Night" required value={addForm.name} onChange={e => setAddForm({ ...addForm, name: e.target.value })} /></div>
              <div><label>Artist</label><input type="text" placeholder="e.g. Vincent van Gogh" required value={addForm.artist} onChange={e => setAddForm({ ...addForm, artist: e.target.value })} /></div>
              <div><label>Year Created</label><input type="number" placeholder="e.g. 1889" required value={addForm.year} onChange={e => setAddForm({ ...addForm, year: e.target.value })} /></div>
              <div><label>Price ($)</label><input type="number" placeholder="e.g. 1500" required value={addForm.price} onChange={e => setAddForm({ ...addForm, price: e.target.value })} /></div>
              <div>
                <label>Status</label>
                <div className="select-container">
                  <select value={addForm.status} onChange={e => setAddForm({ ...addForm, status: e.target.value as ArtworkStatus })}>
                    <option>On Display</option><option>Archived</option><option>Loaned</option><option>Restoration</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="lg-button accent-button" style={{ width: '100%' }}>Add to Collection</button>
            </form>
          </div>
        </div>
      )}

      {/* UPDATE ARTWORK MODAL */}
      {showUpdateModal && (
        <div className="modal-overlay open">
          <div className="modal-box">
            <button className="modal-close" onClick={() => setShowUpdateModal(false)}>✕</button>
            <h2 style={{ marginBottom: '6px' }}>Update Artwork</h2>
            <p>Modify the details of the selected artwork.</p>
            <form onSubmit={e => { e.preventDefault(); setShowUpdateModal(false); showToast('✓ Artwork updated successfully!') }}>
              <div><label>Artwork Name</label><input type="text" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} /></div>
              <div><label>Artist</label><input type="text" value={editForm.artist} onChange={e => setEditForm({ ...editForm, artist: e.target.value })} /></div>
              <div><label>Year</label><input type="number" value={editForm.year} onChange={e => setEditForm({ ...editForm, year: e.target.value })} /></div>
              <div>
                <label>Status</label>
                <div className="select-container">
                  <select value={editForm.status} onChange={e => setEditForm({ ...editForm, status: e.target.value as ArtworkStatus })}>
                    <option>On Display</option><option>Archived</option><option>Loaned</option><option>Restoration</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="lg-button accent-button" style={{ width: '100%' }}>Save Changes</button>
            </form>
          </div>
        </div>
      )}

      {/* ORDERS MODAL */}
      {showOrdersModal && (
        <div className="modal-overlay open">
          <div className="modal-box" style={{ maxWidth: '680px' }}>
            <button className="modal-close" onClick={() => setShowOrdersModal(false)}>✕</button>
            <h2 style={{ marginBottom: '20px' }}>Orders &amp; Bookings</h2>
            <div className="table-container">
              <table>
                <thead><tr><th>Order #</th><th>Customer</th><th>Artwork</th><th>Amount</th><th>Status</th></tr></thead>
                <tbody>
                  <tr><td>#1001</td><td>Alice Johnson</td><td>Abstract Thoughts</td><td>$1,200</td><td><span className="badge badge-success">Paid</span></td></tr>
                  <tr><td>#1002</td><td>Bob Martin</td><td>Classic Realism</td><td>$3,500</td><td><span className="badge badge-warning">Pending</span></td></tr>
                  <tr><td>#1003</td><td>Carol Lee</td><td>Waterlilies Series</td><td>$2,800</td><td><span className="badge badge-info">Processing</span></td></tr>
                  <tr><td>#1004</td><td>David Kim</td><td>Color Symphony</td><td>$900</td><td><span className="badge badge-success">Paid</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* USER STATS MODAL */}
      {showStatsModal && (
        <div className="modal-overlay open">
          <div className="modal-box">
            <button className="modal-close" onClick={() => setShowStatsModal(false)}>✕</button>
            <h2 style={{ marginBottom: '20px' }}>User Statistics</h2>
            <div className="stats-grid" style={{ marginBottom: 0 }}>
              {[
                { icon: '👤', label: 'Registered Users', value: '284' },
                { icon: '🛒', label: 'Total Orders', value: '57' },
                { icon: '⭐', label: 'Avg. Rating', value: '4.8' },
                { icon: '🔄', label: 'Return Visitors', value: '68%' },
              ].map(s => (
                <div className="stat-card" key={s.label}>
                  <div className="stat-icon">{s.icon}</div>
                  <div><span className="stat-label">{s.label}</span><span className="stat-value">{s.value}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
