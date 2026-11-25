import { useEffect, useState } from 'react'
import { getPublicAssetUrl } from '../utils/assets.js'

const slides = [
  { image: getPublicAssetUrl('/images/banner1.jpg'), label: 'Make tonight unforgettable', detail: 'Find your next big-screen moment.' },
  { image: getPublicAssetUrl('/images/banner2.jpg'), label: 'The city is your stage', detail: 'Live music, new memories, one great night.' },
  { image: getPublicAssetUrl('/images/banner3.jpg'), label: 'Be there for the big moment', detail: 'The best seats are waiting for you.' },
]

function Banner() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 3000)
    return () => window.clearInterval(timer)
  }, [])

  function showSlide(direction) {
    setActiveSlide((current) => (current + direction + slides.length) % slides.length)
  }

  return (
    <section className="hero-banner" aria-label="Featured events">
      {slides.map((slide, index) => (
        <div
          aria-hidden={activeSlide !== index}
          className={activeSlide === index ? 'hero-slide active' : 'hero-slide'}
          key={slide.image}
          style={{ backgroundImage: `linear-gradient(90deg, rgba(7, 12, 27, .88), rgba(7, 12, 27, .08)), url("${slide.image}")` }}
        >
          <div className="hero-copy">
            <span className="eyebrow">YOUR NEXT GREAT STORY STARTS HERE</span>
            <h1>{slide.label}</h1>
            <p>{slide.detail}</p>
            <a className="button button-primary" href="#events">Explore events <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      ))}
      <div className="hero-controls">
        <button aria-label="Previous banner" onClick={() => showSlide(-1)} type="button">←</button>
        <span>{String(activeSlide + 1).padStart(2, '0')} <i /> {String(slides.length).padStart(2, '0')}</span>
        <button aria-label="Next banner" onClick={() => showSlide(1)} type="button">→</button>
      </div>
    </section>
  )
}

export default Banner
