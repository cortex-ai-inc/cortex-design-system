# Table

## Overview

Data table built on native HTML table elements. Rows hover and support a selected state, dividers use a bottom border, and the table is wrapped in a horizontally scrollable container for responsive overflow. The `<table>` sets the base font with the standard Tailwind `text-sm` utility (no custom `text-body-sm`).

## Import

```
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table"
```

## Sub-components

| Component | HTML element | `data-slot` | Description |
|-----------|--------------|-------------|-------------|
| Table | table (wrapped in div) | `table` / `table-container` | Root table, wrapped in a scroll container |
| TableHeader | thead | `table-header` | Header group |
| TableBody | tbody | `table-body` | Body group |
| TableFooter | tfoot | `table-footer` | Footer group (muted background) |
| TableRow | tr | `table-row` | Table row (hover + selected states) |
| TableHead | th | `table-head` | Header cell |
| TableCell | td | `table-cell` | Data cell |
| TableCaption | caption | `table-caption` | Table caption / description |

## Styles

| Element | Classes | Notes |
|---------|---------|-------|
| Container (div) | `relative w-full overflow-x-auto` | Wraps the `<table>`; handles horizontal scroll |
| Table | `w-full caption-bottom text-sm` | Caption renders at the bottom |
| Header | `[&_tr]:border-b` | Bottom divider under header rows |
| Body | `[&_tr:last-child]:border-0` | Removes divider on the last row |
| Footer | `bg-muted/50 border-t font-medium [&>tr]:last:border-b-0` | Muted fill, top border |
| Row | `hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors` | Hover + selected highlight, bottom divider |
| Header cell | `text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap` | 40px tall, padded, primary text color |
| Data cell | `p-2 align-middle whitespace-nowrap` | Standard cell padding |
| Caption | `text-muted-foreground mt-4 text-sm` | Muted, below the table |

Header and data cells also include checkbox helpers `[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]` to align row-selection checkboxes.

## Reference implementation

```tsx
// Container + table
<div data-slot="table-container" className="relative w-full overflow-x-auto">
  <table data-slot="table" className={cn("w-full caption-bottom text-sm", className)} {...props} />
</div>

// Row
className={cn(
  "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
  className
)}

// Header cell
className={cn(
  "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
  className
)}

// Data cell
className={cn(
  "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
  className
)}
```

## Responsive

The container uses `overflow-x-auto`, so the table scrolls horizontally on narrow viewports. Set a `min-width` on the table (via `className`) when columns exceed the available space.

## Usage pattern

```tsx
<Table>
  <TableCaption>List of items</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Column A</TableHead>
      <TableHead>Column B</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow data-state="selected">
      <TableCell>Data A</TableCell>
      <TableCell>Data B</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## States

| State | Implementation |
|-------|----------------|
| Hover | Applied automatically via `hover:bg-muted/50` on each row |
| Selected | Set `data-state="selected"` on `TableRow` → `bg-muted` |
| Loading | Replace body rows with Skeleton components |
| Empty | Show TableCaption with a "No results" message, or use Empty |
| Error | Replace table with an error message or inline alert |

## Related

- Skeleton — loading placeholder for table rows
- Empty — empty state for zero-data tables
- Checkbox — row selection (cells align it via the `[role=checkbox]` helpers)
