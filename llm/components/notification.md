# Notification

## Overview

Custom `NotificationBell` component for the topbar. A bell trigger button toggles a dropdown panel listing recent notifications. Opening the panel auto-marks all notifications as read. Self-contained — it reads its data from React Query hooks and takes no props.

## Import

```
import { NotificationBell } from "@/components/ui/notification-bell"
```

## Props

`NotificationBell` takes **no props**. All data is sourced internally:

| Source | Hook | Provides |
|--------|------|----------|
| Notification list | `useNotifications()` | `data.notifications`, `isLoading` |
| Unread count | `useUnreadCount()` | `data.unread_count` |
| Mark-all-read | `useMarkAllNotificationsRead()` | mutation fired on open |

Navigation uses `useNavigate()` from `@tanstack/react-router`.

## Anatomy

- **Trigger button** — `Bell` / `BellDot` icon plus an unread count badge.
- **Dropdown panel** — header, scrollable list, footer link.
- **Notification item** — type icon + title + message + relative timestamp.

## Notification Types

`NotificationIcon` renders one of three lucide icons (all `w-4 h-4`, `strokeWidth={1.5}`, `shrink-0 mt-0.5`):

| Type | Icon | Icon color |
|------|------|------------|
| `comment` | `MessageSquare` | `text-k-primary` (blue) |
| `status_change` | `ArrowRight` | `text-amber-500` |
| `assigned` | `UserPlus` | `text-green-500` |

## Bell / Trigger States

| State | Icon | Badge |
|-------|------|-------|
| No unread | `Bell` | none |
| Unread (`unreadCount > 0`) | `BellDot` | red count badge |

Trigger button class:

```
relative p-1.5 rounded-sm text-on-surface-variant hover:text-on-surface
  hover:bg-surface-container-high transition-colors
```

Unread badge (`rounded-full` is intentional here — it is a count chip):

```
absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-k-error
  text-[10px] font-bold text-white flex items-center justify-center
```

Counts above 9 render as `9+`. `aria-label` reflects the count (`"N unread notifications"` or `"Notifications"`).

## Dropdown Panel

| Property | Value |
|----------|-------|
| Position | `absolute right-0 top-full mt-2` |
| Width | `w-80 sm:w-96` |
| Background | `bg-surface-container-low` |
| Border radius | `rounded-md` |
| Border | `border ghost-border` |
| Shadow | `shadow-ambient` |
| Animation | `animate-fade-in` |
| Z-index | `z-50` |

Header: `px-4 py-3` with bottom divider `border-b border-on-surface-variant/10`, title `text-title-sm text-on-surface font-semibold` reading "Notifications".

Scroll region: `max-h-80 overflow-y-auto`.

## Dropdown Content States

| State | Display |
|-------|---------|
| Loading | Centered `text-body-sm text-on-surface-variant` "Loading..." text (`px-4 py-8 text-center`) |
| Empty | `Bell` icon (`w-8 h-8 text-on-surface-variant/20`) centered + "No new notifications" |
| List | Flat list of items separated by `divide-y divide-on-surface-variant/5` |

There is no spinner, time-grouping, or dedicated error state in the source — the list is flat and rows are divided by hairline dividers.

## Notification Item

Each item is a full-width `<button>` that navigates to `/tickets/$id` for the notification's `ticket_id`:

```
w-full text-left px-4 py-3 hover:bg-surface-container-high/40
  transition-colors cursor-pointer
```

Layout is `flex items-start gap-3`:

- Type icon (see Notification Types)
- A `min-w-0 flex-1` text column:
  - Title — `text-body-sm text-on-surface line-clamp-2`
  - Message — `text-body-sm text-on-surface-variant mt-0.5 line-clamp-2`
  - Timestamp — `text-code-sm text-on-surface-variant/60 mt-1`, via `safeFormatDistanceToNow(created_at, { addSuffix: true })`

## Footer

A "View all notifications" button (top divider `border-t border-on-surface-variant/10`) closes the panel and navigates to `/notifications`:

```
w-full px-4 py-2.5 text-body-sm text-k-primary
  hover:bg-surface-container-high/40 transition-colors
  flex items-center justify-center gap-1.5
```

Trailing `ArrowUpRight` icon at `w-3.5 h-3.5`, `strokeWidth={1.5}`.

## Behavior

- Dropdown open state is local React state; an outside `mousedown` listener (on a wrapping `ref`) closes it.
- On opening with `unreadCount > 0`, `markAllNotificationsRead` fires once, guarded by a `hasMarked` ref that resets when the panel closes.
- Clicking an item closes the panel and routes to the related ticket.

## Reference implementation

Trigger button and unread badge:

```tsx
<button
  onClick={handleToggle}
  className="relative p-1.5 rounded-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
  aria-label={unreadCount > 0 ? `${unreadCount} unread notifications` : 'Notifications'}
>
  {unreadCount > 0 ? (
    <>
      <BellDot className="w-4 h-4" strokeWidth={1.5} />
      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-k-error text-[10px] font-bold text-white flex items-center justify-center">
        {unreadCount > 9 ? '9+' : unreadCount}
      </span>
    </>
  ) : (
    <Bell className="w-4 h-4" strokeWidth={1.5} />
  )}
</button>
```

Dropdown panel container:

```tsx
<div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-surface-container-low rounded-md border ghost-border shadow-ambient animate-fade-in z-50">
```

## Related

- TopBar — `NotificationBell` placed in the topbar right section
- `safeFormatDistanceToNow` — relative timestamp formatting (`@/lib/utils`)
- `@/lib/queries/notifications` — `useNotifications`, `useUnreadCount`, `useMarkAllNotificationsRead`, `NotificationItem`, `NotificationType`
