# Notification

## Overview

Custom NotificationBell component for real-time system notifications with dropdown panel.

## Import

```
import { NotificationBell } from "@/components/ui/notification-bell"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | "" | Additional CSS classes |

## Notification Types

| Type | Icon | Icon color | Description |
|------|------|------------|-------------|
| comment | MessageSquare | k-primary (#ADC6FF / blue) | New comment on ticket |
| status_change | ArrowRight | k-warning (#FBBF24 / amber) | Ticket status changed |
| assigned | UserPlus | k-secondary (#4ADE80 / green) | Ticket assigned to user |

## Bell States

| State | Icon | Badge |
|-------|------|-------|
| No unread | Bell | Hidden |
| Unread | BellDot | Red badge with count (9+ overflow shows "9+") |

## Dropdown Panel

| Property | Value |
|----------|-------|
| Width | w-80 sm:w-96 |
| Background | bg-surface-container-low |
| Border radius | rounded-md |
| Border | border ghost-border |
| Shadow | shadow-ambient |
| Animation | animate-fade-in |
| Z-index | z-50 |

## Dropdown States

| State | Display |
|-------|---------|
| Loading | Spinner centered in dropdown |
| Empty | Bell icon (w-8 h-8) centered + "No new notifications" text |
| List | Notification items grouped by time |
| Error | Error message with retry option |

## Notification Item

Each notification item displays:

- Icon (per type, see table above) in a size-8 rounded-md bg-muted container
- Title text (e.g., "New comment on ticket #123")
- Timestamp (relative, via safeFormatDistanceToNow)
- Click handler to navigate to related ticket

## Behavior

- Unread count fetched via polling (refetchInterval: 30s).
- Opening dropdown auto-marks all notifications as read via mutation.
- "View all notifications" link at dropdown footer.
- Last-check timestamp stored in localStorage (cortex.notifications.since).

## Related

- Topbar — NotificationBell placed in topbar right section
- Spinner — loading state within dropdown
- safeFormatDistanceToNow — relative timestamp formatting
