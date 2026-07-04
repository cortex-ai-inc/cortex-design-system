# Cortex Design System — LLM Guide

This repository documents the Cortex Design System used across all Cortex AI products. As an LLM, read this file first to understand the system before answering questions or generating code.

## Repository Map

| Path | What you'll find |
|---|---|
| `CLAUDE.md` (this file) | Design principles, quick-reference tokens, component index |
| `llm/getting-started.md` | Installation, Tailwind config, setup |
| `llm/design-tokens.md` | Complete color palette, typography, spacing, elevation, motion, interaction states |
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

### Accent Colors (subordinate to blue)

| Token | Hex | Usage |
|---|---|---|
| `k-accent-violet` | `#A78BFA` | AI/intelligence tags, feature badges |
| `k-accent-teal` | `#22D3EE` | Data/metrics highlights, sparklines |
| `k-primary-tint` | `rgba(77,142,255,0.08)` | Info-tinted backgrounds |

Accents **never** appear on buttons, links, focus rings, checked states, or active navigation — those are exclusively blue. ≤10% of any view.

### Data Visualization (charts)

Use in order: `chart-1` `#4D8EFF` · `chart-2` `#A78BFA` · `chart-3` `#22D3EE` · `chart-4` `#F472B6` · `chart-5` `#FBBF24` · `chart-6` `#4ADE80` · `chart-7` `#FB923C` · `chart-8` `#94A3B8`. Two series = chart-1 + chart-5 (color-blind-safe). Grid lines = `ghost-border-10`; status charts use semantic colors instead. Never on UI controls.

### Ghost Borders

| Token | Value | Usage |
|---|---|---|
| `ghost-border-10` | `rgba(194,198,214,0.10)` | Chart grids, sub-hairlines |
| `ghost-border` | `rgba(194,198,214,0.15)` | Default dividers |
| `ghost-border-20` | `rgba(194,198,214,0.20)` | Emphasized borders, input borders |

`ghost-border*` are **utility classes** (`border-color`), not color tokens. Apply with `border ghost-border`.

### shadcn Semantic Tokens (HSL layer)

Two color layers coexist. Besides the Cortex tokens above, the config maps the standard shadcn tokens to HSL CSS variables — **required** for shadcn components to render. Use Cortex tokens for brand/layout; these come along automatically with shadcn components (focus rings, borders, default fills).

| Token | Notes |
|---|---|
| `background` / `foreground` | App canvas + text (Cortex usually layers `surface-*` on top) |
| `primary` / `primary-foreground` | shadcn primary (Cortex CTAs override with `gradient-primary`) |
| `secondary`, `muted`, `accent`, `popover`, `card` (+ `-foreground`) | Surfaces & fills |
| `destructive` | shadcn destructive (Cortex uses `k-error` tints) |
| `border`, `input`, `ring` | Borders + `focus-visible:ring-ring` — `--ring` is **brand blue** (`218 100% 65%` = `#4D8EFF`) |
| `chart-1..8` | Categorical chart palette (`hsl(var(--chart-N))`) |
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

Base `--radius: 0.5rem` (8px). Variants: `xs` (2px), `sm` (4px — most common), `md` (6px). `lg`/`xl` are **clamped to 6px in the config** (compat aliases for stock shadcn code — prefer `rounded-md`). "Never exceed 6px" is true by construction.

### Elevation (shadows)

Cards and panels use tonal layering — **no shadow**. Four tiers for floating elements:

| Token | Value | Tier |
|---|---|---|
| `shadow-xs` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | Switch thumb, tiny details |
| `shadow-overlay` | `0 8px 24px rgba(0, 0, 0, 0.40)` | Dropdowns, selects, tooltips, popovers, command |
| `shadow-ambient` | `0 32px 64px rgba(0, 0, 0, 0.12)` | Modals, dialogs, sheets |
| `shadow-glow-primary` | `0 0 24px 0 rgba(77,142,255,0.25)` | Blue halo — ONLY on `gradient-primary` elements, max 1/viewport (hero CTA, empty-state action) |

### Motion

Durations: `--motion-fast` 150ms (hovers) · `--motion-base` 200ms (entrances/exits) · `--motion-slow` 300ms (sheets/drawers). Easings: `ease-out` (default), `ease-in-out` (movement), `linear` (loops only). Nothing >300ms except loops; no springs; respect `prefers-reduced-motion`.

