import { ThemeProvider } from './context/ThemeContext.tsx'
import { Navbar } from './components/layout/Navbar.tsx'
import { Footer } from './components/layout/Footer.tsx'
import { Home } from './pages/Home.tsx'

export function App() {
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
        <Navbar />

        <main className="main-content">
          <Home />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  )
}
