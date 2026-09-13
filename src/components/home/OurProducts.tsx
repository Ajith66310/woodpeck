import { useState } from 'preact/hooks'
import { PRODUCTS_CATALOG } from '../../services/productData.ts'
import type { Product } from '../../types/index.ts'
import { Button } from '../common/Button.tsx'
import { Badge } from '../common/Badge.tsx'

interface OurProductsProps {
  onAddToCart?: (product: Product) => void
}

export function OurProducts({ onAddToCart }: OurProductsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [addedProductId, setAddedProductId] = useState<string | null>(null)

  const categories = [
    { id: 'all', label: 'All Collections' },
    { id: 'tables', label: 'Dining Tables' },
    { id: 'seating', label: 'Chairs & Seating' },
    { id: 'panels', label: 'Acoustic Slats' },
    { id: 'kitchenware', label: 'Kitchen & Boards' }
  ]

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS_CATALOG
    : PRODUCTS_CATALOG.filter((p) => p.category === selectedCategory)

  const handleAdd = (product: Product) => {
    setAddedProductId(product.id)
    if (onAddToCart) onAddToCart(product)
    setTimeout(() => {
      setAddedProductId((current) => (current === product.id ? null : current))
    }, 2200)
  }

  return (
    <section id="our-products-section" className="home-section our-products-section">
      <div className="section-header-wrap">
        <div className="section-eyebrow">
          <Badge variant="brand">Handcrafted Selection</Badge>
          <span className="eyebrow-text">100% Solid Timber Guaranteed</span>
        </div>
        <h2 className="section-main-title">Our Signature Products</h2>
        <p className="section-main-subtitle">
          Each piece is individually selected, sustainably harvested, and precision kiln-dried to resist seasonal humidity shifts.
        </p>

        {/* Category Pills */}
        <div className="category-tabs-row" role="tablist">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat.id}
              className={`category-tab-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.map((product) => {
          const isAdded = addedProductId === product.id
          return (
            <article key={product.id} className="product-card">
              <div className="product-image-box">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="product-img"
                />
                {product.tag && (
                  <span className="product-floating-tag">
                    {product.tag}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="product-discount-pill">
                    Save ${product.originalPrice - product.price}
                  </span>
                )}
              </div>

              <div className="product-body">
                <div className="product-species-badge">
                  <span className="wood-dot"></span>
                  <span>{product.woodSpecies}</span>
                </div>

                <h3 className="product-title">{product.name}</h3>

                <p className="product-description">{product.description}</p>

                {product.dimensions && (
                  <div className="product-dim">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                    <span>{product.dimensions}</span>
                  </div>
                )}

                <div className="product-rating-row">
                  <div className="star-rating">
                    {'★'.repeat(5)}
                    <span className="rating-score">{product.rating}</span>
                  </div>
                  <span className="review-count">({product.reviewsCount} reviews)</span>
                </div>

                <div className="product-footer-row">
                  <div className="price-block">
                    <span className="current-price">${product.price}</span>
                    {product.originalPrice && (
                      <span className="original-price">${product.originalPrice}</span>
                    )}
                  </div>

                  <Button
                    variant={isAdded ? 'secondary' : 'primary'}
                    size="sm"
                    onClick={() => handleAdd(product)}
                    className={`add-cart-btn ${isAdded ? 'added' : ''}`}
                  >
                    {isAdded ? (
                      <>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Added!
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                          <line x1="3" y1="6" x2="21" y2="6"></line>
                          <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                        Add to Cart
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
