# Skeleton

## Overview

Simple CSS-only skeleton placeholder for content loading states. A single `<div>` that pulses while content is being fetched. Shape and size are supplied entirely through `className`.

## Import

```
import { Skeleton } from "@/components/ui/skeleton"
```

## Anatomy

A single `<div data-slot="skeleton">` with no internal structure. There are no variants — every appearance is composed by passing width/height/radius utilities via `className`.

## Reference implementation

The entire component (verbatim):

```tsx
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | — | Width/height/radius/shape utilities to size the placeholder |
| ...props | `React.ComponentProps<"div">` | — | Any standard `<div>` attribute is forwarded |

## Base style

| Property | Value |
|----------|-------|
| Animation | `animate-pulse` |
| Border radius | `rounded-md` (6px) |
| Background | `bg-accent` |

> Note: the base uses `rounded-md` and the muted `bg-accent` token (resolves to the dark slate tint `#1E293B` in dark mode — a low-emphasis surface, distinct from `surface-container-high` #282A30). Override radius or background via `className` when needed (e.g. `rounded-full` for avatars).

## Usage patterns

```
// Text lines
<Skeleton className="h-4 w-[250px]" />
<Skeleton className="h-4 w-[200px]" />
<Skeleton className="h-4 w-[150px]" />

// Avatar (override radius to a circle)
<Skeleton className="h-10 w-10 rounded-full" />

// Card
<div className="space-y-3">
  <Skeleton className="h-[200px] w-full rounded-md" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>

// Table row
<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>
```

## Related

- Table — skeleton rows for loading state
- Card — skeleton card for content loading
- Spinner — alternative loading indicator for actions
