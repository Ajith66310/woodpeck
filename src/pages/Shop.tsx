import { useState, useEffect } from 'preact/hooks'
import { SignatureCard, SIGNATURE_PRODUCTS } from '../components/home/OurProducts.tsx'
import { TbAdjustmentsHorizontal } from 'react-icons/tb'
import { BsChevronDown } from 'react-icons/bs'

import bannerAll from '../assets/banner/banner-all.jpg'
import bannerFurniture from '../assets/banner/banner-furniture.jpg'
import bannerDecor from '../assets/banner/banner-decor.jpg'
import bannerKitchen from '../assets/banner/banner-kitchen.jpg'

interface ShopPageProps {
  initialCategory?: string
}

const CATEGORIES = [
  { key: '', label: 'All Products' },
  { key: 'furniture', label: 'Furniture' },
  { key: 'decor', label: 'Home Decor' },
  { key: 'kitchen', label: 'Kitchen & Utensils' },
]

const CATEGORY_BANNERS: Record<string, { image: string; alt: string }> = {
  '': {
    image: bannerAll,
    alt: 'Shop Now - Everything You Love, All in One Place!',
  },
  furniture: {
    image: bannerFurniture,
    alt: 'Furniture - Timeless Comfort, Crafted in Solid Wood',
  },
  decor: {
    image: bannerDecor,
    alt: 'Home Decor - Artisan Accents for Warm Living Spaces',
  },
  kitchen: {
    image: bannerKitchen,
    alt: 'Kitchen & Utensils - Handcrafted Cutting Boards & Dining Essentials',
  },
}

const SORT_OPTIONS = [
  { key: 'featured', label: 'Featured' },
  { key: 'name-az', label: 'Name: A → Z' },
  { key: 'name-za', label: 'Name: Z → A' },
  { key: 'category', label: 'By Category' },
]

function sortProducts(products: typeof SIGNATURE_PRODUCTS, sortKey: string) {
  const arr = [...products]
  switch (sortKey) {
    case 'name-az':
      return arr.sort((a, b) => a.name.localeCompare(b.name))
    case 'name-za':
      return arr.sort((a, b) => b.name.localeCompare(a.name))
    case 'category':
      return arr.sort((a, b) => a.category.localeCompare(b.category))
    default:
      return arr
  }
}

export function ShopPage({ initialCategory }: ShopPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory ?? '')
  const [sortKey, setSortKey] = useState('featured')
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)

  useEffect(() => {
    setSelectedCategory(initialCategory ?? '')
  }, [initialCategory])

  // Close dropdowns on outside clicks
  useEffect(() => {
    const close = () => { setSortOpen(false) }
    if (sortOpen) document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [sortOpen])

  const filtered = selectedCategory
    ? SIGNATURE_PRODUCTS.filter((p) => p.category === selectedCategory)
    : SIGNATURE_PRODUCTS

  const products = sortProducts(filtered, sortKey)

  const activeCatLabel = CATEGORIES.find((c) => c.key === selectedCategory)?.label ?? 'All Products'
  const activeSortLabel = SORT_OPTIONS.find((s) => s.key === sortKey)?.label ?? 'Featured'
  const currentBanner = CATEGORY_BANNERS[selectedCategory] ?? CATEGORY_BANNERS['']

  return (
    <div className="page shop-page wood-store-shop">

      {/* ── Category Banner Poster Card ── */}
      {currentBanner && (
        <div className="shop-category-banner-card">
          <img
            key={selectedCategory}
            src={currentBanner.image}
            alt={currentBanner.alt}
            className="shop-category-banner-img"
          />
        </div>
      )}

      {/* ── Filter & Sort Toolbar ── */}
      <div className="shop-toolbar">
        {/* Filter By pill — left */}
        <button
          type="button"
          className={`shop-toolbar-pill ${selectedCategory ? 'has-filter' : ''}`}
          onClick={() => setFilterOpen(true)}
          aria-label="Filter products"
        >
          <TbAdjustmentsHorizontal size={16} />
          <span>Filter By</span>
          {selectedCategory && <span className="shop-toolbar-badge">1</span>}
        </button>

        {/* Sort By pill — right */}
        <div className="shop-sort-wrap" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="shop-toolbar-pill"
            onClick={() => setSortOpen(!sortOpen)}
            aria-label="Sort products"
          >
            <span>Sort By</span>
            <BsChevronDown
              size={12}
              style={{ transform: sortOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
            />
          </button>

          {sortOpen && (
            <div className="shop-sort-dropdown">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  className={`shop-sort-option ${sortKey === opt.key ? 'active' : ''}`}
                  onClick={() => { setSortKey(opt.key); setSortOpen(false) }}
                >
                  {sortKey === opt.key && (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Results count ── */}
      <div className="shop-results-header">
        <span className="shop-results-title">{activeCatLabel}</span>
        <span className="shop-results-count">{products.length} products</span>
      </div>

      {/* ── Product Grid ── */}
      <div className="shop-products-wrap">
        {products.length > 0 ? (
          <div className="signature-products-grid">
            {products.map((prod) => (
              <SignatureCard key={prod.id} product={prod} />
            ))}
          </div>
        ) : (
          <div className="shop-empty-state">
            <p>No products found.</p>
          </div>
        )}
      </div>

      {/* ── Filter Bottom Sheet ── */}
      {filterOpen && (
        <>
          <div className="shop-filter-backdrop" onClick={() => setFilterOpen(false)} />
          <div className="shop-filter-sheet">
            <div className="shop-filter-sheet-header">
              <span className="shop-filter-sheet-title">Filter By</span>
              <button
                type="button"
                className="shop-filter-sheet-close"
                onClick={() => setFilterOpen(false)}
                aria-label="Close filter"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="shop-filter-section">
              <p className="shop-filter-section-label">CATEGORY</p>
              <div className="shop-filter-options">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.key}
                    type="button"
                    className={`shop-filter-option-row ${selectedCategory === cat.key ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat.key)}
                  >
                    <span className={`shop-filter-radio ${selectedCategory === cat.key ? 'checked' : ''}`} />
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="shop-filter-sheet-footer">
              <button
                type="button"
                className="shop-filter-clear-btn"
                onClick={() => { setSelectedCategory(''); setFilterOpen(false) }}
              >
                Clear All
              </button>
              <button
                type="button"
                className="shop-filter-apply-btn"
                onClick={() => setFilterOpen(false)}
              >
                Show {filtered.length} Products
              </button>
            </div>
          </div>
        </>
      )}

    </div>
  )
}
