# Toast

## Overview

Toast notifications powered by the `sonner` library. Provides non-blocking feedback for actions, errors, and system events.

## Import

```
import { Toaster } from "sonner"
import { toast } from "sonner"
```

## Toaster Setup

Place Toaster once in the root layout.

| Prop | Value |
|------|-------|
| theme | "dark" |
| richColors | true |
| position | "bottom-right" (default) |

## Toast Types

| Type | Usage | Color | Description |
|------|-------|-------|-------------|
| Default | `toast("Message")` | k-primary / neutral | General info |
| Success | `toast.success("Message")` | Green (k-secondary) | Success confirmation |
| Error | `toast.error("Message")` | Red (k-error) | Error feedback |
| Warning | `toast.warning("Message")` | Amber (k-warning) | Warning alert |
| Loading | `toast.loading("Message")` | k-primary | In-progress state |

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| duration | number | 4000 | Auto-dismiss in ms (0 = no dismiss) |
| dismissible | boolean | true | Allow click-to-dismiss |
| description | string | — | Secondary text below title |
| action | object | — | Action button: `{ label, onClick }` |
| cancel | object | — | Cancel button: `{ label, onClick }` |
| onDismiss | () => void | — | Callback on dismiss |
| onAutoClose | () => void | — | Callback on auto-close |
| important | boolean | false | Override do-not-disturb |

## Usage patterns

```
// Basic
toast.success("Ticket created")

// With description
toast.error("Failed to save", {
  description: "Check your connection and try again"
})

// With action
toast("Ticket assigned", {
  action: {
    label: "View",
    onClick: () => router.navigate({ to: "/tickets/123" })
  }
})

// Loading then dismiss
const t = toast.loading("Uploading...")
// ... after completion
toast.dismiss(t)
toast.success("Upload complete")
```

## Behavior

- Multiple toasts stack vertically.
- Auto-dismiss after duration (default 4s).
- Click to dismiss (unless disabled).
- Loading toasts persist until manually dismissed.
- richColors provides semantic color coding per type.

## Related

- NotificationBell — persistent notification panel for system notifications
