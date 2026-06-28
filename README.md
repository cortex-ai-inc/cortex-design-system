# Cortex Design System

The official design system for Cortex AI — a **dark-only**, **shadcn/ui-based** component library and design language used across Cortex products.

> **Status:** Active — documented from `cortex-support-front`, `cortex-coder-front`, and `cortex-coder-home`.

---

## Design Principles

1. **Dark by default** — no light mode. The interface lives in deep charcoal/obsidian surfaces.
2. **Tonal layering** over drop shadows — surfaces distinguish hierarchy through background color shifts, not shadows.
3. **Blue gradient accent** — `#ADC6FF → #4D8EFF` is the primary gradient. Used for buttons, active indicators, links.
4. **Compact & efficient** — 13px body text, tight spacing, New York style rounding (`0.5rem` / 8px base radius).
5. **Semantic color, not decorative** — green for success, red for errors, yellow for warnings. Every color carries meaning.
6. **Accessibility-first** — proper contrast ratios, focus indicators, ARIA attributes.
7. **Developer experience** — Tailwind CSS + `class-variance-authority` + `clsx` + `tailwind-merge` = type-safe, composable styling.

## Stack

| Layer | Technology |
|---|---|
| Runtime | React 19 + TypeScript 5.9 |
| Styling | Tailwind CSS 3.4 + CVA + clsx + tailwind-merge |
| Animations | tailwindcss-animate + tw-animate-css |
| UI Primitives | Radix UI v1 (headless, accessible) |
| Component Library | shadcn/ui (New York style) |
| Icons | lucide-react 0.562 |
| Fonts | Inter (body), JetBrains Mono (code) |
| Forms | react-hook-form + Zod v4 |
| Toast | sonner v2 |
| Rich Text | TipTap (StarterKit, Image, Link, Placeholder) |

## Repository Structure

```
cortex-design-system/
├── index.html                 # Landing page
├── assets/
│   └── styles.css             # Shared design system styles
├── pages/
│   ├── getting-started/
│   │   ├── overview.html      # Design principles & philosophy
│   │   └── installation.html  # Setup & usage guide
│   ├── tokens/
│   │   ├── colors.html        # Color palette & tokens
│   │   ├── typography.html    # Font scale & text utilities
│   │   ├── spacing-and-radius.html
│   │   ├── shadows.html       # Box shadows
│   │   └── animations.html    # Keyframes & transitions
│   ├── components/
│   │   ├── button.html
│   │   ├── badge.html
│   │   ├── card.html
│   │   ├── dialog.html
│   │   ├── form.html
│   │   ├── input.html
│   │   ├── select.html
│   │   ├── checkbox.html
│   │   ├── switch.html
│   │   ├── tabs.html
│   │   ├── avatar.html
│   │   ├── dropdown-menu.html
│   │   ├── sidebar.html
│   │   ├── topbar.html
│   │   ├── notification.html
│   │   ├── spinner.html
│   │   ├── skeleton.html
│   │   ├── tooltip.html
│   │   ├── table.html
│   │   ├── toast.html
│   │   ├── progress.html
│   │   ├── status-dot.html
│   │   ├── pagination.html
│   │   ├── breadcrumb.html
│   │   ├── item.html
│   │   ├── field.html
│   │   ├── input-group.html
│   │   ├── empty-state.html
│   │   ├── accordion.html
│   │   ├── command-palette.html
│   │   └── modal.html
│   └── patterns/
│       ├── layout.html
│       ├── navigation.html
│       ├── forms.html
│       ├── iconography.html
│       ├── rich-text.html
│       └── chat.html
└── README.md
```

## Projects Using Cortex Design System

| Project | Description |
|---|---|
| [cortex-support-front](https://github.com/cortex-ai-inc/cortex-support-front) | Support dashboard — ticket management, admin panel, notifications |
| [cortex-coder-front](https://github.com/cortex-ai-inc/cortex-coder-front) | AI coding assistant web app — pipelines, chat, code editing |
| [cortex-coder-home](https://github.com/cortex-ai-inc/cortex-coder-home) | Marketing / landing site |

## Quick Start

```bash
# Install dependencies
npm install class-variance-authority clsx tailwind-merge lucide-react

# Tailwind config — extend with cortex theme
# See pages/getting-started/installation.html for full config
```

Add to your `tailwind.config.js`:

```js
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'surface-dim': '#111319',
        'surface-container-lowest': '#0C0E14',
        'surface-container-low': '#191B22',
        'surface-container-high': '#282A30',
        'surface-container-highest': 'rgba(40, 42, 48, 0.70)',
        'k-primary': '#ADC6FF',
        'k-primary-container': '#4D8EFF',
        'on-surface': '#E2E2E5',
        'on-surface-variant': '#C2C6D6',
        'k-secondary': '#4ADE80',
        'k-error': '#F87171',
        'k-warning': '#FBBF24',
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
}
```

## License

Internal — Cortex AI Inc.
