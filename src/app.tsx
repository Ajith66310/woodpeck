import { useState, useEffect } from 'preact/hooks'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { Navbar } from './components/layout/Navbar.tsx'
import { Footer } from './components/layout/Footer.tsx'
import { Home } from './pages/Home.tsx'

export function App() {
  const [viewportWidth, setViewportWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 390
  )

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <ThemeProvider>
      {/* 1. Displayed ONLY on MD & LG screens to hide the website as requested */}
      <div className="desktop-blocked-screen" role="region" aria-label="Desktop screen notice">
        <div className="desktop-blocked-card">
          <div className="blocked-icon-bubble">
            <svg viewBox="0 0 24 24" width="46" height="46" fill="none" stroke="#b45309" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="3" ry="3"></rect>
              <line x1="12" y1="18" x2="12.01" y2="18"></line>
            </svg>
          </div>

          <div className="blocked-badge-row">
            <span className="blocked-pill">Mobile SM Screen Only</span>
          </div>

          <h2 className="blocked-heading">WoodPeck Artisan Studio</h2>
          <p className="blocked-description">
            This store is designed exclusively for small mobile screens (SM).
            The website is hidden on medium (md) and large (lg) desktop viewports.
          </p>

          <div className="blocked-viewport-stat">
            <span className="stat-label">Current Screen Width:</span>
            <span className="stat-value">{viewportWidth}px</span>
            <span className="stat-hint">Required: ≤ 640px</span>
          </div>

          <div className="blocked-instructions">
            <h4>How to view on your computer:</h4>
            <ul>
              <li><strong>Resize Window:</strong> Drag browser window width below 640px</li>
              <li><strong>Device Mode:</strong> Press <kbd>F12</kbd> then <kbd>Ctrl+Shift+M</kbd></li>
              <li><strong>Mobile:</strong> Open on any smartphone (iPhone, Samsung, etc.)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 2. Main Mobile Website (Visible ONLY on SM small screens) */}
      <div className="app-wrapper sm-app-wrapper">
        <Navbar />

        <main className="main-content">
          <Home />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  )
}
