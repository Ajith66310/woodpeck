
import { useState, useRef } from "preact/hooks";

// Original product images (light background)
import chairImg1 from "../../assets/products/chair-1.jpg";
import vaseImg1 from "../../assets/products/vase-1.jpg";
import boardImg1 from "../../assets/products/board-1.jpg";
import bowlImg1 from "../../assets/products/bowl-1.jpg";
import chairImg2 from "../../assets/products/chair-2.jpg";
import vaseImg2 from "../../assets/products/vase-2.jpg";
import boardImg2 from "../../assets/products/board-2.jpg";
import bowlImg2 from "../../assets/products/bowl-2.jpg";

// Green background product images (#055531 bg)
import chairImg1Green from "../../assets/products/chair-1-green.png";
import vaseImg1Green from "../../assets/products/vase-1-green.png";
import boardImg1Green from "../../assets/products/board-1-green.png";
import bowlImg1Green from "../../assets/products/bowl-1-green.png";
import chairImg2Green from "../../assets/products/chair-2-green.png";
import vaseImg2Green from "../../assets/products/vase-2-green.png";
import boardImg2Green from "../../assets/products/board-2-green.png";
import bowlImg2Green from "../../assets/products/bowl-2-green.png";

export interface SignatureProduct {
  id: string;
  name: string;
  category: 'furniture' | 'decor' | 'kitchen';
  tags: string[];
  greenImage: string;  // shown first (#055531 bg)
  image: string;       // shown second (original, swipe to reveal)
  description: string;
  whatsappText: string;
}

export const SIGNATURE_PRODUCTS: SignatureProduct[] = [
  {
    id: "sig-chair-1",
    name: "Nordic Solid Oak Chair",
    category: "furniture",
    tags: ["Solid Oak", "Natural Oil Finish"],
    greenImage: chairImg1Green,
    image: chairImg1,
    description:
      "Minimalist solid oak dining chair with natural curved profile.",
    whatsappText:
      "Hi WoodPeck, I would like to inquire about the Nordic Solid Oak Chair.",
  },
  {
    id: "sig-vase-1",
    name: "Sculptural Walnut Vase",
    category: "decor",
    tags: ["Walnut Wood", "Beeswax Polish"],
    greenImage: vaseImg1Green,
    image: vaseImg1,
    description:
      "Hand-turned sculptural solid walnut vessel with rich timber grain.",
    whatsappText:
      "Hi WoodPeck, I would like to inquire about the Sculptural Walnut Vase.",
  },
  {
    id: "sig-board-1",
    name: "Artisan Teak Cutting Board",
    category: "kitchen",
    tags: ["Teak Wood", "Food-Safe Oil"],
    greenImage: boardImg1Green,
    image: boardImg1,
    description:
      "Vertical end-grain chopping board with handle and organic oil seal.",
    whatsappText:
      "Hi WoodPeck, I would like to inquire about the Artisan Teak Cutting Board.",
  },
  {
    id: "sig-bowl-1",
    name: "Hand-Carved Hardwood Bowl",
    category: "kitchen",
    tags: ["Acacia Wood", "Zero-Chem Wax"],
    greenImage: bowlImg1Green,
    image: bowlImg1,
    description:
      "Artisanal hand-turned salad and fruit bowl with satin smooth rim.",
    whatsappText:
      "Hi WoodPeck, I would like to inquire about the Hand-Carved Hardwood Bowl.",
  },
  {
    id: "sig-chair-2",
    name: "Natural Ash Wood Chair",
    category: "furniture",
    tags: ["Ash Wood", "Lye + Soap Paint"],
    greenImage: chairImg2Green,
    image: chairImg2,
    description:
      "Ergonomic Scandinavian ash chair with tapered legs and warm tone.",
    whatsappText:
      "Hi WoodPeck, I would like to inquire about the Natural Ash Wood Chair.",
  },
  {
    id: "sig-vase-2",
    name: "Golden Teak Artisan Vessel",
    category: "decor",
    tags: ["Plantation Teak", "Tung Oil Paint"],
    greenImage: vaseImg2Green,
    image: vaseImg2,
    description:
      "Slender hand-carved decorative teak vase with satin smooth finish.",
    whatsappText:
      "Hi WoodPeck, I would like to inquire about the Golden Teak Artisan Vessel.",
  },
  {
    id: "sig-board-2",
    name: "Dark Walnut Chopping Block",
    category: "kitchen",
    tags: ["Dark Walnut", "Ebony Stain"],
    greenImage: boardImg2Green,
    image: boardImg2,
    description:
      "Heavy-duty solid walnut butcher board with recessed hanging hole.",
    whatsappText:
      "Hi WoodPeck, I would like to inquire about the Dark Walnut Chopping Block.",
  },
  {
    id: "sig-bowl-2",
    name: "Deep Walnut Serving Bowl",
    category: "kitchen",
    tags: ["Black Walnut", "Beeswax Seal"],
    greenImage: bowlImg2Green,
    image: bowlImg2,
    description:
      "Deep round walnut bowl with natural timber grain and organic beeswax polish.",
    whatsappText:
      "Hi WoodPeck, I would like to inquire about the Deep Walnut Serving Bowl.",
  },
];

