# Dropdown Menu

## Overview

Displays a menu of actions or options triggered by a button or other element. Built on the Radix UI DropdownMenu primitive.

Two implementations exist in the codebase:

- **cortex-coder-front** (PRIMARY) — the complete shadcn set: every sub-component, a typed `variant` prop on items, checkbox/radio items, submenus, and a shortcut helper.
- **cortex-support-front** — a trimmed branded build with only Root, Trigger, Content, Item, Separator, Label, Group, Portal, Sub, RadioGroup. No SubTrigger/SubContent, no Checkbox/Radio item, no Shortcut, and no `variant` prop.

This doc follows the PRIMARY (cortex-coder-front) and flags branded-token semantics where the design system overrides raw shadcn tokens.

**Import path**: `@/components/ui/dropdown-menu`

**Dependencies**: `@radix-ui/react-dropdown-menu`, `lucide-react` (CheckIcon, ChevronRightIcon, CircleIcon)

## Import

```tsx
import {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
```

> In cortex-support-front only the following are exported: `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuSeparator`, `DropdownMenuLabel`, `DropdownMenuGroup`, `DropdownMenuPortal`, `DropdownMenuSub`, `DropdownMenuRadioGroup`.

## Sub-Components

| Component | Role |
|---|---|
| DropdownMenu | Root wrapper managing open/close state |
| DropdownMenuTrigger | Element that opens the menu (usually `Button variant="ghost" size="icon"`) |
| DropdownMenuContent | The popup menu panel (rendered in a Portal) |
| DropdownMenuItem | A single action item — accepts `variant` and `inset` |
| DropdownMenuCheckboxItem | A checkbox-style toggle item (CheckIcon indicator) |
| DropdownMenuRadioGroup / DropdownMenuRadioItem | One-of-many selectable items (CircleIcon indicator) |
| DropdownMenuLabel | Section label (non-interactive), accepts `inset` |
| DropdownMenuSeparator | Visual divider between groups |
| DropdownMenuGroup | Groups related items (`role="group"`) |
| DropdownMenuShortcut | Right-aligned `<span>` for keyboard hint text |
| DropdownMenuPortal | Teleports content to document body |
| DropdownMenuSub / DropdownMenuSubTrigger / DropdownMenuSubContent | Nested submenu (chevron on trigger) |

## Item Variants

`DropdownMenuItem` exposes a real `variant` prop (cortex-coder-front), defaulting to `"default"`:

| Variant | Behavior |
|---|---|
| default | Standard action item |
| destructive | Delete/remove actions — text turns destructive (`text-k-error`), focus tints the background |

```tsx
<DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
```

The variant is applied via `data-variant` attribute styling, not a className you write by hand. In cortex-support-front there is no `variant` prop — apply destructive styling manually with `className="text-k-error focus:bg-k-error/10 focus:text-k-error"`.

## Props

### DropdownMenuContent

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | undefined | Additional classes via `cn()` |
| sideOffset | number | 4 | Gap between trigger and content |
| align | "start" \| "center" \| "end" | "center" | Radix default alignment |
| children | ReactNode | required | Menu items, separators, labels |

### DropdownMenuItem

| Prop | Type | Default | Description |
|---|---|---|---|
| variant | "default" \| "destructive" | "default" | Item styling (coder-front only) |
| inset | boolean | false | Adds `pl-8` to align with checkbox/radio rows |
| disabled | boolean | false | Dimmed, non-interactive, skipped in keyboard nav |
| className | string | undefined | Additional classes via `cn()` |
| onSelect | (e) => void | undefined | Radix select handler |

### DropdownMenuCheckboxItem

| Prop | Type | Default | Description |
|---|---|---|---|
| checked | boolean \| "indeterminate" | undefined | Checked state |
| onCheckedChange | (checked: boolean) => void | undefined | Change handler |
| disabled | boolean | false | Disabled state |

### DropdownMenuRadioItem

