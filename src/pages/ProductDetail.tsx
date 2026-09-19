import { useState, useRef } from 'preact/hooks'
import type { SignatureProduct } from '../components/home/OurProducts.tsx'
import { IoChevronBack, IoChevronForward, IoShareOutline } from 'react-icons/io5'

interface ProductDetailPageProps {
  product: SignatureProduct
}

const CATEGORY_NAMES: Record<string, string> = {
  furniture: 'Furniture',
  decor: 'Home Decor',
  kitchen: 'Kitchen & Utensils',
}

export function ProductDetailPage({ product }: ProductDetailPageProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0)

  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  // 2 product images: green studio view and natural light view
  const images = [
    { src: product.greenImage, label: 'Studio Green View' },
    { src: product.image, label: 'Natural Light View' },
  ]

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current
      if (diff > 35) {
        handleNext()
      } else if (diff < -35) {
        handlePrev()
      }
    }
    touchStartX.current = null
    touchEndX.current = null
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `WoodPeck - ${product.name}`,
          text: `Check out the ${product.name} from WoodPeck: ${product.description}`,
          url: window.location.href,
        })
      } catch {
        // user cancelled or share failed - do not copy to clipboard
      }
    }
  }

  const phoneNumber = '918590123072'
  const waMessage = `Hello WoodPeck! 🪵\nI would like to inquire / order:\n\n*Product:* ${product.name}\n*Category:* ${CATEGORY_NAMES[product.category] ?? product.category}\n*Tags:* ${product.tags.join(' | ')}\n*Details:* ${product.description}\n\nPlease share pricing and availability. Thank you!`
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(waMessage)}`

  return (
    <div className="page product-detail-page">
      <div className="pdp-content-wrap">
        {/* ── Main Gallery Image Card (NO search button in image) ── */}
        <div
          className="pdp-main-image-card"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            key={activeIdx}
            src={images[activeIdx].src}
            alt={`${product.name} - ${images[activeIdx].label}`}
            className="pdp-main-img"
          />

          {/* Left / Right Chevron Navigation */}
          <button
            type="button"
            className="pdp-nav-chevron pdp-nav-prev"
            onClick={handlePrev}
            aria-label="Previous image"
          >
            <IoChevronBack size={18} />
          </button>
          <button
            type="button"
            className="pdp-nav-chevron pdp-nav-next"
            onClick={handleNext}
            aria-label="Next image"
          >
            <IoChevronForward size={18} />
          </button>
        </div>

        {/* ── Thumbnails Row (NO floating WhatsApp badge) ── */}
        <div className="pdp-thumbnails-row">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              className={`pdp-thumb-card ${activeIdx === idx ? 'active' : ''}`}
              onClick={() => setActiveIdx(idx)}
              aria-label={`View ${img.label}`}
            >
              <img src={img.src} alt={`Thumbnail ${idx + 1}`} className="pdp-thumb-img" />
            </button>
          ))}
        </div>

        {/* ── Title & Share Row ── */}
        <div className="pdp-title-row">
          <h1 className="pdp-product-title">{product.name}</h1>
          <button
            type="button"
            className="pdp-share-btn"
            onClick={handleShare}
            aria-label="Share product"
          >
            <IoShareOutline size={20} />
          </button>
        </div>

        {/* ── Tags / Capsules ── */}
        <div className="pdp-tags-row">
          {product.tags.map((tag) => (
            <span key={tag} className="pdp-tag-capsule">
              {tag}
            </span>
          ))}
        </div>

        {/* ── Description ── */}
        <div className="pdp-section pdp-desc-section">
          <h2 className="pdp-section-heading">Description</h2>
          <p className="pdp-desc-text">{product.description}</p>
        </div>

        {/* ── Specifications ── */}
        <div className="pdp-section pdp-specs-section">
          <h2 className="pdp-section-heading">Craftsmanship & Specifications</h2>
          <div className="pdp-specs-grid">
            <div className="pdp-spec-item">
              <span className="pdp-spec-label">Material</span>
              <span className="pdp-spec-val">100% Solid Kiln-Dried Hardwood</span>
            </div>
            <div className="pdp-spec-item">
              <span className="pdp-spec-label">Finish</span>
              <span className="pdp-spec-val">Zero-VOC Organic Hardwax Oil</span>
            </div>
            <div className="pdp-spec-item">
              <span className="pdp-spec-label">Origin</span>
              <span className="pdp-spec-val">Handcrafted Artisan Studio</span>
            </div>
            <div className="pdp-spec-item">
              <span className="pdp-spec-label">Care</span>
              <span className="pdp-spec-val">Wipe with damp cloth, re-oil yearly</span>
            </div>
          </div>
        </div>

        {/* ── WhatsApp Action Button (Card Color: #25D366) ── */}
        <div className="pdp-whatsapp-btn-wrap">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pdp-whatsapp-btn"
            aria-label={`Order ${product.name} on WhatsApp`}
          >
            <svg
              className="sig-whatsapp-icon"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="currentColor"
            >
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.34C9.36 7.34 9.09 7.4 8.87 7.65C8.65 7.89 8.02 8.48 8.02 9.7C8.02 10.92 8.91 12.09 9.03 12.26C9.16 12.42 10.77 14.91 13.23 15.97C13.82 16.22 14.27 16.37 14.63 16.49C15.22 16.67 15.76 16.65 16.19 16.58C16.67 16.51 17.66 15.98 17.87 15.4C18.07 14.81 18.07 14.31 18.01 14.21C17.95 14.1 17.79 14.04 17.55 13.92C17.3 13.8 16.09 13.21 15.86 13.13C15.64 13.04 15.48 13 15.31 13.24C15.15 13.49 14.68 14.04 14.53 14.21C14.39 14.37 14.25 14.39 14.01 14.27C13.76 14.15 12.98 13.89 12.05 13.06C11.33 12.42 10.84 11.62 10.7 11.38C10.57 11.13 10.69 11 10.81 10.88C10.92 10.77 11.06 10.59 11.18 10.44C11.3 10.3 11.34 10.19 11.42 10.03C11.5 9.86 11.46 9.72 11.4 9.6C11.34 9.48 10.87 8.33 10.68 7.85C10.49 7.39 10.3 7.45 10.15 7.44C10 7.44 9.83 7.44 9.67 7.44L9.53 7.34Z" />
            </svg>
            <span>Order via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  )
}
