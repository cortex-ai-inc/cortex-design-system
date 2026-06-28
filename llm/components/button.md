# Button

## Overview

Primary interactive element for triggering actions. Built with `class-variance-authority` for variant management and `@radix-ui/react-slot` for `asChild` composition.

**Import path**: `@/components/ui/button`

**Dependencies**: class-variance-authority, @radix-ui/react-slot

## Import

```tsx
import { Button, buttonVariants } from "@/components/ui/button"
```

## Variants

| Variant | CSS Class | Visual Description | Use Case |
|---|---|---|---|
| default | bg-gradient-primary text-on-surface | Gradient background (#ADC6FF to #4D8EFF), white text | Primary CTA, main actions, form submissions |
| secondary | bg-surface-container-low border ghost-border text-on-surface | Subtle background, ghost border | Secondary actions, cancel buttons |
| destructive | bg-k-error/10 text-k-error border border-k-error/20 | Red-tinted background and border | Delete, remove, irreversible destructive actions |
| ghost | text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface | Transparent background, fills on hover | Toolbar actions, less prominent controls |
| outline | border border-ghost-border text-on-surface | Border only, no background | Alternative to secondary, paired with default |
| link | text-k-primary underline-offset-4 hover:underline | Text only, no background/border | Inline actions, navigation links styled as buttons |

## Sizes

| Size | Height | Padding | Icon Size | Usage |
|---|---|---|---|---|
| default | h-9 (36px) | px-4 py-2 | 16px | Standard buttons |
| sm | h-8 (32px) | px-3 | 16px | Compact UI, table actions |
| lg | h-10 (40px) | px-8 | 16px | Prominent CTAs, hero sections |
| icon | h-8 w-8 (32px) | p-0 | 16px | Icon-only toolbar/trigger buttons |

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| variant | "default" \| "secondary" \| "destructive" \| "ghost" \| "outline" \| "link" | "default" | Visual style variant |
| size | "default" \| "sm" \| "lg" \| "icon" | "default" | Button size |
| asChild | boolean | false | When true, renders child element instead of `<button>` (via Radix Slot) |
| className | string | undefined | Additional CSS classes via cn() |
| disabled | boolean | false | Disabled state |
| children | ReactNode | required | Button content (text, icons, or both) |

## States

- **Default**: Renders with the chosen variant's styling at the chosen size.
- **Hover**: primary variant uses `brightness-110` (brightens gradient); all other variants use `bg-surface-container-high` for background fill.
- **Active / Press**: Maintains hover styling, no separate press state.
- **Focus-visible**: `ring-2 ring-offset-2` focus ring (color follows ring CSS variable). Only visible when focused via keyboard (not click).
- **Disabled**: `opacity-50 pointer-events-none`. No hover or focus styling. Should not be focusable via tab.
- **Loading**: When performing an async action, show a Spinner component alongside the button text and set `disabled`. No separate loading prop -- handled by the consumer.

## Tailwind Classes (key selectors)

```css
/* Base classes */
inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-body-sm font-medium transition-all

/* Icon sizing */
[&_svg]:size-4 [&_svg]:shrink-0

/* Focus ring */
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2

/* Disabled */
disabled:pointer-events-none disabled:opacity-50
```

## Usage Guidelines

### Do

- Use the `default` variant for the primary action on a page or form.
- Use `secondary` or `outline` for non-primary actions alongside a primary button.
- Use `destructive` for irreversible actions like delete or remove.
- Use `ghost` for toolbar icon buttons and low-prominence controls.
- Use `link` for inline actions within text or lists.
- Use `icon` size for buttons that only contain an icon.
- Place primary button on the right of action groups.
- Use `asChild` when the button needs to act as a router `<Link>`.

### Don't

- Don't stack more than two buttons in a row without proper spacing (use `gap-2` or `gap-3`).
- Don't use `default` variant for destructive actions.
- Don't use `link` variant outside of text context -- it can be confused with an actual link.
- Don't remove the focus ring -- it's required for accessibility.
- Don't use `icon` size for buttons with text labels.
