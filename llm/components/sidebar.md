# Sidebar

## Overview

Custom primary navigation sidebar (not the shadcn `sidebar` primitive). A single
`Sidebar` component renders a fixed left rail that is `260px` wide when expanded
and `72px` when collapsed. On desktop (`lg+`) it is always visible; below `lg` it
becomes a slide-in drawer with a blurred backdrop overlay. Nav groups, icons, and
labels are defined inline inside the component — there is no slot/sub-component API.

Each reference app wires its own `navGroups` array, logo, and branding, but the
markup, classes, and behavior are identical between `cortex-support-front`
(primary source) and `cortex-coder-front`.

## Import

```
import { Sidebar } from "@/components/ui/sidebar"
```

`Sidebar` is the only export. `NavItem` is an internal helper and is not exported.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| open | boolean | false | Controls mobile drawer visibility (slides in / out) |
| onClose | () => void | — | Called to close the mobile drawer (backdrop click, Escape, route change) |
| collapsed | boolean | false | Desktop icons-only collapsed mode (`lg+` only) |
| onToggleCollapse | () => void | — | Toggles collapsed state (desktop `PanelLeftClose`/`PanelLeftOpen` button) |

Branding, nav groups, and visibility filtering are internal:

- `cortex-support-front`: `Headphones` logo, `CORTEX_SUPPORT` label, groups
  `TICKETS / ANALYTICS / ADMIN`; the `ADMIN` group is hidden unless `user.isAdmin`.
- `cortex-coder-front`: `Workflow` logo, `CORTEX_CODER` label, RBAC-filtered groups
  (`ORCHESTRATION / WORKFLOWS / PULL REQUEST / CHAT / CLOUDENV / OPERATIONS / TOOLS /
  SYSTEM`) plus a `PLATFORM` group gated by `useIsPlatform()`. Items are filtered per
  `item.permission` via `can(...)`; empty groups are dropped.

## Layout

| Element | Width | Background | Z-index |
|---------|-------|------------|---------|
| Aside (expanded) | w-[260px] | bg-surface-container-lowest | lg:z-10 |
| Aside (collapsed, `lg+`) | lg:w-[72px] | bg-surface-container-lowest | lg:z-10 |
| Aside (mobile, off-canvas) | w-[260px] | bg-surface-container-lowest | z-[120] |
| Mobile backdrop | fixed inset-0 | bg-black/60 backdrop-blur-sm | z-[110] |

Notes:

- The aside has **no right border**. Separation from the main content relies on the
  darker `surface-container-lowest` tonal layer, not a `1px` divider.
- Width/transform transition: `transition-[transform,width] duration-200 ease-out`.
- Off-canvas state below `lg` toggles `-translate-x-full` (closed) / `translate-x-0`
  (open). On `lg+` the aside is pinned with `lg:translate-x-0`.
- The bottom actions block is the only internal divider:
  `border-t border-on-surface-variant/10`.

## Nav Item States

`NavItem` renders a TanStack Router `<Link>` (height `h-10`, `rounded-sm`,
`text-body-sm`). It always carries a `3px` left border that is colored only when active.

| State | Background | Text | Left border |
|-------|------------|------|-------------|
| Default | transparent | text-on-surface-variant | border-l-[3px] border-transparent |
| Hover | bg-surface-container-high/50 | (unchanged) | border-l-[3px] border-transparent |
| Active | bg-surface-container-high | text-on-surface | border-l-[3px] border-k-primary-container |

- Active is determined by route: `location.pathname === item.to` or
  `location.pathname.startsWith(item.to + "/")` (the Dashboard/Home item uses an exact
  match on `"/"`).
- There is **no disabled state** — hidden items are filtered out of the nav entirely.
- Hover does not change the text color; only the background and (for active) the border
  change.

## Anatomy

The sidebar is a flat layout, not a composed set of slots:

