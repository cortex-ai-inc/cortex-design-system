# Pagination

## Overview

Navigation component for paginated content with page-number links, previous/next controls, and an ellipsis for truncated ranges. Built on native HTML elements (`nav` / `ul` / `li` / `a`); page links reuse `buttonVariants` from the Button component rather than defining their own styles.

## Import

```
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination"
```

## Sub-components

| Component | HTML element | Description |
|-----------|--------------|-------------|
| Pagination | `nav` | Root wrapper, `role="navigation"`, `aria-label="pagination"`, centered |
| PaginationContent | `ul` | Flex row, wraps, `gap-1` |
| PaginationItem | `li` | Page item wrapper (no styling) |
| PaginationLink | `a` | Page-number link; styled via `buttonVariants` |
| PaginationPrevious | PaginationLink | Previous page (ChevronLeftIcon + "Previous") |
| PaginationNext | PaginationLink | Next page ("Next" + ChevronRightIcon) |
| PaginationEllipsis | `span` | Truncated-range indicator (MoreHorizontalIcon) |

## PaginationLink

`PaginationLink` accepts `isActive?: boolean` and a `size` prop (the Button `size`, default `"icon"`). It does not apply hand-written color classes — it delegates entirely to `buttonVariants`:

| State | Variant applied | Result |
|-------|-----------------|--------|
| Default | `buttonVariants({ variant: "ghost", size })` | Transparent, `hover:bg-accent hover:text-accent-foreground` |
| Active (`isActive`) | `buttonVariants({ variant: "outline", size })` | Bordered button with subtle background, marks the current page |

Active state also sets `aria-current="page"` and `data-active={true}`. There is **no** `gradient-primary` fill and **no** `text-white` on the active page — it is rendered as the `outline` button variant.

`PaginationPrevious` and `PaginationNext` force `size="default"` (the `h-9 px-4 py-2` button size) and add `gap-1 px-2.5`; their label text is hidden below the `sm` breakpoint (`hidden sm:block`), leaving only the chevron icon on mobile.

## Reference implementation

Root and content:

```tsx
<nav
  role="navigation"
  aria-label="pagination"
  data-slot="pagination"
  className={cn("mx-auto flex w-full justify-center", className)}
/>

<ul
  data-slot="pagination-content"
  className={cn("flex flex-row flex-wrap items-center justify-center gap-1", className)}
/>
```

Link (variant chosen by `isActive`):

```tsx
function PaginationLink({ className, isActive, size = "icon", ...props }) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className
      )}
      {...props}
    />
  )
}
```

Previous / Next / Ellipsis:

```tsx
// Previous: size="default", className="gap-1 px-2.5 sm:pl-2.5"
//   <ChevronLeftIcon /> <span className="hidden sm:block">Previous</span>
// Next:     size="default", className="gap-1 px-2.5 sm:pr-2.5"
//   <span className="hidden sm:block">Next</span> <ChevronRightIcon />

<span
  aria-hidden
  data-slot="pagination-ellipsis"
  className={cn("flex size-9 items-center justify-center", className)}
>
  <MoreHorizontalIcon className="size-4" />
  <span className="sr-only">More pages</span>
</span>
```

Icons are `lucide-react` (`ChevronLeftIcon`, `ChevronRightIcon`, `MoreHorizontalIcon`); the ellipsis icon is sized `size-4`, and button-internal chevrons inherit the Button default of `size-4`.

## Usage pattern

```
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">8</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

## Behavior

- The active page is marked with `isActive`, rendering the `outline` button variant plus `aria-current="page"`.
- `PaginationEllipsis` is `aria-hidden` and carries an `sr-only` "More pages" label; show it when page ranges are truncated.
- Previous/Next labels collapse to icon-only below the `sm` breakpoint.
- Disabled handling (e.g. on first/last page) is the caller's responsibility — the component does not auto-disable. Apply Tailwind utilities such as `pointer-events-none opacity-50` on the link when needed.

## Related

- Button — `PaginationLink` reuses `buttonVariants` (`ghost` / `outline`, `size` `icon` / `default`).
- Table — paginated tables place Pagination below the Table component.
