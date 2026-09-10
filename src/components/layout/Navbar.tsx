import { useTheme } from '../../hooks/useTheme.ts'
import type { NavTab } from '../../types/index.ts'
import { Badge } from '../common/Badge.tsx'

interface NavbarProps {
  currentTab: NavTab
  onTabChange: (tab: NavTab) => void
}

export function Navbar({ currentTab, onTabChange }: NavbarProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="brand-icon">
            <svg viewBox="0 0 256 256" width="28" height="28" fill="none">
              <ellipse
                cx="128"
                cy="128"
                rx="110"
                ry="44"
                transform="rotate(30 128 128)"
                stroke="#673ab8"
                strokeWidth="16"
              />
              <ellipse
                cx="128"
                cy="128"
                rx="110"
                ry="44"
                transform="rotate(90 128 128)"
                stroke="#673ab8"
                strokeWidth="16"
              />
              <ellipse
                cx="128"
                cy="128"
                rx="110"
                ry="44"
                transform="rotate(150 128 128)"
                stroke="#673ab8"
                strokeWidth="16"
              />
              <circle cx="128" cy="128" r="22" fill="#673ab8" />
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-title">Preact</span>
            <span className="brand-subtitle">App Framework</span>
          </div>
          <Badge variant="brand" className="brand-badge">
            v10.29
          </Badge>
        </div>

        <nav className="navbar-nav">
          <button
            type="button"
            className={`nav-link ${currentTab === 'overview' ? 'active' : ''}`}
            onClick={() => onTabChange('overview')}
          >
            Overview
          </button>
          <button
            type="button"
            className={`nav-link ${currentTab === 'structure' ? 'active' : ''}`}
            onClick={() => onTabChange('structure')}
          >
            Folder Architecture
          </button>
          <button
            type="button"
            className={`nav-link ${currentTab === 'components' ? 'active' : ''}`}
            onClick={() => onTabChange('components')}
          >
            UI Kit
          </button>
        </nav>

        <div className="navbar-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle dark/light theme"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          <a
            href="https://preactjs.com"
            target="_blank"
            rel="noreferrer"
            className="external-link-btn"
          >
            Docs ↗
          </a>
        </div>
      </div>
    </header>
  )
}
