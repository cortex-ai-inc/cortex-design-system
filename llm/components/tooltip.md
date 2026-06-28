# Tooltip

## Overview

Radix UI Tooltip primitive for hover-reveal contextual information.

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

| Component | Purpose |
|-----------|---------|
| TooltipProvider | Wraps group of tooltips, sets delayDuration |
| Tooltip | Root container, controls open state |
| TooltipTrigger | The element that triggers the tooltip |
| TooltipContent | The tooltip popover content |

## TooltipContent styles

| Property | Value |
|----------|-------|
| Z-index | z-50 |
| Border radius | rounded-sm |
| Background | bg-surface-container-high |
| Horizontal padding | px-2.5 |
| Vertical padding | py-1 |
| Font | text-code-sm |
| Text color | text-on-surface |
| Box shadow | shadow-ambient |
| Animation | animate-fade-in |

## Props

### TooltipProvider

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| delayDuration | number | 700 | Hover delay before showing (ms) |
| skipDelayDuration | number | 300 | Hover delay after leaving another tooltip |

### TooltipContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| side | "top" | "bottom" | "left" | "right" | "top" | Preferred placement |
| align | "start" | "center" | "end" | "center" | Alignment on the side |
| sideOffset | number | 4 | Gap between trigger and content |

## Usage pattern

```
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon">
        <InfoIcon className="w-4 h-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Additional information</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## Behavior

- Appears on hover after delayDuration (default 700ms).
- Disappears on mouse leave.
- Not triggered on touch devices (focus-based alternative needed).
- Multiple tooltips share provider config for consistent delay.

## Related

- Sidebar — tooltips used in collapsed (icon-only) mode for nav labels
