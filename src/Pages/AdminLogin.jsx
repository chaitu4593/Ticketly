import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import adminCredentials from '../config/adminCredentials.js'
import { getPublicAssetUrl } from '../utils/assets.js'

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    const matchesEmail = email.trim().toLowerCase() === adminCredentials.email.toLowerCase()

    if (!matchesEmail || password !== adminCredentials.password) {
      setErrorMessage('The Admin email or password is incorrect.')
      return
    }

    onLogin({
      id: 'ticketly-admin',
      name: adminCredentials.name,
      email: adminCredentials.email,
      role: 'Admin',
    })
    navigate('/admin', {
      replace: true,
      state: { message: `Welcome back, ${adminCredentials.name}!` },
    })
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link className="brand auth-brand" to="/"><img src={getPublicAssetUrl('/images/logo.png')} alt="" /><span>TICKETLY</span></Link>
        <p className="eyebrow">TICKETLY MANAGEMENT</p>
        <h1>Admin sign in.</h1>
        <p className="auth-description">This login is for the single configured Admin account.</p>
        <form className="form-stack" onSubmit={handleSubmit}>
          <label>Admin email
            <input
              autoComplete="username"
              onChange={(event) => setEmail(event.target.value)}
              required
              type="email"
              value={email}
            />
          </label>
          <label>Password
            <input
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              value={password}
            />
          </label>
          {errorMessage && <p className="form-message error" role="alert">{errorMessage}</p>}
          <button className="button button-primary button-wide" type="submit">Admin log in <span aria-hidden="true">→</span></button>
        </form>
        <p className="demo-note">There is no Admin registration. Update the one Admin email and password in <code>src/config/adminCredentials.js</code>.</p>
        <p className="auth-switch">Looking for another sign-in option? <Link to="/login">Choose a module</Link></p>
      </section>
    </main>
  )
}

export default AdminLogin
