# Select

## Overview

Dropdown select built on Radix UI `Select` primitive. Styled to match Input components with consistent dark surface, ghost borders, and focus ring. Uses a portal-based dropdown content with scroll support and keyboard navigation.

## Import

```tsx
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from "@/components/ui/select"
```

## Sub-components

| Component | Description |
|---|---|
| `Select` | Root context provider; manages open state, value, and keyboard navigation |
| `SelectTrigger` | Visible button that displays the current value and opens the dropdown |
| `SelectValue` | Renders the currently selected value text inside the trigger |
| `SelectContent` | Portal-rendered dropdown container with max-height and scroll |
| `SelectGroup` | Groups related items under a label |
| `SelectLabel` | Group label text (not interactive) |
| `SelectItem` | Individual selectable option |
| `SelectSeparator` | Visual divider between groups |

## Props

### SelectTrigger

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | `undefined` | Additional classes |
| `disabled` | `boolean` | `false` | Disables the trigger |

### SelectContent

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | `undefined` | Additional classes |
| `position` | `"item-aligned" \| "popper"` | `"item-aligned"` | Positioning strategy |
| `sideOffset` | `number` | `4` | Offset from trigger |

### SelectItem

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | required | The value returned when selected |
| `disabled` | `boolean` | `false` | Disables this option |
| `className` | `string` | `undefined` | Additional classes |

## Styling

| Part | CSS Classes | Description |
|---|---|---|
| Trigger | `flex h-10 w-full items-center justify-between rounded-sm border border-on-surface-variant/20 bg-surface-dim px-3 py-2 text-body-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-k-primary-container/50 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1` | Matches Input styling exactly; truncates long values |
| Chevron icon | `h-4 w-4 opacity-50 shrink-0` | Lucide ChevronDown, right-aligned |
| Content | `z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-on-surface-variant/10 bg-surface-container-low shadow-ambient animate-fade-in` | Portal-rendered dropdown; fades in |
| Item | `relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-body-sm outline-none focus:bg-k-primary-container/20 focus:text-on-surface data-[disabled]:pointer-events-none data-[disabled]:opacity-50` | Hover/focus highlight uses k-primary-container at 20% |
| Selected indicator | `absolute left-2 flex h-3.5 w-3.5 items-center justify-center` | Check icon shown for selected item |
| Label | `px-2 py-1.5 text-body-sm font-semibold text-on-surface-variant` | Non-interactive group label |
| Separator | `mx-1 my-1 h-px bg-on-surface-variant/10` | Horizontal divider |

## States

- **Closed/default**: Shows trigger with current value (or placeholder), ChevronDown icon.
- **Open**: Content animates in with `animate-fade-in`. Scrollable if options exceed `max-h-96`.
- **Disabled**: `opacity-50 cursor-not-allowed` on trigger; options cannot be opened.
- **Empty**: Should not occur; provide at minimum a placeholder option or handle empty state in consuming code.
- **Focus**: `ring-2 ring-k-primary-container/50` on trigger.
- **Item hover/focus**: `bg-k-primary-container/20` highlight.
- **Selected item**: Check icon visible, item highlighted.
- **Loading**: Use a separate loading skeleton or spinner; Select does not have a built-in loading state.

## Tailwind Classes

| Selector | Description |
|---|---|
| `.select-trigger` | Trigger button matching Input height and styling |
| `.select-content` | Portal dropdown container |
| `.select-item` | Individual option row |
| `.select-label` | Group label |
| `.select-separator` | Group divider |

## Usage Guidelines

### Do

- Use `Select` for choosing from 3+ predefined options.
- Use `SelectGroup` and `SelectLabel` to categorize long lists.
- Use `Select` inside `FormControl` when using the Form compound.
- Pass `placeholder` text via `<SelectValue placeholder="Choose..." />`.
- Handle value changes via `onValueChange` callback.

### Don't

- Do NOT use Select for 2 options — use a Switch, Checkbox, or Radio Group instead.
- Do NOT use Select for options with custom rendering (icons, avatars) — the item layout is fixed.
- Do NOT override the trigger styling to differ from Input height/spacing.
- Do NOT use Select without a `value` or `defaultValue` in controlled forms.
- Do NOT nest Select components.
