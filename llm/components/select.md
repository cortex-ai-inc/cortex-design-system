# Select

## Overview

Dropdown select built on the Radix UI `Select` primitive. The trigger is styled to match the Input component (same height, ghost border, surface, and focus ring); content is portal-rendered with a fade-in animation and scroll support. Source of truth: `cortex-support-front` (the branded product).

## Import

```tsx
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
```

## Sub-components

| Component | Description |
|---|---|
| `Select` | Root context provider (`SelectPrimitive.Root`); manages open state, value, and keyboard navigation |
| `SelectGroup` | Groups related items (`SelectPrimitive.Group`) |
| `SelectValue` | Renders the currently selected value text inside the trigger |
| `SelectTrigger` | Visible button that displays the current value and opens the dropdown |
| `SelectContent` | Portal-rendered dropdown container with max-height and scroll |
| `SelectItem` | Individual selectable option |

> Note: `cortex-support-front` does **not** export `SelectLabel` or `SelectSeparator`. The full shadcn set (including `SelectLabel`, `SelectSeparator`, `SelectScrollUpButton`, `SelectScrollDownButton`, a `size` prop, and a check indicator) exists only in `cortex-coder-front`, which uses the generic shadcn token classes rather than the Cortex brand tokens.

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
| `position` | `"item-aligned" \| "popper"` | `"popper"` | Positioning strategy (defaults to `popper` here) |

### SelectItem

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | required | The value returned when selected |
| `disabled` | `boolean` | `false` | Disables this option (`data-[disabled]`) |
| `className` | `string` | `undefined` | Additional classes |

## Styling

| Part | CSS Classes | Description |
|---|---|---|
| Trigger | `flex h-10 w-full items-center justify-between rounded-sm border ghost-border-20 bg-surface-dim px-3 py-2 text-body-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-k-primary-container/50 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1` | Matches Input styling; `h-10`, ghost border, `surface-dim` fill; truncates long values |
| Chevron icon | `h-4 w-4 opacity-50` | Lucide `ChevronDown`, right-aligned via `SelectPrimitive.Icon` |
| Content | `relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-on-surface-variant/10 bg-surface-container-low shadow-ambient animate-fade-in` | Portal-rendered dropdown; fades in. `position="popper"` adds `translate-y-1` |
| Viewport | `p-1` (+ `h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]` when popper) | Inner scroll area |
| Item | `relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-body-sm outline-none focus:bg-surface-container-high focus:text-on-surface data-[disabled]:pointer-events-none data-[disabled]:opacity-50` | Focus/highlight uses `surface-container-high`; `pl-8` reserves left gutter |

> The `cortex-support-front` `SelectItem` renders only `SelectPrimitive.ItemText` — there is **no** check-mark `ItemIndicator`. The `pl-8` padding is reserved gutter, not an icon slot.

## States

- **Closed/default**: Trigger shows current value (or placeholder) and the `ChevronDown` icon.
- **Open**: Content animates in with `animate-fade-in` (200ms). Scrollable if options exceed `max-h-96`.
- **Focus (trigger)**: `focus:ring-2 focus:ring-k-primary-container/50`.
- **Disabled (trigger)**: `disabled:opacity-50 disabled:cursor-not-allowed`.
- **Item hover/focus**: `focus:bg-surface-container-high focus:text-on-surface`.
- **Disabled item**: `data-[disabled]:pointer-events-none data-[disabled]:opacity-50`.
- **Placeholder**: `placeholder:text-on-surface-variant/50` on the trigger value.
- **Loading**: No built-in loading state; use a Skeleton or Spinner in consuming code.

## Reference implementation

`SelectTrigger` base className (cortex-support-front, verbatim):

```
flex h-10 w-full items-center justify-between rounded-sm border ghost-border-20 bg-surface-dim px-3 py-2 text-body-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-k-primary-container/50 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1
```

`SelectContent` base className (verbatim):

```
relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-on-surface-variant/10 bg-surface-container-low shadow-ambient animate-fade-in
```

`SelectItem` base className (verbatim):

```
relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-body-sm outline-none focus:bg-surface-container-high focus:text-on-surface data-[disabled]:pointer-events-none data-[disabled]:opacity-50
```

## Usage Guidelines

### Do

- Use `Select` for choosing from 3+ predefined options.
- Use `Select` inside `FormControl` when using the Form compound.
- Pass placeholder text via `<SelectValue placeholder="Choose..." />`.
- Handle value changes via the `onValueChange` callback.
- Match trigger height/spacing to sibling Inputs (`h-10`).

### Don't

- Do NOT use Select for 2 options — use a Switch, Checkbox, or Radio Group.
- Do NOT rely on `SelectLabel` / `SelectSeparator` in `cortex-support-front` — they are not exported there.
- Do NOT override the trigger styling to differ from Input height/spacing.
- Do NOT use Select without a `value` or `defaultValue` in controlled forms.
- Do NOT nest Select components.
