import {useState} from "preact/hooks";
import {ThemeProvider} from "./context/ThemeContext.tsx";
import {Navbar} from "./components/layout/Navbar.tsx";
import {Footer} from "./components/layout/Footer.tsx";
import {Home} from "./pages/Home.tsx";
import {ShopPage} from "./pages/Shop.tsx";
import {AboutPage} from "./pages/About.tsx";
import {ContactPage} from "./pages/Contact.tsx";
import {ProductDetailPage} from "./pages/ProductDetail.tsx";
import type {SignatureProduct} from "./components/home/OurProducts.tsx";

type ViewType = "home" | "shop" | "about" | "contact" | "product-detail";

export function App() {
  const [currentView, setCurrentView] = useState<ViewType>("home");
  const [shopCategory, setShopCategory] = useState<string | undefined>(
    undefined,
  );
  const [selectedProduct, setSelectedProduct] =
    useState<SignatureProduct | null>(null);

  const handleNavigateHome = () => {
    setCurrentView("home");
    setShopCategory(undefined);
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  const handleNavigateShop = (categoryKey?: string) => {
    setCurrentView("shop");
    setShopCategory(categoryKey);
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  const handleNavigatePage = (page: ViewType) => {
    setCurrentView(page);
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  const handleProductClick = (product: SignatureProduct) => {
    setSelectedProduct(product);
    setCurrentView("product-detail");
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  const renderPage = () => {
    switch (currentView) {
      case "home":
        return (
          <Home
            onProductClick={handleProductClick}
            onNavigateShop={handleNavigateShop}
          />
        );
      case "shop":
        return (
          <ShopPage
            initialCategory={shopCategory}
            onProductClick={handleProductClick}
          />
        );
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      case "product-detail":
        return selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            onProductClick={handleProductClick}
          />
        ) : (
          <ShopPage
            initialCategory={shopCategory}
            onProductClick={handleProductClick}
          />
        );
      default:
        return <Home onProductClick={handleProductClick} />;
    }
  };

  return (
    <ThemeProvider>
      {/* Displayed ONLY on MD & LG screens */}
      <div className="desktop-blocked-screen">
        <p className="desktop-blocked-text">
          This website is only available in mobile screens
        </p>
      </div>

      {/* Main Mobile Website (Visible ONLY on SM small screens) */}
      <div className="app-wrapper sm-app-wrapper">
        <Navbar
          currentView={currentView}
          onNavigateHome={handleNavigateHome}
          onNavigateShop={handleNavigateShop}
          onNavigatePage={handleNavigatePage}
          onProductClick={handleProductClick}
        />

        <main className="main-content">{renderPage()}</main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}
