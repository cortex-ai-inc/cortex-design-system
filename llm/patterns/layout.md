# Layout

## Overview

Desktop-first layout system consisting of a collapsible sidebar (260px expanded, 72px collapsed), a fixed topbar (48px), and a main content area. Uses CSS Grid or flexbox in the app shell to arrange these regions.

## Key Rules

- **Sidebar width**: 260px expanded, 72px collapsed (icon-only). Transition via `w-72` to `w-[72px]`.
- **Topbar height**: 48px (`h-12`). Fixed at the top, spans the remaining width beside the sidebar.
- **Main content**: Fills the remaining viewport after sidebar and topbar. Contains padding and scroll.
- **Sidebar overlay (mobile)**: At the `lg` breakpoint (1024px) and below, the sidebar becomes an overlay panel hidden by default, triggered by a hamburger menu in the topbar.
- **Page headers**: Use `flex flex-col gap-3 sm:flex-row` — stacks vertically on mobile, becomes a horizontal row on desktop (sm breakpoint and above).
- **Content width caps**:
  - Forms: `max-w-5xl`
  - Rich text editors: `max-w-6xl`
  - Dashboards: `max-w-7xl`
  - Full-width pages: no cap, use `px-6` padding
- **Grid tables**: Wrapped in `overflow-x-auto` with an inner `div` set to `min-w-[900px]` to allow horizontal scroll on narrow viewports.
- **Responsive tables**: On mobile (below `md`), table rows collapse into stacked card-like layouts.
- **Desktop-first**: Base styles target desktop; mobile overrides use `max-md:` or the `lg` breakpoint for sidebar behavior.

## App Shell Structure

```tsx
<div className="flex h-screen overflow-hidden">
  {/* Sidebar */}
  <aside className="hidden lg:flex flex-col fixed lg:static inset-y-0 left-0 z-10
    w-72 transition-all duration-200 bg-surface-dim border-r border-[rgba(194,198,214,0.15)]">
    {/* Logo, nav, bottom actions */}
  </aside>

  {/* Main area */}
  <div className="flex flex-col flex-1 min-w-0">
    {/* Topbar */}
    <header className="h-12 flex items-center px-4 border-b
      border-[rgba(194,198,214,0.15)] bg-surface-dim z-20">
      {/* Breadcrumbs, search, notifications, avatar */}
    </header>

    {/* Content */}
    <main className="flex-1 overflow-y-auto p-6 bg-surface-dim">
      {/* Page content here */}
    </main>
  </div>
</div>
```

## Z-Index Layers

| Layer | Z-Index | Elements |
|---|---|---|
| Base | 0 | Page content, backgrounds |
| Sidebar | 10 | Sidebar panel, sidebar overlay on mobile |
| Topbar | 20 | Top navigation bar |
| Sticky headers | 30 | Column headers in scrollable tables |
| Dropdowns | 100 | Select menus, dropdown menus, popovers |
| Tooltips | 150 | Tooltip floating elements |
| Modals / Dialogs | 200 | Sheet, Dialog, CommandDialog |
| Toasts | 300 | Sonner toasts (fixed position) |

## Responsive Breakpoints

| Breakpoint | Width | Behavior |
|---|---|---|
| Default (base) | < 640px | Single column, sidebar hidden (overlay), tables as cards |
| sm | >= 640px | Page headers switch to row layout |
| md | >= 768px | Form grids switch to 2-column |
| lg | >= 1024px | Sidebar becomes visible and pinned |
| xl | >= 1280px | Wider content caps activate |

## Spacing System

| Context | Horizontal Padding | Vertical Padding |
|---|---|---|
| Page content | `px-6` | `py-6` |
| Page header | `px-6` | `pt-6 pb-4` |
| Card / Section | `p-4` | `p-4` |
| Form groups | `gap-x-6 gap-y-5` | — |
| Lists | `gap-2` (ItemGroup) | — |

## Usage Guidelines

### Do
- Use `min-w-0` on the main content flex child to prevent flex overflow.
- Wrap scrollable table areas with `overflow-x-auto` and an inner `min-w-[900px]` container.
- Cap form content width at `max-w-5xl` for readability.
- Use sticky topbar for persistent access to search, notifications, and user menu.

### Don't
- Don't set fixed heights on content areas — use `overflow-y-auto` on the main scroll container.
- Don't place sidebar and topbar in the same flex row — sidebar should be outside the main column.
- Don't exceed 48px for topbar height or deviate from the 260/72px sidebar widths.
