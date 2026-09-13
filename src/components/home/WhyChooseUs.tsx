const FEATURES = [
  { label: '7 DAY REPLACE' },
  { label: '24/7 SUPPORT' },
  { label: 'QUALITY PRODUCTS' },
  { label: 'FREE SHIPPING' },
  { label: 'SAME DAY SHIP' },
  { label: 'ECO FRIENDLY' },
]

export function WhyChooseUs() {
  return (
    <section className="why-choose-section">
      {/* Big heading */}
      <h2 className="why-choose-heading">
        WHY CHOOSE THE<br />
        WOODPECK COLLECTION?
      </h2>

      {/* Brand description */}
      <p className="why-choose-desc">
        <strong>WoodPeck</strong> delivers premium, handcrafted solid wood products
        trusted by thousands of homes. Every piece is designed to last a lifetime,
        crafted from sustainably sourced timber, and finished with food-safe,
        eco-friendly treatments without compromise.
      </p>

      {/* Comparison table */}
      <div className="why-table">
        {/* Table header */}
        <div className="why-table-header">
          <div className="why-col-label" />
          <div className="why-col-brand">WoodPeck</div>
          <div className="why-col-others">Others</div>
        </div>

        {/* Table rows */}
        {FEATURES.map((f) => (
          <div key={f.label} className="why-table-row">
            <div className="why-row-label">{f.label}</div>
            <div className="why-row-brand">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="why-row-others">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
