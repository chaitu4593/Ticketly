import { Link, useParams } from 'react-router-dom'
import Footer from '../Components/Footer.jsx'
import Header from '../Components/Header.jsx'
import { getPublicAssetUrl } from '../utils/assets.js'
import { formatPrice } from '../utils/storage.js'

function EventDetails({
  events,
  user,
  onLogout,
  searchTerm,
  setSearchTerm,
  selectedLocation,
  setSelectedLocation,
}) {
  const { id } = useParams()
  const event = events.find((item) => item.id === id)
  if (!event) return <main className="empty-page"><h1>We couldn't find that event.</h1><Link className="button button-primary" to="/">Explore events</Link></main>

  return (
    <>
      <Header
        user={user}
        onLogout={onLogout}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
      />
      <main className="details-page">
        <Link className="back-link" to="/">← Back to explore</Link>
        <div className="details-layout">
          <div className="details-image">
            <img alt={event.name} onError={(imageEvent) => { imageEvent.currentTarget.style.display = 'none' }} src={getPublicAssetUrl(event.poster)} />
          </div>
          <section className="details-copy">
            <span className="pill">{event.category}</span>
            <p className="eyebrow">AN EXPERIENCE TO REMEMBER</p>
            <h1>{event.name}</h1>
            <p className="details-description">{event.description}</p>
            <div className="details-facts">
              <p><span>Date</span><strong>{event.date}</strong></p>
              <p><span>Time</span><strong>{event.time}</strong></p>
              <p><span>Venue</span><strong>{event.venue}</strong></p>
              <p><span>Location</span><strong>{event.location}</strong></p>
            </div>
            <div className="details-booking">
              <div><small>Tickets from</small><strong>{formatPrice(event.ticketPrice)}</strong></div>
              <Link className="button button-primary" to={`/booking/${event.id}`}>Book tickets <span aria-hidden="true">→</span></Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default EventDetails
