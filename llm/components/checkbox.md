# Checkbox

## Overview

Boolean input built on the Radix UI `Checkbox` primitive. Rendered as a small 16x16 square with a centered check indicator. Used for binary on/off toggles, multi-select lists, and terms acceptance.

## Import

```tsx
import { Checkbox } from "@/components/ui/checkbox"
```

## Anatomy

- `CheckboxPrimitive.Root` — the square box. Forwards a ref and spreads all Radix props.
- `CheckboxPrimitive.Indicator` — centers the icon; only visible when checked.
- `Check` (lucide-react) — the check glyph, fixed at `h-3 w-3` with `strokeWidth={2.5}`.

The component exposes no custom variants — it is a single styled element. Pass `className` to extend it.

## Props

Forwards all `@radix-ui/react-checkbox` `Root` props. Common ones:

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean \| "indeterminate"` | `undefined` | Controlled checked state |
| `defaultChecked` | `boolean` | `undefined` | Uncontrolled initial state |
| `onCheckedChange` | `(checked: CheckedState) => void` | `undefined` | Change handler |
| `disabled` | `boolean` | `false` | Disables interaction |
| `required` | `boolean` | `false` | Marks the field required |
| `className` | `string` | `undefined` | Additional classes merged via `cn()` |
| `id` | `string` | `undefined` | HTML id, typically paired with a Label's `htmlFor` |

## States

- **Unchecked**: `bg-transparent` with a `border-on-surface-variant/30` outline; indicator hidden.
- **Checked**: `data-[state=checked]:bg-k-primary-container` fill and `data-[state=checked]:border-k-primary-container` border. The `Check` icon shows in `text-surface-container-lowest` (dark, against the blue fill).
- **Disabled**: `disabled:cursor-not-allowed disabled:opacity-50`. Cannot be toggled.
- **Focus**: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` over `ring-offset-background`.
- **Hover**: No visual change (consistent with the design system).

## Tailwind Classes

| Selector | Description |
|---|---|
| `h-4 w-4` | 16x16 pixel sizing |
| `shrink-0` | Prevents flex shrinking |
| `rounded-sm` | 4px border radius |
| `border border-on-surface-variant/30` | Default unchecked border |
| `bg-transparent` | Default unchecked fill |
| `data-[state=checked]:bg-k-primary-container` | Checked fill (blue accent) |
| `data-[state=checked]:border-k-primary-container` | Checked border |
| `ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` | Focus ring |
| `disabled:cursor-not-allowed disabled:opacity-50` | Disabled styling |
| `text-surface-container-lowest` | Check icon color (on the indicator) |

## Reference implementation

`CheckboxPrimitive.Root` className (verbatim from `cortex-support-front`):

```tsx
"peer h-4 w-4 shrink-0 rounded-sm border border-on-surface-variant/30 bg-transparent ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-k-primary-container data-[state=checked]:border-k-primary-container"
```

Indicator + icon (verbatim):

```tsx
<CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-surface-container-lowest")}>
  <Check className="h-3 w-3" strokeWidth={2.5} />
</CheckboxPrimitive.Indicator>
```

> Variation: `cortex-coder-front` ships the upstream shadcn checkbox (`size-4`, `rounded-[4px]`, `border-input`, `data-[state=checked]:bg-primary`, `CheckIcon` at `size-3.5`). The branded Cortex styling above — blue `k-primary-container` fill and dark icon — is the canonical one.

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
- Use inside `FormControl` when using the Form compound.
- Stack multiple checkboxes vertically with consistent `gap-2` spacing.

### Don't

- Do NOT use Checkbox to show/hide UI elements; use Switch for that.
- Do NOT use Checkbox for mutually exclusive options; use Radio Group or Select.
- Do NOT remove the focus ring — it is required for accessibility.
- Do NOT change the check icon size or stroke; `h-3 w-3` with `strokeWidth={2.5}` is fixed.
- Do NOT rely on a built-in indeterminate glyph — the component only renders a `Check` icon. Supply your own indicator if you need an indeterminate state.
