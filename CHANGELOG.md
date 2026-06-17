# CHANGELOG – ANMOL Art Production Audit

## [1.0.1] – 2026-06-17

### 🔴 Security Fixes
- Added security warning to `AdminLogin.tsx` documenting VITE_ADMIN_PASSWORD client-side exposure risk
- Added `VITE_ADMIN_PASSWORD` fallback to prevent runtime crash on missing env var
- Supabase env var guards in `lib/supabase.ts` — throws descriptive error if env vars are not set
- Created `.env.example` with documentation for all environment variables
- Added `crossorigin` and `referrerpolicy` to Font Awesome CDN script in `index.html`

### 🔧 Build & Configuration
- **ESLint**: Added TypeScript-aware linting — previous config only linted `.js/.jsx`, completely ignoring all TypeScript files
- **TypeScript**: Enabled `strict: true` and `noUnusedLocals: true` (was `false`)
- **Vite**: Converted `vite.config.js` → `vite.config.ts` (typed); removed old JS config
- **Vite**: Added `rollupOptions.manualChunks` for bundle splitting (`react-vendor`, `supabase`)
- **tsconfig.node.json**: Updated include path from `vite.config.js` to `vite.config.ts`
- **tsconfig.json**: Added `src/_archive` exclusion to prevent dead code from being type-checked

### 📦 Dependencies
Removed **13 unused dependencies** (~2.5MB bundle reduction):
- `@react-three/drei`, `@react-three/fiber`, `three` (~600KB — only used by unused 3DViewer)
- `fuse.js` (only used by unused SearchBar)
- `html2canvas`, `jspdf` (not used anywhere)
- `react-markdown`, `react-simple-typewriter` (not used anywhere)
- `zustand` (not used anywhere)
- `axios` (not used — native fetch was used instead)
- `@hookform/resolvers`, `react-hook-form`, `zod` (only used by unused ContactForm)
- `react-ga4` (only used by unused analytics hooks)

Removed **3 unused devDependencies**:
- `@testing-library/react`, `vitest` (no test files exist)
- `postcss-selector-parser` (not needed directly)

Added:
- `typescript-eslint` — proper TypeScript ESLint integration

### 🏗️ Code Quality
- **Removed inline `<style>` blocks** from `Hero.tsx`, `AdminLogin.tsx`, `WhatsAppFloat.tsx`
- **Moved animations to `index.css`**: `kenburns`, `shake`, `ping`, `fadeIn`, `blur-in`
- **Fixed all `catch (err: any)`** → `catch (err: unknown)` with `instanceof Error` guard in `GalleryManager.tsx` and `UploadSection.tsx`
- **Fixed duplicate `prevSlide`** — wrapped in `useCallback` for consistency with `nextSlide` in `Hero.tsx`
- **Fixed type imports** — changed `import { Type }` to `import type { Type }` across admin components
- **Cleaned up `src/types/index.ts`** — removed dead types only used by archived components
- **Added `ImportMetaEnv` interface** to `vite-env.d.ts` for typed environment variables
- **Added `.webp` module declaration** to `vite-env.d.ts`
- **Fixed double fragment `</></>`** syntax error in `UploadSection.tsx`
- **Deleted stub declaration files**: `src/react-icons.d.ts`, `src/react-ga4.d.ts` (unnecessary — packages have their own types)
- **Deleted stray file**: `test.txt`

### 🔁 Dead Code Archived
Moved to `src/_archive/` (never imported, safe to remove later):
- `Blog.tsx` — not routed anywhere
- `LiveChat.tsx` — not rendered anywhere
- `Newsletter.tsx` — not rendered anywhere
- `SearchBar.tsx` — not rendered anywhere
- `ContactForm.tsx` — calls `/api/send-email` which doesn't exist
- `3DViewer.tsx` — requires removed Three.js packages
- `useSearch.ts` — only used by dead SearchBar
- `useTheme.ts` — never called (no dark mode toggle in UI)
- `useAnalytics.ts` — never called
- `src/data/blog.ts` — only used by dead Blog
- `src/data/gallery.ts` — only used by dead SearchBar