| Name | Duration | Easing | Usage |
|---|---|---|---|
| `fade-in` | 200ms | ease-out | Modals, dropdowns, page transitions |
| `slide-up` | 200ms | ease-out | Modal content entry |
| `pulse-ring` | 2s | linear infinite | StatusDot loading |
| `accordion-down/up` | 200ms | ease-out | Accordion expand/collapse |
| `caret-blink` | 1.25s | ease-out infinite | OTP input cursor |

### Interaction States

- **Hover**: filled/gradient → `hover:brightness-110`; transparent → fill `bg-surface-container-high` (ghost) or `/50` (bordered). Hover never moves/scales elements.
- **Pressed**: `active:brightness-95` (filled) / `active:bg-surface-container-high/70` (transparent).
- **Checked/active/selected**: `bg-k-primary-container` + dark glyph `text-surface-container-lowest`.
- **Disabled**: `opacity-50` (+ `pointer-events-none` buttons, `cursor-not-allowed` inputs).
- **Focus ring**: always **2px**, brand blue. Compact controls `focus-visible:ring-2 ring-ring ring-offset-2`; form fields `focus:ring-2 ring-k-primary-container/50` (no offset); full-width rows `focus-visible:ring-2 ring-ring/50` (no offset).
- **Semantic tint ladder**: rest `/20` → hover `/30` → border `/40`.
- **Scrim**: `rgba(0,0,0,0.60)` + `backdrop-blur-sm` behind dialogs.

### Control Heights

`sm` h-8 (32px) · **default h-9 (36px)** · `lg` h-10 (40px). Button, Input and Select trigger all default to **h-9** — one form row, one height, zero hacks.

### Gradient Utility

