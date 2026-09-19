import { useState, useEffect } from 'preact/hooks'
import woodpeckLogo from '../../assets/logo/logo-woodpeck.jpg'
import { SearchBar } from './SearchBar.tsx'
import { RiMenu3Line } from 'react-icons/ri'
import { IoClose, IoChevronDown } from 'react-icons/io5'

type ViewType = 'home' | 'shop' | 'about' | 'contact'

interface NavbarProps {
  currentView?: ViewType
  onNavigateHome?: () => void
  onNavigateShop?: (categoryKey?: string) => void
  onNavigatePage?: (page: ViewType) => void
}

export function Navbar({ currentView = 'home', onNavigateHome, onNavigateShop }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isShopOpen, setIsShopOpen] = useState(false)

  const handleHomeClick = () => {
    setIsOpen(false)
    if (onNavigateHome) onNavigateHome()
    else window.scrollTo({ top: 0, behavior: 'smooth' })
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

  // Keep Shop accordion open when on shop page
  useEffect(() => {
    if (currentView === 'shop') {
      setIsShopOpen(true)
    } else {
      setIsShopOpen(false)
    }
  }, [currentView])

  // Prevent background scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const isHomeActive = currentView === 'home'
  const isShopActive = currentView === 'shop'

  return (
    <>
      <header className="navbar sm-navbar">
        <div className="navbar-container">
          {/* Logo */}
          <a
            href="#"
            className="navbar-brand"
            aria-label="WoodPeck Home"
            onClick={(e) => { e.preventDefault(); handleHomeClick() }}
          >
            <img src={woodpeckLogo} alt="WoodPeck" className="navbar-logo-img" />
          </a>

          {/* Search Bar */}
          <SearchBar />

          {/* Menu Toggle */}
          <button
            type="button"
            className="navbar-menu-toggle"
            onClick={() => setIsOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
          >
            <RiMenu3Line size={30} />
          </button>
        </div>
      </header>

      {/* Backdrop */}
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
        {/* Top bar */}
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
            <IoClose size={26} />
          </button>
        </div>

        {/* Nav Links */}
        <div className="sidebar-nav-menu">

          {/* Home */}
          <button
            type="button"
            className={`sidebar-nav-link ${isHomeActive ? 'active' : ''}`}
            onClick={handleHomeClick}
          >
            <span>Home</span>
          </button>

          {/* Shop — accordion */}
          <div className="sidebar-shop-accordion">
            <button
              type="button"
              className={`sidebar-nav-link sidebar-shop-btn ${isShopOpen ? 'open' : ''} ${isShopActive ? 'active' : ''}`}
              onClick={() => setIsShopOpen(!isShopOpen)}
            >
              <span>Shop</span>
              <IoChevronDown
                size={18}
                className={`shop-chevron-icon ${isShopOpen ? 'rotated' : ''}`}
              />
            </button>

            {isShopOpen && (
              <div className="sidebar-sub-menu">
                <button
                  type="button"
                  className="sidebar-sub-link"
                  onClick={() => handleCategoryClick('')}
                >
                  <span>All</span>
                </button>
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
                  <span>Kitchen &amp; Utensils</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </aside>
    </>
  )
}
