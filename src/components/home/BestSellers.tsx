import { useEffect, useRef } from 'preact/hooks'
import Swiper from 'swiper'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

import { SignatureCard, SIGNATURE_PRODUCTS } from './OurProducts.tsx'
import type { Product } from '../../types/index.ts'

interface BestSellersProps {
  onAddToCart?: (product: Product) => void
}

export function BestSellers({ onAddToCart: _onAddToCart }: BestSellersProps) {
  const swiperRef = useRef<HTMLDivElement | null>(null)
  const swiperInstanceRef = useRef<Swiper | null>(null)

  useEffect(() => {
    if (!swiperRef.current) return

    swiperInstanceRef.current = new Swiper(swiperRef.current, {
      modules: [Pagination, Autoplay],
      slidesPerView: 2,
      spaceBetween: 10,
      loop: true,
      grabCursor: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: '.bestseller-swiper-pagination',
        clickable: true,
      },
    })

    return () => {
      swiperInstanceRef.current?.destroy(true, true)
    }
  }, [])

  return (
    <section
      id="best-sellers-section"
      className="home-section best-sellers-section"
      aria-label="Best Sellers"
    >
      <div className="bestseller-box-container">
        {/* Section Heading inside the darker box container */}
        <div className="section-header-wrap bestseller-header-wrap">
          <h2 className="section-main-title" style={{ color: '#000000' }}>
            Best Sellers
          </h2>
        </div>

        {/* Swiper Carousel */}
        <div className="bestseller-swiper-container">
          <div ref={swiperRef} className="swiper bestseller-swiper">
            <div className="swiper-wrapper">
              {SIGNATURE_PRODUCTS.map((prod) => (
                <div key={prod.id} className="swiper-slide">
                  <SignatureCard product={prod} />
                </div>
              ))}
            </div>
          </div>

          {/* Swiper Pagination Dots */}
          <div className="bestseller-swiper-pagination" />
        </div>
      </div>
    </section>
  )
}
