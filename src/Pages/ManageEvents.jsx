import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getPublicAssetUrl } from '../utils/assets.js'
import { formatPrice } from '../utils/storage.js'

const emptyForm = {
  name: '', category: 'Movies', description: '', date: '', time: '',
  venue: '', location: 'Vijayawada', ticketPrice: '', poster: '/images/event1.jpg',
}

function ManageEvents({ user, events, setEvents, onLogout }) {
  const location = useLocation()
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (new URLSearchParams(location.search).get('add') === '1') {
      document.getElementById('event-form')?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location.search])

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const price = Number(form.ticketPrice)
    if (!Number.isFinite(price) || price <= 0) {
      setMessage('Enter a ticket price greater than zero.')
      return
    }
    const poster = form.poster.trim() || '/images/event1.jpg'
    if (!poster.startsWith('/images/')) {
      setMessage('Use a local poster path from public/images, such as /images/event1.jpg.')
      return
    }
    if (editingId) {
      setEvents((current) => current.map((item) => item.id === editingId
        ? { ...item, ...form, poster, ticketPrice: price, bookedSeats: item.bookedSeats || [] }
        : item))
      setMessage('Event updated successfully.')
    } else {
      setEvents((current) => [{
        ...form,
        poster,
        id: `event-${Date.now()}`,
        ticketPrice: price,
        bookedSeats: [],
        createdBy: user.id,
      }, ...current])
      setMessage('Event added successfully.')
    }
    setForm(emptyForm)
    setEditingId('')
  }

  function startEditing(event) {
    setEditingId(event.id)
    setForm({
      name: event.name,
      category: event.category,
      description: event.description || '',
      date: event.date,
      time: event.time,
      venue: event.venue,
      location: event.location,
      ticketPrice: String(event.ticketPrice),
      poster: event.poster || '/images/event1.jpg',
    })
    document.getElementById('event-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  function deleteEvent(id) {
    if (!window.confirm('Delete this event from the catalogue? Existing bookings will stay in their owners’ tickets.')) return
    setEvents((current) => current.filter((event) => event.id !== id))
    if (editingId === id) {
      setEditingId('')
      setForm(emptyForm)
    }
    setMessage('Event removed from the catalogue.')
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link className="brand admin-brand" to="/"><img src={getPublicAssetUrl('/images/logo.png')} alt="" /><span>TICKETLY</span></Link>
        <p className="sidebar-label">WORKSPACE</p>
        <Link className="sidebar-link" to="/admin">▦ &nbsp; Overview</Link>
        <a className="sidebar-link active" href="#event-form">＋ &nbsp; Add event</a>
        <a className="sidebar-link active" href="#event-list">▤ &nbsp; Manage events</a>
        <Link className="sidebar-link" to="/admin?view=bookings">▣ &nbsp; Bookings</Link>
        <div className="sidebar-bottom"><span className="admin-user">{user.name}</span><button className="sidebar-link" onClick={onLogout} type="button">↪ &nbsp; Log out</button></div>
      </aside>
      <main className="admin-content">
        <div className="admin-topline"><span>Ticketly / Manage events</span><span className="admin-badge">ADMIN</span></div>
        <p className="eyebrow">YOUR EVENTS, YOUR WAY</p>
        <h1>Manage events</h1>
        <p className="admin-subtitle">Add new experiences or update what’s already on the calendar.</p>
        <section className="admin-table-card" id="event-form">
          <div className="section-heading"><div><p className="eyebrow">{editingId ? 'UPDATE YOUR LISTING' : 'GROW THE CALENDAR'}</p><h2>{editingId ? 'Edit event' : 'Add an event'}</h2></div></div>
          <form className="event-form-grid" onSubmit={handleSubmit}>
            <label>Event name<input name="name" onChange={updateField} required value={form.name} /></label>
            <label>Category<select name="category" onChange={updateField} value={form.category}>
              {['Movies', 'Concerts', 'Sports', 'Events', 'Activities'].map((category) => <option key={category}>{category}</option>)}
            </select></label>
            <label className="field-wide">Description<textarea name="description" onChange={updateField} required rows="3" value={form.description} /></label>
            <label>Date<input name="date" onChange={updateField} required type="date" value={form.date} /></label>
            <label>Time<input name="time" onChange={updateField} required type="time" value={form.time} /></label>
            <label>Venue<input name="venue" onChange={updateField} required value={form.venue} /></label>
            <label>Location<input name="location" onChange={updateField} required value={form.location} /></label>
            <label>Ticket price (₹)<input min="1" name="ticketPrice" onChange={updateField} required type="number" value={form.ticketPrice} /></label>
            <label className="field-wide">Poster image path<input name="poster" onChange={updateField} placeholder="/images/event1.jpg" value={form.poster} /><small>Use an image already in public/images, for example /images/event1.jpg.</small></label>
            {message && <p className="form-message field-wide" role="status">{message}</p>}
            <div className="form-actions field-wide">
              {editingId && <button className="button button-quiet" onClick={() => { setEditingId(''); setForm(emptyForm) }} type="button">Cancel edit</button>}
              <button className="button button-primary" type="submit">{editingId ? 'Save changes' : 'Add event'} →</button>
            </div>
          </form>
        </section>
        <section className="admin-table-card" id="event-list">
          <div className="section-heading"><div><p className="eyebrow">{events.length} LISTINGS</p><h2>All events</h2></div></div>
          {events.length ? <div className="table-scroll"><table><thead><tr><th>Event</th><th>Category</th><th>Date</th><th>Price</th><th>Actions</th></tr></thead><tbody>
            {events.map((event) => <tr key={event.id}><td>{event.name}<small className="table-subtext">{event.venue}, {event.location}</small></td><td>{event.category}</td><td>{event.date}</td><td>{formatPrice(event.ticketPrice)}</td><td><div className="table-actions"><button className="text-link" onClick={() => startEditing(event)} type="button">Edit</button><button className="text-link danger-link" onClick={() => deleteEvent(event.id)} type="button">Delete</button></div></td></tr>)}
          </tbody></table></div> : <p className="muted-copy">No events yet. Add your first listing above.</p>}
        </section>
      </main>
    </div>
  )
}

export default ManageEvents
