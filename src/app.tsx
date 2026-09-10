import { useState } from 'preact/hooks'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { Navbar } from './components/layout/Navbar.tsx'
import { Footer } from './components/layout/Footer.tsx'
import { Home } from './pages/Home.tsx'
import { StructureGuide } from './pages/StructureGuide.tsx'
import { ComponentsShowcase } from './pages/ComponentsShowcase.tsx'
import type { NavTab } from './types/index.ts'

export function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('overview')

  return (
    <ThemeProvider>
      <div className="app-wrapper">
        <Navbar currentTab={currentTab} onTabChange={setCurrentTab} />

        <main className="main-content">
          {currentTab === 'overview' && <Home onNavigate={setCurrentTab} />}
          {currentTab === 'structure' && <StructureGuide />}
          {currentTab === 'components' && <ComponentsShowcase />}
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  )
}
