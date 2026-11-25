import { Link, useLocation } from 'react-router-dom'
import { getPublicAssetUrl } from '../utils/assets.js'
import { formatPrice, getStoredBookings } from '../utils/storage.js'

function AdminDashboard({ user, events, notice, onLogout }) {
  const location = useLocation()
  const bookings = getStoredBookings()
  const ticketsSold = bookings.reduce((total, booking) => total + booking.seats.length, 0)
  const revenue = bookings.reduce((total, booking) => total + Number(booking.totalAmount), 0)
  const showingBookings = new URLSearchParams(location.search).get('view') === 'bookings'

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link className="brand admin-brand" to="/"><img src={getPublicAssetUrl('/images/logo.png')} alt="" /><span>TICKETLY</span></Link>
        <p className="sidebar-label">WORKSPACE</p>
        <Link className={!showingBookings ? 'sidebar-link active' : 'sidebar-link'} to="/admin">▦ &nbsp; Overview</Link>
        <Link className="sidebar-link" to="/admin/events?add=1">＋ &nbsp; Add event</Link>
        <Link className="sidebar-link" to="/admin/events">▤ &nbsp; Manage events</Link>
        <Link className={showingBookings ? 'sidebar-link active' : 'sidebar-link'} to="/admin?view=bookings">▣ &nbsp; Bookings</Link>
        <div className="sidebar-bottom">
          <span className="admin-user">{user.name}</span>
          <button className="sidebar-link" onClick={onLogout} type="button">↪ &nbsp; Log out</button>
        </div>
      </aside>
      <main className="admin-content">
        <div className="admin-topline"><span>Ticketly / {showingBookings ? 'Bookings' : 'Overview'}</span><span className="admin-badge">ADMIN</span></div>
        {(notice || location.state?.message) && <p className="success-message" role="status">{notice || location.state.message}</p>}
        <p className="eyebrow">GOOD MORNING, {user.name.toUpperCase()}</p>
        <h1>{showingBookings ? 'Bookings' : 'Your overview'}</h1>
        <p className="admin-subtitle">A clear view of what’s happening across Ticketly.</p>
        {!showingBookings ? (
          <>
            <div className="admin-stats">
              <article><span>Total events</span><strong>{events.length}</strong><small>In your catalogue</small></article>
              <article><span>Tickets sold</span><strong>{ticketsSold}</strong><small>From confirmed bookings</small></article>
              <article><span>Total revenue</span><strong>{formatPrice(revenue)}</strong><small>Demonstration bookings</small></article>
            </div>
            <section className="admin-table-card">
              <div className="section-heading"><div><p className="eyebrow">YOUR CATALOGUE</p><h2>Recent events</h2></div><Link className="button button-primary" to="/admin/events">Manage events →</Link></div>
              {events.length ? <div className="table-scroll"><table><thead><tr><th>Event</th><th>Category</th><th>Date</th><th>Location</th><th>Price</th></tr></thead><tbody>
                {events.slice(0, 5).map((event) => <tr key={event.id}><td>{event.name}</td><td>{event.category}</td><td>{event.date}</td><td>{event.location}</td><td>{formatPrice(event.ticketPrice)}</td></tr>)}
              </tbody></table></div> : <p className="muted-copy">No events have been added yet.</p>}
            </section>
            <RecentBookings bookings={bookings} />
          </>
        ) : <RecentBookings bookings={bookings} />}
      </main>
    </div>
  )
}

function RecentBookings({ bookings }) {
  return (
    <section className="admin-table-card">
      <div className="section-heading"><div><p className="eyebrow">LATEST ACTIVITY</p><h2>Recent bookings</h2></div></div>
      {bookings.length ? <div className="table-scroll"><table><thead><tr><th>Booking ID</th><th>Customer</th><th>Event</th><th>Seats</th><th>Amount</th></tr></thead><tbody>
        {bookings.slice().reverse().slice(0, 8).map((booking) => <tr key={booking.id}><td>{booking.id}</td><td>{booking.userName}</td><td>{booking.eventName}</td><td>{booking.seats.join(', ')}</td><td>{formatPrice(booking.totalAmount)}</td></tr>)}
      </tbody></table></div> : <p className="muted-copy">Confirmed user bookings will appear here. No sample bookings are included.</p>}
    </section>
  )
}

export default AdminDashboard
