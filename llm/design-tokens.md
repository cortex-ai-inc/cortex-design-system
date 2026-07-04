# Design Tokens

## Colors

### Surface Colors

| Token | Hex Value | CSS Variable | Usage |
|---|---|---|---|
| surface-dim | #111319 | --surface-dim | Main app background |
| surface-container-lowest | #0C0E14 | --surface-container-lowest | Sidebar background |
| surface-container-low | #191B22 | --surface-container-low | Cards, panels, content surfaces |
| surface-container-high | #282A30 | --surface-container-high | Hover states, active items |
| surface-container-highest | rgba(40, 42, 48, 0.70) | --surface-container-highest | Glassmorphism overlays |

### Brand / Primary

| Token | Hex Value | Usage |
|---|---|---|
| k-primary | #ADC6FF | Gradient start, links, active states |
| k-primary-container | #4D8EFF | Gradient end, focus rings, active tab indicators |

### Text

| Token | Hex Value | Usage |
|---|---|---|
| on-surface | #E2E2E5 | Primary body text, headings |
| on-surface-variant | #C2C6D6 | Secondary text, labels, placeholders, muted content |

### Semantic

| Token | Hex Value | Usage |
|---|---|---|
| k-secondary | #4ADE80 | Success, resolved, online |
| k-error | #F87171 | Error, destructive, failed |
| k-warning | #FBBF24 | Warning, pending, attention |

### Accent Colors

Two supporting accents exist alongside the blue signature. They are **subordinate voices** — decoration and categorization, never interaction.

| Token | Hex Value | Usage |
|---|---|---|
| k-accent-violet | #A78BFA | AI/intelligence accent: "AI" badges, feature tags, illustrations, chart-2 |
| k-accent-teal | #22D3EE | Data/metrics accent: KPI highlights, sparklines, chart-3 |
| k-primary-tint | rgba(77, 142, 255, 0.08) | Info-tinted backgrounds (callouts, blockquotes, selected rows) |

**Hard rules** (blue stays the signature):

- Accents **never** appear on buttons, links, focus rings, checked states, or active navigation — those are exclusively blue.
- Never combine two accents (or an accent + a semantic color) in one component.
- Accents cover at most ~10% of any view. When in doubt, use blue or neutral.
- Apply with the tint ladder used by badges: `bg-k-accent-violet/20 text-k-accent-violet`.

### Ghost Borders

| Token | Value | Usage |
|---|---|---|
| ghost-border-10 | rgba(194, 198, 214, 0.10) | Chart grids, sub-hairlines |
| ghost-border | rgba(194, 198, 214, 0.15) | Default dividers, card borders |
| ghost-border-20 | rgba(194, 198, 214, 0.20) | Input borders, emphasized borders |

### Gradient

The gradient is itself a token:

```css
--gradient-primary: linear-gradient(135deg, var(--k-primary) 0%, var(--k-primary-container) 100%);
/* resolves to: linear-gradient(135deg, #ADC6FF 0%, #4D8EFF 100%) */
```

Used for: primary button backgrounds, active tab indicators, decorative accents.

**Text on the gradient must be dark** — use `text-surface-container-lowest` (`#0C0E14`). This is a law, not a preference — the contrast math:

| Text | On #ADC6FF (light end) | On #4D8EFF (dark end) | Verdict |
|---|---|---|---|
| `#0C0E14` (surface-container-lowest) | 11.1:1 | 6.0:1 | ✅ AA both ends — **use this** |
| `#E2E2E5` (on-surface) | 1.36:1 | 2.4:1 | ❌ FAIL — never |

### Data Visualization

Categorical palette for charts (recharts). All values are Tailwind 400-series hues — the same family as the semantic colors — and all pass ≥3:1 non-text contrast (WCAG 1.4.11) on `#111319` and `#191B22`.

| Token | Hex | HSL (shadcn var form) | Note |
|---|---|---|---|
| chart-1 | #4D8EFF | 218 100% 65% | Brand blue — the first series is always the signature |
| chart-2 | #A78BFA | 255 92% 76% | Violet (= k-accent-violet) |
| chart-3 | #22D3EE | 188 86% 53% | Cyan (= k-accent-teal) |
| chart-4 | #F472B6 | 329 86% 70% | Pink |
| chart-5 | #FBBF24 | 43 96% 56% | Amber (same hex as k-warning) |
| chart-6 | #4ADE80 | 142 69% 58% | Green (same hex as k-secondary) |
| chart-7 | #FB923C | 27 96% 61% | Orange — 7+ series only |
| chart-8 | #94A3B8 | 215 20% 65% | Slate — "other/remainder" series |

