import {useState, useEffect} from "preact/hooks";
import woodpeckLogo from "../../assets/logo/logo-woodpeck.jpg";
import {SearchBar} from "./SearchBar.tsx";
import {RiMenu3Line} from "react-icons/ri";
import {IoClose, IoChevronDown} from "react-icons/io5";
import type {SignatureProduct} from "../home/OurProducts.tsx";

type ViewType = "home" | "shop" | "about" | "contact" | "product-detail";

interface NavbarProps {
  currentView?: ViewType;
  onNavigateHome?: () => void;
  onNavigateShop?: (categoryKey?: string) => void;
  onNavigatePage?: (page: ViewType) => void;
  onProductClick?: (product: SignatureProduct) => void;
}

export function Navbar({
  currentView = "home",
  onNavigateHome,
  onNavigateShop,
  onProductClick,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);

  const handleHomeClick = () => {
    setIsOpen(false);
    if (onNavigateHome) onNavigateHome();
    else window.scrollTo({top: 0, behavior: "smooth"});
  };

  const handleCategoryClick = (filterKey: string) => {
    setIsOpen(false);
    if (onNavigateShop) {
      onNavigateShop(filterKey);
    } else {
      const el = document.getElementById("our-products-section");
      el?.scrollIntoView({behavior: "smooth"});
    }
  };

  // Keep Shop accordion open when on shop page
  useEffect(() => {
    if (currentView === "shop") {
      setIsShopOpen(true);
    } else {
      setIsShopOpen(false);
    }
  }, [currentView]);

  // Prevent background scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const isHomeActive = currentView === "home";
  const isShopActive = currentView === "shop";

  return (
    <>
      <header className="navbar sm-navbar">
        <div className="navbar-container">
          {/* Logo */}
          <a
            href="#"
            className="navbar-brand"
            aria-label="WoodPeck Home"
            onClick={(e) => {
              e.preventDefault();
              handleHomeClick();
            }}
          >
            <img
              src={woodpeckLogo}
              alt="WoodPeck"
              className="navbar-logo-img"
            />
          </a>

          {/* Search Bar */}
          <SearchBar onProductClick={onProductClick} />

          {/* Menu Toggle */}
          <button
            type="button"
            className="navbar-menu-toggle"
            onClick={() => setIsOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
          >
            <RiMenu3Line size={30} />
          </button>
        </div>
      </header>

      {/* Backdrop */}
      <div
        className={`sidebar-backdrop ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar Drawer */}
      <aside
        className={`sidebar-drawer ${isOpen ? "open" : ""}`}
        aria-label="Mobile Navigation Drawer"
        role="dialog"
        aria-modal="true"
      >
        {/* Top bar */}
        <div className="sidebar-top-bar">
          <div className="sidebar-brand">
            <img
              src={woodpeckLogo}
              alt="WoodPeck"
              className="sidebar-logo-img"
            />
          </div>
          <button
            type="button"
            className="sidebar-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <IoClose size={26} />
          </button>
        </div>

        {/* Nav Links */}
        <div className="sidebar-nav-menu">
          {/* Home */}
          <button
            type="button"
            className={`sidebar-nav-link ${isHomeActive ? "active" : ""}`}
            onClick={handleHomeClick}
          >
            <span>Home</span>
          </button>

          {/* Shop — accordion */}
          <div className="sidebar-shop-accordion">
            <button
              type="button"
              className={`sidebar-nav-link sidebar-shop-btn ${isShopOpen ? "open" : ""} ${isShopActive ? "active" : ""}`}
              onClick={() => setIsShopOpen(!isShopOpen)}
            >
              <span>Shop</span>
              <IoChevronDown
                size={18}
                className={`shop-chevron-icon ${isShopOpen ? "rotated" : ""}`}
              />
            </button>

            {isShopOpen && (
              <div className="sidebar-sub-menu">
                <button
                  type="button"
                  className="sidebar-sub-link"
                  onClick={() => handleCategoryClick("")}
                >
                  <span>All</span>
                </button>
                <button
                  type="button"
                  className="sidebar-sub-link"
                  onClick={() => handleCategoryClick("furniture")}
                >
                  <span>Furniture</span>
                </button>
                <button
                  type="button"
                  className="sidebar-sub-link"
                  onClick={() => handleCategoryClick("decor")}
                >
                  <span>Home Decor</span>
                </button>
                <button
                  type="button"
                  className="sidebar-sub-link"
                  onClick={() => handleCategoryClick("kitchen")}
                >
                  <span>Kitchen &amp; Utensils</span>
                </button>
              </div>
            )}
          </div>
        </div>
        {/* WhatsApp Button at bottom of sidebar */}
        <div className="sidebar-bottom-whatsapp">
          <a
            href="https://wa.me/918590123072?text=Hello%20WoodPeck!%20%F0%9F%AA%B5%20I%20would%20like%20to%20inquire%20about%20your%20handcrafted%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-whatsapp-btn"
            aria-label="Chat with WoodPeck on WhatsApp"
            onClick={() => setIsOpen(false)}
          >
            <svg
              className="sig-whatsapp-icon"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.34C9.36 7.34 9.09 7.4 8.87 7.65C8.65 7.89 8.02 8.48 8.02 9.7C8.02 10.92 8.91 12.09 9.03 12.26C9.16 12.42 10.77 14.91 13.23 15.97C13.82 16.22 14.27 16.37 14.63 16.49C15.22 16.67 15.76 16.65 16.19 16.58C16.67 16.51 17.66 15.98 17.87 15.4C18.07 14.81 18.07 14.31 18.01 14.21C17.95 14.1 17.79 14.04 17.55 13.92C17.3 13.8 16.09 13.21 15.86 13.13C15.64 13.04 15.48 13 15.31 13.24C15.15 13.49 14.68 14.04 14.53 14.21C14.39 14.37 14.25 14.39 14.01 14.27C13.76 14.15 12.98 13.89 12.05 13.06C11.33 12.42 10.84 11.62 10.7 11.38C10.57 11.13 10.69 11 10.81 10.88C10.92 10.77 11.06 10.59 11.18 10.44C11.3 10.3 11.34 10.19 11.42 10.03C11.5 9.86 11.46 9.72 11.4 9.6C11.34 9.48 10.87 8.33 10.68 7.85C10.49 7.39 10.3 7.45 10.15 7.44C10 7.44 9.83 7.44 9.67 7.44L9.53 7.34Z" />
            </svg>
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </aside>
    </>
  );
}
