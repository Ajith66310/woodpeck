export function ContactPage() {
  const phoneNumber = '918590123072'
  const waUrl = `https://wa.me/${phoneNumber}`
  const igUrl = 'https://www.instagram.com/thewoodpeck?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=='

  return (
    <div className="page contact-page">
      <div className="contact-hero">
        <h1 className="contact-hero-title">Get In Touch</h1>
        <p className="contact-hero-sub">We'd love to hear from you. Reach out on WhatsApp or Instagram.</p>
      </div>

      <div className="contact-content">
        <section className="contact-section">
          <h2 className="contact-section-title">Contact Us</h2>
          <p className="contact-section-text">
            Have a question about a product, want a custom order, or just want to say hi?
            We're just a message away.
          </p>
        </section>

        <div className="contact-cards">
          {/* WhatsApp Card */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card contact-card-whatsapp"
          >
            <div className="contact-card-icon">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2Z" />
              </svg>
            </div>
            <div className="contact-card-body">
              <strong className="contact-card-label">WhatsApp</strong>
              <span className="contact-card-handle">+91 85901 23072</span>
              <span className="contact-card-cta">Chat with us →</span>
            </div>
          </a>

          {/* Instagram Card */}
          <a
            href={igUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card contact-card-instagram"
          >
            <div className="contact-card-icon">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </div>
            <div className="contact-card-body">
              <strong className="contact-card-label">Instagram</strong>
              <span className="contact-card-handle">@thewoodpeck</span>
              <span className="contact-card-cta">Follow us →</span>
            </div>
          </a>
        </div>

        <section className="contact-info-section">
          <h2 className="contact-section-title">Business Hours</h2>
          <div className="contact-hours">
            <div className="contact-hours-row">
              <span>Monday – Saturday</span>
              <span>9:00 AM – 7:00 PM</span>
            </div>
            <div className="contact-hours-row">
              <span>Sunday</span>
              <span>By Appointment</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