Support tokens: chart grid lines = `ghost-border-10` (`--chart-grid`), axis labels = `text-code-sm text-on-surface-variant`, chart tooltip surface = `bg-surface-container-high`.

**Usage rules:**

- Use in order 1 → 8; never skip ahead for aesthetics.
- Two-series charts prefer `chart-1` + `chart-5` (blue/amber is color-blind-safe).
- When a chart encodes **status** (success/error/warning), use the semantic colors deliberately instead of the categorical scale.
- Chart colors never appear on UI controls.

### Semantic (shadcn) Tokens

Alongside the Cortex brand tokens above, the system maps the standard **shadcn/ui semantic tokens** to HSL CSS variables. Every shadcn component (Button, Dialog, Select, Checkbox, …) is styled through these — they are not optional. The values below are the **dark** palette that ships on `:root`.

| Token (Tailwind) | HSL var | Resolves to | Usage |
|---|---|---|---|
| `background` | `--background` `222.2 84% 4.9%` | near `#0A0E16` | App canvas (often overridden by `surface-dim`) |
| `foreground` | `--foreground` `210 40% 98%` | near `#F8FAFC` | Default text on `background` |
| `primary` | `--primary` `210 40% 98%` | near-white | shadcn primary surface (Cortex overrides primary CTAs with `gradient-primary`) |
| `primary-foreground` | `--primary-foreground` `222.2 47.4% 11.2%` | dark | Text on `primary` |
| `secondary` | `--secondary` `217.2 32.6% 17.5%` | slate | Secondary surfaces |
| `muted` / `muted-foreground` | `--muted` / `--muted-foreground` | slate / `215 20.2% 65.1%` | Muted fills, muted text |
| `accent` / `accent-foreground` | `--accent` `217.2 32.6% 17.5%` | slate | Hover/active fills in menus, list items |
| `popover` / `popover-foreground` | `--popover` | slate | Dropdown / popover surfaces |
| `card` / `card-foreground` | `--card` | slate | shadcn card surface (Cortex often uses `surface-container-low`) |
| `destructive` | `--destructive` `0 62.8% 30.6%` | dark red | shadcn destructive (Cortex destructive uses `k-error` tints) |
| `border` | `--border` `217.2 32.6% 17.5%` | slate | Default component borders (`border-border`) |
| `input` | `--input` | slate | Input borders |
| `ring` | `--ring` `218 100% 65%` | **brand blue** `#4D8EFF` | Focus ring (`focus-visible:ring-ring`) — recolored from shadcn's light slate so every focus ring is part of the signature |
| `chart-1..8` | `--chart-1` … `--chart-8` | see *Data Visualization* | Categorical chart palette (`hsl(var(--chart-N))`) |
| `sidebar.*` | `--sidebar-*` | — | shadcn Sidebar primitive subtokens |

> **Two layers, one system.** Reach for the **Cortex tokens** (`surface-*`, `k-*`, `on-surface*`) for layout, brand color, and the dark hierarchy. The **shadcn semantic tokens** come along for free with shadcn components and back their focus rings, borders, and default fills. Both must be present in the Tailwind config (see `getting-started.md`).

## Typography

### Font Stack

| Usage | Font | Fallback |
|---|---|---|
| Body / UI | Inter | system-ui, sans-serif |
| Code | JetBrains Mono | monospace |

### Font Scale

The brand type scale is delivered as **`@layer utilities` classes** (defined in CSS — see `getting-started.md`), **not** as a Tailwind `fontSize` config. The products ship no custom `fontSize` block: these five classes plus the default Tailwind sizes (`text-xs`/`text-sm`/`text-lg`/…) are the whole scale. Because they live in `@layer utilities`, the `.text-*` classes below override any same-named Tailwind size.

| Utility | Size | Weight | Letter Spacing | Transform | Usage |
|---|---|---|---|---|---|
| .text-display-sm | 2.25rem (36px) → 1.625rem (26px) on `< 640px` | 700 | -0.02em | none | Page headings, hero titles |
| .text-title-sm | 1rem (16px) | 600 | -0.02em | none | Section titles, card titles |
| .text-body-sm | 0.8125rem (13px) | 400 | normal | none | Body text, paragraphs (default) |
| .text-label-sm | 0.6875rem (11px) | 500 | 0.05em | uppercase | Labels, badges, captions |
| .text-code-sm | 0.75rem (12px) | 400 | normal | none | Inline code, monospace data |

> Do not introduce a custom `fontSize` config to add sizes — it shadows these utilities inconsistently across apps. If you need an intermediate size, use a default Tailwind class (`text-sm` = 14px, `text-xs` = 12px).

### Body Defaults