```
<aside>                         — fixed left rail, flex flex-col, overflow-y-auto
  Logo row                      — gradient-primary icon tile + brand label
                                  + desktop collapse button + mobile close (X)
  <nav> flex-1 px-3 py-2 space-y-6
    Dashboard NavItem           — special, above the groups
    For each group:
      Group label               — text-label-sm text-on-surface-variant/60 (hidden when collapsed)
      Group items               — space-y-0.5, each a NavItem
  Bottom actions                — border-t; external links + Logout button
                                  (support: Docs + Help links; coder: Profile NavItem + Docs link)
</aside>
```

- Logo tile: `w-8 h-8 rounded-md gradient-primary` with the brand icon
  `text-surface-container-lowest` (dark icon on the blue gradient).
- Brand label: `text-[13px] font-semibold text-on-surface tracking-wide`.
- Collapse toggle (desktop only, `hidden lg:flex`): `PanelLeftClose` when expanded,
  `PanelLeftOpen` when collapsed.
- Mobile close button (`lg:hidden`): `X` icon.
- Footer links/buttons use `text-on-surface-variant/50`; the Logout button hovers to
  `hover:text-k-error`. Footer link set differs per app: support renders Docs (`BookOpen`)
  + Help (`HelpCircle`) external links; coder renders a Profile `NavItem` + a single Docs
  (`FileText`) external link. Both end with the Logout button.

## Behavior

- **Route change** closes the mobile drawer (`onClose` runs on `location.pathname` change).
- **Escape** key closes the drawer while `open`; opening also locks body scroll
  (`document.body.style.overflow = "hidden"`).
- **Backdrop** (`lg:hidden`) closes the drawer on click and animates in with
  `animate-fade-in`.
- **Collapsed mode** hides labels and group headers (`lg:hidden`), centers icons
  (`lg:justify-center lg:gap-0 lg:px-0`), and stacks the logo (`lg:flex-col`). Tooltips
  are provided via the native `title` attribute (set to the item label when collapsed),
  not the Tooltip component.
- All icons are `lucide-react`, sized `w-4 h-4` with `strokeWidth={1.5}`.

## Reference implementation

Aside container (verbatim):

```tsx
<aside
  className={cn(
    "fixed left-0 top-0 w-[260px] h-screen bg-surface-container-lowest flex flex-col overflow-y-auto overflow-x-hidden z-[120] transition-[transform,width] duration-200 ease-out lg:translate-x-0 lg:z-10",
    open ? "translate-x-0" : "-translate-x-full",
    collapsed && "lg:w-[72px]",
  )}
  data-collapsed={collapsed ? "true" : "false"}
  aria-label="Main navigation"
>
```

NavItem link (verbatim):

```tsx
<Link
  to={to}
  title={collapsed ? label : undefined}
  className={cn(
    "flex items-center gap-3 h-10 px-3 rounded-sm text-body-sm transition-all",
    isActive
      ? "bg-surface-container-high text-on-surface border-l-[3px] border-k-primary-container"
      : "text-on-surface-variant hover:bg-surface-container-high/50 border-l-[3px] border-transparent",
    collapsed && "lg:justify-center lg:gap-0 lg:px-0",
  )}
>
  <Icon className="w-4 h-4 shrink-0" strokeWidth={1.5} />
  <span className={cn("truncate", collapsed && "lg:hidden")}>{label}</span>
</Link>
```

Mobile backdrop (verbatim):

```tsx
<div
  className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm lg:hidden animate-fade-in"
  onClick={onClose}
  aria-hidden="true"
/>
```

## Usage Guidelines

- Drive `open` / `onClose` from the layout shell; the hamburger trigger lives in the
  TopBar (`lg:hidden`).
- Persist `collapsed` / `onToggleCollapse` in the shell so the desktop rail width is
  remembered; offset the main content by the matching margin (`260px` / `72px`).
- Keep nav definitions inside the component's `navGroups` array; gate items with the
  app's auth mechanism (`isAdmin` in support, `can(permission)` / `useIsPlatform()` in
  coder) rather than rendering disabled links.
- Do not add a right border to the rail — rely on the `surface-container-lowest` tone.

## Related

- TopBar — hosts the mobile hamburger trigger that sets `open`.
