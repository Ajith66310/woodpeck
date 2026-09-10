import { useState } from 'preact/hooks'
import { Card } from '../components/common/Card.tsx'
import { Badge } from '../components/common/Badge.tsx'
import { Button } from '../components/common/Button.tsx'
import { copyToClipboard } from '../utils/helpers.ts'

interface FolderInfo {
  name: string
  path: string
  purpose: string
  contents: string[]
  bestPractices: string
  exampleCode: string
}

const FOLDERS: FolderInfo[] = [
  {
    name: 'src/components/common/',
    path: 'src/components/common',
    purpose: 'Reusable, presentational UI building blocks used across various pages.',
    contents: ['Button.tsx', 'Card.tsx', 'Badge.tsx', 'Modal.tsx', 'Input.tsx'],
    bestPractices: 'Keep components pure and stateless when possible. Pass data via props and actions via callbacks.',
    exampleCode: `// src/components/common/Button.tsx
import type { ComponentChildren } from 'preact'

interface ButtonProps {
  children: ComponentChildren
  onClick?: () => void
  variant?: 'primary' | 'secondary'
}

export function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return <button className={\`btn btn-\${variant}\`} onClick={onClick}>{children}</button>
}`
  },
  {
    name: 'src/components/layout/',
    path: 'src/components/layout',
    purpose: 'Global frame and shell components defining the structural layout of the application.',
    contents: ['Navbar.tsx', 'Footer.tsx', 'Sidebar.tsx', 'Container.tsx'],
    bestPractices: 'Houses navigation headers, footers, responsive wrappers, and persistent banners.',
    exampleCode: `// src/components/layout/Navbar.tsx
export function Navbar() {
  return (
    <header className="navbar">
      <div className="brand">Preact App</div>
      <nav>...</nav>
    </header>
  )
}`
  },
  {
    name: 'src/context/',
    path: 'src/context',
    purpose: 'Global state managers using Preact createContext to provide values across component trees.',
    contents: ['ThemeContext.tsx', 'AuthContext.tsx', 'UserContext.tsx'],
    bestPractices: 'Separate disparate state concerns into individual contexts to avoid unnecessary re-renders.',
    exampleCode: `// src/context/ThemeContext.tsx
import { createContext } from 'preact'
import { useState } from 'preact/hooks'

export const ThemeContext = createContext({ theme: 'dark', toggle: () => {} })

export function ThemeProvider({ children }: { children: any }) {
  const [theme, setTheme] = useState('dark')
  return (
    <ThemeContext.Provider value={{ theme, toggle: () => setTheme(t => t === 'dark' ? 'light' : 'dark') }}>
      {children}
    </ThemeContext.Provider>
  )
}`
  },
  {
    name: 'src/hooks/',
    path: 'src/hooks',
    purpose: 'Custom hooks encapsulating stateful business logic and side effects.',
    contents: ['useTheme.ts', 'useLocalStorage.ts', 'useFetch.ts', 'useDebounce.ts'],
    bestPractices: 'Start function names with "use". Keep hooks modular, reusable, and thoroughly testable.',
    exampleCode: `// src/hooks/useLocalStorage.ts
import { useState, useEffect } from 'preact/hooks'

export function useLocalStorage<T>(key: string, initial: T) {
  const [val, setVal] = useState<T>(() => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : initial
  })
  useEffect(() => { localStorage.setItem(key, JSON.stringify(val)) }, [key, val])
  return [val, setVal] as const
}`
  },
  {
    name: 'src/pages/',
    path: 'src/pages',
    purpose: 'Top-level view/screen components mapped to individual routes or major application sections.',
    contents: ['Home.tsx', 'StructureGuide.tsx', 'ComponentsShowcase.tsx', 'NotFound.tsx'],
    bestPractices: 'Orchestrate page-level state and compose smaller common components and layout wrappers.',
    exampleCode: `// src/pages/Home.tsx
import { Card } from '../components/common/Card.tsx'

export function Home() {
  return (
    <main className="page">
      <h1>Welcome</h1>
      <Card title="Featured">Page content goes here</Card>
    </main>
  )
}`
  },
  {
    name: 'src/services/',
    path: 'src/services',
    purpose: 'External communication, API requests, storage abstraction, and third-party integrations.',
    contents: ['api.ts', 'storage.ts', 'auth.service.ts'],
    bestPractices: 'Isolate fetch/axios logic away from components so endpoints and headers are easily maintained.',
    exampleCode: `// src/services/storage.ts
export const storageService = {
  get: <T>(key: string, fallback: T): T => {
    try {
      const v = localStorage.getItem(key)
      return v ? JSON.parse(v) : fallback
    } catch { return fallback }
  },
  set: (key: string, val: any) => localStorage.setItem(key, JSON.stringify(val))
}`
  },
  {
    name: 'src/styles/',
    path: 'src/styles',
    purpose: 'Global CSS variables, design tokens, resets, typography, and utility stylesheets.',
    contents: ['variables.css', 'theme.css', 'index.css'],
    bestPractices: 'Define color palettes, font stacks, and spacing tokens as CSS variables for easy theming.',
    exampleCode: `/* src/styles/variables.css */
:root {
  --font-sans: 'Inter', system-ui, sans-serif;
  --bg-primary: #0b0f19;
  --accent-primary: #673ab8;
}`
  },
  {
    name: 'src/types/',
    path: 'src/types',
    purpose: 'TypeScript interfaces, types, enums, and shared data contracts.',
    contents: ['index.ts', 'api.types.ts', 'user.types.ts'],
    bestPractices: 'Centralize data models so backend responses and frontend props stay strictly synchronized.',
    exampleCode: `// src/types/index.ts
export interface UserProfile {
  id: string
  name: string
  role: 'admin' | 'member'
}`
  },
  {
    name: 'src/utils/',
    path: 'src/utils',
    purpose: 'Stateless helper functions, formatters, date handlers, and mathematical calculations.',
    contents: ['helpers.ts', 'validators.ts', 'formatters.ts'],
    bestPractices: 'Ensure helper functions are pure (no side effects) with clear unit-testable inputs and outputs.',
    exampleCode: `// src/utils/helpers.ts
export function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}`
  }
]