- Font-family: Inter, system-ui, sans-serif
- Font-size: 13px (0.8125rem)
- Line-height: 1.5
- -webkit-font-smoothing: antialiased

## Spacing

Uses Tailwind default spacing scale. Each unit equals 0.25rem (4px).

| Tailwind Class | Rem | Pixels | Common Usage |
|---|---|---|---|
| gap-2 | 0.5rem | 8px | Tight spacing inside cards |
| gap-3 | 0.75rem | 12px | Standard spacing between elements |
| gap-4 | 1rem | 16px | Section spacing |
| gap-6 | 1.5rem | 24px | Large section gaps |
| p-3 | 0.75rem | 12px | Compact card padding |
| p-4 | 1rem | 16px | Standard card padding |
| p-5 | 1.25rem | 20px | Generous card padding |
| p-6 | 1.5rem | 24px | Dialog / form padding |

## Border Radius

Computed from `--radius` CSS variable (default 0.5rem / 8px). The config **clamps** `lg`/`xl` to 6px so the "never exceed 6px" constraint is true by construction — stock shadcn code using `rounded-lg`/`rounded-xl` renders at 6px without edits.

| Variant | Config value | Rendered | Usage |
|---|---|---|---|
| xs | calc(var(--radius) - 6px) | 2px | Small badges, dots |
| sm | calc(var(--radius) - 4px) | 4px | Buttons, inputs, badges (most common) |
| md | calc(var(--radius) - 2px) | 6px | Cards, dialogs, dropdowns (practical max) |
| lg | 0.375rem (clamped) | 6px | Compat alias — prefer `rounded-md` |
| xl | 0.375rem (clamped) | 6px | Compat alias — prefer `rounded-md` |

`--radius` stays `0.5rem` as the derivation base. `rounded-full` remains reserved for inherently circular elements (Switch, Spinner, StatusDot, avatar fallbacks, Slider track/thumb, radio/stepper dots).

## Elevation

Tonal layering is the primary depth language — cards and panels get **no shadow**. Shadows exist only for elements that float above the page, in four tiers:

| Tier | Token | Value | Elements |
|---|---|---|---|
| 0 | *(none — tonal only)* | — | Cards, panels, page sections |
| 1 | shadow-xs | 0 1px 2px 0 rgb(0 0 0 / 0.05) | Switch thumb, tiny raised details |
| 2 | shadow-overlay | 0 8px 24px rgba(0, 0, 0, 0.40) | Dropdowns, selects, tooltips, popovers, command palette |
| 3 | shadow-ambient | 0 32px 64px rgba(0, 0, 0, 0.12) | Modals, dialogs, sheets |

### Glow (accent, not elevation)

| Token | Value |
|---|---|
| shadow-glow-primary | 0 0 24px 0 rgba(77, 142, 255, 0.25) |

The blue halo is the system's single luminous flourish. Rules: **only** on `gradient-primary` elements; at most one per viewport; allowed on hero/marketing CTAs, empty-state primary actions, onboarding finish steps; never on in-app toolbar/form buttons, inputs, or cards.

## Motion

Three named durations, three named easings. Everything else is a component constant.

| Token | Value | Role |
|---|---|---|
| --motion-fast | 150ms | Micro-interactions: hover fills, color/border/opacity changes |
| --motion-base | 200ms | Entrances/exits: fade-in, slide-up, accordion, dropdown |
| --motion-slow | 300ms | Large surfaces: Sheet/Drawer panels, layout shifts |
| --ease-out | cubic-bezier(0, 0, 0.2, 1) | Default — entrances, hovers (= Tailwind `ease-out`) |
| --ease-in-out | cubic-bezier(0.4, 0, 0.2, 1) | On-screen movement, resizes |
| --ease-linear | linear | Infinite loops only (spinner, pulse-ring) |

**Rules:** nothing over 300ms except loops; no spring/bounce/elastic easings, ever; respect `prefers-reduced-motion: reduce` (disable non-essential animation). Fixed loop timings are component constants, not scale members: `spin` 600ms, `caret-blink` 1.25s, `pulse-ring`/skeleton 2s.

### Keyframes

| Name | Keyframes | Duration | Easing | Usage |
|---|---|---|---|---|
| fade-in | 0% { opacity: 0 } -> 100% { opacity: 1 } | 200ms (base) | ease-out | Dropdowns, tooltips, any appearing element |
| slide-up | 0% { opacity: 0, transform: translateY(10px) } -> 100% { opacity: 1, transform: translateY(0) } | 200ms (base) | ease-out | Dialogs, modals, notification toasts |
| pulse-ring | 0% { transform: scale(1), opacity: 0.2 } -> 100% { transform: scale(1.5), opacity: 0 } | 2s | linear infinite | Notification bell, status indicators |
| accordion-down | 0% { height: 0 } -> 100% { height: var(--radix-accordion-content-height) } | 200ms (base) | ease-out | Radix Accordion expand |
| accordion-up | 0% { height: var(--radix-accordion-content-height) } -> 100% { height: 0 } | 200ms (base) | ease-out | Radix Accordion collapse |
| caret-blink | 0%,70%,100% { opacity: 1 } / 20%,50% { opacity: 0 } | 1.25s | ease-out infinite | Text input cursor blink (OTP) |

