import type { ComponentChildren } from 'preact'

export type Theme = 'dark' | 'light'

export interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

export type NavTab = 'overview' | 'structure' | 'components'

export interface FolderItem {
  id: string
  name: string
  type: 'folder' | 'file'
  description: string
  role: string
  path: string
  items?: FolderItem[]
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ComponentChildren
  onClick?: () => void
  disabled?: boolean
  className?: string
  icon?: ComponentChildren
  type?: 'button' | 'submit' | 'reset'
}

export interface CardProps {
  title?: string
  subtitle?: string
  children: ComponentChildren
  className?: string
  footer?: ComponentChildren
  glow?: boolean
}

export interface BadgeProps {
  variant?: 'brand' | 'success' | 'warning' | 'info' | 'neutral'
  children: ComponentChildren
  className?: string
}

export interface BannerSlide {
  id: string
  title: string
  highlight: string
  subtitle: string
  badge: string
  image: string
  primaryCtaText: string
  secondaryCtaText: string
  tagline: string
}

export interface Product {
  id: string
  name: string
  category: 'all' | 'tables' | 'seating' | 'panels' | 'kitchenware'
  woodSpecies: string
  price: number
  originalPrice?: number
  rating: number
  reviewsCount: number
  image: string
  tag?: string
  isBestSeller?: boolean
  description: string
  dimensions?: string
  inStock: boolean
}

export interface WoodComparisonItem {
  feature: string
  description: string
  ourWood: {
    status: 'yes'
    title: string
    detail: string
  }
  theirWood: {
    status: 'no'
    title: string
    detail: string
  }
}

export interface TrustFeatureItem {
  id: string
  title: string
  subtitle: string
  icon: string
  badgeText?: string
}
