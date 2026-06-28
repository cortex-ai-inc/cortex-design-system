# Checkbox

## Overview

Boolean input built on Radix UI `Checkbox` primitive. Styled as a small square with a check indicator. Used for binary on/off toggles, multi-select lists, and terms acceptance.

## Import

```tsx
import { Checkbox } from "@/components/ui/checkbox"
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean \| "indeterminate"` | `false` | Checked state |
| `onCheckedChange` | `(checked: CheckedState) => void` | `undefined` | Change handler |
| `disabled` | `boolean` | `false` | Disables interaction |
| `className` | `string` | `undefined` | Additional classes |
| `id` | `string` | `undefined` | HTML id, typically paired with a Label's `htmlFor` |

## Styling

| State | CSS Classes | Description |
|---|---|---|
| Root (unchecked) | `peer h-4 w-4 shrink-0 rounded-sm border border-on-surface-variant/30 bg-transparent` | Small 16x16 square, subtle border, transparent background |
| Root (checked) | `bg-k-primary-container border-k-primary-container` | Filled with k-primary-container, matching border |
| Root (disabled) | `cursor-not-allowed opacity-50` | Dimmed, non-interactive |
| Root (focus-visible) | `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-k-primary-container/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dim` | Focus ring matching input components |
| Indicator | `flex h-full w-full items-center justify-center text-surface-container-lowest` | Centers the Check icon inside the box |

## States

- **Unchecked**: Transparent background, `border-on-surface-variant/30` outline.
- **Checked**: `bg-k-primary-container` background, `border-k-primary-container` border, white check icon at `h-3 w-3`.
- **Indeterminate**: Same visual as checked but with a minus/minus icon instead of check.
- **Disabled**: `opacity-50 cursor-not-allowed`. Cannot be toggled.
- **Focus**: `ring-2 ring-k-primary-container/50` with offset from surface background.
- **Hover**: No visual change (consistent with design system).

## Tailwind Classes

| Selector | Description |
|---|---|
| `h-4 w-4` | 16x16 pixel sizing |
| `shrink-0` | Prevents flex shrinking |
| `rounded-sm` | 4px border radius |
| `border border-on-surface-variant/30` | Default unchecked border |
| `bg-k-primary-container border-k-primary-container` | Checked state colors |
| `focus-visible:ring-2 focus-visible:ring-k-primary-container/50` | Focus ring |
| `disabled:cursor-not-allowed disabled:opacity-50` | Disabled styling |
| `text-surface-container-lowest` | Check icon color |

## Usage

```tsx
// With label
<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>

// Controlled form
<FormField
  name="agree"
  render={({ field }) => (
    <FormItem>
      <div className="flex items-center gap-2">
        <FormControl>
          <Checkbox
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        </FormControl>
        <FormLabel>I agree to the terms</FormLabel>
      </div>
      <FormMessage />
    </FormItem>
  )}
/>
```

## Usage Guidelines

### Do

- Use Checkbox for binary choices that can be independently toggled.
- Pair with `<Label>` using `htmlFor` for accessibility.
- Use the `indeterminate` state for "select all" parent checkboxes.
- Use inside `FormControl` when using the Form compound.
- Stack multiple checkboxes vertically with consistent `gap-2` spacing.

### Don't

- Do NOT use Checkbox to show/hide UI elements; use Switch for that.
- Do NOT use Checkbox for mutually exclusive options; use Radio Group or Select.
- Do NOT remove the focus ring — it is required for accessibility.
- Do NOT change the check icon size; `h-3 w-3` is fixed.
