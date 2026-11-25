import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import adminCredentials from '../config/adminCredentials.js'
import { getPublicAssetUrl } from '../utils/assets.js'
import { getStoredAccounts } from '../utils/storage.js'

const initialForm = { name: '', email: '', phone: '', password: '', confirmPassword: '' }

function Signup({ onRegister }) {
  const [form, setForm] = useState(initialForm)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const name = form.name.trim()
    const email = form.email.trim().toLowerCase()
    const phone = form.phone.trim()
    if (!name) return setErrorMessage('Please enter your name.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setErrorMessage('Please enter a valid email address.')
    if (!/^\d{10}$/.test(phone)) return setErrorMessage('Please enter a valid 10-digit phone number.')
    if (form.password.length < 6) return setErrorMessage('Your password must be at least 6 characters.')
    if (form.password !== form.confirmPassword) return setErrorMessage('The passwords do not match.')

    const isAdminIdentifier = email === adminCredentials.email.toLowerCase()
    const alreadyRegistered = getStoredAccounts().some((account) =>
      account.email?.toLowerCase() === email || account.phone === phone,
    )
    if (isAdminIdentifier) return setErrorMessage('That email is reserved for the configured Admin account.')
    if (alreadyRegistered) return setErrorMessage('That email or phone number is already registered.')

    const account = { id: `user-${Date.now()}`, name, email, phone, password: form.password, role: 'User' }
    if (!onRegister(account)) {
      setErrorMessage('That email or phone number is already registered.')
      return
    }

    navigate('/user/login', { replace: true, state: { registrationSuccess: true } })
  }

  return (
    <main className="auth-page">
      <section className="auth-card auth-card-wide">
        <Link className="brand auth-brand" to="/"><img src={getPublicAssetUrl('/images/logo.png')} alt="" /><span>TICKETLY</span></Link>
        <p className="eyebrow">YOUR NEXT STORY STARTS HERE</p>
        <h1>Create your account.</h1>
        <p className="auth-description">One account for every show, match and memorable night.</p>
        <form className="form-stack" onSubmit={handleSubmit}>
          <label>Full name<input autoComplete="name" name="name" onChange={updateField} required value={form.name} /></label>
          <label>Email<input autoComplete="email" name="email" onChange={updateField} required type="email" value={form.email} /></label>
          <label>Phone number<input autoComplete="tel" maxLength="10" name="phone" onChange={updateField} required type="tel" value={form.phone} /></label>
          <label>Password<input autoComplete="new-password" minLength="6" name="password" onChange={updateField} required type="password" value={form.password} /></label>
          <label>Confirm password<input autoComplete="new-password" name="confirmPassword" onChange={updateField} required type="password" value={form.confirmPassword} /></label>
          {errorMessage && <p className="form-message error" role="alert">{errorMessage}</p>}
          <button className="button button-primary button-wide" type="submit">Create account <span aria-hidden="true">→</span></button>
        </form>
        <p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
        <p className="demo-note">Local Storage authentication is for demonstration only; it is not production-secure.</p>
      </section>
    </main>
  )
}

export default Signup
