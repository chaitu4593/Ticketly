import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getPublicAssetUrl } from '../utils/assets.js'
import { formatPrice } from '../utils/storage.js'

function EventCard({ event }) {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <article className="event-card">
      <Link className="event-poster" to={`/event/${event.id}`}>
        {!imageFailed && event.poster ? (
          <img alt={event.name} loading="lazy" onError={() => setImageFailed(true)} src={getPublicAssetUrl(event.poster)} />
        ) : (
          <span className="poster-placeholder">{event.category}</span>
        )}
        <span className="poster-category">{event.category}</span>
        <span className="poster-open" aria-hidden="true">↗</span>
      </Link>
      <div className="event-card-body">
        <p className="event-date">{event.date} <span>·</span> {event.time}</p>
        <h3><Link to={`/event/${event.id}`}>{event.name}</Link></h3>
        <p className="event-venue">{event.venue}, {event.location}</p>
        <div className="event-card-bottom">
          <span>From <strong>{formatPrice(event.ticketPrice)}</strong></span>
          <div className="event-card-actions">
            <Link className="button button-small details-button" to={`/event/${event.id}`}>View details</Link>
            <Link className="button button-small" to={`/booking/${event.id}`}>Book now</Link>
          </div>
        </div>
      </div>
    </article>
  )
}

export default EventCard
