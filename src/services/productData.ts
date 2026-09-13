import type { BannerSlide, Product, WoodComparisonItem, TrustFeatureItem } from '../types/index.ts'
import bannerSm1 from '../assets/banner/img1-sm screen.png'
import bannerSm2 from '../assets/banner/img2-sm screen.png'
import productOakTable from '../assets/product-oak-table.jpg'
import productTeakChair from '../assets/product-teak-chair.jpg'
import productWoodSlats from '../assets/product-wood-slats.jpg'
import productCuttingBoard from '../assets/product-cutting-board.jpg'

export const BANNER_SLIDES: BannerSlide[] = [
  {
    id: 'slide-1',
    badge: '100% Solid Hardwood',
    title: 'Crafted In Wood',
    highlight: 'Timeless Designs For Every Space',
    subtitle: 'Handcrafted artisan kitchenware, cutting boards & dining essentials.',
    image: bannerSm1,
    primaryCtaText: 'Shop Collection',
    secondaryCtaText: 'View Details',
    tagline: '★ 4.98/5 • Artisan Studio'
  },
  {
    id: 'slide-2',
    badge: 'Artisan Tableware',
    title: 'Timeless Wood',
    highlight: 'Natural Living',
    subtitle: 'Handcrafted wood essentials for a beautiful everyday lifestyle.',
    image: bannerSm2,
    primaryCtaText: 'Explore Living',
    secondaryCtaText: 'View Details',
    tagline: 'Kiln-Dried Hardwood • Organic Oil Finish'
  }
]

export const PRODUCTS_CATALOG: Product[] = [
  {
    id: 'prod-1',
    name: 'Nordic Solid Oak Dining Table',
    category: 'tables',
    woodSpecies: 'European White Oak',
    price: 1290,
    originalPrice: 1490,
    rating: 4.9,
    reviewsCount: 184,
    image: productOakTable,
    tag: 'Sustainable FSC®',
    isBestSeller: true,
    description: 'Minimalist Scandinavian dining table with tapered solid oak legs and natural chamfered profile.',
    dimensions: '200cm × 95cm × 75cm',
    inStock: true
  },
  {
    id: 'prod-2',
    name: 'Kyoto Handcrafted Teak Lounge Chair',
    category: 'seating',
    woodSpecies: 'Grade-A Plantation Teak',
    price: 680,
    originalPrice: 790,
    rating: 5.0,
    reviewsCount: 92,
    image: productTeakChair,
    tag: 'Customer Favorite',
    isBestSeller: true,
    description: 'Ergonomically sculpted teak frame paired with organic Belgian linen cushions for deep comfort.',
    dimensions: '78cm × 82cm × 76cm',
    inStock: true
  },
  {
    id: 'prod-3',
    name: 'Acoustic Walnut Fluted Wall Slats',
    category: 'panels',
    woodSpecies: 'American Black Walnut',
    price: 189,
    originalPrice: 220,
    rating: 4.9,
    reviewsCount: 310,
    image: productWoodSlats,
    tag: 'Sound Dampening',
    isBestSeller: true,
    description: 'Architectural acoustic wall panels with 3D solid timber slats and sound-absorbing PET felt.',
    dimensions: '240cm × 60cm × 2.2cm per box',
    inStock: true
  },
  {
    id: 'prod-4',
    name: 'End-Grain Heritage Walnut Butcher Block',
    category: 'kitchenware',
    woodSpecies: 'Black Walnut & Hard Maple',
    price: 145,
    originalPrice: 175,
    rating: 4.95,
    reviewsCount: 428,
    image: productCuttingBoard,
    tag: 'Chef Grade',
    isBestSeller: true,
    description: 'Self-healing end-grain wood fibers, perimeter juice groove, and polished with organic beeswax.',
    dimensions: '45cm × 35cm × 4.5cm',
    inStock: true
  },
  {
    id: 'prod-5',
    name: 'Walnut Live-Edge Bench',
    category: 'seating',
    woodSpecies: 'American Walnut',
    price: 540,
    originalPrice: 620,
    rating: 4.85,
    reviewsCount: 67,
    image: productOakTable,
    tag: 'Natural Bark Edge',
    isBestSeller: false,
    description: 'Single continuous slab bench with powder-coated steel butterfly keys and hand-rubbed oil finish.',
    dimensions: '160cm × 40cm × 45cm',
    inStock: true
  },
  {
    id: 'prod-6',
    name: 'Minimalist Oak Slat Room Divider',
    category: 'panels',
    woodSpecies: 'White Oak',
    price: 460,
    originalPrice: 530,
    rating: 4.8,
    reviewsCount: 54,
    image: productWoodSlats,
    tag: 'Modular',
    isBestSeller: false,
    description: 'Free-standing natural timber slat screen providing visual partition while preserving open airflow.',
    dimensions: '180cm × 120cm',
    inStock: true
  }
]

