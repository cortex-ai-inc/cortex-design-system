# Empty

## Overview

Custom `Empty` component for zero-data states across lists, tables, and content areas. It is a **compositional** component: you assemble it from sub-components (`EmptyHeader`, `EmptyMedia`, `EmptyTitle`, `EmptyDescription`, `EmptyContent`) rather than passing `title`/`description` props. The root is centered both horizontally and vertically.

## Import

```ts
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty-state"
```

## Anatomy

```tsx
<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <FolderIcon />
    </EmptyMedia>
    <EmptyTitle>No tickets found</EmptyTitle>
    <EmptyDescription>
      Create your first ticket to get started.
    </EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>Create ticket</Button>
  </EmptyContent>
</Empty>
```

## Sub-components

| Component | data-slot | Purpose |
|-----------|-----------|---------|
| `Empty` | `empty` | Root container; centers content, dashed border, padding |
| `EmptyHeader` | `empty-header` | Groups media + title + description (`max-w-sm`) |
| `EmptyMedia` | `empty-icon` | Visual placeholder (icon or custom media) |
| `EmptyTitle` | `empty-title` | Heading text |
| `EmptyDescription` | `empty-description` | Supporting body text; styles inner `<a>` links |
| `EmptyContent` | `empty-content` | Optional action area (buttons, links) |

> Note: all sub-components render a `<div>` (including `EmptyDescription`, despite its `React.ComponentProps<"p">` typing).

## EmptyMedia variants

`EmptyMedia` is the only sub-component with a CVA variant (`variant` prop, default `"default"`).

| Variant | Implementation |
|---------|----------------|
| `default` | `bg-transparent` — render any custom media/icon as-is, no chrome |
| `icon` | `size-10` box: `bg-muted text-foreground rounded-md`, centered; inner SVG without an explicit `size-*` class is forced to `size-6` |

## Props

Each sub-component spreads native `div` props (`className`, `children`, etc.). Only `EmptyMedia` adds a typed variant:

| Component | Prop | Type | Default |
|-----------|------|------|---------|
| `EmptyMedia` | `variant` | `"default" \| "icon"` | `"default"` |

There are **no** `title`, `description`, or `media` props — compose with the sub-components instead.

## Reference implementation

Root container (`Empty`):

```ts
"flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-md border-dashed p-6 text-center text-balance md:p-12"
```

Header (`EmptyHeader`):

```ts
"flex max-w-sm flex-col items-center gap-2 text-center"
```

Media CVA (`emptyMediaVariants`):

```ts
const emptyMediaVariants = cva(
  "flex shrink-0 items-center justify-center mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-md [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: { variant: "default" },
  }
)
```

Title / Description / Content:

```ts
// EmptyTitle
"text-lg font-medium tracking-tight"

// EmptyDescription
"text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4"

// EmptyContent
"flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance"
```

## States

The component is presentational and has no interactive state of its own. Interactivity comes from elements placed inside `EmptyContent` (e.g. `Button`), which carry their own hover/focus states.

## Usage guidelines

### Text-only

```tsx
<Empty>
  <EmptyHeader>
    <EmptyTitle>No items</EmptyTitle>
    <EmptyDescription>No items to display.</EmptyDescription>
  </EmptyHeader>
</Empty>
```

### With icon media + action

```tsx
<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <Search className="w-4 h-4" strokeWidth={1.5} />
    </EmptyMedia>
    <EmptyTitle>No results</EmptyTitle>
    <EmptyDescription>
      Try adjusting your search or filter criteria.
    </EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button variant="outline">Clear filters</Button>
  </EmptyContent>
</Empty>
```

### Custom media (default variant)

```tsx
<Empty>
  <EmptyHeader>
    <EmptyMedia>
      <Bell className="w-8 h-8 text-on-surface-variant" strokeWidth={1.5} />
    </EmptyMedia>
    <EmptyTitle>No notifications</EmptyTitle>
    <EmptyDescription>You're all caught up.</EmptyDescription>
  </EmptyHeader>
</Empty>
```

### In lists

Check data length before rendering:

```tsx
if (items.length === 0) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>No items</EmptyTitle>
        <EmptyDescription>No items to display.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

return <List items={items} />
```

## Related

- Table — `Empty` replaces Table contents when there is no data
- NotificationBell — `Empty` inside the dropdown when there are no unread notifications
