# Iconography

## Overview

Single-source icon library: **lucide-react** (v0.562+). All icons use a consistent 16px sizing and 1.5 stroke width. Buttons automatically size contained icons via `[&_svg]:size-4 [&_svg]:shrink-0` in the base button variant. Standalone icons require an `aria-label` for accessibility.

## Key Rules

- **Library**: `lucide-react` only. No custom SVG icons, no other icon libraries.
- **Size**: `w-4 h-4` (16px) is the standard for all UI icons.
- **Stroke**: `strokeWidth={1.5}` for all standalone icons. Buttons handle this via the `[&_svg]:size-4` class, but explicit `strokeWidth` on the icon element is recommended.
- **Standalone icons**: Must include `aria-label` for screen readers.
- **Decorative icons**: When icons are purely decorative (inside buttons, alongside visible text), use `aria-hidden="true"` or rely on the parent element's label.
- **Color**: Icons inherit `currentColor` from parent text color by default. Use Tailwind text color classes (e.g. `text-k-primary`, `text-on-surface-variant`) to override.

## Common Icons

| Icon Component | Usage Context |
|---|---|
| `Bell` | Notifications bell, NotificationBell component |
| `Ticket` | Tickets, ticket list, ticket detail |
| `LayoutDashboard` | Dashboard navigation, dashboard link |
| `Settings` | Settings page, settings gear icon |
| `Users` | Team management, user list |
| `HelpCircle` | Help link, tooltip triggers |
| `BarChart3` | Analytics, stats, reporting |
| `Menu` | Hamburger menu for mobile sidebar toggle |
| `LogOut` | Logout button, sign out action |
| `Search` | Search input, command palette trigger |
| `X` | Close button, dismiss, clear input |
| `Check` | Confirm, success indicator, checkbox |
| `ChevronDown` | Accordion trigger, select dropdown, expand |
| `ChevronRight` | Breadcrumb separator, collapsible expand |
| `ArrowRight` | Navigate forward, external link indicator |
| `ArrowLeft` | Back navigation, collapse |
| `MessageSquare` | Comments, chat, feedback |
| `Plus` | Create new, add item, expand |
| `Trash2` | Delete action, remove item |
| `Edit3` | Edit action, modify |
| `Copy` | Copy to clipboard, duplicate |
| `Loader2` | Loading spinner (animated with `animate-spin`) |
| `AlertCircle` | Error state, warning alert |
| `Info` | Info tooltip, help text |
| `FileText` | Document, description field |
| `Filter` | Filter controls, search filters |
| `MoreHorizontal` | Overflow menu, more actions |
| `ExternalLink` | External link indicator |
| `User` | User profile, avatar fallback |
| `Shield` | Admin panel, security |
| `Upload` | File upload, attachment |
| `Download` | File download, export |
| `GripVertical` | Drag handle, reorder |

## Icon Usage Patterns

### In buttons (automatic sizing)

```tsx
<Button variant="outline">
  <Plus className="w-4 h-4" />
  New Ticket
</Button>
```

The base button CSS includes `[&_svg]:size-4 [&_svg]:shrink-0`, so icons will always be 16px inside buttons regardless of the icon's default size.

### Standalone icon with label

```tsx
<button aria-label="Notifications">
  <Bell className="w-4 h-4" strokeWidth={1.5} />
</button>
```

### Icon with visible text label

```tsx
<span className="flex items-center gap-2 text-sm text-on-surface-variant">
  <MessageSquare className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
  3 comments
</span>
```

### Icon color override

```tsx
<AlertCircle className="w-4 h-4 text-k-error" strokeWidth={1.5} />
<Info className="w-4 h-4 text-k-primary" strokeWidth={1.5} />
<Check className="w-4 h-4 text-k-secondary" strokeWidth={1.5} />
```

### Loading spinner

```tsx
<Loader2 className="w-4 h-4 animate-spin" strokeWidth={1.5} />
```

## Usage Guidelines

### Do
- Use `w-4 h-4` and `strokeWidth={1.5}` consistently on all standalone icons.
- Add `aria-label` to icon-only buttons and standalone interactive icons.
- Use `aria-hidden="true"` on icons that accompany visible text labels.
- Import only the specific icons needed (tree-shaking is automatic with lucide-react).

### Don't
- Don't mix icon sizes — always use `w-4 h-4`. Exception: `w-3 h-3` for chevrons in breadcrumbs and `w-5 h-5` for large decorative elements.
- Don't use custom SVG icons inline — if an icon is missing from lucide-react, find the closest alternative.
- Don't change strokeWidth from 1.5 — it creates visual inconsistency.
- Don't apply color classes to icons inside buttons unless overriding the inherited color.
