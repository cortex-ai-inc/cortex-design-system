# StatusDot

## Overview

Custom visual indicator for system statuses. Renders a small filled dot colored by status, with an optional expanding pulse ring. NINE statuses are supported, mapped onto four semantic tints (success/error/running) plus muted gray for idle states.

## Import

```
import { StatusDot } from "@/components/ui/status-dot"
```

## Anatomy

A fixed `w-5 h-5` flex container centers the dot. The dot is a `rounded-full` element sized by `size`. When pulsing, an absolutely positioned `rounded-full` ring (larger, `opacity: 0.2`, `animate-pulse-ring`) sits behind it using the same color.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| status | "active" \| "success" \| "inactive" \| "offline" \| "failed" \| "error" \| "running" \| "warning" \| "pending" | — | Status variant (required) |
| size | "sm" \| "md" | "sm" | Dot size |
| pulse | boolean | true | Enable pulse ring (only renders for active/success/running) |

## Status variants

| Status | Color | Class | Pulse-eligible |
|--------|-------|-------|----------------|
| active | Green | `bg-k-secondary` | Yes |
| success | Green | `bg-k-secondary` | Yes |
| running | Blue | `bg-k-primary-container` | Yes |
| warning | Yellow | `bg-k-warning` | No |
| failed | Red | `bg-k-error` | No |
| error | Red | `bg-k-error` | No |
| inactive | Gray | `bg-on-surface-variant/50` | No |
| offline | Gray | `bg-on-surface-variant/50` | No |
| pending | Gray | `bg-on-surface-variant/40` | No |

An unknown `status` falls back to the `pending` color.

## Size variants

| Size | Dot | Ring |
|------|-----|------|
| sm | `w-1.5 h-1.5` (6px) | `w-3 h-3` (12px) |
| md | `w-2 h-2` (8px) | `w-4 h-4` (16px) |

## Pulse animation

The ring only renders when `pulse` is true **and** the status is `active`, `success`, or `running`. It reuses the status color at `opacity: 0.2` with the `animate-pulse-ring` keyframe (2s, linear, infinite). All other statuses never pulse, even with `pulse={true}`.

## Reference implementation

```tsx
const statusColors: Record<string, string> = {
  active: 'bg-k-secondary',
  success: 'bg-k-secondary',
  inactive: 'bg-on-surface-variant/50',
  offline: 'bg-on-surface-variant/50',
  failed: 'bg-k-error',
  error: 'bg-k-error',
  running: 'bg-k-primary-container',
  warning: 'bg-k-warning',
  pending: 'bg-on-surface-variant/40',
}

const colorClass = statusColors[status] || statusColors.pending
const dotSize = size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2'
const ringSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'

<div className="relative flex items-center justify-center w-5 h-5">
  <div className={cn('rounded-full', dotSize, colorClass)} />
  {pulse && (status === 'active' || status === 'success' || status === 'running') && (
    <div
      className={cn('absolute rounded-full animate-pulse-ring', ringSize, colorClass)}
      style={{ opacity: 0.2 }}
    />
  )}
</div>
```

## Usage patterns

```
// Default (sm, pulse on by default — pulses because active is eligible)
<StatusDot status="active" />

// Medium, no pulse
<StatusDot status="inactive" size="md" />

// Running with pulse ring
<StatusDot status="running" />

// Pulse disabled
<StatusDot status="success" pulse={false} />

// Inline with label
<span className="flex items-center gap-2">
  <StatusDot status="success" />
  <span className="text-body-sm">Online</span>
</span>
```

## Related

- Badge — alternative text-based status indicator
