# Item

## Overview

Compound component for list items, feed entries, and card-like rows. Composed of `ItemGroup` (wrapper, `role="list"`), `ItemSeparator` (horizontal divider), `Item` (the row), `ItemMedia` (left icon/image), `ItemContent` (flex-1 body), `ItemActions` (right-side actions), `ItemTitle`, `ItemDescription`, `ItemHeader`, and `ItemFooter`. The `Item` row lays out with `flex items-center` and `flex-wrap`, so `ItemHeader`/`ItemFooter` (which use `basis-full`) wrap onto their own rows.

## Import

```tsx
import {
  ItemGroup,
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
} from "@/components/ui/item"
```

## Variants (`Item`)

| Variant | CSS Classes | Visual | Use Case |
|---|---|---|---|
| default | `bg-transparent` | Transparent border + background | Simple list rows, stacked items |
| outline | `border-border` | Visible border on the existing `border` | Card-like items in a grid or list |
| muted | `bg-muted/50` | Subtle muted background tint | Secondary items, non-interactive rows |

Every variant starts from `border border-transparent`; `outline` only swaps the border color (no extra radius — base is already `rounded-md`).

## Sizes (`Item`)

| Size | CSS Classes | Notes |
|---|---|---|
| default | `p-4 gap-4` | Standard padding for list/card items |
| sm | `py-3 px-4 gap-2.5` | Compact rows, dense lists |

## Variants (`ItemMedia`)

`ItemMedia` is its own CVA with a `variant` prop:

| Variant | CSS Classes | Use Case |
|---|---|---|
| default | `bg-transparent` | Bare icon, no container |
| icon | `size-8 border rounded-sm bg-muted [&_svg:not([class*='size-'])]:size-4` | Boxed icon avatar |
| image | `size-10 rounded-sm overflow-hidden [&_img]:size-full [&_img]:object-cover` | Thumbnail / cover image |

## Props

### ItemGroup

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | — | Additional classes |
| children | ReactNode | — | Item children. Renders a `div role="list"` |
| ...div | `React.ComponentProps<"div">` | — | Spread to root element |

### ItemSeparator

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | — | Additional classes |
| ...props | `React.ComponentProps<typeof Separator>` | — | Horizontal `Separator` with `my-0` |

### Item

| Prop | Type | Default | Description |
|---|---|---|---|
| variant | `"default" \| "outline" \| "muted"` | `"default"` | Visual style |
| size | `"default" \| "sm"` | `"default"` | Padding density |
| asChild | boolean | `false` | Render as child element via Radix `Slot` |
| className | string | — | Additional classes |
| ...div | `React.ComponentProps<"div">` | — | Spread to root element |

### ItemMedia

| Prop | Type | Default | Description |
|---|---|---|---|
| variant | `"default" \| "icon" \| "image"` | `"default"` | Media container style |
| className | string | — | Additional classes |
| ...div | `React.ComponentProps<"div">` | — | Spread to root element |

### ItemContent / ItemActions / ItemHeader / ItemFooter

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | — | Additional classes |
| ...div | `React.ComponentProps<"div">` | — | Spread to root element |

### ItemTitle

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | — | Additional classes |
| ...div | `React.ComponentProps<"div">` | — | Spread to root element (renders a `div`; no `asChild`) |

### ItemDescription

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | — | Additional classes |
| ...p | `React.ComponentProps<"p">` | — | Spread to root element (renders a `p`) |

## States / Notes

- **Hover** — Only `<a>` children animate: `[a]:hover:bg-accent/50 [a]:transition-colors duration-100`. There is no built-in hover for plain `div` items; add your own (e.g. `hover:bg-surface-container-high`) when interactive.
- **Focus** — `focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]` (note: a 3px ring with no offset, not the standard 2px+offset pattern).
- **ItemContent stacking** — `flex flex-1 flex-col gap-1`; a second adjacent `ItemContent` becomes `flex-none`.
- **ItemTitle** — `flex w-fit items-center gap-2 text-sm leading-snug font-medium`.
- **ItemDescription** — `text-muted-foreground line-clamp-2 text-sm leading-normal font-normal text-balance`; nested links get `underline underline-offset-4` and `hover:text-primary`.
- **ItemMedia self-alignment** — When the item has a description, media self-aligns to the top (`group-has-[[data-slot=item-description]]/item:self-start` + `translate-y-0.5`).
- **Icon sizing** — lucide-react icons should be `w-4 h-4` with `strokeWidth={1.5}`. The `icon` media variant auto-sizes unsized svgs to `size-4`.

### Composition pattern

```tsx
<ItemGroup>
  <Item variant="outline">
    <ItemMedia variant="icon">
      <Ticket className="w-4 h-4" strokeWidth={1.5} />
    </ItemMedia>
    <ItemContent>
      <ItemTitle>Ticket title</ItemTitle>
      <ItemDescription>Last updated 2h ago</ItemDescription>
    </ItemContent>
    <ItemActions>
      <Button variant="ghost" size="icon-sm">
        <MoreHorizontal className="w-4 h-4" strokeWidth={1.5} />
      </Button>
    </ItemActions>
  </Item>
  <ItemSeparator />
</ItemGroup>
```

## Reference implementation

Base `Item` CVA (verbatim from `item.tsx`):

```ts
const itemVariants = cva(
  "group/item flex items-center border border-transparent text-sm rounded-md transition-colors [a]:hover:bg-accent/50 [a]:transition-colors duration-100 flex-wrap outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border-border",
        muted: "bg-muted/50",
      },
      size: {
        default: "p-4 gap-4 ",
        sm: "py-3 px-4 gap-2.5",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)
```

`ItemMedia` CVA (verbatim):

```ts
const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none group-has-[[data-slot=item-description]]/item:translate-y-0.5",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "size-8 border rounded-sm bg-muted [&_svg:not([class*='size-'])]:size-4",
        image:
          "size-10 rounded-sm overflow-hidden [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: { variant: "default" },
  }
)
```

## Usage Guidelines

### Do
- Use `ItemMedia` for icons or thumbnails (left-aligned); pick the `icon` or `image` variant for boxed media.
- Wrap lists of Items in `ItemGroup` and divide them with `ItemSeparator`.
- Use the `outline` variant when Items appear in a card-like container.
- Use `ItemHeader` / `ItemFooter` for full-width rows above/below the main content (they wrap via `basis-full`).

### Don't
- Don't nest interactive elements inside an already-interactive Item.
- Don't rely on built-in hover for `div` items — only `<a>` children get `hover:bg-accent/50`.
- Don't assume `ItemTitle` supports `asChild` — only `Item` does (via Radix `Slot`).
