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

### Ghost Borders

| Token | Value | Usage |
|---|---|---|
| ghost-border | rgba(194, 198, 214, 0.15) | Default dividers, card borders |
| ghost-border-20 | rgba(194, 198, 214, 0.20) | Input borders, emphasized borders |

### Gradient

gradient-primary: `linear-gradient(135deg, #ADC6FF 0%, #4D8EFF 100%)`

Used for: primary button backgrounds, active tab indicators, decorative accents.

## Typography

### Font Stack

| Usage | Font | Fallback |
|---|---|---|
| Body / UI | Inter | system-ui, sans-serif |
| Code | JetBrains Mono | monospace |

### Font Scale

| Utility | Size | Weight | Letter Spacing | Transform | Usage |
|---|---|---|---|---|---|
| .text-display-sm | 2.25rem (36px) | 700 | -0.02em | none | Page headings, hero titles |
| .text-title-sm | 1rem (16px) | 600 | -0.02em | none | Section titles, card titles |
| .text-body-sm | 0.8125rem (13px) | 400 | normal | none | Body text, paragraphs |
| .text-label-sm | 0.6875rem (11px) | 500 | 0.05em | uppercase | Labels, badges, captions |
| .text-code-sm | 0.75rem (12px) | 400 | normal | none | Inline code, monospace data |

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

Computed from `--radius` CSS variable (default 0.5rem / 8px).

| Variant | Calculation | Rounded Value | Usage |
|---|---|---|---|
| xs | calc(var(--radius) - 6px) | 2px | Small badges, dots |
| sm | calc(var(--radius) - 4px) | 4px | Buttons, inputs, badges (most common) |
| md | calc(var(--radius) - 2px) | 6px | Cards, dialogs, dropdowns (max in practice) |
| lg | var(--radius) | 8px | Large containers, modals |
| xl | calc(var(--radius) + 4px) | 12px | Special surfaces, floating panels |

Note: In practice, the most common border radius values are 4px (rounded-sm) and 6px (rounded-md). The maximum border radius used in production is 6px.

## Shadows

| Token | Value | Usage |
|---|---|---|
| shadow-xs | 0 1px 2px 0 rgb(0 0 0 / 0.05) | Subtle depth for cards |
| shadow-ambient | 0 32px 64px rgba(0, 0, 0, 0.12) | Floating elements (modals, dropdowns, dialogs) |

shadow-ambient is the only shadow used for elevated/floating elements. It provides a soft, wide-spread shadow suitable for dark themes.

## Animations

| Name | Keyframes | Duration | Easing | Usage |
|---|---|---|---|---|
| fade-in | 0% { opacity: 0 } -> 100% { opacity: 1 } | 200ms | ease-out | Dropdowns, tooltips, any appearing element |
| slide-up | 0% { opacity: 0, transform: translateY(10px) } -> 100% { opacity: 1, transform: translateY(0) } | 200ms | ease-out | Dialogs, modals, notification toasts |
| pulse-ring | 0% { transform: scale(1), opacity: 0.2 } -> 100% { transform: scale(1.5), opacity: 0 } | 2s | linear infinite | Notification bell, status indicators |
| accordion-down | 0% { height: 0 } -> 100% { height: var(--radix-accordion-content-height) } | 200ms | ease-out | Radix Accordion expand |
| accordion-up | 0% { height: var(--radix-accordion-content-height) } -> 100% { height: 0 } | 200ms | ease-out | Radix Accordion collapse |
| caret-blink | 0%,70%,100% { opacity: 1 } / 20%,50% { opacity: 0 } | 1.25s | step-end infinite | Text input cursor blink |

## Z-Index

| Layer | Value | Elements |
|---|---|---|
| Base | 0 | Page content, static elements |
| Sidebar | 10 | Sidebar navigation |
| Topbar | 20 | Top navigation bar |
| Dropdowns | 100 | Dropdown menus, popovers, tooltips |
| Modals / Overlays | 200 | Dialogs, modals, overlays, full-screen overlays |

## Icon Standards

- **Library**: lucide-react
- **Size**: w-4 h-4 (16px x 16px)
- **Stroke**: strokeWidth={1.5}
- **Within buttons**: Apply `[&_svg]:size-4 [&_svg]:shrink-0` to ensure consistent icon sizing

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
