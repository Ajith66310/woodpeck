export function AboutPage() {
  return (
    <div className="page about-page">
      <div className="about-hero">
        <h1 className="about-hero-title">About WoodPeck</h1>
        <p className="about-hero-sub">Crafted with love. Built to last.</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2 className="about-section-title">Our Story</h2>
          <p className="about-section-text">
            WoodPeck was born from a deep passion for natural materials and timeless craftsmanship.
            Every piece we create tells the story of skilled hands, responsibly sourced wood,
            and a commitment to quality that endures generations.
          </p>
        </section>

        <section className="about-section">
          <h2 className="about-section-title">Our Mission</h2>
          <p className="about-section-text">
            We believe your home deserves the best. Our mission is to bring
            handcrafted wooden furniture, décor, and kitchen pieces into everyday
            living — making beauty accessible without compromising on sustainability
            or quality.
          </p>
        </section>

        <section className="about-section">
          <h2 className="about-section-title">Why WoodPeck?</h2>
          <ul className="about-values-list">
            <li className="about-value-item">
              <span className="about-value-icon">🌿</span>
              <div>
                <strong>Sustainably Sourced</strong>
                <p>We work only with responsibly harvested wood — certified and eco-conscious.</p>
              </div>
            </li>
            <li className="about-value-item">
              <span className="about-value-icon">🪵</span>
              <div>
                <strong>Handcrafted Quality</strong>
                <p>Every item is shaped and finished by skilled artisans with decades of experience.</p>
              </div>
            </li>
            <li className="about-value-item">
              <span className="about-value-icon">✨</span>
              <div>
                <strong>Timeless Design</strong>
                <p>We blend Scandinavian minimalism with natural aesthetics for a look that never ages.</p>
              </div>
            </li>
            <li className="about-value-item">
              <span className="about-value-icon">💚</span>
              <div>
                <strong>Chemical-Free Finishes</strong>
                <p>All our products use natural oils, beeswax, and food-safe treatments.</p>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}
