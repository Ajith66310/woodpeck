import { useEffect, useRef } from 'preact/hooks'
import Swiper from 'swiper'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'

import { BANNER_SLIDES } from '../../services/productData.ts'

interface HeroBannerSwiperProps {
  onExploreClick?: () => void
  onSampleClick?: () => void
}

export function HeroBannerSwiper({ onExploreClick }: HeroBannerSwiperProps) {
  const swiperRef = useRef<HTMLDivElement | null>(null)
  const swiperInstanceRef = useRef<Swiper | null>(null)

  // Ensure enough slides for a continuous, seamless infinite loop without rewinding
  const slides = BANNER_SLIDES.length < 4
    ? [...BANNER_SLIDES, ...BANNER_SLIDES.map((s) => ({ ...s, id: `${s.id}-loop` }))]
    : BANNER_SLIDES

  useEffect(() => {
    if (!swiperRef.current) return

    swiperInstanceRef.current = new Swiper(swiperRef.current, {
      modules: [Autoplay],
      slidesPerView: 1,
      loop: true,
      grabCursor: true,
      speed: 650,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
    })

    return () => {
      swiperInstanceRef.current?.destroy(true, true)
    }
  }, [])

  const handleSlideClick = () => {
    if (onExploreClick) {
      onExploreClick()
    } else {
      const el = document.getElementById('our-products-section')
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div
      ref={swiperRef}
      className="swiper hero-swiper-container"
      aria-roledescription="carousel"
      aria-label="WoodPeck Artisan Showcase"
    >
      <div className="swiper-wrapper">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className="swiper-slide hero-slide"
            onClick={handleSlideClick}
            role="button"
            tabIndex={0}
            aria-label={`View ${slide.title}`}
          >
            <img
              src={slide.image}
              alt={`${slide.title} - ${slide.highlight}`}
              className="hero-slide-img"
              loading={idx === 0 ? 'eager' : 'lazy'}
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
