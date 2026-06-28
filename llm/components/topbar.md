# Topbar

## Overview

Sticky top bar with hamburger menu trigger (mobile), breadcrumbs, and utility items (docs link, notifications, user menu).

## Import

```
import { Topbar } from "@/components/ui/topbar"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| onMenuClick | () => void | — | Opens mobile sidebar |

## Layout

| Property | Value |
|----------|-------|
| Height | h-12 |
| Position | sticky top-0 |
| Z-index | z-20 |
| Background | bg-surface-dim |
| Border bottom | border-b ghost-border |

## Sections

### Left

| Element | Visibility | Details |
|---------|------------|---------|
| Menu button (hamburger) | lg:hidden | lucide-react Menu icon, w-4 h-4 strokeWidth 1.5 |
| Breadcrumbs | always | Current route path, see Breadcrumb component |

### Right

| Element | Details |
|---------|---------|
| Docs link | lucide-react ArrowUpRight icon, links to external docs |
| NotificationBell | Custom notification component, see Notification |
| Avatar with DropdownMenu | User avatar with dropdown for profile, settings, logout |

## Breadcrumb Route Mapping

| Route key | Display label |
|-----------|---------------|
| dashboard | Dashboard |
| tickets | Tickets |
| admin | Admin |
| profile | Profile |
| new | New |
| team | Team |
| settings | Settings |

## Behavior

- Sticky at top on scroll (top-0).
- Mobile hamburger visible only below lg breakpoint.
- Breadcrumbs auto-generated from current route segments mapped through route mapping object.
- User dropdown: Profile link, Admin link (if admin), separator, Logout.

## Related

- Sidebar — onMenuClick opens mobile sidebar
- Breadcrumb — route display
- Notification — NotificationBell component
