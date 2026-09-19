import { useEffect, useRef } from 'preact/hooks'
import Swiper from 'swiper'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

import { SignatureCard, SIGNATURE_PRODUCTS, type SignatureProduct } from './OurProducts.tsx'
import type { Product } from '../../types/index.ts'

interface BestSellersProps {
  onAddToCart?: (product: Product) => void
  onProductClick?: (product: SignatureProduct) => void
}

export function BestSellers({ onAddToCart: _onAddToCart, onProductClick }: BestSellersProps) {
  const swiperRef = useRef<HTMLDivElement | null>(null)
  const swiperInstanceRef = useRef<Swiper | null>(null)

  useEffect(() => {
    if (!swiperRef.current) return

    swiperInstanceRef.current = new Swiper(swiperRef.current, {
      modules: [Pagination, Autoplay],
      slidesPerView: 2,
      spaceBetween: 10,
      loop: true,
      noSwiping: true,
      noSwipingClass: 'swiper-no-swiping',
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

    swiperInstanceRef.current.on('click', (_swiper, event) => {
      const target = event.target as HTMLElement
      const imageBox = target.closest('.sig-card-image-box') as HTMLElement | null
      if (imageBox) {
        const track = imageBox.querySelector('.sig-card-image-track') as HTMLElement | null
        const dots = imageBox.querySelectorAll('.sig-dot')
        if (track) {
          const currentIdx = imageBox.getAttribute('data-active-idx') === '1' ? 1 : 0
          const nextIdx = currentIdx === 0 ? 1 : 0
          imageBox.setAttribute('data-active-idx', String(nextIdx))
          track.style.transform = nextIdx === 0 ? 'translateX(0%)' : 'translateX(-50%)'
          dots.forEach((dot, dIdx) => {
            if (dIdx === nextIdx) {
              dot.classList.add('active')
            } else {
              dot.classList.remove('active')
            }
          })
        }
      }
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
                  <SignatureCard product={prod} onProductClick={onProductClick} />
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
