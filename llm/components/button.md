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
| default | `gradient-primary text-surface-container-lowest text-label-sm hover:brightness-110 active:brightness-95` | Blue gradient (#ADC6FF → #4D8EFF) with **dark** (#0C0E14), **uppercase** label text; brightens on hover | Primary CTA, main actions, form submissions |
| secondary | `bg-transparent ghost-border-20 border text-on-surface text-body-sm hover:bg-surface-container-high/50 active:bg-surface-container-high/70` | Transparent with an emphasized ghost border; fills subtly on hover | Secondary actions, cancel buttons |
| destructive | `bg-k-error/20 text-k-error text-body-sm border border-k-error/40 hover:bg-k-error/30 active:brightness-95` | Red-tinted background, red text and border | Delete, remove, irreversible destructive actions |
| ghost | `text-on-surface-variant text-body-sm hover:bg-surface-container-high hover:text-on-surface active:bg-surface-container-high/70` | No background; fills on hover | Toolbar actions, less prominent controls |
| outline | `border ghost-border bg-transparent text-on-surface text-body-sm hover:bg-surface-container-high/50 active:bg-surface-container-high/70` | Subtle ghost border, no fill | Alternative to secondary, paired with default |
| link | `text-k-primary text-body-sm underline-offset-4 hover:underline` | Text only, blue, underline on hover | Inline actions, navigation links styled as buttons |

> **CTA language (from `cortex-coder-front`):** the primary `default` button is the brand's signature CTA — blue gradient, **dark** text (`text-surface-container-lowest` / `#0C0E14`), and **uppercase** `text-label-sm` (11px, letter-spacing 0.05em). Two rules that are easy to miss when porting it:
> 1. Dark text, never light (`text-on-surface` fails contrast on the gradient's light end).
> 2. `text-label-sm` → the label renders UPPERCASE. So "New recording" displays as "NEW RECORDING". The other variants use sentence-case `text-body-sm`.

## Sizes

| Size | Height | Padding | Usage |
|---|---|---|---|
| default | h-9 (36px) | px-4 py-2 | Standard buttons |
| sm | h-8 (32px) | px-3 | Compact UI, table actions |
| lg | h-10 (40px) | px-6 | Prominent CTAs, hero sections |
| icon | h-8 w-8 (32px) | — | Icon-only toolbar/trigger buttons |

Text size/case comes from the **variant** (default = `text-label-sm` uppercase; others = `text-body-sm`), not the size. Icons inside any size are forced to 16px via `[&_svg]:size-4 [&_svg]:shrink-0`.

This is the canonical control-height scale for all form controls (sm 32px / default 36px / lg 40px). Input and the Select trigger share the `h-9` default, so buttons align with sibling controls in a form row with zero hacks.

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
- **Active / Press**: Filled/gradient variants (`default`, `destructive`) add `active:brightness-95`; transparent variants (`secondary`, `ghost`, `outline`) add `active:bg-surface-container-high/70`. Purely cosmetic — optional for products to adopt.
- **Focus-visible**: `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` — a 2px ring in the `ring` color, offset from the button. Keyboard-only (not on click). Note: `--ring` is now brand blue (`218 100% 65%` = #4D8EFF), so `ring-ring` renders the Cortex blue.
- **Disabled**: `opacity-50 pointer-events-none`. No hover or focus styling.
- **Loading**: Show a Spinner alongside the label and set `disabled`. No separate loading prop — handled by the consumer.

## Reference CVA

The canonical CVA (base: `cortex-support-front` / `cortex-note-app`; the `active:` pressed-state classes are a vNext addition — cosmetic, optional for products):

```ts
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "gradient-primary text-surface-container-lowest text-label-sm hover:brightness-110 active:brightness-95",
        secondary: "bg-transparent ghost-border-20 border text-on-surface text-body-sm hover:bg-surface-container-high/50 active:bg-surface-container-high/70",
        destructive: "bg-k-error/20 text-k-error text-body-sm border border-k-error/40 hover:bg-k-error/30 active:brightness-95",
        ghost: "text-on-surface-variant text-body-sm hover:bg-surface-container-high hover:text-on-surface active:bg-surface-container-high/70",
        outline: "border ghost-border bg-transparent text-on-surface text-body-sm hover:bg-surface-container-high/50 active:bg-surface-container-high/70",
        link: "text-k-primary text-body-sm underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3",
        lg: "h-10 px-6",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
)
```

> Note: `cortex-coder-front` (the reference) does not always route primary CTAs through this component — it frequently hand-writes the same class string (`h-9 px-4 gradient-primary rounded-sm text-label-sm text-surface-container-lowest hover:brightness-110`) directly on a `<button>`. Either way the rendered CTA is identical: gradient + dark uppercase label.

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
