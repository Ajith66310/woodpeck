import { WOOD_COMPARISON_ITEMS } from '../../services/productData.ts'
import { Badge } from '../common/Badge.tsx'

export function WoodComparison() {
  return (
    <section id="comparison-section" className="home-section wood-comparison-section">
      <div className="section-header-wrap">
        <div className="section-eyebrow">
          <Badge variant="brand">Quality Standards</Badge>
          <span className="eyebrow-text">Transparency in Craftsmanship</span>
        </div>
        <h2 className="section-main-title">Our Wood vs. Their Wood Quality</h2>
        <p className="section-main-subtitle">
          See why mass-market furniture collapses within years, while WoodPeck solid timber pieces become family heirlooms for generations.
        </p>
      </div>

      {/* Comparison Table / Matrix */}
      <div className="comparison-table-wrapper">
        <div className="comparison-table-header">
          <div className="col-header col-feature">
            <span>Quality Criteria</span>
          </div>

          <div className="col-header col-our-wood">
            <div className="brand-wood-badge">
              <span className="tick-icon-badge">✔</span>
              <span>Our Wood (WoodPeck)</span>
            </div>
            <span className="subhead">100% Solid Kiln-Dried Hardwood</span>
          </div>

          <div className="col-header col-their-wood">
            <div className="competitor-wood-badge">
              <span className="cross-icon-badge">✕</span>
              <span>Their Wood (Standard Market)</span>
            </div>
            <span className="subhead">Composite Particleboard & Paper Veneer</span>
          </div>
        </div>

        <div className="comparison-table-body">
          {WOOD_COMPARISON_ITEMS.map((item, index) => (
            <div key={index} className="comparison-row">
              <div className="cell-feature">
                <div className="feature-name">{item.feature}</div>
                <div className="feature-desc">{item.description}</div>
              </div>

              <div className="cell-our-wood">
                <div className="cell-status-line">
                  <div className="status-mark tick-mark" aria-label="Checked - Superior Quality">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <strong className="status-title">{item.ourWood.title}</strong>
                </div>
                <p className="status-detail">{item.ourWood.detail}</p>
              </div>

              <div className="cell-their-wood">
                <div className="cell-status-line">
                  <div className="status-mark cross-mark" aria-label="Crossed - Inferior Quality">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </div>
                  <strong className="status-title">{item.theirWood.title}</strong>
                </div>
                <p className="status-detail">{item.theirWood.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Guarantee Banner */}
      <div className="wood-guarantee-strip">
        <div className="guarantee-icon">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        </div>
        <div className="guarantee-text">
          <h4>Every Board Backed by Our 50-Year Structural Promise</h4>
          <p>
            If your solid wood furniture bows, cracks, or structurally fails under normal domestic conditions, we will repair or replace it at zero cost.
          </p>
        </div>
      </div>
    </section>
  )
}
