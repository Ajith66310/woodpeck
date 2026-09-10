import { useState } from 'preact/hooks'
import { Card } from '../components/common/Card.tsx'
import { Button } from '../components/common/Button.tsx'
import { Badge } from '../components/common/Badge.tsx'
import type { NavTab } from '../types/index.ts'

interface HomeProps {
  onNavigate: (tab: NavTab) => void
}

export function Home({ onNavigate }: HomeProps) {
  const [count, setCount] = useState(0)

  return (
    <div className="page home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-pill">
          <span className="pulsing-dot"></span>
          <span>Preact v10.29 + Vite + TypeScript Ready</span>
        </div>

        <h1 className="hero-title">
          Ultra-Fast Preact Application <br />
          <span className="hero-gradient-text">Structured for Scale</span>
        </h1>

        <p className="hero-description">
          A modern, production-grade folder structure built with Preact's 3kB footprint,
          TypeScript type-safety, reusable UI components, and state management hooks.
        </p>

        <div className="hero-cta-group">
          <Button
            variant="primary"
            size="lg"
            onClick={() => onNavigate('structure')}
          >
            Explore Folder Architecture →
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => onNavigate('components')}
          >
            View UI Components
          </Button>
        </div>

        <div className="hero-metrics">
          <div className="metric-item">
            <span className="metric-value">~3 kB</span>
            <span className="metric-label">Runtime Footprint</span>
          </div>
          <div className="metric-divider"></div>
          <div className="metric-item">
            <span className="metric-value">Instant</span>
            <span className="metric-label">Vite HMR</span>
          </div>
          <div className="metric-divider"></div>
          <div className="metric-item">
            <span className="metric-value">100%</span>
            <span className="metric-label">TypeScript Ready</span>
          </div>
          <div className="metric-divider"></div>
          <div className="metric-item">
            <span className="metric-value">Modular</span>
            <span className="metric-label">Architecture</span>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="features-grid">
        <Card
          title="📁 Organized Directory Architecture"
          subtitle="Clean separation of concerns"
          glow
        >
          <p className="feature-desc">
            Organized into <code>components/</code>, <code>pages/</code>, <code>hooks/</code>, 
            <code>context/</code>, <code>services/</code>, <code>utils/</code>, and <code>types/</code>.
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('structure')}
          >
            Inspect Structure →
          </Button>
        </Card>

        <Card
          title="⚡ Reactive Hook State"
          subtitle="Preact hooks in action"
        >
          <p className="feature-desc">
            Try the interactive counter testing Preact state reactivity:
          </p>
          <div className="counter-widget">
            <span className="counter-display">Current count: <strong>{count}</strong></span>
            <div className="counter-buttons">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setCount((c) => Math.max(0, c - 1))}
              >
                - Dec
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setCount((c) => c + 1)}
              >
                + Inc
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCount(0)}
              >
                Reset
              </Button>
            </div>
          </div>
        </Card>

        <Card
          title="🎨 Theme & Styling System"
          subtitle="Dark & Light mode ready"
        >
          <p className="feature-desc">
            Features an HSL-based CSS token system with smooth transitions, modern cards,
            and automatic theme persistence via localStorage.
          </p>
          <div className="theme-pills">
            <Badge variant="brand">ThemeContext</Badge>
            <Badge variant="info">CSS Variables</Badge>
            <Badge variant="success">Glassmorphism</Badge>
          </div>
        </Card>
      </section>

      {/* Quick Start Guide */}
      <section className="quickstart-section">
        <div className="quickstart-card">
          <h2>Getting Started with this Setup</h2>
          <div className="steps-list">
            <div className="step-item">
              <span className="step-num">1</span>
              <div>
                <h4>Add new pages</h4>
                <p>Create new views in <code>src/pages/YourPage.tsx</code> and route them from <code>src/app.tsx</code>.</p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-num">2</span>
              <div>
                <h4>Create reusable components</h4>
                <p>Add common UI elements to <code>src/components/common/</code> or layout elements to <code>src/components/layout/</code>.</p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-num">3</span>
              <div>
                <h4>State & Hooks</h4>
                <p>Encapsulate logic inside <code>src/hooks/</code> and share app-wide data via <code>src/context/</code>.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
