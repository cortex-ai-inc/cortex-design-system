# Switch

## Overview

Toggle control built on Radix UI `Switch` primitive. Styled as a pill-shaped track with a circular thumb that slides between on/off positions. Used for settings toggles, feature flags, and preference switches.

## Import

```tsx
import { Switch } from "@/components/ui/switch"
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | `false` | Toggle state |
| `onCheckedChange` | `(checked: boolean) => void` | `undefined` | Change handler |
| `disabled` | `boolean` | `false` | Disables interaction |
| `className` | `string` | `undefined` | Additional classes |
| `id` | `string` | `undefined` | HTML id, typically paired with a Label's `htmlFor` |

## Styling

| Part | State | CSS Classes | Description |
|---|---|---|---|
| Track | Unchecked | `peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-xs transition-colors duration-200 bg-surface-container-high` | 20x36px pill, dark gray background |
| Track | Checked | `bg-k-primary-container` | Filled with k-primary-container |
| Track | Disabled | `cursor-not-allowed opacity-50` | Dimmed, non-interactive |
| Track | Focus | `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-k-primary-container/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dim` | Focus ring matching input pattern |
| Thumb | Unchecked | `pointer-events-none block h-4 w-4 rounded-full bg-on-surface shadow-xs ring-0 transition-transform duration-200 translate-x-0` | 16x16 circle, on-surface color, left-aligned |
| Thumb | Checked | `translate-x-4` | Slides 16px to the right |

## States

- **Off/unchecked**: Track `bg-surface-container-high`, thumb `bg-on-surface` at left position (`translate-x-0`).
- **On/checked**: Track `bg-k-primary-container`, thumb `bg-on-surface` at right position (`translate-x-4`).
- **Disabled**: `opacity-50 cursor-not-allowed`. Cannot be toggled.
- **Focus**: `ring-2 ring-k-primary-container/50` with offset from surface background.
- **Hover**: No visual change (consistent with design system).

## Tailwind Classes

| Selector | Description |
|---|---|
| `h-5` | Track height 20px |
| `w-9` | Track width 36px |
| `rounded-full` | Fully rounded pill shape |
| `border-2 border-transparent` | Invisible border for spacing consistency |
| `bg-surface-container-high` | Unchecked track color |
| `bg-k-primary-container` | Checked track color |
| `h-4 w-4` | Thumb size 16x16 |
| `rounded-full` | Round thumb |
| `bg-on-surface` | Thumb color |
| `translate-x-0` | Thumb off position |
| `translate-x-4` | Thumb on position (16px slide) |
| `transition-colors duration-200` | Smooth track color transition |
| `transition-transform duration-200` | Smooth thumb slide animation |
| `shadow-xs` | Subtle shadow on track and thumb |

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
- Use inside `FormControl` when using the Form compound in a form context.
- Place the Switch on the right side of a labeled row in settings panels.

### Don't

- Do NOT use Switch for form submissions that require saving — use Checkbox for that.
- Do NOT use Switch as a replacement for Radio Group (mutually exclusive options).
- Do NOT use Switch when the label text describes the off state; frame the label positively.
- Do NOT remove the focus ring — it is required for accessibility.
- Do NOT change the track or thumb sizing; `h-5 w-9` and `h-4 w-4` are fixed.
