# Switch

## Overview

Toggle control built on the Radix UI `Switch` primitive. Styled as a pill-shaped track with a circular thumb that slides between on/off positions. Used for settings toggles, feature flags, and preference switches.

## Import

```tsx
import { Switch } from "@/components/ui/switch"
```

## Props

Forwards all Radix `Switch.Root` props. The component does not add its own variant props.

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | `undefined` | Controlled toggle state |
| `defaultChecked` | `boolean` | `undefined` | Uncontrolled initial state |
| `onCheckedChange` | `(checked: boolean) => void` | `undefined` | Change handler |
| `disabled` | `boolean` | `false` | Disables interaction |
| `className` | `string` | `undefined` | Merged onto the track via `cn()` |
| `id` | `string` | `undefined` | HTML id, typically paired with a Label's `htmlFor` |

## Anatomy

| Part | Element | Description |
|---|---|---|
| Track | `SwitchPrimitives.Root` | 20x36px pill that holds the thumb and carries the on/off color |
| Thumb | `SwitchPrimitives.Thumb` | 16x16 circle that slides left/right |

## Styling

| Part | State | CSS Classes | Description |
|---|---|---|---|
| Track | Base | `peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-xs transition-colors` | 20x36px pill with a 2px transparent border |
| Track | Unchecked | `data-[state=unchecked]:bg-surface-container-high` | Dark gray background |
| Track | Checked | `data-[state=checked]:bg-k-primary-container` | Filled with the blue accent |
| Track | Disabled | `disabled:cursor-not-allowed disabled:opacity-50` | Dimmed, non-interactive |
| Track | Focus | `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background` | Standard focus ring |
| Thumb | Base | `pointer-events-none block h-4 w-4 rounded-full bg-on-surface shadow-lg ring-0 transition-transform` | 16x16 circle, `on-surface` color |
| Thumb | Unchecked | `data-[state=unchecked]:translate-x-0` | Left-aligned |
| Thumb | Checked | `data-[state=checked]:translate-x-4` | Slides 16px to the right |

## States

- **Off / unchecked**: Track `bg-surface-container-high`, thumb `bg-on-surface` at left position (`translate-x-0`).
- **On / checked**: Track `bg-k-primary-container`, thumb `bg-on-surface` at right position (`translate-x-4`).
- **Disabled**: `cursor-not-allowed opacity-50`. Cannot be toggled.
- **Focus**: `ring-2 ring-ring` with `ring-offset-2 ring-offset-background`.
- **Hover**: No dedicated hover style — color only changes with state.

## Tailwind Classes

| Selector | Description |
|---|---|
| `h-5` | Track height 20px |
| `w-9` | Track width 36px |
| `rounded-full` | Fully rounded pill shape (allowed exception to the radius rule) |
| `border-2 border-transparent` | Invisible border for spacing consistency |
| `bg-surface-container-high` | Unchecked track color |
| `bg-k-primary-container` | Checked track color (blue accent) |
| `h-4 w-4` | Thumb size 16x16 |
| `bg-on-surface` | Thumb color |
| `translate-x-0` | Thumb off position |
| `translate-x-4` | Thumb on position (16px slide) |
| `transition-colors` | Smooth track color transition |
| `transition-transform` | Smooth thumb slide |
| `shadow-xs` | Subtle shadow on the track |
| `shadow-lg` | Shadow on the thumb |

## Reference implementation

Track (`SwitchPrimitives.Root`) className, verbatim:

```
peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-k-primary-container data-[state=unchecked]:bg-surface-container-high
```

Thumb (`SwitchPrimitives.Thumb`) className, verbatim:

```
pointer-events-none block h-4 w-4 rounded-full bg-on-surface shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0
```

> Note: cortex-coder-front ships the upstream shadcn variant (`h-[1.15rem] w-8`, `data-[state=checked]:bg-primary`, `data-[state=unchecked]:bg-input`, thumb `translate-x-[calc(100%-2px)]`). The branded values above (from cortex-support-front) are canonical for Cortex — checked uses the blue `bg-k-primary-container`, not shadcn's near-white `bg-primary`.

## Usage

```tsx
// With label
<div className="flex items-center gap-2">
  <Switch id="notifications" />
  <Label htmlFor="notifications">Enable notifications</Label>
</div>

// Controlled form
<FormField
  name="active"
  render={({ field }) => (
    <FormItem>
      <div className="flex items-center gap-2">
        <FormControl>
          <Switch
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        </FormControl>
        <FormLabel>Active</FormLabel>
      </div>
      <FormMessage />
    </FormItem>
  )}
/>
```

## Usage Guidelines

### Do

- Use Switch for binary settings that take effect immediately (no submit needed).
- Use Switch to enable/disable features, notifications, or preferences.
- Pair with `<Label>` using `htmlFor` for accessibility.
- Use inside `FormControl` when wiring into the Form compound.
- Place the Switch on the right side of a labeled row in settings panels.

### Don't

- Do NOT use Switch for form submissions that require saving — use Checkbox for that.
- Do NOT use Switch as a replacement for Radio Group (mutually exclusive options).
- Do NOT frame the label around the off state; frame it positively.
- Do NOT remove the focus ring — it is required for accessibility.
- Do NOT change the track or thumb sizing; `h-5 w-9` and `h-4 w-4` are fixed.
