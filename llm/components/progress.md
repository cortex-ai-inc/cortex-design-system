# Progress

## Overview

Radix UI Progress primitive for determinate and indeterminate progress indicators.

## Import

```
import { Progress } from "@/components/ui/progress"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | number | — | Progress value (0-100). Omit for indeterminate. |
| className | string | "" | Additional CSS classes |

## Structure

```
Progress (root)
  — Track (relative position layer)
    — Indicator (fills based on value)
```

## Styles

### Track

| Property | Value |
|----------|-------|
| Position | relative |
| Height | h-2 |
| Width | w-full |
| Overflow | overflow-hidden |
| Border radius | rounded-full |
| Background | bg-surface-container-high |

### Indicator

| Property | Value |
|----------|-------|
| Height | h-full |
| Width | w-full |
| Flex | flex-1 |
| Background | bg-k-primary-container |
| Transition | transition-all |

## Variants

| Variant | value prop | Behavior |
|---------|-----------|----------|
| Determinate | 0-100 | Indicator transitions to percentage width |
| Indeterminate | omitted | Continuous animation (CSS unknown) |

## Usage patterns

```
// Determinate
<Progress value={66} />

// Determinate with label
<div className="space-y-2">
  <div className="flex justify-between text-body-sm">
    <span>Progress</span>
    <span>66%</span>
  </div>
  <Progress value={66} />
</div>

// Indeterminate
<Progress />
```

## Related

- Used in file uploads, multi-step forms, loading states.
