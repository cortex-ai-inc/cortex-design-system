# Cortex Design System — LLM Guide

This repository documents the Cortex Design System used across all Cortex AI products. As an LLM, read this file first to understand the system before answering questions or generating code.

## Repository Map

| Path | What you'll find |
|---|---|
| `CLAUDE.md` (this file) | Design principles, quick-reference tokens, component index |
| `llm/getting-started.md` | Installation, Tailwind config, setup |
| `llm/design-tokens.md` | Complete color palette, typography, spacing, shadows, animations |
| `llm/components/*.md` | One file per component — variants, props, states, examples |
| `llm/patterns/*.md` | Layout, navigation, forms, iconography, rich text, chat |
| `index.html` | Visual documentation site (human readers) |
| `assets/styles.css` | Shared CSS (design tokens applied) |

## Design Principles

1. **Dark only** — No light mode. All interfaces use deep charcoal/obsidian surfaces.
2. **Tonal layering over shadows** — Surface colors create depth hierarchy, not drop shadows.
3. **Blue gradient accent** — `#ADC6FF → #4D8EFF` is the signature gradient for primary actions.
4. **Compact** — 13px default body text (`text-body-sm`). Information-dense layouts.
5. **Semantic color** — Green = success, red = error, yellow = warning, blue = primary.
6. **shadcn/ui New York style** — `--radius: 0.5rem`, slate base, lucide icons.
7. **Type-safe styling** — Tailwind CSS + `class-variance-authority` + `clsx` + `tailwind-merge`.

## Token Quick Reference

### Surface Colors (Background Hierarchy)

| Token | Hex | Usage |
|---|---|---|
| `surface-dim` | `#111319` | Main app background |
| `surface-container-lowest` | `#0C0E14` | Sidebar background |
| `surface-container-low` | `#191B22` | Cards, panels, content |
| `surface-container-high` | `#282A30` | Hover states, active items |
| `surface-container-highest` | `rgba(40,42,48,0.70)` | Glassmorphism overlays |

### Brand & Text

| Token | Hex | Usage |
|---|---|---|
| `k-primary` | `#ADC6FF` | Light blue accent, gradient start |
| `k-primary-container` | `#4D8EFF` | Darker blue, gradient end, active indicators |
| `on-surface` | `#E2E2E5` | Primary text |
| `on-surface-variant` | `#C2C6D6` | Secondary text, labels, placeholders |

### Semantic Colors

| Token | Hex | Meaning |
|---|---|---|
| `k-secondary` | `#4ADE80` | Success, resolved, active |
| `k-error` | `#F87171` | Error, destructive, critical |
| `k-warning` | `#FBBF24` | Warning, pending, attention |

### Ghost Borders

| Token | Value | Usage |
|---|---|---|
| `ghost-border` | `rgba(194,198,214,0.15)` | Default dividers |
| `ghost-border-20` | `rgba(194,198,214,0.20)` | Emphasized borders, input borders |

`ghost-border` / `ghost-border-20` are **utility classes** (`border-color`), not color tokens. Apply with `border ghost-border`.

### shadcn Semantic Tokens (HSL layer)

Two color layers coexist. Besides the Cortex tokens above, the config maps the standard shadcn tokens to HSL CSS variables — **required** for shadcn components to render. Use Cortex tokens for brand/layout; these come along automatically with shadcn components (focus rings, borders, default fills).

| Token | Notes |
|---|---|
| `background` / `foreground` | App canvas + text (Cortex usually layers `surface-*` on top) |
| `primary` / `primary-foreground` | shadcn primary (Cortex CTAs override with `gradient-primary`) |
| `secondary`, `muted`, `accent`, `popover`, `card` (+ `-foreground`) | Surfaces & fills |
| `destructive` | shadcn destructive (Cortex uses `k-error` tints) |
| `border`, `input`, `ring` | Borders + `focus-visible:ring-ring` |
| `sidebar.*` | Sidebar primitive subtokens |

Full HSL values: `llm/design-tokens.md` → *Semantic (shadcn) Tokens*.

### Typography

| Utility | Size | Weight | Notes |
|---|---|---|---|
| `text-display-sm` | 36px (2.25rem) | 700 | Page titles; shrinks to 26px on mobile |
| `text-title-sm` | 16px (1rem) | 600 | Section headings |
| `text-body-sm` | 13px (0.8125rem) | 400 | **Default body text** |
| `text-label-sm` | 11px (0.6875rem) | 500 | Uppercase, 0.05em letter-spacing |
| `text-code-sm` | 12px (0.75rem) | 400 | JetBrains Mono |

**Fonts**: Inter (body), JetBrains Mono (code).

### Border Radius

Base `--radius: 0.5rem` (8px). Variants: `xs` (2px), `sm` (4px — most common), `md` (6px), `lg`/`xl` (8–12px). **Constraint**: never exceed `0.375rem` (6px) in practice — this overrides shadcn defaults.

### Shadows

Only two shadow tokens. Used exclusively for floating elements (modals, dropdowns, tooltips). Cards and panels use tonal layering instead.

