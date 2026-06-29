# Getting Started

## Prerequisites

- React 19
- TypeScript 5.9+
- Tailwind CSS 3.4+

## Dependencies

### Core

- class-variance-authority
- clsx
- tailwind-merge
- lucide-react

### Add as needed

- @radix-ui/react-...(whatever primitives you need)
- react-hook-form + @hookform/resolvers + zod (forms)
- sonner (toasts)
- @tiptap/react + extensions (rich text)
- cmdk (command palette)
- vaul (drawer)
- embla-carousel-react (carousel)
- recharts (charts)
- react-resizable-panels (resizable panels)

## Tailwind Configuration

This is the **exact** config shipped by the Cortex products (`cortex-coder-front`, `cortex-support-front`). It has **two color layers**:

1. **shadcn semantic tokens** (`border`, `primary`, `card`, …) wired to the HSL CSS variables below. These power every shadcn/ui component — without them classes like `bg-primary`, `border-border`, and `text-card-foreground` silently produce nothing.
2. **Cortex brand/surface tokens** (`surface-*`, `k-*`, `on-surface*`) used directly for the dark theme and the gradient accent.

Note there is **no `fontSize` block** — typography is delivered via the `.text-*` utility classes (see [Typography Utilities](#typography-utilities)) plus the default Tailwind scale.

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // ── shadcn semantic layer (HSL vars defined in CSS) ──
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // ── Cortex brand / surface layer ──
        "surface-dim": "#111319",
        "surface-container-lowest": "#0C0E14",
        "surface-container-low": "#191B22",
        "surface-container-high": "#282A30",
        "surface-container-highest": "rgba(40, 42, 48, 0.70)",
        "k-primary": "#ADC6FF",
        "k-primary-container": "#4D8EFF",
        "on-surface": "#E2E2E5",
        "on-surface-variant": "#C2C6D6",
        "k-secondary": "#4ADE80",
        "k-error": "#F87171",
        "k-warning": "#FBBF24",
      },
      fontFamily: {
        inter: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        ambient: "0 32px 64px rgba(0, 0, 0, 0.12)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.2" },
          "100%": { transform: "scale(1.5)", opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "pulse-ring": "pulse-ring 2s linear infinite",
        "fade-in": "fade-in 200ms ease-out",
        "slide-up": "slide-up 200ms ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

> `@tailwindcss/typography` is added on top in products that render rich text (`cortex-support-front`). Add it only if you need `prose` classes.

## CSS Variables

The system is **dark-only**, so the dark palette lives directly on `:root` (no light block, no theme toggle). Wrap these in `@layer base`. `cortex-coder-front` is the one product that keeps a light `:root` and applies these under a `.dark` class on `<html>` — for a new app, prefer the dark-on-`:root` form below.

```css
:root {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --popover: 222.2 84% 4.9%;
  --popover-foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 212.7 26.8% 83.9%;
  --radius: 0.5rem;
  --sidebar-background: 240 5.9% 10%;
  --sidebar-foreground: 240 4.8% 95.9%;
  --sidebar-primary: 224.3 76.3% 48%;
  --sidebar-primary-foreground: 0 0% 100%;
  --sidebar-accent: 240 3.7% 15.9%;
  --sidebar-accent-foreground: 240 4.8% 95.9%;
  --sidebar-border: 240 3.7% 15.9%;
  --sidebar-ring: 217.2 91.2% 59.8%;
}
```

## Base Styles

Add to your root CSS inside `@layer base` (this is the exact base layer the products ship — note the dark-only `:root` above, the `border-border` reset, the 16px input bump that stops iOS auto-zoom, and the dark scrollbars):

```css
@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-surface-dim text-on-surface antialiased font-inter;
    font-size: 13px;
    line-height: 1.5;
    -webkit-tap-highlight-color: transparent;
  }

  /* iOS Safari auto-zooms when focusing a control whose font-size < 16px. */
  @media (max-width: 767px) {
    input, select, textarea { font-size: 16px !important; }
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-inter tracking-tight;
    letter-spacing: -0.02em;
  }

  code, .font-mono {
    font-family: "JetBrains Mono", monospace;
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(194, 198, 214, 0.2) transparent;
  }
  ::-webkit-scrollbar { width: 8px; height: 8px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(194, 198, 214, 0.18); border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(194, 198, 214, 0.3); }
  ::-webkit-scrollbar-corner { background: transparent; }
}
```

## Font Loading

```html
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
  rel="stylesheet"
>
```

## cn() Utility

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## shadcn/ui components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

## Typography Utilities

The type scale and the brand helpers live in `@layer utilities`. These class names (`text-display-sm`, `text-label-sm`, …) intentionally **override** any same-named Tailwind size, so they always win — that is why labels render uppercase and page titles render at 36px even though the config defines no `fontSize` block.

```css
@layer utilities {
  .text-label-sm {
    font-size: 0.6875rem;       /* 11px */
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  .text-body-sm {
    font-size: 0.8125rem;       /* 13px — default body */
    font-weight: 400;
    line-height: 1.5;
  }
  .text-title-sm {
    font-size: 1rem;            /* 16px */
    font-weight: 600;
    letter-spacing: -0.02em;
  }
  .text-display-sm {
    font-size: 2.25rem;         /* 36px — page / hero titles */
    font-weight: 700;
    letter-spacing: -0.02em;
  }
  /* Page titles scale down on phones so header rows don't dominate the fold. */
  @media (max-width: 639px) {
    .text-display-sm { font-size: 1.625rem; }
  }
  .text-code-sm {
    font-size: 0.75rem;         /* 12px */
    font-weight: 400;
    font-family: "JetBrains Mono", monospace;
  }

  .gradient-primary {
    background: linear-gradient(135deg, #ADC6FF 0%, #4D8EFF 100%);
  }
  .ghost-border { border-color: rgba(194, 198, 214, 0.15); }
  .ghost-border-20 { border-color: rgba(194, 198, 214, 0.20); }
}
```

Everything else (`text-sm`, `text-xs`, `text-lg`, …) uses the default Tailwind scale. There is deliberately **no custom `fontSize` config** — keep it that way so consuming apps stay consistent.

## Framework Notes

The hex palette is identical across every Cortex product; only the framework plumbing differs. This guide targets the **React + Tailwind v3** stack (`cortex-coder-front`, `cortex-support-front`, `cortex-note-app`) — the config and CSS above are copied verbatim from those apps. Two variants exist:

### Astro + Tailwind v4 (`cortex-coder-home`)

No `tailwind.config.js`. Tokens are declared inline with `@theme` in the global CSS, and helpers use `@utility`:

```css
@theme {
  --color-surface-dim: #111319;
  --color-surface-lowest: #0c0e14;   /* note: "surface-lowest", not "surface-container-lowest" */
  --color-surface-low: #191b22;
  --color-surface-high: #282a30;
  --color-primary: #adc6ff;
  --color-primary-container: #4d8eff;
  --color-secondary: #4ade80;
  --color-warning: #fbbf24;
  --color-error: #f87171;
  --color-on-surface: #e2e2e5;
  --color-on-surface-variant: #c2c6d6;
}
@utility gradient-primary { background: linear-gradient(135deg, #adc6ff 0%, #4d8eff 100%); }
```

The surface tokens drop the `-container-` infix (`surface-low` instead of `surface-container-low`). Same hex values.

### Astro + Starlight (`cortex-coder-docs`)

The docs site maps the Cortex palette onto Starlight's `--sl-color-*` variables and adds a few **doc-only neutrals** not in the core palette:

| Extra token | Hex | Usage |
|---|---|---|
| heading white | `#f2f3f5` | Strongest heading text (`--sl-color-white`) |
| muted | `#9aa0b4` | Muted body text (`--sl-color-gray-3`) |
| faint | `#6b7180` | Faint text (`--sl-color-gray-4`) |
| accent-low | `#15294d` | Dark blue accent shade derived from the gradient |

Brand accent maps to `--sl-color-accent: #4d8eff` / `--sl-color-accent-high: #adc6ff`; the gradient helper is `.cc-gradient-text`. These extras are specific to the documentation theme — do not introduce them into product apps.
