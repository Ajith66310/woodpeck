import { useState } from 'preact/hooks'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { Navbar } from './components/layout/Navbar.tsx'
import { Footer } from './components/layout/Footer.tsx'
import { Home } from './pages/Home.tsx'
import { ShopPage } from './pages/Shop.tsx'

export function App() {
  const [currentView, setCurrentView] = useState<'home' | 'shop'>('home')
  const [shopCategory, setShopCategory] = useState<string | undefined>(undefined)

  const handleNavigateHome = () => {
    setCurrentView('home')
    setShopCategory(undefined)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNavigateShop = (categoryKey?: string) => {
    setCurrentView('shop')
    setShopCategory(categoryKey)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <ThemeProvider>
      {/* Displayed ONLY on MD & LG screens */}
      <div className="desktop-blocked-screen">
        <p className="desktop-blocked-text">
          This website is only available in mobile screens
        </p>
      </div>

      {/* Main Mobile Website (Visible ONLY on SM small screens) */}
      <div className="app-wrapper sm-app-wrapper">
        <Navbar
          onNavigateHome={handleNavigateHome}
          onNavigateShop={handleNavigateShop}
        />

        <main className="main-content">
          {currentView === 'home' ? (
            <Home />
          ) : (
            <ShopPage initialCategory={shopCategory} />
          )}
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  )
}
