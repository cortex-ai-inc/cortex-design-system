# StatusDot

## Overview

Custom visual indicator component for system statuses with color and optional pulse animation.

## Import

```
import { StatusDot } from "@/components/ui/status-dot"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| status | "active" | "success" | "inactive" | "offline" | "failed" | "error" | "running" | "warning" | "pending" | "active" | Status variant |
| size | "sm" | "md" | "md" | Dot size in pixels |
| pulse | boolean | — | Enable pulse ring animation |

## Status variants

| Status | Color | CSS color | Pulse |
|--------|-------|-----------|-------|
| active | Green | k-secondary | Yes |
| success | Green | k-secondary | Yes |
| inactive | Gray | on-surface-variant/50 | No |
| offline | Gray | on-surface-variant/50 | No |
| failed | Red | k-error | No |
| error | Red | k-error | No |
| running | Blue | k-primary-container | Yes |
| warning | Yellow | k-warning | No |
| pending | Gray | on-surface-variant/40 | No |

## Size variants

| Size | Diameter |
|------|----------|
| sm | 6px |
| md | 8px |

## Pulse Animation

Applied to active, success, and running statuses when pulse is true. Produces a ring animation around the dot using the status color.

## Usage patterns

```
// Default (active, md)
<StatusDot status="active" />

// Small, no pulse
<StatusDot status="inactive" size="sm" />

// With pulse animation
<StatusDot status="running" pulse />

// Inline with label
<span className="flex items-center gap-2">
  <StatusDot status="success" pulse />
  <span className="text-body-sm">Online</span>
</span>
```

## Related

- Badge — alternative text-based status indicator
