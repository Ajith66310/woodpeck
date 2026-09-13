# Preact + Vite + TypeScript Starter

A modern, fast, and scalable Preact application template configured with TypeScript, rich CSS styling, and an intuitive directory architecture.

---

## 📁 Directory Architecture

```
testpreact/
├── public/                 # Static assets served at root
├── src/
│   ├── assets/             # Icons, logos, and images
│   ├── components/         # Modular UI components
│   │   ├── common/         # Atomic primitives (Button, Card, Badge, etc.)
│   │   └── layout/         # Shell elements (Navbar, Footer, etc.)
│   ├── context/            # React/Preact context providers (ThemeContext)
│   ├── hooks/              # Custom reusable hooks (useTheme, useLocalStorage)
│   ├── pages/              # View/Route components (Home, StructureGuide, ComponentsShowcase)
│   ├── services/           # API clients, local storage handlers, data services
│   ├── styles/             # Global CSS variables, design tokens, and theme stylesheets
│   ├── types/              # TypeScript types, contracts, and interfaces
│   ├── utils/              # Pure helper functions, formatters, and utilities
│   ├── app.tsx             # Root application orchestrator
│   ├── index.css           # Global design system styles & tokens
│   └── main.tsx            # DOM entry point mounting Preact
├── index.html              # HTML shell with Google Fonts & metadata
├── package.json            # Scripts and dependencies
├── tsconfig.json           # Root TypeScript configuration
├── tsconfig.app.json       # App-specific compiler configuration
└── vite.config.ts          # Vite build & plugin configuration
```

---

## 🚀 Available Scripts

In the project directory, you can run:

### `npm run dev`
Runs the app in development mode with instant Vite Hot Module Replacement (HMR).  
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### `npm run build`
Type-checks the TypeScript code with `tsc` and compiles the optimized production bundle with Vite into the `dist/` directory.

### `npm run preview`
Locally preview the production build after running `npm run build`.

---

## 🎨 Design System & Theming

- **Tokens**: Defined in `src/styles/variables.css` using HSL colors.
- **Dark/Light Mode**: Managed automatically via `ThemeContext` (`src/context/ThemeContext.tsx`) and persisted to localStorage.
- **Typography**: Inter for crisp UI and body text, Poppins for elegant headings and brand accents, and JetBrains Mono for code blocks.
