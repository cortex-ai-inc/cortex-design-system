# Navigation

## Overview

Two-tier navigation: the **Sidebar** serves as the primary navigation with labeled sections and active-state indicators, while the **Topbar** provides breadcrumbs, notifications, and user controls. On mobile the sidebar becomes an overlay triggered by a hamburger icon.

## Key Rules

### Sidebar
- **Width**: 260px expanded, 72px collapsed (icon-only with tooltips).
- **Nav sections**: Grouped under uppercase labels using `text-label-sm` (11px uppercase, tracking-wide).
- **Active state**: A 3px left border in `k-primary` (`#ADC6FF`) on the active nav item, combined with a subtle background tint.
- **Hover state**: `hover:bg-surface-container-high/50` on nav items.
- **Collapse trigger**: A chevron button at the bottom of the sidebar to toggle between expanded and collapsed states.
- **Bottom actions**: Fixed at the bottom of the sidebar — Docs (external link), Help, and Logout (with `LogOut` icon).

### Topbar
- **Height**: 48px (`h-12`), fixed at top.
- **Breadcrumbs**: `text-sm text-on-surface-variant` with `ChevronRight` separators.
- **Notification bell**: `NotificationBell` component with unread dot indicator.
- **User avatar**: Clickable `Avatar` component with a `DropdownMenu` for profile, settings, and logout.

### Mobile
- **Hamburger menu**: A `Menu` icon in the topbar toggles the sidebar as an overlay.
- **Overlay backdrop**: `bg-black/50` behind the sidebar when shown as overlay.
- **Close**: Clicking the backdrop or a close button dismisses the sidebar.

## Breadcrumb Segment Mapping

| Route Segment | Label | Icon |
|---|---|---|
| dashboard | Dashboard | LayoutDashboard |
| tickets | Tickets | Ticket |
| tickets/new | New Ticket | Plus |
| tickets/$id | Ticket Detail | Ticket |
| admin | Admin | Shield |
| admin/tickets | Admin Tickets | Ticket |
| admin/team | Team | Users |
| admin/settings | Settings | Settings |
| profile | Profile | User |

## Sidebar Structure

```tsx
<aside className="flex flex-col h-full bg-surface-dim border-r border-[rgba(194,198,214,0.15)]
  w-72 transition-all duration-200">
  {/* Logo area */}
  <div className="flex items-center h-12 px-4 border-b border-[rgba(194,198,214,0.15)]">
    <span className="text-title-sm text-on-surface">Cortex Support</span>
  </div>

  {/* Navigation */}
  <nav className="flex-1 overflow-y-auto p-3 space-y-6">
    {/* Section: Main */}
    <div>
      <h3 className="text-label-sm text-on-surface-variant px-3 pb-2">MAIN</h3>
      <NavItem icon={LayoutDashboard} label="Dashboard" to="/dashboard" />
      <NavItem icon={Ticket} label="Tickets" to="/tickets" />
    </div>

    {/* Section: Admin (shown for admin users) */}
    <div>
      <h3 className="text-label-sm text-on-surface-variant px-3 pb-2">ADMIN</h3>
      <NavItem icon={Ticket} label="All Tickets" to="/admin/tickets" />
      <NavItem icon={Users} label="Team" to="/admin/team" />
      <NavItem icon={Settings} label="Settings" to="/admin/settings" />
    </div>
  </nav>

  {/* Bottom actions */}
  <div className="p-3 border-t border-[rgba(194,198,214,0.15)] space-y-1">
    <NavItem icon={ExternalLink} label="Docs" href="https://docs.example.com" external />
    <NavItem icon={HelpCircle} label="Help" to="/help" />
    <NavItem icon={LogOut} label="Logout" onClick={handleLogout} />
  </div>
</aside>
```

## Topbar Structure

```tsx
<header className="h-12 flex items-center justify-between px-4
  border-b border-[rgba(194,198,214,0.15)] bg-surface-dim z-20">

  {/* Left: Hamburger + Breadcrumbs */}
  <div className="flex items-center gap-3">
    <button className="lg:hidden" onClick={toggleSidebar}>
      <Menu className="w-4 h-4" />
    </button>
    <nav className="flex items-center gap-1.5 text-sm text-on-surface-variant">
      <a href="/dashboard">Dashboard</a>
      <ChevronRight className="w-3 h-3" />
      <span className="text-on-surface">Tickets</span>
    </nav>
  </div>

  {/* Right: Notifications + Avatar */}
  <div className="flex items-center gap-3">
    <NotificationBell />
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-7 h-7 cursor-pointer" initials={getInitials(user)} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => navigate("/profile")}>
          <User className="w-4 h-4" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={handleLogout}>
          <LogOut className="w-4 h-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</header>
```

## NavItem Component Pattern

```tsx
interface NavItemProps {
  icon: LucideIcon
  label: string
  to?: string
  href?: string
  external?: boolean
  onClick?: () => void
}

function NavItem({ icon: Icon, label, to, href, external, onClick }: NavItemProps) {
  const isActive = useMatch({ to, fuzzy: true })

  const classes = cn(
    "flex items-center gap-3 px-3 py-2 rounded-sm text-sm transition-colors",
    "hover:bg-surface-container-high/50",
    isActive
      ? "text-k-primary bg-k-primary/10 border-l-[3px] border-k-primary"
      : "text-on-surface-variant border-l-[3px] border-transparent"
  )

  if (href) {
    return <a href={href} className={classes} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
      <Icon className="w-4 h-4 shrink-0" strokeWidth={1.5} />
      <span className="truncate">{label}</span>
    </a>
  }

  if (onClick) {
    return <button onClick={onClick} className={classes}>
      <Icon className="w-4 h-4 shrink-0" strokeWidth={1.5} />
      <span className="truncate">{label}</span>
    </button>
  }

  return <Link to={to} className={classes}>
    <Icon className="w-4 h-4 shrink-0" strokeWidth={1.5} />
    <span className="truncate">{label}</span>
  </Link>
}
```

## Usage Guidelines

### Do
- Group nav items under meaningful section labels (MAIN, ADMIN, etc.).
- Use the 3px left border to indicate the active route.
- Show admin sections only for users with the admin role.
- Include bottom actions (docs, help, logout) consistently across all pages.

### Don't
- Don't use icons without labels in expanded mode (collapsed mode uses only icons with tooltips).
- Don't put more than 10 items in the sidebar — group or nest under sections.
- Don't render the mobile hamburger on desktop viewports (use `lg:hidden`).
