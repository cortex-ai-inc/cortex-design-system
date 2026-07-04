# Alert

> Status: new component — no product source yet. This spec is the canonical target for generation.

## Overview

Persistent inline message that communicates contextual status inside the page flow. Custom component — no Radix primitive — rendered as a plain `div role="alert"` styled with CVA.

Pick the right messaging component:

| Component | Persistence | Use for |
|---|---|---|
| **Alert** | Persistent — stays until the condition is resolved or the user dismisses it | Form-level errors, degraded-state banners, contextual warnings |
| **Toast** (Sonner) | Transient — auto-dismisses | Feedback after an action ("Saved", "Deleted") |
| **AlertDialog** | Blocking — interrupts until answered | Confirmations for destructive/irreversible actions |

**Import path**: `@/components/ui/alert`

**Dependencies**: class-variance-authority, lucide-react (icons supplied by the consumer)

## Import

```tsx
import { Alert, AlertTitle, AlertDescription, AlertActions } from "@/components/ui/alert"
```

## Anatomy

| Part | Element | Description |
|---|---|---|
| `Alert` | `div[role=alert]` | Root; carries the CVA `variant`, left accent border, and tinted background |
| icon slot | first `svg` child | Optional lucide icon, auto-sized/positioned by the root's `[&_svg]` selectors |
| `AlertTitle` | `p` | Bold one-line heading — `text-on-surface font-semibold` |
| `AlertDescription` | `p` | Body copy — `text-on-surface-variant` |
| `AlertActions` | `div` | Optional action row (`mt-2 flex gap-2`), holds small/outline buttons |
| dismiss (optional) | ghost icon `Button` | `X` icon button, `absolute right-2 top-2`, consumer-supplied |

## Variants

| Variant | Background | Border (left) | Icon color | Icon | Use Case |
|---|---|---|---|---|---|
| info | `bg-k-primary-container/10` | `border-k-primary-container` | `[&>svg]:text-k-primary-container` | `Info` | Neutral guidance, contextual tips |
| success | `bg-k-secondary/10` | `border-k-secondary` | `[&>svg]:text-k-secondary` | `CircleCheck` | Completed/resolved persistent state |
| warning | `bg-k-warning/10` | `border-k-warning` | `[&>svg]:text-k-warning` | `TriangleAlert` | Degraded state, attention needed |
| error | `bg-k-error/10` | `border-k-error` | `[&>svg]:text-k-error` | `CircleAlert` | Form-level errors, failures |

Icons are recommended but optional; when present, always the matching lucide icon at the standard `w-4 h-4` with `strokeWidth={1.5}`.

## Props

### Alert

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"info" \| "success" \| "warning" \| "error"` | `"info"` | Semantic tone |
| `className` | `string` | `undefined` | Additional classes merged via `cn()` |
| `children` | `ReactNode` | required | Icon + title + description + actions |

`AlertTitle`, `AlertDescription`, and `AlertActions` accept `className` and `children` only.

## States

Non-interactive — the alert itself has **no** hover, focus, or active states. The optional dismiss button is a standard ghost icon Button and carries the standard focus ring (`focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`); action buttons in `AlertActions` keep their own Button states.

## Reference CVA

```ts
const alertVariants = cva(
  "relative w-full rounded-md border-l-[3px] px-4 py-3 text-body-sm flex gap-3 [&_svg]:w-4 [&_svg]:h-4 [&_svg]:shrink-0 [&_svg]:mt-0.5",
  {
    variants: {
      variant: {
        info: "bg-k-primary-container/10 border-k-primary-container [&>svg]:text-k-primary-container",
        success: "bg-k-secondary/10 border-k-secondary [&>svg]:text-k-secondary",
        warning: "bg-k-warning/10 border-k-warning [&>svg]:text-k-warning",
        error: "bg-k-error/10 border-k-error [&>svg]:text-k-error",
      },
    },
    defaultVariants: { variant: "info" },
  },
)
```

Sub-part classes:

```
AlertTitle:       "text-on-surface font-semibold"
AlertDescription: "text-on-surface-variant"
AlertActions:     "mt-2 flex gap-2"
```

Dismissible pattern (consumer-composed):

```tsx
<Alert variant="warning" className="pr-10">
  <TriangleAlert strokeWidth={1.5} />
  <div>
    <AlertTitle>Sync paused</AlertTitle>
    <AlertDescription>Reconnect the integration to resume syncing.</AlertDescription>
  </div>
  <Button
    variant="ghost"
    size="icon"
    className="absolute right-2 top-2 h-6 w-6"
    aria-label="Dismiss"
    onClick={onDismiss}
  >
    <X className="w-4 h-4" strokeWidth={1.5} />
  </Button>
</Alert>
```

> Docs-site note: the documentation site's `.callout` / `.callout-info|success|warning|danger` classes share this visual language (8% tinted background + 3px left border). The product variant name is `error`; `callout-danger` is the site's legacy class name for the same tone.

## Usage

```tsx
// Form-level error above the submit row
<Alert variant="error">
  <CircleAlert strokeWidth={1.5} />
  <div>
    <AlertTitle>Could not save changes</AlertTitle>
    <AlertDescription>Fix the 2 highlighted fields and try again.</AlertDescription>
  </div>
</Alert>

// Degraded-state banner with actions
<Alert variant="warning">
  <TriangleAlert strokeWidth={1.5} />
  <div>
    <AlertTitle>Indexing behind by 12 minutes</AlertTitle>
    <AlertDescription>Search results may be stale while the backlog drains.</AlertDescription>
    <AlertActions>
      <Button variant="outline" size="sm">View status</Button>
    </AlertActions>
  </div>
</Alert>
```

## Usage Guidelines

### Do

- Use Alert for form-level errors (field-level errors stay on `FormMessage`).
- Use Alert for persistent contextual messaging that remains until the condition resolves.
- Use Alert for degraded-state banners at the top of the affected section.
- Match the variant to the semantic meaning (green = success, red = error, yellow = warning, blue = info).
- Keep the icon at `w-4 h-4` with `strokeWidth={1.5}`, matching the variant.

### Don't

- Do NOT use Alert for transient feedback after an action — use Toast.
- Do NOT use Alert for confirmations — use AlertDialog.
- Do NOT stack more than one Alert per section — merge messages or keep only the most severe.
- Do NOT make the alert body clickable — put actions in `AlertActions`.
- Do NOT invent new tones — the four variants map 1:1 to the semantic color tokens.

## Related

- `toast.md` — transient feedback (Sonner)
- `dialog.md` — AlertDialog for blocking confirmations
