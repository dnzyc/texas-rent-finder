# Design

## Visual Theme

Editorial Luxury × Soft Structuralism: Warm off-white light mode, deep navy dark mode. Yüksek kontrastlı tipografi, geniş whitespace, premium kart yapıları. Real estate kategorisine uygun, warm ama modern.

## Color System

### Primary Palette
- **Primary**: Emerald 600 (#059669) — trust, growth, Texas green
- **Primary Dark**: Emerald 400 (#34d399) — dark mode accent
- **Secondary**: Blue 600 (#2563EB) — professionalism, sky
- **Accent**: Amber 400 (#FBBF24) — ratings, warmth, stars

### Neutrals
- **Background Light**: Gray 50 (#F9FAFB)
- **Background Dark**: Gray 950 (#030712)
- **Surface Light**: White (#FFFFFF)
- **Surface Dark**: Gray 900 (#111827)
- **Text Light**: Gray 900 (#111827)
- **Text Dark**: Gray 50 (#F9FAFB)
- **Muted Light**: Gray 500 (#6B7280)
- **Muted Dark**: Gray 400 (#9CA3AF)

### Semantic
- **Success**: Emerald 600
- **Error**: Red 500
- **Warning**: Amber 500
- **Info**: Blue 500

## Typography

### Font Stack
- **Display/Heading**: Geist Sans (system, variable)
- **Body**: Geist Sans
- **Monospace**: Geist Mono

### Scale
- **Display**: 3.5rem (56px) — Hero h1
- **H1**: 2.5rem (40px)
- **H2**: 1.875rem (30px)
- **H3**: 1.25rem (20px)
- **Body**: 1rem (16px)
- **Small**: 0.875rem (14px)
- **Caption**: 0.75rem (12px)

### Weights
- **Bold**: 700 (headings)
- **Semibold**: 600 (card titles, emphasis)
- **Medium**: 500 (buttons, labels)
- **Regular**: 400 (body text)

## Spacing

4px grid system:
- 1: 4px
- 2: 8px
- 3: 12px
- 4: 16px
- 5: 20px
- 6: 24px
- 8: 32px
- 10: 40px
- 12: 48px
- 16: 64px
- 20: 80px
- 24: 96px

## Border Radius

- **None**: 0 (sharp)
- **SM**: 6px (inputs, small elements)
- **MD**: 8px (cards, containers)
- **LG**: 12px (large cards, modals)
- **XL**: 16px (feature cards)
- **Full**: 9999px (pills, badges)

## Shadows

- **SM**: 0 1px 2px rgba(0,0,0,0.05)
- **MD**: 0 4px 6px -1px rgba(0,0,0,0.1)
- **LG**: 0 10px 15px -3px rgba(0,0,0,0.1)
- **XL**: 0 20px 25px -5px rgba(0,0,0,0.1)

## Components

### Cards
- Light: bg-white, border-gray-100, rounded-xl
- Dark: bg-gray-900, border-gray-800, rounded-xl
- Hover: border-emerald-200, shadow-lg
- Active: bg-amber-50, ring-1 ring-amber-300

### Buttons
- Primary: bg-emerald-600, text-white, rounded-xl
- Secondary: border-2 border-gray-300, text-gray-700, rounded-xl
- Ghost: text-gray-600, hover:bg-gray-100, rounded-xl
- Size: px-6 py-3 (default), px-4 py-2 (sm)

### Inputs
- Default: bg-white, border-gray-200, rounded-lg
- Focus: ring-2 ring-emerald-500, border-emerald-500
- Dark: bg-gray-900, border-gray-700

### Navigation
- Fixed top, bg-white/80 backdrop-blur-xl
- Dark: bg-gray-950/80
- Height: 56px (h-14)

## Layout

- **Max width**: 1280px (max-w-7xl)
- **Grid**: 12-column, gap-8 (32px)
- **Section padding**: py-24 (96px) — generous whitespace
- **Card grid**: repeat(auto-fit, minmax(280px, 1fr))

## Motion

- **Default**: duration-300, ease-out
- **Fast**: duration-150
- **Slow**: duration-500
- **Spring**: cubic-bezier(0.32, 0.72, 0, 1)
- **Scroll reveal**: translate-y-8, opacity-0 → translate-y-0, opacity-100
- **Reduced**: prefers-reduced-motion: reduce → instant/crossfade

## Z-Index Scale

- Base: 0
- Dropdown: 10
- Sticky: 20
- Nav: 30
- Modal backdrop: 40
- Modal: 50
- Toast: 60
- Tooltip: 70

## Dark Mode

Class-based (`.dark` on `<html>`). CSS variables in `globals.css`. Tailwind `dark:` variants. Manual toggle with localStorage persistence + prefers-color-scheme.
