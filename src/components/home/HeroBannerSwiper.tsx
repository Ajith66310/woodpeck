import { useState, useEffect, useRef } from 'preact/hooks'
import { BANNER_SLIDES } from '../../services/productData.ts'

interface HeroBannerSwiperProps {
  onExploreClick?: () => void
  onSampleClick?: () => void
}

export function HeroBannerSwiper({ onExploreClick }: HeroBannerSwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<number | null>(null)

  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const isDragging = useRef<boolean>(false)

  const slidesCount = BANNER_SLIDES.length

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slidesCount)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slidesCount) % slidesCount)
  }

  // Auto scroll effect
  useEffect(() => {
    if (isPaused) return

    timerRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slidesCount)
    }, 4500)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPaused, slidesCount])

  // Touch handlers for mobile swipe
  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchEndX.current = e.touches[0].clientX
    setIsPaused(true)
  }

  const onTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const onTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current
      if (diff > 35) {
        nextSlide()
      } else if (diff < -35) {
        prevSlide()
      }
    }
    touchStartX.current = null
    touchEndX.current = null
    setTimeout(() => setIsPaused(false), 2500)
  }

  // Mouse drag handlers for desktop/devtools swipe
  const onMouseDown = (e: MouseEvent) => {
    isDragging.current = true
    touchStartX.current = e.clientX
    touchEndX.current = e.clientX
    setIsPaused(true)
  }

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return
    touchEndX.current = e.clientX
  }

  const onMouseUp = () => {
    if (isDragging.current && touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current
      if (diff > 35) {
        nextSlide()
      } else if (diff < -35) {
        prevSlide()
      }
    }
    isDragging.current = false
    touchStartX.current = null
    touchEndX.current = null
    setTimeout(() => setIsPaused(false), 2500)
  }

  const handleSlideClick = () => {
    if (touchStartX.current !== null && touchEndX.current !== null && Math.abs(touchStartX.current - touchEndX.current) > 10) {
      return
    }
    if (onExploreClick) {
      onExploreClick()
    } else {
      const el = document.getElementById('our-products-section')
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div
      className="hero-swiper-container"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={() => {
        if (isDragging.current) onMouseUp()
        setIsPaused(false)
      }}
      aria-roledescription="carousel"
      aria-label="WoodPeck Artisan Showcase"
    >
      <div
        className="hero-swiper-track"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {BANNER_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex
          return (
            <div
              key={slide.id}
              className={`hero-slide ${isActive ? 'active' : ''}`}
              onClick={handleSlideClick}
              role="button"
              tabIndex={isActive ? 0 : -1}
              aria-label={`View ${slide.title}`}
              aria-hidden={!isActive}
            >
              <img
                src={slide.image}
                alt={`${slide.title} - ${slide.highlight}`}
                className="hero-slide-img"
                loading={idx === 0 ? 'eager' : 'lazy'}
                draggable={false}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
