# RadioGroup

> Status: new component — no product source yet. This spec is the canonical target for generation.

## Overview

Mutually exclusive selection control built on the Radix UI `RadioGroup` primitive. Rendered as a set of 16x16 circles — exactly one can be selected at a time. RadioGroup deliberately mirrors the Checkbox visual language: transparent unchecked outline, and a **filled blue** checked state with a **dark** center dot (not the stock shadcn outline-plus-blue-dot).

**Import path**: `@/components/ui/radio-group`

**Dependencies**: `@radix-ui/react-radio-group`, `lucide-react` (`Circle`)

## Import

```tsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
```

## Anatomy

- `RadioGroupPrimitive.Root` — the group container (`grid gap-2`); manages the single `value` and roving keyboard focus (arrow keys move selection).
- `RadioGroupPrimitive.Item` — the 16x16 circular control, one per option.
- `RadioGroupPrimitive.Indicator` — centers the dot; only rendered when checked.
- `Circle` (lucide-react) — the dot glyph, fixed at `h-2 w-2` with `fill-surface-container-lowest text-surface-container-lowest` (dark, against the blue fill).

The component exposes no custom variants — Root and Item are single styled elements. Pass `className` to extend.

## Sizing

Single 16px size — there is **no** `size` prop (same stance as Checkbox). If a dense table row truly needs a smaller control, pass `className="h-3.5 w-3.5"` as a compact escape hatch only; do not introduce a size variant.

## Props

### RadioGroup (Root)

Forwards all `@radix-ui/react-radio-group` `Root` props. Common ones:

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `undefined` | Controlled selected value |
| `defaultValue` | `string` | `undefined` | Uncontrolled initial value |
| `onValueChange` | `(value: string) => void` | `undefined` | Change handler |
| `disabled` | `boolean` | `false` | Disables the entire group |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Arrow-key axis (layout stays `grid gap-2`; add `grid-flow-col` for horizontal layouts) |
| `className` | `string` | `undefined` | Additional classes merged via `cn()` |

### RadioGroupItem

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | required | The value this item represents |
| `disabled` | `boolean` | `false` | Disables this item only |
| `id` | `string` | `undefined` | HTML id, paired with a Label's `htmlFor` |
| `className` | `string` | `undefined` | Additional classes merged via `cn()` |

## States

- **Unchecked**: `bg-transparent` with a `border-on-surface-variant/30` outline; indicator hidden.
- **Checked**: `data-[state=checked]:bg-k-primary-container` fill and `data-[state=checked]:border-k-primary-container` border. The `Circle` dot shows in `fill-surface-container-lowest text-surface-container-lowest` (dark, against the blue fill).
- **Disabled**: `disabled:cursor-not-allowed disabled:opacity-50`. Cannot be selected.
- **Focus**: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` over `ring-offset-background`.
- **Hover**: No visual change (consistent with Checkbox).

## Tailwind Classes

| Selector | Description |
|---|---|
| `aspect-square h-4 w-4` | 16x16 pixel sizing |
| `shrink-0` | Prevents flex shrinking |
| `rounded-full` | Inherently circular control (one of the few sanctioned `rounded-full` uses) |
| `border border-on-surface-variant/30` | Default unchecked border |
| `bg-transparent` | Default unchecked fill |
| `data-[state=checked]:bg-k-primary-container` | Checked fill (blue accent) |
| `data-[state=checked]:border-k-primary-container` | Checked border |
| `ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` | Focus ring |
| `disabled:cursor-not-allowed disabled:opacity-50` | Disabled styling |
| `fill-surface-container-lowest text-surface-container-lowest` | Dot color (on the `Circle` icon) |

## Reference implementation

`RadioGroupPrimitive.Root` className:

```tsx
"grid gap-2"
```

`RadioGroupPrimitive.Item` canonical className (verbatim target):

```tsx
"aspect-square h-4 w-4 shrink-0 rounded-full border border-on-surface-variant/30 bg-transparent ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-k-primary-container data-[state=checked]:border-k-primary-container"
```

Indicator + icon:

```tsx
<RadioGroupPrimitive.Indicator className="flex items-center justify-center">
  <Circle className="h-2 w-2 fill-surface-container-lowest text-surface-container-lowest" />
