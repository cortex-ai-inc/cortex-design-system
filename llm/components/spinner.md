# Spinner

## Overview

Custom border-spin loading indicator. A single `div` with a translucent ring (`border-k-primary-container/30`) and a solid top border (`border-t-k-primary-container`) rotated by `animate-spin`. Configurable through three sizes.

## Import

```
import { Spinner } from "@/components/ui/spinner"
```

## Anatomy

Renders a single `div` — there is no wrapper, no inner element, and no built-in accessible text. The component composes its classes via `cn()`.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | "sm" \| "md" \| "lg" | "md" | Spinner dimensions and border width |
| className | string | — | Additional classes merged onto the div |

## Size variants

| Size | Classes |
|------|---------|
| sm | `w-4 h-4 border-2` |
| md | `w-5 h-5 border-2` |
| lg | `w-8 h-8 border-3` |

## Style

| Property | Value |
|----------|-------|
| Ring color | `border-k-primary-container/30` |
| Top border (spinner head) | `border-t-k-primary-container` |
| Border radius | `rounded-full` |
| Animation | `animate-spin` |

## Reference implementation

Core className applied to the single `div` (verbatim from source):

```
border-k-primary-container/30 border-t-k-primary-container rounded-full animate-spin
```

Size map (verbatim):

```
sm: 'w-4 h-4 border-2'
md: 'w-5 h-5 border-2'
lg: 'w-8 h-8 border-3'
```

## Accessibility

The component renders a bare `div` with no `role`, no `aria-*`, and no screen-reader text. When the spinner conveys a busy state to users, add accessible context at the call site, e.g. wrap it or pass a label via the surrounding element:

```
<div role="status" aria-live="polite">
  <Spinner />
  <span className="sr-only">Loading…</span>
</div>
```

## Usage patterns

```
// Default (md)
<Spinner />

// Small
<Spinner size="sm" />

// Large, centered
<Spinner size="lg" className="mx-auto" />
```

## Related

- Skeleton — alternative loading representation for content blocks
- Button — Spinner used inside buttons during a loading state
