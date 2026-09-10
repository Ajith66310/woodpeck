import { useState } from 'preact/hooks'
import { Card } from '../components/common/Card.tsx'
import { Button } from '../components/common/Button.tsx'
import { Badge } from '../components/common/Badge.tsx'

export function ComponentsShowcase() {
  const [clickedTimes, setClickedTimes] = useState(0)
  const [inputText, setInputText] = useState('')

  return (
    <div className="page showcase-page">
      <div className="page-header">
        <Badge variant="brand">Design System</Badge>
        <h1 className="page-title">Reusable UI Components</h1>
        <p className="page-subtitle">
          Demonstrating predefined styles, consistent tokens, and modular components in <code>src/components/common/</code>.
        </p>
      </div>

      <div className="showcase-grid">
        {/* Buttons */}
        <Card title="Buttons" subtitle="Variants and sizing" glow>
          <div className="showcase-group">
            <span className="group-label">Variants:</span>
            <div className="button-row">
              <Button variant="primary" onClick={() => setClickedTimes((n) => n + 1)}>
                Primary
              </Button>
              <Button variant="secondary" onClick={() => setClickedTimes((n) => n + 1)}>
                Secondary
              </Button>
              <Button variant="outline" onClick={() => setClickedTimes((n) => n + 1)}>
                Outline
              </Button>
              <Button variant="ghost" onClick={() => setClickedTimes((n) => n + 1)}>
                Ghost
              </Button>
            </div>
          </div>

          <div className="showcase-group">
            <span className="group-label">Sizes:</span>
            <div className="button-row">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          <div className="showcase-group">
            <span className="group-label">State:</span>
            <div className="button-row">
              <Button disabled>Disabled</Button>
              <span className="click-feedback">
                Total clicks across buttons: <strong>{clickedTimes}</strong>
              </span>
            </div>
          </div>
        </Card>

        {/* Badges */}
        <Card title="Badges" subtitle="Status and contextual indicators">
          <div className="badge-row">
            <Badge variant="brand">Brand Badge</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="neutral">Neutral</Badge>
          </div>
          <p className="component-note">
            Badges are styled with matching translucent backgrounds and distinct accent borders.
          </p>
        </Card>

        {/* Form Inputs & Interactive Cards */}
        <Card title="Interactive Input" subtitle="Two-way reactive binding">
          <div className="input-group">
            <label className="input-label" htmlFor="showcase-input">
              Type something to test state:
            </label>
            <input
              id="showcase-input"
              type="text"
              className="text-input"
              placeholder="e.g. Building an awesome Preact app..."
              value={inputText}
              onInput={(e) => setInputText((e.target as HTMLInputElement).value)}
            />
          </div>
          {inputText ? (
            <div className="preview-card">
              <span className="preview-label">Live Output:</span>
              <p className="preview-text">"{inputText}"</p>
            </div>
          ) : (
            <p className="preview-placeholder">Type in the field above to see reactive state.</p>
          )}
        </Card>

        {/* Cards & Elevations */}
        <Card
          title="Card Container"
          subtitle="Border glow & customizable footer"
          footer={
            <div className="card-footer-content">
              <span>Card Footer Area</span>
              <Button size="sm" variant="ghost">Action</Button>
            </div>
          }
        >
          <p>
            Cards are built with glassmorphic backdrop filters, responsive padding, and optional header/footer slots.
          </p>
        </Card>
      </div>
    </div>
  )
}
