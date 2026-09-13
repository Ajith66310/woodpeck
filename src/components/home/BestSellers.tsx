import { useState } from 'preact/hooks'
import { PRODUCTS_CATALOG } from '../../services/productData.ts'
import type { Product } from '../../types/index.ts'
import { Button } from '../common/Button.tsx'
import { Badge } from '../common/Badge.tsx'

interface BestSellersProps {
  onAddToCart?: (product: Product) => void
}

export function BestSellers({ onAddToCart }: BestSellersProps) {
  const [addedId, setAddedId] = useState<string | null>(null)
  const bestSellers = PRODUCTS_CATALOG.filter((p) => p.isBestSeller).slice(0, 3)

  const handleAdd = (product: Product) => {
    setAddedId(product.id)
    if (onAddToCart) onAddToCart(product)
    setTimeout(() => {
      setAddedId((curr) => (curr === product.id ? null : curr))
    }, 2000)
  }

  return (
    <section id="best-sellers-section" className="home-section best-sellers-section">
      <div className="section-header-wrap">
        <div className="section-eyebrow">
          <Badge variant="warning">Top Rated by Customers</Badge>
          <span className="eyebrow-text">Selling Fast • Limited Kiln Batches</span>
        </div>
        <h2 className="section-main-title">Best Selling Wood Crafts</h2>
        <p className="section-main-subtitle">
          The most coveted solid hardwood pieces crafted in our artisan timber studio this season.
        </p>
      </div>

      <div className="bestsellers-layout">
        {bestSellers.map((item, index) => {
          const isAdded = addedId === item.id
          return (
            <div key={item.id} className={`bestseller-card rank-${index + 1}`}>
              <div className="bestseller-rank-badge">
                <span className="rank-num">#{index + 1}</span>
                <span className="rank-label">Bestseller</span>
              </div>

              <div className="bestseller-image-wrapper">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="bestseller-img"
                />
                <span className="bestseller-wood-pill">{item.woodSpecies}</span>
              </div>

              <div className="bestseller-details">
                <div className="bestseller-review-strip">
                  <div className="stars">{'★'.repeat(5)}</div>
                  <span className="score">{item.rating}</span>
                  <span className="count">({item.reviewsCount} verified reviews)</span>
                </div>

                <h3 className="bestseller-title">{item.name}</h3>
                <p className="bestseller-desc">{item.description}</p>

                <div className="bestseller-perks">
                  <div className="perk-tag">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Kiln-Dried 6-8%
                  </div>
                  <div className="perk-tag">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Lifetime Warranty
                  </div>
                </div>

                <div className="bestseller-cta-bar">
                  <div className="bestseller-pricing">
                    <span className="price-tag">${item.price}</span>
                    {item.originalPrice && (
                      <span className="discount-cut">${item.originalPrice}</span>
                    )}
                  </div>

                  <Button
                    variant={isAdded ? 'secondary' : 'primary'}
                    size="md"
                    onClick={() => handleAdd(item)}
                    className="bestseller-buy-btn"
                  >
                    {isAdded ? '✓ Added' : 'Claim Yours →'}
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
