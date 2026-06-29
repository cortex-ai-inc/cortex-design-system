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
| default | `gradient-primary text-surface-container-lowest hover:brightness-110` | Blue gradient (#ADC6FF → #4D8EFF) with **dark** text (#0C0E14); brightens on hover | Primary CTA, main actions, form submissions |
| secondary | `bg-transparent ghost-border-20 border text-on-surface hover:bg-surface-container-high/50` | Transparent with an emphasized ghost border; fills subtly on hover | Secondary actions, cancel buttons |
| destructive | `bg-k-error/20 text-k-error border border-k-error/40 hover:bg-k-error/30` | Red-tinted background, red text and border | Delete, remove, irreversible destructive actions |
| ghost | `text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface` | No background; fills on hover | Toolbar actions, less prominent controls |
| outline | `border ghost-border bg-transparent text-on-surface hover:bg-surface-container-high/50` | Subtle ghost border, no fill | Alternative to secondary, paired with default |
| link | `text-k-primary underline-offset-4 hover:underline` | Text only, blue, underline on hover | Inline actions, navigation links styled as buttons |

> **Contrast rule:** the `default` variant uses `text-surface-container-lowest` (dark `#0C0E14`) on the gradient. Do **not** use `text-on-surface` (light) — it fails contrast on the light end of the gradient. This is the single most common mistake when porting the button.

## Sizes

| Size | Height | Padding | Text | Usage |
|---|---|---|---|---|
| default | h-9 (36px) | px-3 py-2 | text-body-sm (13px) | Standard buttons |
| sm | h-8 (32px) | px-3 | text-label-sm (11px, uppercase) | Compact UI, table actions |
| lg | h-10 (40px) | px-4 | text-body-sm | Prominent CTAs, hero sections |
| icon | h-8 w-8 (32px) | — | — | Icon-only toolbar/trigger buttons |

Icons inside any size are forced to 16px via `[&_svg]:size-4 [&_svg]:shrink-0`.

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
- **Hover**: `default` brightens the gradient (`hover:brightness-110`); `secondary`/`outline` fill to `bg-surface-container-high/50`; `ghost` fills to `bg-surface-container-high`; `destructive` deepens to `bg-k-error/30`.
- **Active / Press**: Maintains hover styling, no separate press state.
- **Focus-visible**: `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` — a 2px ring in the shadcn `ring` color, offset from the button. Keyboard-only (not on click).
- **Disabled**: `opacity-50 pointer-events-none`. No hover or focus styling.
- **Loading**: Show a Spinner alongside the label and set `disabled`. No separate loading prop — handled by the consumer.

## Reference CVA

The canonical implementation (`cortex-support-front` / `cortex-note-app`):

```ts
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-body-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "gradient-primary text-surface-container-lowest hover:brightness-110",
        secondary: "bg-transparent ghost-border-20 border text-on-surface hover:bg-surface-container-high/50",
        destructive: "bg-k-error/20 text-k-error border border-k-error/40 hover:bg-k-error/30",
        ghost: "hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface",
        outline: "border ghost-border bg-transparent hover:bg-surface-container-high/50 text-on-surface",
        link: "text-k-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-3 py-2",
        sm: "h-8 px-3 text-label-sm",
        lg: "h-10 px-4",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
)
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
