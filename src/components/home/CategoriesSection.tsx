import furnitureImg from '../../assets/categories/furniture.jpg'
import decorImg from '../../assets/categories/home-decor.jpg'
import kitchenImg from '../../assets/categories/kitchen-utensils.jpg'

interface CategoriesSectionProps {
  onSelectCategory?: (categoryKey: string) => void
}

export function CategoriesSection({ onSelectCategory }: CategoriesSectionProps) {
  const categories = [
    {
      id: 'furniture',
      name: 'Furniture',
      image: furnitureImg,
      filterKey: 'tables',
    },
    {
      id: 'decor',
      name: 'Home Decor',
      image: decorImg,
      filterKey: 'panels',
    },
    {
      id: 'kitchen',
      name: 'Kitchen & Utensils',
      image: kitchenImg,
      filterKey: 'kitchenware',
    },
  ]

  const handleClick = (filterKey: string) => {
    if (onSelectCategory) {
      onSelectCategory(filterKey)
    }
    const el = document.getElementById('our-products-section')
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="home-section categories-section" aria-label="Our Categories">
      <div className="categories-header">
        <h2 className="categories-main-title">OUR CATEGORIES</h2>
      </div>

      <div className="categories-grid">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="category-card"
            onClick={() => handleClick(cat.filterKey)}
            role="button"
            tabIndex={0}
            aria-label={`Shop ${cat.name}`}
          >
            <div className="category-image-wrap">
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="category-card-img"
              />
            </div>
            <div className="category-bottom-bar">
              <span className="category-name-text">{cat.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
