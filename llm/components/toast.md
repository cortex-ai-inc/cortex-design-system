# Toast (Sonner)

## Overview

Toast notifications powered by the [`sonner`](https://sonner.emilkowal.ski/) library, wrapped as a project `Toaster` component. Provides non-blocking feedback for actions, errors, and system events. The wrapper applies the Cortex dark theme via CSS variable overrides and supplies a fixed set of lucide icons per toast type.

The wrapper itself only configures the `<Sonner>` Toaster; toasts are still fired with the `toast` API imported directly from `sonner`.

## Import

```tsx
// Render once in the root layout:
import { Toaster } from "@/components/ui/sonner"

// Fire toasts anywhere:
import { toast } from "sonner"
```

## Anatomy

The `Toaster` wrapper passes the following to `<Sonner>`:

| Prop | Value | Notes |
|------|-------|-------|
| `theme` | `useTheme()` from `next-themes` (default `"system"`) | Not hardcoded — follows the app theme |
| `className` | `"toaster group"` | Enables Sonner `group-[.toaster]` selectors |
| `icons` | lucide icon map (see below) | Overrides Sonner's default icons |
| `style` | CSS variable overrides (see below) | Maps Sonner tokens to design tokens |

It spreads `{...props}`, so any standard `ToasterProps` (e.g. `position`, `richColors`, `duration`, `expand`) can be passed at the call site. The wrapper sets no `position`, so Sonner's default `bottom-right` applies.

### Icon map

Each toast type renders a `lucide-react` icon at `size-4` (`w-4 h-4`):

| Type | Icon | className |
|------|------|-----------|
| success | `CircleCheckIcon` | `size-4` |
| info | `InfoIcon` | `size-4` |
| warning | `TriangleAlertIcon` | `size-4` |
| error | `OctagonXIcon` | `size-4` |
| loading | `Loader2Icon` | `size-4 animate-spin` |

### CSS variable overrides

The wrapper styles toasts by mapping Sonner's variables onto the app's shadcn CSS variables. In `cortex-coder-front` these resolve to the stock shadcn **slate** dark palette (HSL), not the Cortex branded hex tokens:

| Sonner var | Mapped to | Dark-theme value |
|------------|-----------|------------------|
| `--normal-bg` | `var(--popover)` | `222.2 84% 4.9%` (≈ `#020817`) |
| `--normal-text` | `var(--popover-foreground)` | `210 40% 98%` (≈ `#F8FAFC`) |
| `--normal-border` | `var(--border)` | `217.2 32.6% 17.5%` (≈ slate `#1E293B`) |
| `--border-radius` | `var(--radius)` | `0.5rem` (8px) |

## Reference implementation

```tsx
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}
```

## Toast Types

Fired via the `toast` API from `sonner`. Each type renders its mapped icon above.

| Type | Call | Icon |
|------|------|------|
| Default | `toast("Message")` | none |
| Success | `toast.success("Message")` | `CircleCheckIcon` |
| Info | `toast.info("Message")` | `InfoIcon` |
| Warning | `toast.warning("Message")` | `TriangleAlertIcon` |
| Error | `toast.error("Message")` | `OctagonXIcon` |
| Loading | `toast.loading("Message")` | spinning `Loader2Icon` |

> Colors come from Sonner. The wrapper does not enable `richColors` by default — surfaces use the mapped popover background/border above. Pass `richColors` on `<Toaster>` if you want Sonner's per-type semantic backgrounds.

## Options (per-toast)

Standard `sonner` toast options (passed as the second argument):

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `duration` | number | 4000 | Auto-dismiss in ms (`Infinity` = no auto-dismiss) |
| `dismissible` | boolean | true | Allow click-to-dismiss |
| `description` | string | — | Secondary text below title |
| `action` | object | — | Action button: `{ label, onClick }` |
| `cancel` | object | — | Cancel button: `{ label, onClick }` |
| `icon` | ReactNode | type icon | Override the mapped icon |
| `onDismiss` | () => void | — | Callback on dismiss |
| `onAutoClose` | () => void | — | Callback on auto-close |
| `important` | boolean | false | Override do-not-disturb |

## Usage patterns

```tsx
// Basic
toast.success("Ticket created")

// With description
toast.error("Failed to save", {
  description: "Check your connection and try again",
})

// With action
toast("Ticket assigned", {
  action: {
    label: "View",
    onClick: () => router.navigate({ to: "/tickets/123" }),
  },
})

// Loading -> resolve
const id = toast.loading("Uploading...")
// ...after completion
toast.success("Upload complete", { id })

// Promise helper
toast.promise(saveTicket(), {
  loading: "Saving...",
  success: "Saved",
  error: "Could not save",
})
```

## Behavior

- Place `<Toaster />` once in the root layout.
- Multiple toasts stack; position defaults to `bottom-right`.
- Auto-dismiss after `duration` (default 4s); loading toasts persist until resolved/dismissed.
- Click to dismiss unless `dismissible: false`.
- Theme follows `next-themes` — in the dark theme the toast renders on the shadcn slate popover surface (`var(--popover)`) with a slate `var(--border)` and `0.5rem` (8px) radius from `var(--radius)`.

## Related

- NotificationBell — persistent notification panel for system notifications
