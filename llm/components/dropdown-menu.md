# Dropdown Menu

## Overview

Displays a menu of actions or options triggered by a button or other element. Built on Radix UI DropdownMenu primitive.

**Import path**: `@/components/ui/dropdown-menu`

**Dependencies**: @radix-ui/react-dropdown-menu

## Import

```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
```

## Sub-Components

| Component | Role |
|---|---|
| DropdownMenu | Root wrapper managing open/close state |
| DropdownMenuTrigger | Button/element that opens the menu (usually `Button variant="ghost" size="icon"`) |
| DropdownMenuContent | The popup menu panel |
| DropdownMenuItem | A single action item |
| DropdownMenuSeparator | Visual divider between groups |
| DropdownMenuLabel | Section label (non-interactive) |
| DropdownMenuGroup | Groups related items (adds role="group") |
| DropdownMenuPortal | Teleports content to document body (avoid z-index issues) |
| DropdownMenuSub | Nested submenu |
| DropdownMenuSubTrigger | Trigger for nested submenu (shows as item with chevron) |
| DropdownMenuSubContent | Content panel for nested submenu |
| DropdownMenuRadioGroup | Group of radio-style selectable items |
| DropdownMenuRadioItem | A radio item within a radio group |
| DropdownMenuCheckboxItem | A checkbox-style toggle item |

## Item Variants

| Variant | CSS | Usage |
|---|---|---|
| default | text-on-surface | Standard action items |
| destructive | text-k-error focus:bg-k-error/10 focus:text-k-error | Delete, remove, destructive actions |

Apply via the `className` prop on DropdownMenuItem:

```tsx
<DropdownMenuItem className="text-k-error focus:bg-k-error/10 focus:text-k-error">
  Delete
</DropdownMenuItem>
```

## Props

### DropdownMenuContent

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | undefined | Additional CSS classes via cn() |
| align | "start" \| "center" \| "end" | "start" | Alignment relative to trigger |
| sideOffset | number | 4 | Gap between trigger and content |
| children | ReactNode | required | Menu items, separators, labels |

### DropdownMenuItem

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | undefined | Additional CSS classes via cn() |
| disabled | boolean | false | Disabled state (no interaction, dimmed) |
| inset | boolean | false | Adds padding-left for visual hierarchy |
| children | ReactNode | required | Item label, optional icon |
| onClick | () => void | undefined | Click handler |

### DropdownMenuCheckboxItem

| Prop | Type | Default | Description |
|---|---|---|---|
| checked | boolean | undefined | Checked state |
| onCheckedChange | (checked: boolean) => void | undefined | Change handler |
| disabled | boolean | false | Disabled state |
| children | ReactNode | required | Item label |

### DropdownMenuRadioItem

| Prop | Type | Default | Description |
|---|---|---|---|
| value | string | required | The value for the radio group |
| disabled | boolean | false | Disabled state |
| children | ReactNode | required | Item label |

## States

- **Closed**: Default. Menu not rendered.
- **Open**: Content panel visible, positioned relative to trigger. Enters with `animate-fade-in`.
- **Hover (item)**: Background fills with `bg-surface-container-high`.
- **Focus (item)**: Same as hover styling, triggered via keyboard navigation.
- **Disabled (item)**: `opacity-50 pointer-events-none`, no hover/focus styling, skipped in keyboard navigation.
- **Checked (checkbox/radio)**: Check icon visible next to label.
- **Submenu open**: SubTrigger shows active state, sub content visible.

## Tailwind Classes (key selectors)

```css
/* Content panel */
z-50 min-w-[8rem] overflow-hidden rounded-md
border border-on-surface-variant/10
bg-surface-container-low p-1
shadow-ambient
animate-fade-in

/* Menu Item */
relative flex cursor-default select-none items-center gap-2
rounded-sm px-2 py-1.5 text-body-sm
outline-none
transition-colors
focus:bg-surface-container-high focus:text-on-surface
data-[disabled]:pointer-events-none data-[disabled]:opacity-50

/* Icon within item */
[&_svg]:size-4 [&_svg]:shrink-0

/* Separator */
-h-px my-1 bg-on-surface-variant/10

/* Label */
px-2 py-1.5 text-label-sm text-on-surface-variant

/* SubTrigger with open state */
data-[state=open]:bg-surface-container-high data-[state=open]:text-on-surface

/* Checkbox / Radio indicator */
absolute left-2 flex h-3.5 w-3.5 items-center justify-center

/* Checkbox item with icon spacing */
pl-8
```

## Usage Guidelines

### Do

- Use `DropdownMenuTrigger` with `Button variant="ghost" size="icon"` for the standard three-dot (MoreHorizontal) menu trigger.
- Use `DropdownMenuLabel` to group related items with a section heading.
- Use `DropdownMenuSeparator` between logically distinct groups of items.
- Use `DropdownMenuPortal` when the menu is inside a container with `overflow: hidden` or a low z-index context.
- Use `DropdownMenuCheckboxItem` for toggling boolean settings.
- Use `DropdownMenuRadioGroup` + `DropdownMenuRadioItem` for selecting one option from a set.
- Place the most commonly used actions at the top of the menu and destructive actions at the bottom.
- Use the `inset` prop on items that are siblings of checkbox/radio items for visual alignment.

### Don't

- Don't nest menus more than one level deep -- it creates poor UX.
- Don't put long text in menu items -- keep labels concise (1-3 words).
- Don't mix interactive (clickable) and non-interactive content in the same menu.
- Don't use dropdown menus for primary navigation -- use sidebar navigation instead.
- Don't remove keyboard navigation (arrow keys, Enter, Escape) -- it's essential for accessibility.