### ⚡ Performance
- **Bundle splitting**: React+Router and Supabase now in separate chunks (better caching)
- **Lazy loading**: `Stock` and `AdminPanel` now lazy-loaded with `React.lazy` + `Suspense`
- **PageLoader component**: Consistent loading indicator during code-split navigation
- **Image optimization**: Added `decoding="async"` to gallery images in `Stock.tsx`
- **Font deduplication**: Removed duplicate Google Fonts load from `index.html` (Cormorant Garamond, Jost were conflicting with Playfair Display, Inter in index.css)

### ♿ Accessibility
- Added `role="dialog"` and `aria-modal="true"` to stock gallery lightbox
- Added `role="alert"`, `aria-live="polite"`, `aria-atomic="true"` to `Toast.tsx`
- Added `role="group"` with `aria-label` to filter button groups in `Stock.tsx`
- Added `aria-pressed` to active filter buttons
- Added `role="button"`, `tabIndex={0}`, `onKeyDown` (Enter/Space) to gallery image cards
- Added `aria-hidden="true"` to all decorative Font Awesome icons across all components
- Added `aria-label` to all icon-only social links in `Contact.tsx` and `Footer.tsx`
- Added `aria-label` to all icon-only buttons in `Stock.tsx` (close, prev, next)
- Added `aria-live="polite"` to lightbox counter
- Added `focus-visible:ring` styles to navigation buttons in `Hero.tsx`
- Added global `focus-visible` outline styles in `index.css`
- Added skip-to-main-content link in `index.html`
- Added `id="main-content"` to `<main>` element in `App.tsx`
- Added `aria-hidden` to background pattern decorative divs

### 🗺️ Routing
- Added **404 Not Found page** — previously unmatched URLs showed blank content
- Consolidated `/collections/wood`, `/collections/decor`, etc. into single `/collections/:category` dynamic route
- `Stock.tsx` now reads `useParams(:category)` to auto-filter gallery by URL category

### 🌐 SEO & HTML
- Fixed `index.html` font conflict (was loading 2 sets of Google Fonts simultaneously)
- Added `<meta name="robots" content="index, follow" />`
- Formatted structured data JSON-LD for readability
- Fixed `theme-color` meta to match exact brand color `#5D001E`
- Removed duplicate preconnect tags
- Added `crossorigin="anonymous"` to Font Awesome CDN for security

### 🔐 Security (WhatsApp URLs)
- Fixed WhatsApp URL in `Stock.tsx` lightbox to use `encodeURIComponent()` for item names — prevents URL injection

---

## Files Changed Summary

| File | Action |
|------|--------|
| `eslint.config.js` | Modified — added TypeScript ESLint |
| `tsconfig.json` | Modified — strict mode + archive exclusion |
| `tsconfig.node.json` | Modified — updated vite config reference |
| `vite.config.ts` | Created — typed config with code splitting |
| `vite.config.js` | Deleted |
| `package.json` | Modified — removed 13 deps, added typescript-eslint |
| `index.html` | Modified — font fix, accessibility, SEO |
| `src/index.css` | Modified — consolidated animations, font fix |
| `src/vite-env.d.ts` | Modified — typed env vars |
| `src/App.tsx` | Modified — lazy loading, 404 route |
| `src/lib/supabase.ts` | Modified — env guards |
| `src/types/index.ts` | Modified — removed dead types |
| `src/components/Hero.tsx` | Modified — useCallback, removed inline style |
| `src/components/Stock.tsx` | Rewritten — useParams, keyboard nav, accessibility |
| `src/components/AdminPanel.tsx` | Modified — type imports, aria-hidden |
| `src/components/AdminLogin.tsx` | Modified — removed inline style, security comment |
| `src/components/Contact.tsx` | Modified — aria-labels |
| `src/components/Footer.tsx` | Modified — aria-labels, aria-hidden |
| `src/components/WhatsAppFloat.tsx` | Modified — removed inline style |
| `src/components/admin/GalleryManager.tsx` | Modified — catch unknown, aria-hidden |
| `src/components/admin/UploadSection.tsx` | Modified — catch unknown, aria-hidden |
| `src/components/admin/CategoryManager.tsx` | Modified — type imports, aria-hidden |
| `src/components/admin/Toast.tsx` | Modified — role=alert, aria-live |
| `src/react-icons.d.ts` | Deleted |
| `src/react-ga4.d.ts` | Deleted |
| `test.txt` | Deleted |
| `.env.example` | Created |
| `src/_archive/` | Created — archived 11 dead code files |
