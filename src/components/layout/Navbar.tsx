import { useState, useEffect } from 'preact/hooks'
import woodpeckLogo from '../../assets/logo/logo-woodpeck.jpg'
import { SearchBar } from './SearchBar.tsx'

interface NavbarProps {
  onItemClick?: (index: number) => void
  onNavigateHome?: () => void
  onNavigateShop?: (categoryKey?: string) => void
}

export function Navbar({ onItemClick: _onItemClick, onNavigateHome, onNavigateShop }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isShopOpen, setIsShopOpen] = useState(false)

  const handleHomeClick = () => {
    setIsOpen(false)
    if (onNavigateHome) {
      onNavigateHome()
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleCategoryClick = (filterKey: string) => {
    setIsOpen(false)
    if (onNavigateShop) {
      onNavigateShop(filterKey)
    } else {
      const el = document.getElementById('our-products-section')
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
          <a
            href="#"
            className="navbar-brand"
            aria-label="WoodPeck Home"
            onClick={(e) => {
              e.preventDefault()
              handleHomeClick()
            }}
          >
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

      {/* Sidebar Drawer */}
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

        <div className="sidebar-nav-menu">
          <button
            type="button"
            className="sidebar-nav-link"
            onClick={handleHomeClick}
          >
            <span>Home</span>
          </button>

          <div className="sidebar-shop-accordion">
            <button
              type="button"
              className={`sidebar-nav-link sidebar-shop-btn ${isShopOpen ? 'open' : ''}`}
              onClick={() => setIsShopOpen(!isShopOpen)}
            >
              <span>Shop</span>
              <svg
                className={`shop-chevron-icon ${isShopOpen ? 'rotated' : ''}`}
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {isShopOpen && (
              <div className="sidebar-sub-menu">
                <button
                  type="button"
                  className="sidebar-sub-link"
                  onClick={() => handleCategoryClick('furniture')}
                >
                  <span>Furniture</span>
                </button>
                <button
                  type="button"
                  className="sidebar-sub-link"
                  onClick={() => handleCategoryClick('decor')}
                >
                  <span>Home Decor</span>
                </button>
                <button
                  type="button"
                  className="sidebar-sub-link"
                  onClick={() => handleCategoryClick('kitchen')}
                >
                  <span>Kitchen & Utensils</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