</RadioGroupPrimitive.Indicator>
```

> Variation: stock shadcn ships an outlined item (`border-primary`) with a **blue** dot (`Circle` at `fill-primary text-primary`). Cortex deliberately diverges: checked = solid `k-primary-container` fill with a **dark** dot, mirroring the Checkbox checked state (blue box, dark glyph). This divergence is canonical.

## Usage

```tsx
// Labeled group
<RadioGroup defaultValue="email">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="email" id="notify-email" />
    <Label htmlFor="notify-email">Email</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="push" id="notify-push" />
    <Label htmlFor="notify-push">Push notification</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="none" id="notify-none" />
    <Label htmlFor="notify-none">Off</Label>
  </div>
</RadioGroup>

// Option with description (align control to the first text line)
<RadioGroup defaultValue="standard" className="gap-4">
  <div className="flex items-start gap-2">
    <RadioGroupItem value="standard" id="plan-standard" className="mt-0.5" />
    <div className="flex flex-col gap-1">
      <Label htmlFor="plan-standard">Standard</Label>
      <p className="text-body-sm text-on-surface-variant">
        Shared workers, retries within 24h.
      </p>
    </div>
  </div>
  <div className="flex items-start gap-2">
    <RadioGroupItem value="priority" id="plan-priority" className="mt-0.5" />
    <div className="flex flex-col gap-1">
      <Label htmlFor="plan-priority">Priority</Label>
      <p className="text-body-sm text-on-surface-variant">
        Dedicated queue, immediate retries.
      </p>
    </div>
  </div>
</RadioGroup>

// react-hook-form
<FormField
  control={form.control}
  name="visibility"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Visibility</FormLabel>
      <FormControl>
        <RadioGroup
          value={field.value}
          onValueChange={field.onChange}
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="private" id="v-private" />
            <FormLabel htmlFor="v-private" className="font-normal">Private</FormLabel>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="team" id="v-team" />
            <FormLabel htmlFor="v-team" className="font-normal">Team</FormLabel>
          </div>
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

// Card-style selectable option (composes Item variant="outline")
<RadioGroup defaultValue="pro" className="gap-2">
  <Label htmlFor="tier-pro" className="cursor-pointer">
    <Item variant="outline" size="sm" asChild>
      <div>
        <RadioGroupItem value="pro" id="tier-pro" />
        <ItemContent>
          <ItemTitle>Pro</ItemTitle>
          <ItemDescription>Unlimited projects, priority support</ItemDescription>
        </ItemContent>
      </div>
    </Item>
  </Label>
</RadioGroup>
```

## Usage Guidelines

### Do

- Use RadioGroup for 2–5 mutually exclusive options that should all be visible at once.
- Pair every item with a `<Label>` via `htmlFor` for accessibility and click target.
- Use `flex items-start gap-2` with `mt-0.5` on the item when options carry descriptions.
- Use inside `FormControl` when using the Form compound.
- Stack options vertically with the default `grid gap-2` spacing.

### Don't

- Do NOT use RadioGroup for more than 5 options — use Select.
- Do NOT use RadioGroup for independently toggleable options — use Checkbox.
- Do NOT remove the focus ring — it is required for accessibility.
- Do NOT change the dot size; `h-2 w-2` with the dark `surface-container-lowest` fill is fixed.
- Do NOT revert to the stock shadcn outline-plus-blue-dot checked state — the filled-blue/dark-dot pairing is the Cortex canon.

## Related

- `checkbox.md` — independent boolean toggles; RadioGroup mirrors its checked-state styling
- `select.md` — dropdown for longer option lists (5+)
- `form.md` — FormField/FormControl wiring for validated forms