| Prop | Type | Default | Description |
|---|---|---|---|
| value | string | required | Value within the parent `DropdownMenuRadioGroup` |
| disabled | boolean | false | Disabled state |

## States

- **Closed**: Menu not rendered.
- **Open**: Content portals in and animates (`data-[state=open]:animate-in` + fade/zoom/slide in coder-front; `animate-fade-in` in support-front).
- **Focus (item)**: Background fills `bg-surface-container-high` (branded mapping of shadcn `bg-accent`). Keyboard navigation drives focus directly — there is no separate hover style.
- **Disabled (item)**: `data-[disabled]:opacity-50 data-[disabled]:pointer-events-none`.
- **Checked (checkbox/radio)**: Indicator icon visible in the `pl-8` gutter (CheckIcon / filled CircleIcon).
- **Submenu open**: SubTrigger gets `data-[state=open]:bg-surface-container-high`.

## Reference implementation

VERBATIM from `cortex-coder-front/.../dropdown-menu.tsx` — `DropdownMenuContent`:

```tsx
"bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md"
```

VERBATIM — `DropdownMenuItem` base (note the typed destructive variant via `data-[variant=destructive]`):

```tsx
"focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
```

VERBATIM from `cortex-support-front/.../dropdown-menu.tsx` — the branded `DropdownMenuContent` and `DropdownMenuItem`:

```tsx
// Content
"z-50 min-w-[8rem] overflow-hidden rounded-md border border-on-surface-variant/10 bg-surface-container-low p-1 shadow-ambient animate-fade-in"

// Item
"relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-body-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0"
```

Other support-front classNames:

```tsx
// Separator
"-mx-1 my-1 h-px bg-on-surface-variant/10"
// Label
"px-2 py-1.5 text-label-sm text-on-surface-variant"
```

### Design-system token mapping

Both sources render at `z-50` in the source string; the Cortex z-index scale places dropdowns/popovers/tooltips at the popover layer (`z-[100]`). The branded surface intent is:

| Element | Coder-front (shadcn) | Branded Cortex token |
|---|---|---|
| Content surface | `bg-popover` | `bg-surface-container-low` (#191B22) |
| Content shadow | `shadow-md` | `shadow-ambient` |
| Content border | `border` | `border ghost-border` / `border-on-surface-variant/10` |
| Item focus bg | `bg-accent` | `bg-surface-container-high` (#282A30) |
| Destructive text | `text-destructive` | `text-k-error` (#F87171) |
| Label text | `text-muted-foreground` | `text-on-surface-variant`, `text-label-sm` |

Radius is `rounded-md` (content/sub-content) and `rounded-sm` (items). Icons resolve to `size-4` (`w-4 h-4`).

## Usage Guidelines

### Do

- Use `DropdownMenuTrigger` with `Button variant="ghost" size="icon"` for the standard three-dot (`MoreHorizontal`) menu trigger.
- Use the `variant="destructive"` prop for delete/remove actions; place them at the bottom of the menu.
- Use `DropdownMenuLabel` to head a section and `DropdownMenuSeparator` between logically distinct groups.
- Use `inset` on plain items that sit alongside checkbox/radio items so labels line up past the `pl-8` indicator gutter.
- Use `DropdownMenuCheckboxItem` for boolean toggles and `DropdownMenuRadioGroup` + `DropdownMenuRadioItem` for one-of-many selection.
- Use `DropdownMenuShortcut` for right-aligned keyboard-hint text inside an item.

### Don't

- Don't nest submenus more than one level deep.
- Don't put long text in items — keep labels concise (1–3 words).
- Don't mix interactive and non-interactive content in the same menu.
- Don't use dropdown menus for primary navigation — use sidebar navigation instead.
- Don't remove keyboard navigation (arrow keys, Enter, Escape) — it is essential for accessibility.
- Don't reach for SubTrigger/SubContent, Checkbox/Radio items, or Shortcut in cortex-support-front — they aren't exported there.