| Token | Value |
|---|---|
| `shadow-xs` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` |
| `shadow-ambient` | `0 32px 64px rgba(0, 0, 0, 0.12)` |

### Animations

| Name | Duration | Easing | Usage |
|---|---|---|---|
| `fade-in` | 200ms | ease-out | Modals, dropdowns, page transitions |
| `slide-up` | 200ms | ease-out | Modal content entry |
| `pulse-ring` | 2s | linear infinite | StatusDot loading |
| `accordion-down/up` | 200ms | ease-out | Accordion expand/collapse |
| `caret-blink` | 1.25s | ease-out infinite | OTP input cursor |

### Gradient Utility

```css
.gradient-primary {
  background: linear-gradient(135deg, #ADC6FF 0%, #4D8EFF 100%);
}
```

### cn() Utility

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Z-Index Layers

| Layer | Elements |
|---|---|
| 0 | Base page content |
| 10 | Sidebar |
| 20 | Topbar |
| 100 | Dropdowns, tooltips, popovers |
| 200 | Modals, dialogs, overlays |

## Component Index

Components live at `@/components/ui/` (path alias `@` → `./src`). See `llm/components/*.md` for full documentation.

| Component | Radix-Based | Key Variants |
|---|---|---|
| Button | Slot (asChild) | default, secondary, destructive, ghost, outline, link |
| Badge | No | default, primary, success, warning, destructive, outline |
| Card | No | header, title, description, content, footer |
| Dialog | Dialog | 3 width tiers (440px/560px/720px) |
| AlertDialog | AlertDialog | Confirmation dialogs |
| DropdownMenu | DropdownMenu | Items: default, destructive |
| Tabs | Tabs | segmented control (active = surface-container-low, no underline) |
| Input | No (native) | h-10, ghost-border-20, focus:ring-2 |
| Textarea | No (native) | Same styling as Input |
| Select | Select | Same styling as Input |
| Checkbox | Checkbox | Checked: bg-k-primary-container |
| Switch | Switch | Checked: bg-k-primary-container, thumb translate-x-4 |
| Avatar | Avatar | rounded-sm, fallback with initials |
| Tooltip | Tooltip | bg-surface-container-high, text-code-sm |
| Progress | Progress | h-2, bg-k-primary-container indicator |
| ScrollArea | ScrollArea | Thin custom scrollbar |
| Separator | Separator | ghost-border opacity |
| Label | Label | text-label-sm weight |
| Form | react-hook-form | FormItem, FormLabel, FormControl, FormMessage |
| Field | No (custom) | vertical/horizontal/responsive orientation |
| Item | No (custom) | default/outline/muted, list item with media/content/actions |
| InputGroup | No (custom) | Input with addons (text/button), 4 alignments |
| ButtonGroup | No (custom) | horizontal/vertical orientation |
| Empty | No (custom) | Empty state with media/icon variant |
| Sidebar | No (custom) | 260px expanded, 72px collapsed, mobile overlay |
| TopBar | No (custom) | h-12, breadcrumbs, notification bell, avatar dropdown |
| Table | No (native) | hover rows, ghost-border dividers |
| Pagination | No (native) | Previous/Next, page links with active state |
| Breadcrumb | No (native) | Chevron separators, route mapping |
| NotificationBell | No (custom) | Bell/BellDot icons, dropdown panel, auto-mark-read |
| StatusDot | No (custom) | 9 statuses, 2 sizes, pulse animation |
| Spinner/Skeleton | No (custom) | Loading states |
| Sheet | Dialog | Side panels (top/right/bottom/left) |
| Drawer | vaul | Mobile bottom sheets |
| Command | cmdk | Command palette with search |
| Sonner | sonner | Toast notifications (dark theme) |
| Accordion | Accordion | Chevron rotation on expand |
| Toggle/ToggleGroup | Toggle | default/outline variants |
| Resizable | react-resizable-panels | Panel resize handles |
| Carousel | embla-carousel-react | Image carousel |
| Chart | recharts | Chart wrapper |
| Calendar | react-day-picker | Date picker |

## Key Constraints

1. **Rectangular by default** — Use `rounded-sm`/`rounded-md` for buttons, cards, inputs, badges. `rounded-full` is reserved for inherently circular elements only: the Switch thumb/track, Spinner/StatusDot, and avatar fallbacks. Cortex badges are `rounded-sm` (not the raw shadcn `rounded-full`).
2. **No 1px borders between major sections** — Use tonal shifts (different surface colors).
3. **Never exceed 6px border-radius** for rectangular elements — Despite shadcn defaults, the products cap practical radius at `rounded-md` (6px).
4. **Primary CTA = gradient with dark text** — `gradient-primary text-surface-container-lowest`. Never put light text (`on-surface`) on the gradient — it fails contrast on the light end.
5. **Icons always `w-4 h-4` with `strokeWidth={1.5}`** — Standard lucide-react sizing.
6. **No modals for create/edit forms** — Always use dedicated pages. Dialog only for AlertDialog confirmations.
7. **Toggle view/edit via `?mode=edit`** query parameter on detail pages.
8. **Form width capped at `max-w-5xl`** — Editor pages at `max-w-6xl`.
9. **Form grid**: `grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5`.
10. **Page headers**: `flex flex-col gap-3 sm:flex-row` (stack on mobile).
11. **Body base**: `bg-surface-dim text-on-surface antialiased font-inter` at 13px.

## How to Use This Documentation

When asked to generate UI code for a Cortex product:

1. **Read `CLAUDE.md` first** (this file) — get the design principles and quick-reference tokens.
2. **Read the relevant `llm/components/*.md`** — understand the component's variants, props, and constraints.
3. **Read `llm/design-tokens.md`** — for colors, typography, spacing details.
4. **Read `llm/patterns/*.md`** — for layout and form patterns when building pages.
5. **All generated code must use**:
   - Tailwind CSS classes (not inline styles except for dynamic values)
   - The `cn()` utility for class merging
   - shadcn/ui import patterns (`@/components/ui/xxx`)
   - The exact color tokens defined above
   - `w-4 h-4` with `strokeWidth={1.5}` for all lucide icons
