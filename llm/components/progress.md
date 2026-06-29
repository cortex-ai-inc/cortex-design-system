# Progress

## Overview

Radix UI Progress primitive for determinate progress indicators. A thin horizontal track whose indicator translates horizontally based on the `value` prop. There is no built-in indeterminate animation — when `value` is omitted it is treated as `0`.

## Import

```
import { Progress } from "@/components/ui/progress"
```

## Anatomy

```
Progress (ProgressPrimitive.Root) — track
  └─ ProgressPrimitive.Indicator    — fill, translated by value
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | number | `0` | Progress value (0–100). Drives the indicator transform. |
| className | string | — | Additional CSS classes merged via `cn()` |
| ...props | ProgressPrimitive.Root props | — | All Radix Progress root props |

## Styles

### Track (Root)

| Property | Value |
|----------|-------|
| Position | `relative` |
| Height | `h-2` |
| Width | `w-full` |
| Overflow | `overflow-hidden` |
| Border radius | `rounded-full` |
| Background | `bg-surface-container-high` |

### Indicator

| Property | Value |
|----------|-------|
| Height | `h-full` |
| Width | `w-full` |
| Flex | `flex-1` |
| Background | `bg-k-primary-container` |
| Transition | `transition-all` |
| Transform | `translateX(-${100 - (value || 0)}%)` (inline style) |

## States

| State | value prop | Behavior |
|-------|-----------|----------|
| Empty | `0` or omitted | Indicator fully translated off-track (`translateX(-100%)`) |
| In progress | `1`–`99` | Indicator translated to the corresponding percentage, animated via `transition-all` |
| Complete | `100` | Indicator fully visible (`translateX(0)`) |

## Reference implementation

Source: `cortex-support-front` — `@/components/ui/progress` (PRIMARY). Built on `@radix-ui/react-progress`.

Track (Root):

```
"relative h-2 w-full overflow-hidden rounded-full bg-surface-container-high"
```

Indicator:

```
"h-full w-full flex-1 bg-k-primary-container transition-all"
```

with inline `style={{ transform: \`translateX(-${100 - (value || 0)}%)\` }}`.

> Variation: `cortex-coder-front` ships the unbranded shadcn version — track `bg-primary/20` and indicator `bg-primary`. Cortex products use the branded blue tokens above (`bg-surface-container-high` / `bg-k-primary-container`).

## Usage patterns

```
// Basic
<Progress value={66} />

// With label
<div className="space-y-2">
  <div className="flex justify-between text-body-sm">
    <span>Progress</span>
    <span>66%</span>
  </div>
  <Progress value={66} />
</div>
```

## Usage Guidelines

- Pass `value` as a number from 0–100. Omitting it renders an empty (0%) track.
- Use for determinate progress: file uploads, multi-step forms, loading completion.
- The fixed `h-2` height and `rounded-full` track are intentional — this is the one place `rounded-full` is allowed for a rectangle-like element. Do not override the radius.
