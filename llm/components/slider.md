# Slider

> Status: new component — no product source yet. This spec is the canonical target for generation.

## Overview

Slider control built on the Radix UI `Slider` primitive for picking a numeric value — or a range — from a bounded interval by dragging a thumb along a track. The track reuses the Progress track geometry exactly (`h-2 rounded-full bg-surface-container-high`) and the thumb mirrors the Switch thumb (`h-4 w-4 rounded-full bg-on-surface`), so the three controls read as one family. Values are always arrays: one entry renders one thumb, two entries render a range with two thumbs.

## Import

```tsx
import { Slider } from "@/components/ui/slider"
```

## Anatomy

```
Slider (SliderPrimitive.Root)      — flex row, hit area, keyboard handling
├─ SliderPrimitive.Track           — h-2 rounded-full rail (Progress track parity)
│   └─ SliderPrimitive.Range       — filled segment, bg-k-primary-container
└─ SliderPrimitive.Thumb           — one per value entry; 16px light circle
```

Render one `Thumb` per entry in `value` / `defaultValue` — `[50]` gives a single thumb, `[20, 60]` gives a two-thumb range.

## Props

Forwards all Radix `Slider.Root` props. The component does not add its own variant props.

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number[]` | — | Controlled value(s); array length = thumb count |
| `defaultValue` | `number[]` | — | Uncontrolled initial value(s) |
| `onValueChange` | `(value: number[]) => void` | — | Fires continuously while dragging |
| `onValueCommit` | `(value: number[]) => void` | — | Fires once on release (use for expensive updates) |
| `min` | `number` | `0` | Lower bound |
| `max` | `number` | `100` | Upper bound |
| `step` | `number` | `1` | Increment (keyboard arrows move one step) |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Cortex products use horizontal |
| `disabled` | `boolean` | `false` | Disables interaction (`data-[disabled]`) |
| `minStepsBetweenThumbs` | `number` | `0` | Minimum gap between range thumbs, in steps |
| `className` | `string` | — | Merged onto the root via `cn()` |

## Styling

| Part | CSS Classes | Description |
|---|---|---|
| Root | `relative flex w-full touch-none select-none items-center data-[disabled]:opacity-50` | Full-width flex rail; touch/select suppressed for clean dragging; disabled dims the whole control |
| Track | `relative h-2 w-full grow overflow-hidden rounded-full bg-surface-container-high` | **Exact parity with the Progress track** — same height, radius, and fill |
| Range | `absolute h-full bg-k-primary-container` | Blue filled segment (thumb→min for single, thumb→thumb for range) |
| Thumb | `block h-4 w-4 rounded-full bg-on-surface shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-k-primary-container/50 disabled:pointer-events-none` | 16px light circle — mirrors the Switch thumb; 2px blue ring on keyboard focus |

> `rounded-full` here falls under the same exemption as Progress and Switch: tracks, ranges, and thumbs are inherently circular/pill elements (Key Constraint 1). Do not "fix" them to `rounded-sm`.

## States

- **Default**: light thumb (`bg-on-surface`) on the dark track; filled range in `bg-k-primary-container`.
- **Focus-visible**: `focus-visible:ring-2 focus-visible:ring-k-primary-container/50` on the **thumb** — 2px blue ring; arrow keys move by `step`.
- **Dragging**: no separate style — the thumb simply follows the pointer (`transition-colors` only transitions color, never position, so dragging stays 1:1).
- **Disabled**: root `data-[disabled]:opacity-50`, thumb `disabled:pointer-events-none`.

## Modes

### Single value

```tsx
<Slider defaultValue={[50]} max={100} step={1} />
```

### Range (two thumbs)

```tsx
<Slider defaultValue={[20, 60]} max={100} step={1} minStepsBetweenThumbs={1} />
```

The range segment fills between the two thumbs. Use `minStepsBetweenThumbs` to stop them overlapping.

### With value label

Progress-style label row above the control:

```tsx
<div className="space-y-2">
  <div className="flex justify-between text-body-sm">
    <span>Volume</span>
    <span className="text-on-surface-variant">50%</span>
  </div>
  <Slider value={volume} onValueChange={setVolume} max={100} />
</div>
```

### Stepped

```tsx
<Slider defaultValue={[0.7]} min={0} max={1} step={0.1} />
```

## Reference implementation

`slider.tsx` (canonical target):

```tsx
import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-surface-container-high">
      <SliderPrimitive.Range className="absolute h-full bg-k-primary-container" />
    </SliderPrimitive.Track>
    {(props.value ?? props.defaultValue ?? [0]).map((_, i) => (
      <SliderPrimitive.Thumb
        key={i}
        className="block h-4 w-4 rounded-full bg-on-surface shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-k-primary-container/50 disabled:pointer-events-none"
      />
    ))}
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
```

Core className strings:

Root:

```
relative flex w-full touch-none select-none items-center data-[disabled]:opacity-50
```

Track (= Progress track):

```
relative h-2 w-full grow overflow-hidden rounded-full bg-surface-container-high
```

Range:

```
absolute h-full bg-k-primary-container
```

Thumb (light circle, mirrors the Switch thumb):

```
block h-4 w-4 rounded-full bg-on-surface shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-k-primary-container/50 disabled:pointer-events-none
```

## Usage Guidelines

### Do

- Use Slider for **bounded numeric ranges** where the approximate position matters more than the exact digit — volume, thresholds, confidence cutoffs, price ranges.
- Pair it with a **value label row** (`flex justify-between text-body-sm`, muted value) so the current value is always readable.
- Use the two-thumb range mode for min/max filters, with `minStepsBetweenThumbs` to keep the thumbs apart.
- Use `onValueCommit` for expensive side effects (queries, API calls); `onValueChange` for live labels.
- Keep the focus ring — keyboard users move the thumb with arrow keys.

### Don't

- Do NOT use a Slider for **precise numeric entry** (quantities, amounts, exact percentages) — use `<Input type="number" />`.
- Do NOT use a Slider for **2–5 discrete options** — use a RadioGroup (or Tabs/ToggleGroup for views).
- Do NOT restyle the track or thumb to `rounded-sm` — they are inherently circular/pill (same exemption as Progress and Switch).
- Do NOT change the geometry — track `h-2` and thumb `h-4 w-4` are fixed for family parity.
- Do NOT color the thumb blue — the thumb is light (`bg-on-surface`); blue is the range fill.

## Related

- `progress.md` — the Slider track is the Progress track (`h-2 rounded-full bg-surface-container-high`)
- `switch.md` — the Slider thumb mirrors the Switch thumb (`h-4 w-4 rounded-full bg-on-surface`)
- `input.md` — use Input `type="number"` when users need exact values
