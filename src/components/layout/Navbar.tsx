import { useState, useEffect } from 'preact/hooks'
import woodpeckLogo from '../../assets/logo/logo-woodpeck.jpg'
import { SearchBar } from './SearchBar.tsx'

interface NavbarProps {
  onItemClick?: (index: number) => void
}

export function Navbar({ onItemClick: _onItemClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Prevent background scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return (
    <>
      <header className="navbar sm-navbar">
        <div className="navbar-container">
          {/* Logo Image in Navbar */}
          <a href="#" className="navbar-brand" aria-label="WoodPeck Home">
            <img src={woodpeckLogo} alt="WoodPeck" className="navbar-logo-img" />
          </a>

          {/* Search Bar placed between Logo and Hamburger */}
          <SearchBar />

          {/* Sidebar Trigger Button (Hamburger) - No border */}
          <button
            type="button"
            className="navbar-menu-toggle"
            onClick={() => setIsOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </header>

      {/* Backdrop Overlay */}
      <div
        className={`sidebar-backdrop ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar Drawer - Only close button remains, completely borderless */}
      <aside
        className={`sidebar-drawer ${isOpen ? 'open' : ''}`}
        aria-label="Mobile Navigation Drawer"
        role="dialog"
        aria-modal="true"
      >
        <div className="sidebar-top-bar">
          <div className="sidebar-brand">
            <img src={woodpeckLogo} alt="WoodPeck" className="sidebar-logo-img" />
          </div>
          <button
            type="button"
            className="sidebar-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <svg
              viewBox="0 0 24 24"
              width="26"
              height="26"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </aside>
    </>
  )
}
