export function TrustFeatures() {
  const trustList = [
    {
      id: 'fast-shipping',
      title: 'Fast Shipping',
      subtitle: 'Doorstep delivery',
      icon: (
        /* 3D Cube / Box icon — matches screenshot */
        <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
    },
    {
      id: 'price-match',
      title: 'Price-match guarantee',
      subtitle: 'Safe money when ordering with us',
      icon: (
        /* Vertical sliders / equalizer icon — matches screenshot */
        <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="21" x2="4" y2="14" />
          <line x1="4" y1="10" x2="4" y2="3" />
          <line x1="12" y1="21" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12" y2="3" />
          <line x1="20" y1="21" x2="20" y2="16" />
          <line x1="20" y1="12" x2="20" y2="3" />
          <line x1="1" y1="14" x2="7" y2="14" />
          <line x1="9" y1="8" x2="15" y2="8" />
          <line x1="17" y1="16" x2="23" y2="16" />
        </svg>
      ),
    },
    {
      id: 'hassle-free-exchange',
      title: 'Hassle-free exchange',
      subtitle: 'T&C Apply',
      icon: (
        /* Two overlapping speech bubbles — matches screenshot */
        <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M17 8H3" />
          <path d="M17 12H7" />
        </svg>
      ),
    },
    {
      id: 'five-star-reviews',
      title: '5 Star Reviews',
      subtitle: 'Customer satisfaction No.1 priority',
      icon: (
        /* Star outline — matches screenshot */
        <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
  ]

  return (
    <section id="trust-features-section" className="trust-features-section">
      <div className="trust-features-grid">
        {trustList.map((item) => (
          <div key={item.id} className="trust-card">
            <div className="trust-icon-box">{item.icon}</div>
            <h4 className="trust-title">{item.title}</h4>
            <p className="trust-subtitle">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
