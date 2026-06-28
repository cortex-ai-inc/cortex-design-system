# EmptyState

## Overview

Custom EmptyState component for zero-data states across lists, tables, and content areas.

## Import

```
import {
  EmptyState,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from "@/components/ui/empty-state"
```

## Sub-components

| Component | Purpose |
|-----------|---------|
| EmptyState | Root container, flex flex-col items-center |
| EmptyHeader | Title + description group |
| EmptyTitle | Heading text (text-title-sm) |
| EmptyDescription | Body text (text-body-sm text-on-surface-variant) |
| EmptyContent | Optional action area (button, link, etc.) |
| EmptyMedia | Visual placeholder area |

## Media variants

| Variant | Implementation |
|---------|----------------|
| default | No media (text only) |
| icon | size-10 container with bg-muted rounded-md, centered icon |

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | — | Empty state heading |
| description | string | — | Empty state description |
| media | "none" | "icon" | "none" | Visual variant |

## Usage patterns

```
// Text only
<EmptyState
  title="No tickets found"
  description="Create your first ticket to get started."
/>

// With icon
<EmptyState
  title="No results"
  description="Try adjusting your search or filter criteria."
  media="icon"
>
  <EmptyContent>
    <Button variant="outline">Clear filters</Button>
  </EmptyContent>
</EmptyState>

// Custom media
<EmptyState
  title="No notifications"
  description="You're all caught up."
>
  <EmptyMedia>
    <Bell className="w-8 h-8 text-on-surface-variant" />
  </EmptyMedia>
</EmptyState>
```

## Usage in lists

Check data array length before rendering:

```
if (items.length === 0) {
  return (
    <EmptyState
      title="No items"
      description="No items to display."
    />
  )
}

return <List items={items} />
```

## Related

- Table — EmptyState replaces Table when no data
- Notification — EmptyState inside dropdown when no unread notifications
