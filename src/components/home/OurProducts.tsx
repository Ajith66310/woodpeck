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

// Green background product images (#055531)
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
    tags: ["Black Walnut", "Beeswax Seal"],
    greenImage: bowlImg2Green,
    image: bowlImg2,
    description:
      "Deep round walnut bowl with natural timber grain and organic beeswax polish.",
    whatsappText:
      "Hi WoodPeck, I would like to inquire about the Deep Walnut Serving Bowl.",
  },
];

export function SignatureCard({ product }: { product: SignatureProduct }) {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isTouchSwiping = useRef<boolean>(false);

  const mouseStartX = useRef<number | null>(null);
  const mouseEndX = useRef<number | null>(null);
  const isMouseDragging = useRef<boolean>(false);

  // Click or tap on image: toggle continuously between 1st image (0) and 2nd image (1)
  const handleImageClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (isTouchSwiping.current || isMouseDragging.current) return;
    setActiveIdx((prev) => (prev === 0 ? 1 : 0));
  };

  // Touch swipe handlers on the image
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    isTouchSwiping.current = false;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
    if (touchStartX.current !== null && Math.abs(touchEndX.current - touchStartX.current) > 10) {
      isTouchSwiping.current = true;
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (diff > 25) {
        // Swiped left -> show second image (idx 1)
        setActiveIdx(1);
      } else if (diff < -25) {
        // Swiped right -> show first image (idx 0)
        setActiveIdx(0);
      } else if (!isTouchSwiping.current) {
        // Tap on image -> toggle continuously
        setActiveIdx((prev) => (prev === 0 ? 1 : 0));
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
    setTimeout(() => {
      isTouchSwiping.current = false;
    }, 50);
  };

  // Mouse swipe / drag handlers on the image
  const handleMouseDown = (e: MouseEvent) => {
    mouseStartX.current = e.clientX;
    mouseEndX.current = e.clientX;
    isMouseDragging.current = false;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (mouseStartX.current !== null) {
      mouseEndX.current = e.clientX;
      if (Math.abs(mouseEndX.current - mouseStartX.current) > 10) {
        isMouseDragging.current = true;
      }
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (isMouseDragging.current && mouseStartX.current !== null && mouseEndX.current !== null) {
      const diff = mouseStartX.current - mouseEndX.current;
      if (diff > 25) {
        setActiveIdx(1);
      } else if (diff < -25) {
        setActiveIdx(0);
      }
    } else if (mouseStartX.current !== null) {
      // Click without dragging -> toggle continuously
      setActiveIdx((prev) => (prev === 0 ? 1 : 0));
    }
    mouseStartX.current = null;
    mouseEndX.current = null;
    setTimeout(() => {
      isMouseDragging.current = false;
    }, 50);
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
    <article className="sig-product-card">
      <div
        className="sig-card-image-box swiper-no-swiping"
        onClick={handleImageClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        role="button"
        tabIndex={0}
        aria-label={`Toggle image view for ${product.name}`}
        data-active-idx={activeIdx}
      >
        {/* Transform-based track: completely reliable across all browsers & Swiper */}
        <div
          className="sig-card-image-track"
          style={{
            transform: activeIdx === 0 ? 'translateX(0%)' : 'translateX(-50%)',
          }}
        >
          {/* Slide 1: Original light background image */}
          <div className="sig-image-slide">
            <img
              src={product.image}
              alt={`${product.name} - detail view`}
              loading="eager"
              className="sig-card-img"
              draggable={false}
            />
          </div>

          {/* Slide 2: Green #055531 background image */}
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

        {/* Dot indicators */}
        <div className="sig-image-dots">
          {[0, 1].map((idx) => (
            <button
              key={idx}
              type="button"
              className={`sig-dot ${activeIdx === idx ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIdx(idx);
              }}
              aria-label={idx === 0 ? "Detail view" : "Studio view"}
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
          onClick={(e) => e.stopPropagation()}
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
}

export function OurProducts({ onAddToCart: _onAddToCart }: OurProductsProps) {
  return (
    <section
      id="our-products-section"
      className="home-section our-products-section"
      aria-label="Our Signature Products"
    >
      <div className="section-header-wrap">
        <h2 className="section-main-title" style={{ color: "#000000" }}>
          Our Signature Products
        </h2>
      </div>

      <div className="signature-products-grid">
        {SIGNATURE_PRODUCTS.map((prod) => (
          <SignatureCard key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  );
}