export const WOOD_COMPARISON_ITEMS: WoodComparisonItem[] = [
  {
    feature: 'Core Material',
    description: 'What goes inside your furniture matters most for long-term health and stability.',
    ourWood: {
      status: 'yes',
      title: '100% Solid Kiln-Dried Hardwood',
      detail: 'Thick, unadulterated solid timber with natural living grain throughout. No sawdust fillers, ever.'
    },
    theirWood: {
      status: 'no',
      title: 'Composite Particleboard & MDF',
      detail: 'Pressed scrap sawdust held together by synthetic binders and paper-thin 0.3mm faux veneer.'
    }
  },
  {
    feature: 'Moisture Equilibrium & Stability',
    description: 'Proper drying determines whether wood splits, buckles, or warps over seasons.',
    ourWood: {
      status: 'yes',
      title: 'Precision Kiln-Dried to 6%–8% MC',
      detail: 'Computer-controlled climate chambers cure the wood to prevent warping, checking, or seasonal expansion.'
    },
    theirWood: {
      status: 'no',
      title: 'Unmonitored / Fast Air-Dried (>15% MC)',
      detail: 'Moisture trapped in cores causes bowing, cracked tabletops, and mold when home heating is turned on.'
    }
  },
  {
    feature: 'Joinery & Structural Craft',
    description: 'How individual components are joined together determines generational durability.',
    ourWood: {
      status: 'yes',
      title: 'Hand-Cut Mortise & Tenon and Dovetails',
      detail: 'Interlocking mechanical wood joints that hold hundreds of kilograms without wobble or fatigue.'
    },
    theirWood: {
      status: 'no',
      title: 'Plastic Cam-Locks, Nails & Cheap Glue',
      detail: 'Fragile dowels that strip on disassembly and structural failure after a single household move.'
    }
  },
  {
    feature: 'Finishing & Indoor Air Quality',
    description: 'The oils and coatings touching your food, skin, and home living environment.',
    ourWood: {
      status: 'yes',
      title: 'Zero-VOC Organic Hardwax Oils',
      detail: 'Natural linseed oil, carnauba, and beeswax. 100% food-safe and safe for infants, children, and pets.'
    },
    theirWood: {
      status: 'no',
      title: 'High-VOC Polyurethane Lacquers',
      detail: 'Off-gasses formaldehyde and toxic solvents into living spaces for up to 18 months.'
    }
  },
  {
    feature: 'Durability & Lifespan',
    description: 'Whether you buy once for life, or replace every two to three years in landfills.',
    ourWood: {
      status: 'yes',
      title: '50+ Years (Generational Heirloom)',
      detail: 'Can be sanded, re-oiled, and passed down to future generations. Backed by our Lifetime Warranty.'
    },
    theirWood: {
      status: 'no',
      title: '1 to 3 Years (Landfill Bound)',
      detail: 'Edges chip, corners swell upon minor water contact, and veneer peels irreversibly.'
    }
  }
]

export const TRUST_FEATURES: TrustFeatureItem[] = [
  {
    id: 'fast-shipping',
    title: 'Fast Shipping',
    subtitle: 'Doorstep delivery',
    icon: 'truck',
    badgeText: 'Dispatched in 24-48h'
  },
  {
    id: 'price-match',
    title: 'Price-match guarantee',
    subtitle: 'Safe money when ordering with us',
    icon: 'shield-check',
    badgeText: 'Best Value'
  },
  {
    id: 'hassle-free-exchange',
    title: 'Hassle-free exchange',
    subtitle: 'T&C Apply',
    icon: 'refresh',
    badgeText: '30-Day Window'
  },
  {
    id: 'five-star-reviews',
    title: '5 Star Reviews',
    subtitle: 'Customer satisfaction No.1 priority',
    icon: 'star',
    badgeText: '1,400+ Verified'
  }
]
