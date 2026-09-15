import { useState, useRef, useEffect } from 'preact/hooks'
import { SIGNATURE_PRODUCTS } from '../home/OurProducts.tsx'
import { PRODUCTS_CATALOG } from '../../services/productData.ts'

export interface SearchProductItem {
  id: string
  name: string
  image: string
  subtitle: string
  category?: string
}

// Build unified catalog for instant fast search
const ALL_SEARCH_PRODUCTS: SearchProductItem[] = [
  ...SIGNATURE_PRODUCTS.map((p) => ({
    id: p.id,
    name: p.name,
    image: p.image,
    subtitle: p.tags.join(' • '),
    category: 'signature',
  })),
  ...PRODUCTS_CATALOG.map((p) => ({
    id: p.id,
    name: p.name,
    image: p.image,
    subtitle: `${p.woodSpecies} • ${p.tag || p.category}`,
    category: p.category,
  })),
]

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  // Filter products based on search query
  const trimmed = query.trim().toLowerCase()
  const results = trimmed
    ? ALL_SEARCH_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.subtitle.toLowerCase().includes(trimmed) ||
          (p.category && p.category.toLowerCase().includes(trimmed))
      )
    : []

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleClear = () => {
    setQuery('')
    setIsOpen(false)
    inputRef.current?.focus()
  }

  return (
    <div ref={containerRef} className="navbar-search-box">
      {/* Search Input Container */}
      <div className="search-input-field-wrap">
        {/* Left Magnifying Glass Icon */}
        <span className="search-icon-left" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>

        {/* Input Text Box */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onInput={(e) => {
            const val = (e.target as HTMLInputElement).value
            setQuery(val)
            setIsOpen(val.trim().length > 0)
          }}
          onFocus={() => {
            if (query.trim().length > 0) {
              setIsOpen(true)
            }
          }}
          placeholder="Search Product.."
          className="search-text-input"
          aria-label="Search products"
          autoComplete="off"
          spellcheck={false}
        />

        {/* Right Clear 'x' Button */}
        {query.length > 0 && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div className="search-dropdown-menu" role="listbox">
          {/* Header Label matching Image 2 */}
          <div className="search-dropdown-header">
            <span>PRODUCTS</span>
          </div>

          {/* Results List */}
          {results.length > 0 ? (
            <div className="search-results-list">
              {results.map((product) => (
                <div
                  key={product.id}
                  className="search-result-row"
                  role="option"
                  tabIndex={0}
                  onClick={() => {
                    // Per user instructions: redirection in result later, only show result now
                    setIsOpen(false)
                  }}
                >
                  <div className="search-result-thumb-wrap">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="search-result-thumb"
                      loading="lazy"
                    />
                  </div>
                  <div className="search-result-text-col">
                    <h4 className="search-result-name">{product.name}</h4>
                    <p className="search-result-specs">{product.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="search-no-results">
              <p>No products found for "{query}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
