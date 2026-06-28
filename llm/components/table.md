# Table

## Overview

Data table built on HTML table elements with consistent styling for row hover, dividers, and responsive overflow.

## Import

```
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table"
```

## Sub-components

| Component | HTML element | Description |
|-----------|--------------|-------------|
| Table | table | Root table wrapper |
| TableHeader | thead | Header group |
| TableBody | tbody | Body group |
| TableRow | tr | Table row |
| TableHead | th | Header cell |
| TableCell | td | Data cell |
| TableCaption | caption | Table caption / description |

## Styles

| Element | Classes | Description |
|---------|---------|-------------|
| Wrapper | relative w-full overflow-auto | Responsive wrapper with horizontal scroll |
| Row (default) | border-b ghost-border transition-colors | Divider between rows |
| Row (hover) | hover:bg-muted/50 | Hightlight on hover |
| Header cell | h-10 px-2 text-left align-middle font-medium text-on-surface-variant | Styled header |
| Data cell | p-2 align-middle | Standard cell padding |

## Responsive

The table wrapper uses overflow-x-auto to handle horizontal overflow on narrow viewports. Set a min-width on the table (via className) when columns exceed available space.

## Usage pattern

```
<Table>
  <TableCaption>List of items</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Column A</TableHead>
      <TableHead>Column B</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Data A</TableCell>
      <TableCell>Data B</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## States

| State | Implementation |
|-------|----------------|
| Loading | Replace body rows with Skeleton components |
| Empty | Show TableCaption with "No results" message, or use EmptyState |
| Error | Replace table with error message or inline alert |

## Related

- Skeleton — loading placeholder for table rows
- EmptyState — empty state for zero-data tables
