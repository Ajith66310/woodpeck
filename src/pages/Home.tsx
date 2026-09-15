import { useState } from 'preact/hooks'
import { HeroBannerSwiper } from '../components/home/HeroBannerSwiper.tsx'
import { CategoriesSection } from '../components/home/CategoriesSection.tsx'
import { BestSellers } from '../components/home/BestSellers.tsx'
import { OurProducts } from '../components/home/OurProducts.tsx'
import { WhyChooseUs } from '../components/home/WhyChooseUs.tsx'
import { TrustFeatures } from '../components/home/TrustFeatures.tsx'
import { InstagramFeed } from '../components/home/InstagramFeed.tsx'
import type { NavTab, Product } from '../types/index.ts'

interface HomeProps {
  onNavigate?: (tab: NavTab) => void
}

export function Home({ onNavigate: _onNavigate }: HomeProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [cartCount, setCartCount] = useState<number>(0)

  const handleAddToCart = (product: Product) => {
    setCartCount((c) => c + 1)
    setToastMessage(`Added "${product.name}" to your cart`)
    setTimeout(() => {
      setToastMessage(null)
    }, 3200)
  }

  return (
    <div className="page home-page wood-store-home">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="cart-toast-alert" role="alert">
          <div className="toast-icon">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span className="toast-text">{toastMessage}</span>
          <span className="toast-count-pill">{cartCount} in cart</span>
        </div>
      )}

      {/* 1. Hero Section with Banner Swiper */}
      <HeroBannerSwiper
        onExploreClick={() => {
          const el = document.getElementById('our-products-section')
          el?.scrollIntoView({ behavior: 'smooth' })
        }}
        onSampleClick={() => {
          const el = document.getElementById('our-products-section')
          el?.scrollIntoView({ behavior: 'smooth' })
        }}
      />

      <div className="home-sections-wrap">
        {/* 2. Categories */}
        <CategoriesSection />
        
        {/* 3. Best Sellers */}
        <BestSellers onAddToCart={handleAddToCart} />

        {/* 4. Our Signature Products */}
        <OurProducts onAddToCart={handleAddToCart} />

        {/* 5. Trust Features */}
        <TrustFeatures />
        
        {/* 6. Why Choose WoodPeck */}
        <WhyChooseUs />

        {/* 7. Instagram Moments That Matter / Creator Faves */}
        <InstagramFeed />
      </div>
    </div>
  )
}