export function StructureGuide() {
  const [selectedFolder, setSelectedFolder] = useState<FolderInfo>(FOLDERS[0])
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const success = await copyToClipboard(selectedFolder.exampleCode)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="page structure-page">
      <div className="page-header">
        <Badge variant="brand">Architecture Blueprint</Badge>
        <h1 className="page-title">Project Folder Structure</h1>
        <p className="page-subtitle">
          Click any directory below to inspect its role, conventions, recommended files, and starter code.
        </p>
      </div>

      <div className="structure-layout">
        {/* Sidebar list of directories */}
        <aside className="structure-nav">
          <div className="nav-header">
            <span>Directories</span>
            <span className="count-badge">{FOLDERS.length}</span>
          </div>
          <div className="nav-items">
            {FOLDERS.map((f) => (
              <button
                key={f.path}
                type="button"
                className={`folder-nav-btn ${selectedFolder.path === f.path ? 'active' : ''}`}
                onClick={() => setSelectedFolder(f)}
              >
                <span className="folder-icon">📁</span>
                <span className="folder-name">{f.name}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Detailed Folder Info */}
        <main className="structure-detail">
          <Card glow>
            <div className="detail-header">
              <div>
                <span className="detail-tag">{selectedFolder.path}</span>
                <h2 className="detail-title">{selectedFolder.name}</h2>
              </div>
              <Badge variant="info">Modular Unit</Badge>
            </div>

            <div className="detail-section">
              <h4>🎯 Primary Purpose</h4>
              <p>{selectedFolder.purpose}</p>
            </div>

            <div className="detail-section">
              <h4>📋 Typical Files</h4>
              <div className="file-pills">
                {selectedFolder.contents.map((file) => (
                  <span key={file} className="file-pill">
                    📄 {file}
                  </span>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <h4>💡 Architectural Best Practices</h4>
              <div className="tip-box">
                <span className="tip-icon">✨</span>
                <span>{selectedFolder.bestPractices}</span>
              </div>
            </div>

            <div className="detail-section">
              <div className="code-header">
                <h4>💻 Example Implementation</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                >
                  {copied ? '✓ Copied!' : 'Copy Code'}
                </Button>
              </div>
              <pre className="code-block">
                <code>{selectedFolder.exampleCode}</code>
              </pre>
            </div>
          </Card>
        </main>
      </div>
    </div>
  )
}
