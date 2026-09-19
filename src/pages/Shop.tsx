import { useState, useEffect } from 'preact/hooks'
import shopBannerImg from '../assets/banner/img2-sm screen.png'
import { OurProducts } from '../components/home/OurProducts.tsx'
import { CategoriesSection } from '../components/home/CategoriesSection.tsx'

interface ShopPageProps {
  initialCategory?: string
}

export function ShopPage({ initialCategory }: ShopPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(initialCategory)

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory)
    }
  }, [initialCategory])

  const handleSelectCategory = (catKey: string) => {
    setSelectedCategory(catKey)
  }

  return (
    <div className="page shop-page wood-store-shop">
      {/* 1. Shop Banner Image */}
      <div className="shop-banner-container">
        <img
          src={shopBannerImg}
          alt="SHOP - Premium Wooden Crafts & More"
          className="shop-banner-img"
          loading="eager"
        />
      </div>

      <div className="shop-sections-wrap">
        {/* 2. Shop Categories overview */}
        <CategoriesSection onSelectCategory={handleSelectCategory} />

        {/* 3. Filtered Products List / Signature Products */}
        <OurProducts selectedCategory={selectedCategory} />
      </div>
    </div>
  )
}
