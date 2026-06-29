# Modal (Dialog)

## Overview

In the Cortex system, **Modal == Dialog** — a Radix `@radix-ui/react-dialog` primitive that renders a centered, overlay-backed surface on top of the page. It is composed of small slot parts (`DialogContent`, `DialogHeader`, `DialogTitle`, etc.) rather than a single monolithic component.

**Design constraint**: modals are reserved for short, focused interactions — confirmations, single-input prompts, and quick previews. They are **never** used for create/edit forms — those always live on dedicated pages (`?mode=edit`). For destructive/yes-no confirmations prefer the sibling `AlertDialog` (same styling, built on `@radix-ui/react-alert-dialog`, with built-in `AlertDialogAction` / `AlertDialogCancel` buttons).

## Import

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog"
```

## Anatomy

| Part | Element | Notes |
|---|---|---|
| `Dialog` | `DialogPrimitive.Root` | State container (`open` / `onOpenChange`) |
| `DialogTrigger` | `DialogPrimitive.Trigger` | Opens the dialog; use `asChild` to wrap a `Button` |
| `DialogPortal` | `DialogPrimitive.Portal` | Portals content to `<body>` (rendered automatically by `DialogContent`) |
| `DialogOverlay` | `DialogPrimitive.Overlay` | Dimmed, blurred backdrop (rendered automatically by `DialogContent`) |
| `DialogContent` | `DialogPrimitive.Content` | The centered surface; renders its own portal, overlay, and close button |
| `DialogHeader` | `div` | Vertical stack for title + description |
| `DialogTitle` | `DialogPrimitive.Title` | `text-title-sm` heading |
| `DialogDescription` | `DialogPrimitive.Description` | `text-body-sm` muted supporting text |
| `DialogFooter` | `div` | Action row (right-aligned on `sm+`) |
| `DialogClose` | `DialogPrimitive.Close` | Closes the dialog (also auto-rendered as the top-right X) |

## Props

### Dialog (Root)

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | — | Open state change handler |
| `defaultOpen` | `boolean` | `false` | Initial open state (uncontrolled) |
| `modal` | `boolean` | `true` | Block interaction with the rest of the page |

### DialogContent

| Prop | Type | Default | Description |
|---|---|---|---|
| `showCloseButton` | `boolean` | `true` | Render the top-right X close button |
| `className` | `string` | — | Extra classes — set width here (e.g. `sm:max-w-md`) |
| `children` | `ReactNode` | — | Dialog body |

`DialogContent` also forwards Radix `Content` props such as `onInteractOutside`, `onEscapeKeyDown`, and `onOpenAutoFocus`.

## Width

There are **no named size variants**. `DialogContent` ships with a single default — full width up to `sm:max-w-lg` (512px) — and width is widened/narrowed by overriding via `className` (e.g. `className="sm:max-w-md"`). On viewports below `sm`, content is clamped to `max-w-[calc(100%-2rem)]` (full width minus a 1rem gutter each side).

| Surface | Default max width |
|---|---|
| `DialogContent` | `sm:max-w-lg` (512px) |
| `AlertDialogContent` | `sm:max-w-[440px]` |

## Styles

| Element | CSS Classes |
|---|---|
| Overlay | `fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm` |
| Content | `bg-surface-container-low fixed top-[50%] left-[50%] z-[200] grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-md border border-on-surface-variant/15 p-6 shadow-ambient sm:max-w-lg` |
| Close button | `text-on-surface-variant hover:text-on-surface absolute top-4 right-4 rounded-xs opacity-70 hover:opacity-100 focus:ring-2 focus:ring-offset-2` (`XIcon`, `size-4`) |
| Header | `flex flex-col gap-1.5 text-left` |
| Footer | `flex flex-col-reverse gap-2 sm:flex-row sm:justify-end` |
| Title | `text-title-sm text-on-surface` |
| Description | `text-body-sm text-on-surface-variant` |

## States / Notes

- **Surface**: dialog sits on `bg-surface-container-low` (#191B22), the panel surface — not `bg-background`.
- **Border**: thin `border-on-surface-variant/15` (ghost border), `rounded-md` (6px) corners.
- **Depth**: uses `shadow-ambient` — one of the only places shadows are allowed (floating elements).
- **Z-index**: overlay and content both render at `z-[200]` (the dialog/overlay layer).
- **Backdrop**: `bg-black/60` with `backdrop-blur-sm`.
- **Animation**: `fade-in` + `slide-in-from-bottom-2` on open, `fade-out` + `slide-out-to-bottom-2` on close, `duration-200`.
- **Close behavior**: Escape closes; clicking the overlay closes; top-right X closes (unless `showCloseButton={false}`).
- **Focus**: content is `outline-none`; focus is trapped inside while open and restored on close.

## Reference implementation

`DialogContent` core className (verbatim from `dialog.tsx`):

```tsx
className={cn(
  "bg-surface-container-low data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom-2 data-[state=open]:slide-in-from-bottom-2 fixed top-[50%] left-[50%] z-[200] grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-md border border-on-surface-variant/15 p-6 shadow-ambient duration-200 outline-none sm:max-w-lg",
  className
)}
```

`DialogOverlay` className (verbatim):

```tsx
className={cn(
  "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm",
  className
)}
```

Auto-rendered close button (verbatim):

```tsx
<DialogPrimitive.Close
  data-slot="dialog-close"
  className="text-on-surface-variant hover:text-on-surface ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
>
  <XIcon />
  <span className="sr-only">Close</span>
</DialogPrimitive.Close>
```

## Example

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>Rename file</DialogTitle>
      <DialogDescription>
        Pick a new name for this document.
      </DialogDescription>
    </DialogHeader>
    <Input defaultValue="untitled.md" />
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Usage Guidelines

### Do
- Use Dialog for short, focused interactions: a single prompt, a quick preview, or a confirmation.
- Use `AlertDialog` for destructive / yes-no confirmations (it ships `AlertDialogAction` and `AlertDialogCancel`).
- Always provide a `DialogTitle` (and ideally `DialogDescription`) for accessibility.
- Use `asChild` on `DialogTrigger` when wrapping a custom `Button`.
- Set width with `className` on `DialogContent` (e.g. `sm:max-w-md`), since there are no size variants.

### Don't
- Don't render create/edit forms in a Dialog — use a dedicated page with `?mode=edit`.
- Don't stack dialogs — close one before opening another.
- Don't make the dialog primary button use light text on the gradient; primary actions are `gradient-primary` with dark text (`text-surface-container-lowest`).
- Don't exceed `rounded-md` (6px) on the content surface.