## Interaction States

One convention for every component:

| State | Rule |
|---|---|
| Hover (filled/gradient) | `hover:brightness-110` (`filter: brightness(1.1)`) |
| Hover (transparent) | Fill `bg-surface-container-high` (ghost) or `bg-surface-container-high/50` (bordered) |
| Pressed | `active:brightness-95` on filled; `active:bg-surface-container-high/70` on transparent |
| Checked / active / selected | `bg-k-primary-container` with dark glyph `text-surface-container-lowest` |
| Disabled | `--opacity-disabled: 0.5` — buttons add `pointer-events-none`, inputs add `cursor-not-allowed` |
| Semantic tint ladder | rest `/20` → hover `/30` → border `/40` (destructive button, tinted chips) |
| Overlay scrim | `--scrim: rgba(0, 0, 0, 0.60)` + `backdrop-blur-sm` behind dialogs/sheets |

**Hover never moves or scales elements** (no translateY lifts) — depth stays tonal.

### Focus Rings

Thickness is always **2px**. `--ring` resolves to brand blue (`218 100% 65%` = `#4D8EFF`), so every ring is part of the signature. Stock-shadcn `ring-[3px]` is normalized to `ring-2` at port time.

| Context | Classes |
|---|---|
| Compact controls (button, tab, toggle, badge-like) | `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` |
| Form fields (input, select, textarea) | `focus:ring-2 focus:ring-k-primary-container/50` — no offset; `focus:` (not `focus-visible:`) is intentional: the ring marks the active field even on mouse focus |
| Full-width rows (Item, AccordionTrigger) | `focus-visible:ring-2 focus-visible:ring-ring/50` — no offset (offset looks broken on full-bleed rows) |

## Control Heights

All form controls share one height scale, so any mix aligns in a form row with zero hacks:

| Size | Height | Elements |
|---|---|---|
| sm | h-8 (32px) | Compact buttons, dense toolbars |
| default | **h-9 (36px)** | Button, Input, Select trigger, Combobox/DatePicker triggers |
| lg | h-10 (40px) | Prominent CTAs, marketing forms |

Textarea uses `min-h-[80px]`. Rule: **all controls in one form row are h-9.**

## Z-Index

| Layer | Token | Value | Elements |
|---|---|---|---|
| Base | --z-base | 0 | Page content, static elements |
| Sidebar | --z-sidebar | 10 | Sidebar navigation |
| Topbar | --z-topbar | 20 | Top navigation bar |
| Popover | --z-popover | 100 | Dropdown menus, selects, popovers, tooltips, command palette |
| Overlay | --z-overlay | 150 | Standalone scrims (mobile-nav backdrop) |
| Modal | --z-modal | 200 | Dialogs, sheets, drawers + their co-located Radix overlay |
| Toast | --z-toast | 300 | Toasts (sonner manages its own stacking; the layer exists for custom toasts) |

Stock-shadcn `z-50` strings on floating content are normalized to `z-[100]` at port time. Popover-below-modal is safe because "no forms in modals" means dropdowns never open inside dialogs.

## Icon Standards

- **Library**: lucide-react
- **Size**: w-4 h-4 (16px x 16px)
- **Stroke**: strokeWidth={1.5}
- **Within buttons**: Apply `[&_svg]:size-4 [&_svg]:shrink-0` to ensure consistent icon sizing
- **Exception — icon follows the text scale of its container**: `text-body-sm` (13px) contexts use `size-4` (the standard); `text-label-sm` (11px) chips like Badge use `size-3` (12px). A 16px icon inside an 11px-uppercase chip is visually oversized.

## Layout Patterns

### Body Base

```css
body {
  background-color: #111319;
  color: #E2E2E5;
  font-family: "Inter", system-ui, sans-serif;
  font-size: 13px;
  -webkit-font-smoothing: antialiased;
}
```

### Form Grid

```css
grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5
```

Standard two-column form layout. Single column on mobile, two columns on md+.

### Width Caps

| Class | Usage |
|---|---|
| max-w-5xl | Forms, settings pages |
| max-w-6xl | Rich text editors, content-heavy pages |
