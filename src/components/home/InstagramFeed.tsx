import { useState, useEffect, useRef } from 'preact/hooks'
import Swiper from 'swiper'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'

import bannerWoodCraft from '../../assets/banner-wood-craft.jpg'
import productOakTable from '../../assets/product-oak-table.jpg'
import productTeakChair from '../../assets/product-teak-chair.jpg'
import productCuttingBoard from '../../assets/product-cutting-board.jpg'
import vaseImg1 from '../../assets/products/vase-1.jpg'
import bowlImg1 from '../../assets/products/bowl-1.jpg'
import chairImg1 from '../../assets/products/chair-1.jpg'
import boardImg1 from '../../assets/products/board-1.jpg'

interface InstagramPost {
  id: string
  handle: string
  image: string
  caption: string
  views: string
}

const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'post-1',
    handle: '@woodpeck',
    image: bannerWoodCraft,
    caption: 'Artisan hand-chiseling solid European timber in our studio.',
    views: '12.4k',
  },
  {
    id: 'post-2',
    handle: '@woodpeck',
    image: chairImg1,
    caption: 'Nordic curved oak chair taking shape. Pure organic oil seal.',
    views: '8.9k',
  },
  {
    id: 'post-3',
    handle: '@woodpeck',
    image: vaseImg1,
    caption: 'Sculptural solid walnut vessel hand-turned on the lathe.',
    views: '15.2k',
  },
  {
    id: 'post-4',
    handle: '@woodpeck',
    image: boardImg1,
    caption: 'End-grain teak cutting board. Chef grade durability.',
    views: '6.7k',
  },
  {
    id: 'post-5',
    handle: '@woodpeck',
    image: bowlImg1,
    caption: 'Hand-carved fruit bowl finished with natural beeswax polish.',
    views: '18.1k',
  },
  {
    id: 'post-6',
    handle: '@woodpeck',
    image: productOakTable,
    caption: 'Minimalist Scandinavian oak dining table crafted for generations.',
    views: '11.3k',
  },
  {
    id: 'post-7',
    handle: '@woodpeck',
    image: productTeakChair,
    caption: 'Grade-A plantation teak frame meets Belgian linen comfort.',
    views: '9.4k',
  },
  {
    id: 'post-8',
    handle: '@woodpeck',
    image: productCuttingBoard,
    caption: 'Heritage walnut butcher block crafted with self-healing grain.',
    views: '14.6k',
  },
]

export function InstagramFeed() {
  const swiperRef = useRef<HTMLDivElement | null>(null)
  const swiperInstanceRef = useRef<Swiper | null>(null)
  const [showNavButtons, setShowNavButtons] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimerRef = useRef<number | null>(null)
  const touchTimerRef = useRef<number | null>(null)

  // Initialize Swiper with infinite autoplay
  useEffect(() => {
    if (!swiperRef.current) return

    swiperInstanceRef.current = new Swiper(swiperRef.current, {
      modules: [Autoplay],
      slidesPerView: 1.85,
      spaceBetween: 12,
      loop: true,
      grabCursor: true,
      speed: 600,
      autoplay: {
        delay: 2600,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 1.8,
          spaceBetween: 10,
        },
        480: {
          slidesPerView: 2.1,
          spaceBetween: 14,
        },
        640: {
          slidesPerView: 2.4,
          spaceBetween: 16,
        },
      },
    })

    return () => {
      swiperInstanceRef.current?.destroy(true, true)
    }
  }, [])

  // Hide nav buttons immediately during scroll
  useEffect(() => {
    const handleWindowScroll = () => {
      setIsScrolling(true)
      setShowNavButtons(false)

      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current)
      }

      scrollTimerRef.current = window.setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    window.addEventListener('scroll', handleWindowScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleWindowScroll)
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
      if (touchTimerRef.current) clearTimeout(touchTimerRef.current)
    }
  }, [])

  // Show nav buttons on hover (no click needed)
  const handleMouseEnter = () => {
    if (!isScrolling) {
      setShowNavButtons(true)
    }
  }

  // Hide nav buttons on mouse leave
  const handleMouseLeave = () => {
    setShowNavButtons(false)
  }

  // Show nav buttons on mobile touch without needing a click
  const handleTouchStart = () => {
    if (!isScrolling) {
      setShowNavButtons(true)
      if (touchTimerRef.current) clearTimeout(touchTimerRef.current)
      touchTimerRef.current = window.setTimeout(() => {
        setShowNavButtons(false)
      }, 3500)
    }
  }

  const handlePrev = (e: MouseEvent) => {
    e.stopPropagation()
    swiperInstanceRef.current?.slidePrev()
  }

  const handleNext = (e: MouseEvent) => {
    e.stopPropagation()
    swiperInstanceRef.current?.slideNext()
  }

  return (
    <section
      id="instagram-feed-section"
      className={`home-section instagram-feed-section ${isScrolling ? 'is-scrolling' : ''}`}
      aria-label="Instagram Moments"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
    >
      {/* Section Header matching reference screenshot */}
      <div className="section-header-wrap insta-header-wrap">
        <h2 className="insta-main-title">Moments That Matter</h2>
        <p className="insta-sub-title">Shop creator faves</p>
      </div>

      {/* Swiper Container with floating side buttons */}
      <div
        className="insta-swiper-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Previous Button (Visible on hover/touch, hidden on scroll) */}
        <button
          type="button"
          className={`insta-swiper-btn insta-swiper-prev ${showNavButtons ? 'visible' : ''}`}
          onClick={handlePrev}
          aria-label="Previous reel"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Swiper Track */}
        <div ref={swiperRef} className="swiper insta-swiper">
          <div className="swiper-wrapper">
            {INSTAGRAM_POSTS.map((post) => (
              <div key={post.id} className="swiper-slide insta-slide">
                <article className="insta-card">
                  {/* Media Image */}
                  <img
                    src={post.image}
                    alt={post.caption}
                    loading="lazy"
                    className="insta-card-img"
                  />

                  {/* Gradient shadow for text readability */}
                  <div className="insta-card-gradient" />

                  {/* Bottom Handle matching reference screenshot (@Oxygen style) */}
                  <div className="insta-card-footer">
                    <span className="insta-handle-text">{post.handle}</span>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Next Button (Hidden when scrolling, shown when touching section) */}
        <button
          type="button"
          className={`insta-swiper-btn insta-swiper-next ${showNavButtons ? 'visible' : ''}`}
          onClick={handleNext}
          aria-label="Next reel"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>
  )
}
