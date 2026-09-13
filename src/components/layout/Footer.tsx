export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <p className="footer-brand">WoodPeck Timber Co.</p>
          <p className="footer-text">
            Mastercrafted 100% solid hardwood furniture, architectural acoustic wall slats, and bespoke heirloom timber for conscious modern living.
          </p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <span className="footer-title">Wood Collections</span>
            <a href="#our-products-section">Dining Tables</a>
            <a href="#our-products-section">Lounge Chairs</a>
            <a href="#our-products-section">Acoustic Wall Slats</a>
            <a href="#our-products-section">Artisan Boards</a>
          </div>
          <div className="footer-col">
            <span className="footer-title">Craft & Quality</span>
            <a href="#comparison-section">Our Wood Quality</a>
            <a href="#trust-features-section">Lifetime Warranty</a>
            <a href="#trust-features-section">Fast Shipping</a>
            <a href="#newsletter-section">Timber Guild</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} WoodPeck Artisan Timber Co. • 100% Solid Kiln-Dried Hardwood</span>
      </div>
    </footer>
  )
}
