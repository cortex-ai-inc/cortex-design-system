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
| default | bg-surface-container-high | text-on-surface | none | Generic tags, neutral metadata |
| primary | bg-k-primary/20 | text-k-primary | none | Active status, primary category labels |
| success | bg-k-secondary/20 | text-k-secondary | none | Resolved, completed, online, active |
| warning | bg-k-warning/20 | text-k-warning | none | Pending, in progress, attention needed |
| destructive | bg-k-error/20 | text-k-error | none | Error, failed, blocked, offline |
| outline | transparent | text-on-surface-variant | border ghost-border | Subtle tags, less emphasis needed |

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| variant | "default" \| "primary" \| "success" \| "warning" \| "destructive" \| "outline" | "default" | Visual style variant |
| className | string | undefined | Additional CSS classes via cn() |
| children | ReactNode | required | Badge content (text, optional icon) |

## States

- **Default**: Renders as a non-interactive label. No hover, focus, or active states.
- **With icon**: Supports an optional lucide-react icon before the text, sized automatically via `[&_svg]:size-3 [&_svg]:shrink-0`.

## Tailwind Classes (key selectors)

```css
/* Base classes */
inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-label-sm font-medium

/* With icon */
[&_svg]:size-3 [&_svg]:shrink-0
```

## Usage Guidelines

### Do

- Use semantic variants (success, warning, destructive) that match the meaning of the status being displayed.
- Use `primary` variant for custom categorical labels (e.g., ticket type, custom tags).
- Use `default` variant for neutral metadata that does not imply status.
- Use `outline` variant when badges appear in dense lists and need less visual weight.
- Keep badge text short -- one or two words maximum.
- Use a dot indicator icon (e.g., `Circle`) alongside status badges for extra clarity.

### Don't

- Don't make badges clickable -- use a Button or other interactive component for actions.
- Don't use multiple semantic colors in the same badge (e.g., success + warning).
- Don't place badges inside button text -- they are visual labels, not interactive elements.
- Don't truncate badge text -- if content is too long, consider a different component.
