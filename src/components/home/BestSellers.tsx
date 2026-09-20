import { useState, useEffect, useRef } from 'preact/hooks'
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

const getRemainingSeconds = (): number => {
  const CYCLE_MS = 24 * 60 * 60 * 1000
  const STORAGE_KEY = 'woodpeck_deals_timer_start'
  let startTime = 0
  try {
    startTime = Number(localStorage.getItem(STORAGE_KEY))
  } catch {
    startTime = 0
  }
  const now = Date.now()

  if (!startTime || isNaN(startTime) || startTime > now) {
    startTime = now
    try {
      localStorage.setItem(STORAGE_KEY, String(startTime))
    } catch {
      // storage unavailable
    }
  }

  const elapsed = now - startTime
  const elapsedInCycle = elapsed % CYCLE_MS
  const remainingMs = CYCLE_MS - elapsedInCycle
  return Math.floor(remainingMs / 1000)
}

export function BestSellers({ onAddToCart: _onAddToCart, onProductClick }: BestSellersProps) {
  const swiperRef = useRef<HTMLDivElement | null>(null)
  const swiperInstanceRef = useRef<Swiper | null>(null)
  const onProductClickRef = useRef(onProductClick)
  const [remainingSeconds, setRemainingSeconds] = useState<number>(getRemainingSeconds)

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSeconds(getRemainingSeconds())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const hours = Math.floor(remainingSeconds / 3600)
  const minutes = Math.floor((remainingSeconds % 3600) / 60)
  const seconds = remainingSeconds % 60
  const pad = (n: number) => String(n).padStart(2, '0')

  useEffect(() => {
    onProductClickRef.current = onProductClick
  }, [onProductClick])

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
      // If clicked on WhatsApp button, dot indicators, or just swiped image, do not navigate
      if (
        target.closest('.sig-whatsapp-btn') ||
        target.closest('.sig-image-dots') ||
        target.closest('.sig-dot')
      ) {
        return
      }

      const card = target.closest('.sig-product-card') as HTMLElement | null
      if (card) {
        if (card.getAttribute('data-swiped') === 'true') {
          return
        }
        const prodId = card.getAttribute('data-product-id')
        const found = SIGNATURE_PRODUCTS.find((p) => p.id === prodId)
        if (found && onProductClickRef.current) {
          onProductClickRef.current(found)
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
        {/* Deals Header with 13px title and 24-hour countdown capsule */}
        <div className="section-header-wrap bestseller-header-wrap deals-header-wrap">
          <h2 className="deals-heading">Limited Deals</h2>

          <div className="deals-countdown-capsule" aria-label="24-hour deals countdown timer">
            <svg
              className="deals-clock-icon"
              viewBox="0 0 24 24"
              width="13"
              height="13"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <div className="deals-countdown-timer">
              <span className="deals-time-box">{pad(hours)}</span>
              <span className="deals-time-colon">:</span>
              <span className="deals-time-box">{pad(minutes)}</span>
              <span className="deals-time-colon">:</span>
              <span className="deals-time-box">{pad(seconds)}</span>
            </div>
          </div>
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
