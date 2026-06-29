# TopBar

## Overview

Custom sticky top bar. A single `<header>` row, `h-12`, that spans the content area above the page. Left side holds a mobile hamburger trigger plus an auto-generated breadcrumb; right side holds utility actions (docs link, `NotificationBell`, and an avatar `DropdownMenu`). Not Radix-based — it composes `Avatar`, `DropdownMenu`, and `NotificationBell`.

## Import

```ts
import { TopBar } from "@/components/ui/topbar"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onMenuClick` | `() => void` | — | Called by the mobile hamburger button to open the sidebar. |

The component reads its other data from hooks, not props: `useLocation()` (breadcrumb), `useNavigate()` (routing), and `useAuth()` (current `user`, `logout`).

## Layout

| Property | Value |
|----------|-------|
| Element | `<header>` |
| Height | `h-12` |
| Position | `sticky top-0` |
| Z-index | `z-20` |
| Background | `bg-surface-dim` |
| Border bottom | `border-b border-on-surface-variant/10` |
| Spacing | `flex items-center justify-between gap-3 px-4 sm:px-6` |

Note: the bottom border uses `border-on-surface-variant/10` (an opacity modifier), not the `ghost-border` utility class.

## Anatomy

### Left — hamburger + breadcrumb

Wrapped in `flex items-center gap-2 min-w-0`.

| Element | Visibility | Details |
|---------|------------|---------|
| Hamburger button | `lg:hidden` | `lucide-react` `Menu`, `w-5 h-5`, `strokeWidth={1.5}`; button `p-1.5 -ml-1.5 rounded-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high` |
| Breadcrumb | always | Auto-generated from the route. One or two crumbs (see below) |

Breadcrumb rendering depends on depth:

- **Single crumb** (top-level route): `<span className="text-title-sm text-on-surface font-semibold truncate">`.
- **Two crumbs** (sub-page): root as `text-body-sm text-on-surface font-medium truncate`, a `/` separator as `text-on-surface-variant/40`, then the leaf as `text-body-sm text-on-surface-variant truncate`.

### Right — actions

Wrapped in `flex items-center gap-3 sm:gap-4 shrink-0`.

| Element | Details |
|---------|---------|
| Docs link | External `<a target="_blank" rel="noopener noreferrer">` with `lucide-react` `BookOpen`, `w-4 h-4`, `strokeWidth={1.5}`; `text-on-surface-variant hover:text-on-surface` |
| `NotificationBell` | Custom notification component (cortex-support-front only) |
| Avatar dropdown | `Avatar` (`w-8 h-8`) trigger; `DropdownMenuContent align="end"` with profile/sign-out items |

## Avatar Dropdown

Trigger is a `<button className="focus:outline-none">` wrapping an `Avatar` (`w-8 h-8 cursor-pointer`) whose `AvatarFallback` shows `getInitials(user.name)` styled `text-label-sm font-medium` plus a hash-derived `getAvatarColor(...)` class.

`DropdownMenuContent`:

```tsx
<DropdownMenuContent
  align="end"
  className="bg-surface-container-low border-on-surface-variant/10 min-w-[200px]"
>
```

Contents (cortex-support-front):

| Item | Class | Action |
|------|-------|--------|
| User header | `px-2 py-1.5 border-b border-on-surface-variant/10 mb-1` — name `text-body-sm text-on-surface`, email `text-code-sm text-on-surface-variant` | — |
| Profile & security | `text-on-surface-variant hover:text-on-surface focus:text-on-surface focus:bg-surface-container-high cursor-pointer gap-3`; `UserIcon` `w-4 h-4` | `navigate({ to: "/profile" })` |
| Separator | `<div className="h-px bg-on-surface-variant/10 my-1" />` | — |
| Sign out | same base class but `hover:text-k-error focus:text-k-error`; `LogOut` `w-4 h-4` | `logout((to) => navigate({ to }))` |

## Breadcrumb Route Mapping

Breadcrumbs come from a `routeNames` map keyed by the **first** path segment; the second segment derives the leaf crumb (`new` → `New`, otherwise `Details`). If the first segment is unknown, it falls back to the product name.

cortex-support-front mapping (`""` → `Home`):

| Segment | Label |
|---------|-------|
| `tickets` | Tickets |
| `notifications` | Notifications |
| `conversations` | Conversations |
| `reports` | Reports |
| `team` | Team |
| `settings` | Settings |
| _(unknown)_ | `Cortex Support` |

## States

- **Hamburger hover** — `hover:text-on-surface hover:bg-surface-container-high`, only below `lg`.
- **Docs link hover** — `hover:text-on-surface`.
- **Dropdown item hover/focus** — `focus:bg-surface-container-high`; sign-out turns `k-error`.
- **No user** — initials fall back to `"?"`, color class is empty.

## Reference implementation

Header root (verbatim, cortex-support-front):

```tsx
<header className="sticky top-0 z-20 h-12 bg-surface-dim flex items-center justify-between gap-3 px-4 sm:px-6 border-b border-on-surface-variant/10">
```

Breadcrumb block (verbatim):

```tsx
{parts.length > 1 ? (
  <>
    <span className="text-body-sm text-on-surface font-medium truncate">{parts[0]}</span>
    <span className="text-on-surface-variant/40">/</span>
    <span className="text-body-sm text-on-surface-variant truncate">{parts[1]}</span>
  </>
) : (
  <span className="text-title-sm text-on-surface font-semibold truncate">{parts[0]}</span>
)}
```

## Variation — cortex-coder-front

The coder app's `TopBar` is the same shell with different right-side actions:

- No `NotificationBell`. Instead a `TenantSwitcher` is rendered first.
- The docs link is conditional on `getDocUrl(pathname)` and wrapped in a `Tooltip` (`TooltipContent` = "View documentation").
- The avatar dropdown has **only** "Profile & security" — no separator and no sign-out item.
- `routeNames` maps coder routes (`""` → `Dashboard`, `nodes`, `llm-providers`, `agent-workflows`, etc.) and the unknown fallback is `Cortex Coder`; the second-segment logic also maps `sessions`/`session` → `Session`.

## Related

- `Sidebar` — `onMenuClick` opens the mobile sidebar overlay.
- `NotificationBell` — right-side notification action (cortex-support-front).
- `Avatar` / `DropdownMenu` — compose the user menu.
