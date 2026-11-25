
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import SearchBar from './SearchBar.jsx'
import { getPublicAssetUrl } from '../utils/assets.js'

const categories = [
  { name: 'Movies', path: '/movies' },
  { name: 'Events', path: '/events' },
  { name: 'Concerts', path: '/concerts' },
  { name: 'Sports', path: '/sports' },
  { name: 'Activities', path: '/activities' },
]

function Header({
  user,
  onLogout,
  searchTerm,
  onSearchChange,
  selectedLocation,
  onLocationChange,
}) {
  const navigate = useNavigate()
  const [localSearch, setLocalSearch] = useState('')
  const [localLocation, setLocalLocation] = useState('Vijayawada')

  const searchValue = searchTerm === undefined ? localSearch : searchTerm
  const locationValue = selectedLocation === undefined ? localLocation : selectedLocation

  function changeSearch(value) {
    if (onSearchChange) {
      onSearchChange(value)
    } else {
      setLocalSearch(value)
      navigate('/', { state: { search: value } })
    }
  }

  function changeLocation(city) {
    if (onLocationChange) {
      onLocationChange(city)
    } else {
      setLocalLocation(city)
      navigate('/', { state: { location: city } })
    }
  }

  return (
    <header className="site-header">
      <div className="header-main">
        <Link className="brand" to="/" aria-label="Ticketly home">
          <img src={getPublicAssetUrl('/images/logo.png')} alt="" />
          <span>TICKETLY</span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end to="/">
            Home
          </NavLink>

          {categories.map(({ name, path }) => (
            <NavLink
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              key={name}
              to={path}
            >
              {name}
            </NavLink>
          ))}
        </nav>

        <label className="location-select">
          <span aria-hidden="true">⌖</span>
          <select
            aria-label="Select your city"
            value={locationValue || 'Vijayawada'}
            onChange={(event) => changeLocation(event.target.value)}
          >
            {['Vijayawada', 'Hyderabad', 'Bengaluru'].map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>
        </label>

        <div className="header-account">
          {user ? (
            <>
              <Link
                className="button button-quiet"
                to={user.role === 'Admin' ? '/admin' : '/dashboard'}
              >
                My account
              </Link>

              <button
                className="button button-primary"
                onClick={onLogout}
                type="button"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link className="button button-quiet" to="/login">
                Log in
              </Link>

              <Link className="button button-primary" to="/signup">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="header-search">
        <nav className="mobile-nav" aria-label="Event categories">
          <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end to="/">
            Home
          </NavLink>
          {categories.map(({ name, path }) => (
            <NavLink
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              key={name}
              to={path}
            >
              {name}
            </NavLink>
          ))}
        </nav>

        <SearchBar
          value={searchValue || ''}
          onChange={changeSearch}
        />
      </div>
    </header>
  )
}

export default Header
