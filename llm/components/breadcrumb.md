# Breadcrumb

## Overview

Navigation breadcrumb showing current page location within the route hierarchy.

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

## Sub-components

| Component | HTML element | Description |
|-----------|--------------|-------------|
| Breadcrumb | nav | Root wrapper with aria-label="breadcrumb" |
| BreadcrumbList | ol | Ordered list with flex row, items-center, gap-1.5 |
| BreadcrumbItem | li | Breadcrumb segment |
| BreadcrumbLink | a | Link to a route segment |
| BreadcrumbPage | span | Current page (non-interactive, aria-current="page") |
| BreadcrumbSeparator | li | Chevron right icon separator |
| BreadcrumbEllipsis | button | Collapsed segments trigger |

## Route name mapping

| Route segment | Display label |
|---------------|---------------|
| dashboard | Dashboard |
| tickets | Tickets |
| admin | Admin |
| profile | Profile |
| new | New |
| team | Team |
| settings | Settings |

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

## Behavior

- Auto-generated from route segments in Topbar.
- Each segment (except the last) is a link to that level.
- Current page (last segment) is non-interactive span with aria-current="page".
- Separators between each item (chevron icon).
- Ellipsis can collapse intermediate segments on small screens.

## Related

- Topbar — breadcrumbs rendered inside the topbar left section
