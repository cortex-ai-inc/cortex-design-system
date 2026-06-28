# Item

## Overview

Compound component for list items, feed entries, and card-like rows. Composed of `ItemGroup` (wrapper), `ItemMedia` (left icon/image), `ItemContent` (flex-1 body), `ItemActions` (right-side actions), `ItemTitle`, `ItemDescription`, `ItemHeader`, and `ItemFooter`.

## Import

```tsx
import {
  ItemGroup,
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
} from "@/components/ui/item"
```

## Variants

| Variant | CSS Classes | Visual | Use Case |
|---|---|---|---|
| default | (none) | No border, no background tint | Simple list rows, stacked items |
| outline | `border border-[rgba(194,198,214,0.15)] rounded-sm` | Thin ghost border, transparent bg | Card-like items in a grid or list |
| muted | `bg-surface-container-high/30` | Subtle background tint, no border | Secondary items, non-interactive rows |

## Sizes

| Size | CSS Classes | Notes |
|---|---|---|
| default | `p-4` | Standard padding for list/card items |
| sm | `py-3 px-4` | Compact rows, dense lists |

## Props

### ItemGroup

| Prop | Type | Default | Description |
|---|---|---|---|
| children | ReactNode | — | Item children |
| className | string | — | Additional classes |

### Item

| Prop | Type | Default | Description |
|---|---|---|---|
| variant | `"default" | "outline" | "muted"` | `"default"` | Visual style |
| size | `"default" | "sm"` | `"default"` | Padding density |
| className | string | — | Additional classes |
| children | ReactNode | — | Item children |
| ...div | HTMLAttributes | — | Spread to root element |

### ItemMedia

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | — | Additional classes |
| children | ReactNode | — | Icon or image element |

### ItemContent

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | — | Additional classes |
| children | ReactNode | — | Title, description, etc. |

### ItemActions

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | — | Additional classes |
| children | ReactNode | — | Action buttons, menus, etc. |

### ItemTitle

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | — | Additional classes |
| children | ReactNode | — | Text content |
| asChild | boolean | false | Render as child element |

### ItemDescription

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | — | Additional classes |
| children | ReactNode | — | Text content |

### ItemHeader

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | — | Additional classes |
| children | ReactNode | — | Header content |

### ItemFooter

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | — | Additional classes |
| children | ReactNode | — | Footer content |

## States / Notes

- **Empty state**: ItemGroup with a single child showing a "no items" message inside an Item wrapper.
- **Loading state**: Use Skeleton components inside ItemContent for placeholder rendering.
- **Interactive items**: Wrap Item with a link or button; apply `hover:bg-surface-container-high/50` for feedback.
- **Icon sizing in ItemMedia**: lucide-react icons should be `w-4 h-4 strokeWidth={1.5}`.
- **Layout**: Item uses `flex items-start gap-3` — media on left, content in middle (flex-1), actions on right.

### Composition pattern

```tsx
<Item variant="outline">
  <ItemMedia>
    <Ticket className="w-4 h-4" />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Ticket title</ItemTitle>
    <ItemDescription>Last updated 2h ago</ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button variant="ghost" size="icon-sm">
      <MoreHorizontal className="w-4 h-4" />
    </Button>
  </ItemActions>
</Item>
```

## Usage Guidelines

### Do
- Use ItemMedia for icons or small avatars (left-aligned).
- Use ItemActions sparingly — one primary action per item.
- Wrap lists of Items in ItemGroup for consistent spacing.
- Use outline variant when Items appear in a card-like container.

### Don't
- Don't nest interactive elements inside an already-interactive Item.
- Don't use muted variant for items that need hover/active states.
- Don't put more than two action elements in ItemActions.
