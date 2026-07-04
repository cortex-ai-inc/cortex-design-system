# Badge

## Overview

Small label for indicating status, category, or metadata. Non-interactive by default (no click handling).

**Import path**: `@/components/ui/badge`

**Dependencies**: class-variance-authority

## Import

```tsx
import { Badge, badgeVariants } from "@/components/ui/badge"
```

## Variants

| Variant | Background | Text Color | Border | Use Case |
|---|---|---|---|---|
| default | bg-surface-container-high | text-on-surface-variant | none | Generic tags, neutral metadata |
| primary | bg-k-primary/20 | text-k-primary | none | Active status, primary category labels |
| success | bg-k-secondary/20 | text-k-secondary | none | Resolved, completed, online, active |
| warning | bg-k-warning/20 | text-k-warning | none | Pending, in progress, attention needed |
| destructive | bg-k-error/20 | text-k-error | none | Error, failed, blocked, offline |
| accent-violet | bg-k-accent-violet/20 | text-k-accent-violet | none | AI / intelligence tags |
| accent-teal | bg-k-accent-teal/20 | text-k-accent-teal | none | Data / metrics tags |
| secondary | bg-secondary | text-secondary-foreground | none | Neutral shadcn-toned chip |
| outline | transparent | text-on-surface-variant | border ghost-border | Subtle tags, less emphasis needed |

Badges are `rounded-sm` (4px) — **not** `rounded-full`. They are non-interactive labels.

The accent variants use two new tokens: `--k-accent-violet: #A78BFA` and `--k-accent-teal: #22D3EE`. **Subordination rule**: accent colors never appear on buttons, links, focus rings, checked states, or active navigation — those are exclusively blue. Accents are passive labeling colors only.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| variant | "default" \| "primary" \| "success" \| "warning" \| "destructive" \| "accent-violet" \| "accent-teal" \| "secondary" \| "outline" | "default" | Visual style variant |
| className | string | undefined | Additional CSS classes via cn() |
| children | ReactNode | required | Badge content (text, optional icon) |

## States

- **Default**: Renders as a non-interactive label. No hover, focus, or active states.
- **With icon**: Supports an optional lucide-react icon before the text, sized automatically via `[&_svg]:size-3 [&_svg]:shrink-0` (see the icon-size rule below).

## Reference CVA

The canonical implementation (`cortex-support-front`):

```ts
const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-label-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-surface-container-high text-on-surface-variant",
        primary: "bg-k-primary/20 text-k-primary",
        success: "bg-k-secondary/20 text-k-secondary",
        warning: "bg-k-warning/20 text-k-warning",
        destructive: "bg-k-error/20 text-k-error",
        "accent-violet": "bg-k-accent-violet/20 text-k-accent-violet",
        "accent-teal": "bg-k-accent-teal/20 text-k-accent-teal",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "text-on-surface-variant border ghost-border",
      },
    },
    defaultVariants: { variant: "default" },
  },
)
```

Icons inside a badge are sized via `[&_svg]:size-3 [&_svg]:shrink-0` (12px). Icon size follows the text scale of the container: `text-body-sm` contexts use `size-4`, `text-label-sm` chips like Badge use `size-3` — this is intentional, not a bug.

## Usage Guidelines

### Do

- Use semantic variants (success, warning, destructive) that match the meaning of the status being displayed.
- Use `primary` variant for custom categorical labels (e.g., ticket type, custom tags).
- Use `default` variant for neutral metadata that does not imply status.
- Use `outline` variant when badges appear in dense lists and need less visual weight.
- Use `accent-violet` for AI/intelligence tags and `accent-teal` for data/metrics tags.
- Keep badge text short -- one or two words maximum.
- Use a dot indicator icon (e.g., `Circle`) alongside status badges for extra clarity.

### Don't

- Don't make badges clickable -- use a Button or other interactive component for actions.
- Don't use multiple semantic colors in the same badge (e.g., success + warning).
- Don't use the accent colors on interactive elements — buttons, links, focus rings, checked states, and active navigation are exclusively blue.
- Don't place badges inside button text -- they are visual labels, not interactive elements.
- Don't truncate badge text -- if content is too long, consider a different component.
