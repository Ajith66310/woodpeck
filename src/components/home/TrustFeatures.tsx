export function TrustFeatures() {
  const trustList = [
    {
      id: 'fast-shipping',
      title: 'Fast Shipping',
      subtitle: 'Doorstep delivery',
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13"></rect>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
          <circle cx="5.5" cy="18.5" r="2.5"></circle>
          <circle cx="18.5" cy="18.5" r="2.5"></circle>
        </svg>
      )
    },
    {
      id: 'price-match',
      title: 'Price-match guarantee',
      subtitle: 'Safe money when ordering with us',
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <polyline points="9 12 11 14 15 10"></polyline>
        </svg>
      )
    },
    {
      id: 'hassle-free-exchange',
      title: 'Hassle-free exchange',
      subtitle: 'T&C Apply',
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 4 23 10 17 10"></polyline>
          <polyline points="1 20 1 14 7 14"></polyline>
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
        </svg>
      )
    },
    {
      id: 'five-star-reviews',
      title: '5 Star Reviews',
      subtitle: 'Customer satisfaction No.1 priority',
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" stroke="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
        </svg>
      )
    }
  ]

  return (
    <section id="trust-features-section" className="home-section trust-features-section">
      <div className="trust-features-grid">
        {trustList.map((item) => (
          <div key={item.id} className="trust-card">
            <div className="trust-icon-box">
              {item.icon}
            </div>
            <div className="trust-text-box">
              <h4 className="trust-title">{item.title}</h4>
              <p className="trust-subtitle">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
