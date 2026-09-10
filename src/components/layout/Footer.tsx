export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <p className="footer-brand">Preact + Vite Architecture</p>
          <p className="footer-text">
            Engineered with fast 3kB Preact runtime, clean modular folders, and type-safe development.
          </p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <span className="footer-title">Resources</span>
            <a href="https://preactjs.com/guide/v10/getting-started" target="_blank" rel="noreferrer">
              Preact Guide
            </a>
            <a href="https://preactjs.com/guide/v10/differences-to-react" target="_blank" rel="noreferrer">
              React Differences
            </a>
          </div>
          <div className="footer-col">
            <span className="footer-title">Ecosystem</span>
            <a href="https://vite.dev" target="_blank" rel="noreferrer">
              Vite Documentation
            </a>
            <a href="https://github.com/preactjs/preact" target="_blank" rel="noreferrer">
              Preact GitHub
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Modern Preact Starter • Fully Configured</span>
      </div>
    </footer>
  )
}