```css
--gradient-primary: linear-gradient(135deg, var(--k-primary) 0%, var(--k-primary-container) 100%);
.gradient-primary { background: var(--gradient-primary); }
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

| Layer | Value | Elements |
|---|---|---|
| base | 0 | Page content |
| sidebar | 10 | Sidebar |
| topbar | 20 | Topbar |
| popover | 100 | Dropdowns, selects, tooltips, popovers, command palette |
| overlay | 150 | Standalone scrims (mobile-nav backdrop) |
| modal | 200 | Dialogs, sheets, drawers (+ their co-located Radix overlay) |
| toast | 300 | Toasts |

Stock-shadcn `z-50` on floating content is normalized to `z-[100]` at port time.

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
| Popover | Popover | Floating panel: surface-container-low, shadow-overlay, rounded-md |
| Tabs | Tabs | segmented control (active = surface-container-low, no underline) |
| Input | No (native) | h-9, ghost-border-20, focus:ring-2 |
| Textarea | No (native) | Same styling as Input |
| Select | Select | Same styling as Input |
| Combobox | cmdk + Popover | single, multi (Badge chips), async loading, empty state |
| DatePicker | react-day-picker + Popover | single, range, presets rail; selected = k-primary-container + dark text |
| Checkbox | Checkbox | Checked: bg-k-primary-container |
| RadioGroup | RadioGroup | Checked: bg-k-primary-container + dark dot (mirrors Checkbox) |
| Switch | Switch | Checked: bg-k-primary-container, thumb translate-x-4 |
| Slider | Slider | Track surface-container-high, range k-primary-container, thumb on-surface; single + range |
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
| FileUpload | No (custom) | dropzone idle/dragover/uploading/error; dashed ghost-border; composes Item + Progress |
| ButtonGroup | No (custom) | horizontal/vertical orientation |
| Empty | No (custom) | Empty state with media/icon variant |
| Sidebar | No (custom) | 260px expanded, 72px collapsed, mobile overlay |
| TopBar | No (custom) | h-12, breadcrumbs, notification bell, avatar dropdown |
| Table | No (native) | hover rows, ghost-border dividers |
| Pagination | No (native) | Previous/Next, page links with active state |
| Stepper | No (custom) | horizontal/vertical; pending/current/completed/error; steps = pages, never modals |
| Breadcrumb | No (native) | Chevron separators, route mapping |
| NotificationBell | No (custom) | Bell/BellDot icons, dropdown panel, auto-mark-read |
| StatusDot | No (custom) | 9 statuses, 2 sizes, pulse animation |
| Spinner/Skeleton | No (custom) | Loading states |
| Sheet | Dialog | Side panels (top/right/bottom/left) |
| Drawer | vaul | Mobile bottom sheets |
| Command | cmdk | Command palette with search |
| Sonner | sonner | Toast notifications (dark theme) |
| Alert | No (custom) | info, success, warning, error; tinted bg /10 + 3px left border; optional dismiss/action |
| Kbd | No (custom) | mono 11px chip, surface-container-high, ghost border; KbdGroup combos |
| Accordion | Accordion | Chevron rotation on expand |
| Toggle/ToggleGroup | Toggle | default/outline variants |
| Resizable | react-resizable-panels | Panel resize handles |
| Carousel | embla-carousel-react | Image carousel |
| Chart | recharts | Chart wrapper — use `hsl(var(--chart-N))` palette |
| Calendar | react-day-picker | See `date-picker.md` — branded day-grid (rounded-sm days, blue selected) |

## Key Constraints

1. **Rectangular by default** — Use `rounded-sm`/`rounded-md` for buttons, cards, inputs, badges. `rounded-full` is reserved for inherently circular elements only: the Switch thumb/track, Spinner/StatusDot, and avatar fallbacks. Cortex badges are `rounded-sm` (not the raw shadcn `rounded-full`).
2. **No 1px borders between major sections** — Use tonal shifts (different surface colors).
3. **Never exceed 6px border-radius** for rectangular elements — Despite shadcn defaults, the products cap practical radius at `rounded-md` (6px).
4. **Primary CTA = gradient with dark text** — `gradient-primary text-surface-container-lowest`. Never put light text (`on-surface`) on the gradient — it fails contrast on the light end.
5. **Icons always `w-4 h-4` with `strokeWidth={1.5}`** — Standard lucide-react sizing. Exception: icon follows the text scale of its container — `text-label-sm` chips (Badge) use `size-3` (12px).
6. **No modals for create/edit forms** — Always use dedicated pages. Dialog only for AlertDialog confirmations.
7. **Toggle view/edit via `?mode=edit`** query parameter on detail pages.
8. **Form width capped at `max-w-5xl`** — Editor pages at `max-w-6xl`.
9. **Form grid**: `grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5`.
10. **Page headers**: `flex flex-col gap-3 sm:flex-row` (stack on mobile).
11. **Body base**: `bg-surface-dim text-on-surface antialiased font-inter` at 13px.
12. **All form-row controls are h-9 (36px)** — Button default, Input, and Select trigger share one height.
13. **Focus ring is always 2px and brand blue** — normalize stock-shadcn `ring-[3px]` to `ring-2`.
14. **Small floats use `shadow-overlay`, modals use `shadow-ambient`** — glow reserved for gradient CTAs (max 1/viewport).

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

## Migration (vNext)

One line per change, greppable. Products apply these to converge with the current spec:

1. `MIGRATION(vNext): focus ring color is now brand blue — set --ring: 218 100% 65% in globals.css — all React products.`
2. `MIGRATION(vNext): form controls are 36px — replace h-10 with h-9 in input.tsx and select.tsx trigger — cortex-support-front (coder-front already h-9).`
3. `MIGRATION(vNext): focus ring thickness unified at 2px — replace focus-visible:ring-[3px] with focus-visible:ring-2 — accordion.tsx, item.tsx, coder-front input.tsx.`
4. `MIGRATION(vNext): rounded-lg/xl now render 6px — update borderRadius config (xl/lg: "0.375rem"); no class renames needed — all React products.`
5. `MIGRATION(vNext): small floats get their own shadow — replace shadow-ambient with shadow-overlay in dropdown-menu.tsx, tooltip.tsx, select.tsx content, command.tsx; dialogs keep shadow-ambient — all products.`
6. `MIGRATION(vNext): popover layer is z-[100] — replace z-50 with z-[100] in dropdown-menu.tsx, tooltip.tsx, select.tsx content — all products.`
7. `MIGRATION(vNext): new tokens (chart-1..8, k-accent-violet/teal, shadow-glow-primary, motion durations, opacity-disabled, ghost-border-10) — copy updated tailwind.config.js + :root blocks from llm/getting-started.md — additive, no breakage.`
8. `MIGRATION(vNext): pressed feedback added — append active:brightness-95 (filled) / active:bg-surface-container-high/70 (transparent) to button variants — optional, cosmetic.`
9. `MIGRATION(vNext): caret-blink easing is ease-out — no action; step-end in older docs was a documentation error.`
10. `MIGRATION(vNext): cortex-coder-home (Tailwind v4) — add @theme lines for --color-chart-* and accents using the surface-lowest naming convention already in place.`
