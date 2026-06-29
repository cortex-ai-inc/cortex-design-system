# Breadcrumb

## Overview

Navigation breadcrumb showing current page location within the route hierarchy. Built on a native `<nav>` element (no Radix primitive). The last item is the current page and is non-interactive; `ChevronRight` icons separate segments.

## Import

```
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb"
```

## Anatomy / Sub-components

| Component | HTML element | Notes |
|-----------|--------------|-------|
| `Breadcrumb` | `nav` | Root wrapper. `aria-label="breadcrumb"`. No styling applied. |
| `BreadcrumbList` | `ol` | `flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5`, `text-muted-foreground`. |
| `BreadcrumbItem` | `li` | `inline-flex items-center gap-1.5`. |
| `BreadcrumbLink` | `a` (or `Slot` via `asChild`) | `hover:text-foreground transition-colors`. |
| `BreadcrumbPage` | `span` | Current page. `text-foreground font-normal`, `role="link"`, `aria-disabled="true"`, `aria-current="page"`. |
| `BreadcrumbSeparator` | `li` | `role="presentation"`, `aria-hidden="true"`. Renders `<ChevronRight />` by default; sized via `[&>svg]:size-3.5`. |
| `BreadcrumbEllipsis` | `span` | `role="presentation"`, `aria-hidden="true"`, `flex size-9 items-center justify-center`. Contains `<MoreHorizontal className="size-4" />` and an sr-only "More" label. |

## Props

- `BreadcrumbLink` accepts `asChild?: boolean`. When `true`, renders via Radix `Slot` so a router `<Link>` can be passed as the child while keeping the link styling.
- All other sub-components are thin wrappers over native elements and accept the corresponding `React.ComponentProps<"nav" | "ol" | "li" | "a" | "span">`, including `className`.

## States

- **Link (default):** `text-muted-foreground` inherited from the list; turns `text-foreground` on hover with a color transition.
- **Current page:** `BreadcrumbPage` is `text-foreground font-normal`, marked `aria-current="page"` and `aria-disabled="true"` (non-interactive).
- **Separator / Ellipsis:** decorative, `aria-hidden="true"`. The default separator icon is `ChevronRight` at `size-3.5`; the ellipsis icon is `MoreHorizontal` at `size-4`.

## Usage pattern

```
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/layout/dashboard">Dashboard</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/layout/tickets">Tickets</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Create Ticket</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

Collapse intermediate segments with `BreadcrumbEllipsis` (wrap it in a `BreadcrumbItem`):

```
<BreadcrumbItem>
  <BreadcrumbEllipsis />
</BreadcrumbItem>
```

Use a custom separator by passing children:

```
<BreadcrumbSeparator>/</BreadcrumbSeparator>
```

## Usage Guidelines

- Each segment except the last is a `BreadcrumbLink`; the final segment is a `BreadcrumbPage`.
- Pass a separator (`BreadcrumbSeparator`) explicitly between every `BreadcrumbItem` — separators are not auto-injected.
- For client-side routing, use `BreadcrumbLink asChild` and nest the router `<Link>`.
- Spacing tightens on small screens (`gap-1.5`) and widens at `sm` (`gap-2.5`); the list wraps and breaks long words.

## Reference implementation

Core className strings, verbatim from `breadcrumb.tsx`:

```tsx
// BreadcrumbList (ol)
"text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5"

// BreadcrumbItem (li)
"inline-flex items-center gap-1.5"

// BreadcrumbLink (a / Slot)
"hover:text-foreground transition-colors"

// BreadcrumbPage (span)
"text-foreground font-normal"

// BreadcrumbSeparator (li) — default child <ChevronRight />
"[&>svg]:size-3.5"

// BreadcrumbEllipsis (span) — child <MoreHorizontal className="size-4" />
"flex size-9 items-center justify-center"
```

## Related

- TopBar — breadcrumbs are rendered inside the topbar's left section.
