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
      filterKey: 'furniture',
    },
    {
      id: 'decor',
      name: 'Home Decor',
      image: decorImg,
      filterKey: 'decor',
    },
    {
      id: 'kitchen',
      name: 'Kitchen & Utensils',
      image: kitchenImg,
      filterKey: 'kitchen',
    },
  ]

  const handleClick = (filterKey: string) => {
    if (onSelectCategory) {
      onSelectCategory(filterKey)
    }
  }

  return (
    <section className="home-section categories-section" aria-label="Shop by Category">
      <div className="categories-header">
        <h2 className="categories-main-title">Shop by Category</h2>
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
              <span className="category-name-text">
                {cat.id === 'kitchen' ? (
                  <>Kitchen &amp;<br />Utensils</>
                ) : (
                  cat.name
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
