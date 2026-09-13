import { useState } from 'preact/hooks'
import { Button } from '../common/Button.tsx'
import { Badge } from '../common/Badge.tsx'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.')
      return
    }

    setError('')
    setSubmitted(true)
  }

  return (
    <section id="newsletter-section" className="home-section newsletter-section">
      <div className="newsletter-card-container">
        <div className="newsletter-inner-content">
          <div className="newsletter-badge-wrap">
            <Badge variant="brand">Timber Guild Journal</Badge>
            <span className="newsletter-sub-tag">Exclusive 10% Welcome Voucher</span>
          </div>

          <h2 className="newsletter-title">
            Craftsmanship in Your Inbox
          </h2>

          <p className="newsletter-description">
            Subscribe to our artisan journal for early access to rare wood slab releases, seasonal care guides for solid hardwood, and private studio discounts.
          </p>

          {submitted ? (
            <div className="newsletter-success-box">
              <div className="success-icon-circle">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div className="success-text">
                <h4>You are on the VIP Woodcraft list!</h4>
                <p>We've sent your 10% welcome discount code to <strong>{email}</strong>.</p>
              </div>
              <button
                type="button"
                className="reset-email-btn"
                onClick={() => {
                  setSubmitted(false)
                  setEmail('')
                }}
              >
                Subscribe another email
              </button>
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <div className="form-input-row">
                <div className="input-field-wrapper">
                  <svg className="mail-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <input
                    type="email"
                    placeholder="Enter your work or personal email..."
                    value={email}
                    onInput={(e) => {
                      setEmail((e.target as HTMLInputElement).value)
                      if (error) setError('')
                    }}
                    className="newsletter-email-input"
                    aria-label="Email Address"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="newsletter-submit-btn"
                >
                  Join Newsletter →
                </Button>
              </div>

              {error && <p className="newsletter-error-msg">{error}</p>}

              <div className="newsletter-perks-footer">
                <span>🔒 No spam, ever</span>
                <span>•</span>
                <span>📦 10% Instant Discount</span>
                <span>•</span>
                <span>🌿 100% FSC® Certified Timber</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
