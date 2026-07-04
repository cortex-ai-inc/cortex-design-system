# Tooltip

## Overview

Radix UI Tooltip primitive for hover-reveal contextual information. The branded Cortex
build (cortex-support-front) renders content on a `surface-container-high` chip with
mono `text-code-sm` text, `rounded-sm` corners, a `shadow-overlay` elevation, and a fade-in entrance.

> Note: cortex-coder-front ships the unstyled shadcn default for this component
> (`bg-foreground text-background rounded-md px-3 py-1.5 text-xs`, with a `TooltipPrimitive.Arrow`
> and `delayDuration = 0`). The branded tokens below come from cortex-support-front and
> reflect the Cortex design language; prefer them when building Cortex UI.

## Import

```
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
```

## Sub-components

| Component | Source | Purpose |
|-----------|--------|---------|
| TooltipProvider | `TooltipPrimitive.Provider` (re-export) | Wraps group of tooltips, sets shared delay |
| Tooltip | `TooltipPrimitive.Root` (re-export) | Root container, controls open state |
| TooltipTrigger | `TooltipPrimitive.Trigger` (re-export) | The element that triggers the tooltip |
| TooltipContent | `forwardRef` wrapper | The tooltip popover content (the only styled part) |

## TooltipContent styles

| Property | Value |
|----------|-------|
| Z-index | `z-[100]` (popover layer) |
| Overflow | `overflow-hidden` |
| Border radius | `rounded-sm` (4px) |
| Background | `bg-surface-container-high` |
| Horizontal padding | `px-2.5` |
| Vertical padding | `py-1` |
| Font | `text-code-sm` (12px JetBrains Mono) |
| Text color | `text-on-surface` |
| Box shadow | `shadow-overlay` (`0 8px 24px rgba(0,0,0,0.40)`) |
| Animation | `animate-fade-in` (200ms = `--motion-base`) |

## Reference implementation

`TooltipContent` canonical base className (support-front pattern; z-index and shadow normalized to the vNext canon):

```
z-[100] overflow-hidden rounded-sm bg-surface-container-high px-2.5 py-1 text-code-sm text-on-surface shadow-overlay animate-fade-in
```

> `shadow-overlay` (`0 8px 24px rgba(0,0,0,0.40)`) is the elevation token for small floating panels (tooltips, dropdowns, selects, popovers); dialogs keep `shadow-ambient`. Stock shadcn ships `z-50`; the Cortex z-index scale places tooltips at the popover layer (`z-[100]`).

`TooltipProvider`, `Tooltip`, and `TooltipTrigger` are direct re-exports of the Radix
primitives with no added styling:

```ts
const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger
```

## Props

### TooltipProvider

Plain Radix `Tooltip.Provider` — no custom defaults are applied, so Radix defaults stand.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| delayDuration | number | 700 | Hover delay before showing (ms) |
| skipDelayDuration | number | 300 | Window in which a follow-up tooltip skips the delay |

### TooltipContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| side | "top" \| "bottom" \| "left" \| "right" | "top" | Preferred placement |
| align | "start" \| "center" \| "end" | "center" | Alignment on the side |
| sideOffset | number | 4 | Gap between trigger and content |

## Usage pattern

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon">
        <Info className="w-4 h-4" strokeWidth={1.5} />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Additional information</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## Behavior

- Appears on hover after `delayDuration` (Radix default 700ms unless a provider overrides it).
- Disappears on mouse leave; entrance uses `animate-fade-in`.
- Not triggered on touch devices (provide a focus-based alternative).
- Multiple tooltips inside one `TooltipProvider` share the delay/skip-delay config.

## Related

- Sidebar — tooltips used in collapsed (icon-only) mode for nav labels

> MIGRATION(vNext): small floats get their own shadow — replace shadow-ambient with shadow-overlay in dropdown-menu.tsx, tooltip.tsx, select.tsx content — all products.