export function SignatureCard({
  product,
  onProductClick,
}: {
  product: SignatureProduct;
  onProductClick?: (product: SignatureProduct) => void;
}) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchLastX = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);
  const isSwiping = useRef<boolean>(false);
  const hasSwipedRecently = useRef<boolean>(false);

  const markSwiped = () => {
    hasSwipedRecently.current = true;
    setTimeout(() => {
      hasSwipedRecently.current = false;
    }, 280);
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (!e.touches[0]) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchLastX.current = e.touches[0].clientX;
    isSwiping.current = false;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (touchStartX.current === null || !e.touches[0]) return;
    touchLastX.current = e.touches[0].clientX;
    const deltaX = e.touches[0].clientX - touchStartX.current;
    const deltaY = e.touches[0].clientY - (touchStartY.current ?? 0);

    // If gesture is mostly horizontal, stop propagation so parent carousel doesn't hijack it
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 8) {
      isSwiping.current = true;
      e.stopPropagation();
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current !== null && touchLastX.current !== null && isSwiping.current) {
      const deltaX = touchLastX.current - touchStartX.current;
      if (deltaX < -25) {
        // Swiped left -> show second image (green studio view)
        setActiveIdx(1);
        markSwiped();
        e.stopPropagation();
      } else if (deltaX > 25) {
        // Swiped right -> show first image (natural light view)
        setActiveIdx(0);
        markSwiped();
        e.stopPropagation();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
    touchLastX.current = null;
    isSwiping.current = false;
  };

  const handleMouseDown = (e: MouseEvent) => {
    mouseStartX.current = e.clientX;
    isSwiping.current = false;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (mouseStartX.current === null) return;
    const deltaX = e.clientX - mouseStartX.current;
    if (Math.abs(deltaX) > 10) {
      isSwiping.current = true;
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (mouseStartX.current !== null && isSwiping.current) {
      const deltaX = e.clientX - mouseStartX.current;
      if (deltaX < -25) {
        setActiveIdx(1);
        markSwiped();
      } else if (deltaX > 25) {
        setActiveIdx(0);
        markSwiped();
      }
    }
    mouseStartX.current = null;
    isSwiping.current = false;
  };

  const phoneNumber = "918590123072";
  const waMessage = `Hello WoodPeck! 🪵
I would like to inquire / order:

*Product:* ${product.name}
*Specifications:* ${product.tags.join(" | ")}
*Details:* ${product.description}

Please share pricing and availability. Thank you!`;

  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <article
      className="sig-product-card"
      data-product-id={product.id}
      data-swiped={hasSwipedRecently.current ? "true" : "false"}
      onClick={() => {
        if (hasSwipedRecently.current || isSwiping.current) {
          return;
        }
        onProductClick?.(product);
      }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${product.name}`}
      style={{ cursor: onProductClick ? 'pointer' : 'default' }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onProductClick?.(product);
        }
      }}
    >
      <div
        className="sig-card-image-wrap"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          mouseStartX.current = null;
          isSwiping.current = false;
        }}
      >
        <div className="sig-card-image-box">
          <div
            className="sig-image-track"
            style={{
              transform: `translateX(-${activeIdx * 50}%)`,
            }}
          >
            {/* Slide 1: Original natural light view */}
            <div className="sig-image-slide">
              <img
                src={product.image}
                alt={`${product.name} - natural view`}
                loading="lazy"
                className="sig-card-img"
                draggable={false}
              />
            </div>

            {/* Slide 2: Green studio view (#055531 bg) */}
            <div className="sig-image-slide sig-slide-green-bg">
              <img
                src={product.greenImage}
                alt={`${product.name} - studio view`}
                loading="lazy"
                className="sig-card-img"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* Static Dot indicators overlay */}
        <div className="sig-image-dots">
          {[0, 1].map((idx) => (
            <button
              key={idx}
              type="button"
              className={`sig-dot ${activeIdx === idx ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIdx(idx);
                markSwiped();
              }}
              aria-label={`View image ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="sig-card-content">
        {/* Square capsule badges: wood type + paint/finish */}
        <div className="sig-capsules-row">
          {product.tags.map((tag) => (
            <span key={tag} className="sig-capsule-tag">
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="sig-card-description">{product.description}</p>

        {/* Full width WhatsApp button */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="sig-whatsapp-btn swiper-no-swiping"
          aria-label={`Order ${product.name} on WhatsApp`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <svg
            className="sig-whatsapp-icon"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
          >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.34C9.36 7.34 9.09 7.4 8.87 7.65C8.65 7.89 8.02 8.48 8.02 9.7C8.02 10.92 8.91 12.09 9.03 12.26C9.16 12.42 10.77 14.91 13.23 15.97C13.82 16.22 14.27 16.37 14.63 16.49C15.22 16.67 15.76 16.65 16.19 16.58C16.67 16.51 17.66 15.98 17.87 15.4C18.07 14.81 18.07 14.31 18.01 14.21C17.95 14.1 17.79 14.04 17.55 13.92C17.3 13.8 16.09 13.21 15.86 13.13C15.64 13.04 15.48 13 15.31 13.24C15.15 13.49 14.68 14.04 14.53 14.21C14.39 14.37 14.25 14.39 14.01 14.27C13.76 14.15 12.98 13.89 12.05 13.06C11.33 12.42 10.84 11.62 10.7 11.38C10.57 11.13 10.69 11 10.81 10.88C10.92 10.77 11.06 10.59 11.18 10.44C11.3 10.3 11.34 10.19 11.42 10.03C11.5 9.86 11.46 9.72 11.4 9.6C11.34 9.48 10.87 8.33 10.68 7.85C10.49 7.39 10.3 7.45 10.15 7.44C10 7.44 9.83 7.44 9.67 7.44L9.53 7.34Z" />
          </svg>
          <span>WhatsApp</span>
        </a>
      </div>
    </article>
  );
}

interface OurProductsProps {
  onAddToCart?: (product: any) => void;
  selectedCategory?: string;
  sortKey?: string;
  onProductClick?: (product: SignatureProduct) => void;
}

function sortSignatureProducts(products: SignatureProduct[], sortKey?: string) {
  const arr = [...products];
  switch (sortKey) {
    case 'name-az':
      return arr.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-za':
      return arr.sort((a, b) => b.name.localeCompare(a.name));
    case 'category':
      return arr.sort((a, b) => a.category.localeCompare(b.category));
    default:
      return arr;
  }
}

export function OurProducts({ onAddToCart: _onAddToCart, selectedCategory, sortKey, onProductClick }: OurProductsProps) {
  const filtered = selectedCategory
    ? SIGNATURE_PRODUCTS.filter((prod) => prod.category === selectedCategory)
    : SIGNATURE_PRODUCTS;
  const filteredProducts = sortSignatureProducts(filtered, sortKey);

  return (
    <section
      id="our-products-section"
      className="home-section our-products-section"
      aria-label="Our Signature Products"
    >
      <div className="section-header-wrap">
        <h2 className="section-main-title" style={{ color: "#000000" }}>
          {selectedCategory === 'furniture'
            ? 'Furniture Details & Products'
            : selectedCategory === 'decor'
            ? 'Home Decor Details & Products'
            : selectedCategory === 'kitchen'
            ? 'Kitchen & Utensils Details & Products'
            : 'Our Signature Products'}
        </h2>
      </div>

      <div className="signature-products-grid">
        {filteredProducts.map((prod) => (
          <SignatureCard key={prod.id} product={prod} onProductClick={onProductClick} />
        ))}
      </div>
    </section>
  );
}
