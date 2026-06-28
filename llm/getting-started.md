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

Extend your `tailwind.config.js` with:

```js
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
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
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.2" },
          "100%": { transform: "scale(1.5)", opacity: "0" },
        },
        "accordion-down": {
          "0%": { height: "0" },
          "100%": { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          "0%": { height: "var(--radix-accordion-content-height)" },
          "100%": { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "fade-in": "fade-in 200ms ease-out",
        "slide-up": "slide-up 200ms ease-out",
        "pulse-ring": "pulse-ring 2s linear infinite",
        "accordion-down": "accordion-down 200ms ease-out",
        "accordion-up": "accordion-up 200ms ease-out",
        "caret-blink": "caret-blink 1.25s step-end infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}
```

## CSS Variables

Add to your root CSS:

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

## Body Styles

```css
body {
  background-color: #111319;
  color: #E2E2E5;
  font-family: "Inter", system-ui, sans-serif;
  font-size: 13px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
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

Add to your CSS:

```css
.text-display-sm { font-size: 2.25rem; font-weight: 700; letter-spacing: -0.02em; }
.text-title-sm { font-size: 1rem; font-weight: 600; letter-spacing: -0.02em; }
.text-body-sm { font-size: 0.8125rem; font-weight: 400; line-height: 1.5; }
.text-label-sm { font-size: 0.6875rem; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; }
.text-code-sm { font-family: "JetBrains Mono", monospace; font-size: 0.75rem; }
.gradient-primary { background: linear-gradient(135deg, #ADC6FF 0%, #4D8EFF 100%); }
.ghost-border { border-color: rgba(194, 198, 214, 0.15); }
.ghost-border-20 { border-color: rgba(194, 198, 214, 0.20); }
```
