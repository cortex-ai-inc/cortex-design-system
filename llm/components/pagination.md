# Pagination

## Overview

Navigation component for paginated content with page numbers, previous/next controls, and ellipsis for truncated ranges.

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
| Pagination | nav | Root wrapper with aria-label |
| PaginationContent | ul | Flex row with gap-1 |
| PaginationItem | li | Page item wrapper |
| PaginationLink | a | Page number link |
| PaginationPrevious | PaginationLink | Previous page (chevron left icon) |
| PaginationNext | PaginationLink | Next page (chevron right icon) |
| PaginationEllipsis | span | Truncated range indicator |

## PaginationLink states

| State | Classes |
|-------|---------|
| Default | text-on-surface-variant hover:text-on-surface |
| Active | gradient-primary text-white |
| Disabled | opacity-50 pointer-events-none |

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

- PaginationPrevious disabled on first page.
- PaginationNext disabled on last page.
- Ellipsis shown when pages are truncated (large page counts).
- Active page highlighted with gradient-primary.

## Related

- Table — paginated tables use Pagination below the Table component
