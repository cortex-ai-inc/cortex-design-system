# Sidebar

## Overview

Primary navigation sidebar with desktop overlay (fixed), collapsible mode, and mobile drawer variants. Wraps sidebar content and nav items.

## Import

```
import { Sidebar, SidebarNavItem } from "@/components/ui/sidebar"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| open | boolean | false | Controls mobile panel visibility |
| onClose | () => void | — | Closes mobile overlay |
| collapsed | boolean | false | Icons-only collapsed mode |
| onToggleCollapse | () => void | — | Toggles collapsed state |

## Layout

| Variant | Width | Background | Border | Z-index |
|---------|-------|------------|--------|---------|
| Desktop (lg+) | w-[260px] | bg-surface-container-lowest | border-r ghost-border | z-10 |
| Collapsed (lg+) | w-[72px] | bg-surface-container-lowest | border-r ghost-border | z-10 |
| Mobile overlay | fullscreen (left panel) | bg-surface-container-lowest | — | z-[120] |
| Mobile backdrop | fullscreen | bg-black/60 backdrop-blur-sm | — | z-[110] |

## Nav Item States

| State | Background | Text | Border |
|-------|------------|------|--------|
| Default | transparent | text-on-surface-variant | none |
| Hover | bg-surface-container-high | text-on-surface | none |
| Active | bg-surface-container-high | text-on-surface | border-l-[3px] border-k-primary-container |
| Disabled | transparent | text-on-surface-variant/50 | none |

## Structure

```
Sidebar
  SidebarHeader          — Logo / branding area
  SidebarContent         — Scrollable nav area
    SidebarGroup
      SidebarGroupLabel  — Section header, uppercase text-label-sm
      SidebarNavItem     — Individual nav link (icon + label)
    SidebarGroup
      SidebarGroupLabel
      SidebarNavItem
  SidebarFooter          — Docs link, help link, logout
```

## Behavior

- Desktop: fixed positioning, always visible alongside main content (main has ml-[260px] or ml-[72px]).
- Collapsed: only icons shown; labels hidden (tooltip on hover if needed).
- Mobile: triggered via hamburger (Menu icon, lg:hidden in Topbar). Panel slides in from left. Backdrop blocks interaction with main content. Close on backdrop click or onClose call.
- Active nav item determined by current route.

## Related

- Topbar — contains hamburger trigger for mobile sidebar
- Tooltip — used in collapsed mode for icon-only nav items
