import { Link } from 'react-router-dom'
import { getPublicAssetUrl } from '../utils/assets.js'

function LoginChoice() {
  return (
    <main className="auth-page">
      <section className="login-choice">
        <Link className="brand auth-brand" to="/"><img src={getPublicAssetUrl('/images/logo.png')} alt="" /><span>TICKETLY</span></Link>
        <p className="eyebrow">WELCOME TO TICKETLY</p>
        <h1>Choose your sign-in.</h1>
        <p className="auth-description">Select the account type you want to use. Each has a separate login and dashboard.</p>
        <div className="login-module-grid">
          <article className="login-module">
            <span className="module-icon" aria-hidden="true">☺</span>
            <p className="eyebrow">FOR TICKET BUYERS</p>
            <h2>User</h2>
            <p>Discover events, book seats and keep all your tickets together.</p>
            <Link className="button button-primary button-wide" to="/user/login">Continue as User <span aria-hidden="true">→</span></Link>
            <span className="module-footnote">New to Ticketly? <Link to="/signup">Create an account</Link></span>
          </article>
          <article className="login-module admin-module">
            <span className="module-icon" aria-hidden="true">▦</span>
            <p className="eyebrow">FOR TICKETLY MANAGEMENT</p>
            <h2>Admin</h2>
            <p>Manage events and view bookings from the Admin dashboard.</p>
            <Link className="button button-primary button-wide" to="/admin/login">Continue as Admin <span aria-hidden="true">→</span></Link>
            <span className="module-footnote">One configured Admin account · No registration</span>
          </article>
        </div>
        <Link className="choice-home-link" to="/">← Back to Ticketly home</Link>
      </section>
    </main>
  )
}

export default LoginChoice
