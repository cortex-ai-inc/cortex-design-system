# Dialog

## Overview

Modal overlay for focused user interactions that require attention before continuing. Built on Radix UI Dialog and AlertDialog primitives.

Two variants: standard **Dialog** (for forms, information, confirmations) and **AlertDialog** (for destructive confirmations requiring explicit user acknowledgment).

**Import path**: `@/components/ui/dialog`

**Dependencies**: @radix-ui/react-dialog, class-variance-authority

## Import

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
```

## Sub-Components

| Component | Role |
|---|---|
| Dialog | Root wrapper managing open/close state |
| DialogTrigger | Button or element that opens the dialog |
| DialogContent | The actual dialog panel (overlay + content) |
| DialogHeader | Top section with title and description |
| DialogTitle | Heading inside the dialog |
| DialogDescription | Optional description or instructions |
| DialogFooter | Bottom action area (typically buttons) |
| DialogClose | A Button variant="ghost" close icon (X) positioned top-right, or an action button that closes |

## Width Tiers

| Tier | Width | Use Case |
|---|---|---|
| Confirmations | sm:max-w-[440px] | Simple confirmations, short alerts |
| Forms | sm:max-w-[560px] | Form dialogs, medium content |
| Complex | sm:max-w-[720px] | Multi-column forms, rich content |

The base width is controlled via `className` on DialogContent:

```tsx
<DialogContent className="sm:max-w-[560px]">
```

## Props

### Dialog

| Prop | Type | Default | Description |
|---|---|---|---|
| open | boolean | undefined | Controlled open state |
| onOpenChange | (open: boolean) => void | undefined | Callback when open state changes |
| children | ReactNode | required | DialogTrigger + DialogContent |

### DialogContent

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | undefined | Additional CSS classes via cn() |
| children | ReactNode | required | Header, content, footer |

### DialogHeader

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | undefined | Additional CSS classes via cn() |
| children | ReactNode | required | Title + optional description |

### DialogTitle

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | undefined | Additional CSS classes via cn() |
| children | ReactNode | required | Title text |

### DialogDescription

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | undefined | Additional CSS classes via cn() |
| children | ReactNode | required | Description text |

### DialogFooter

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | undefined | Additional CSS classes via cn() |
| children | ReactNode | required | Action buttons (typically aligned right) |

## States

- **Closed**: Default state. Dialog is not rendered (removed from DOM).
- **Open**: Rendered with overlay and content. Content enters via `animate-slide-up`. Overlay fades in.
- **Loading (during submit)**: Submit button shows spinner and is disabled. Dialog should not auto-close.
- **Error**: Inline error messages within the form content. Server errors shown in DialogDescription or a dedicated alert area.
- **Validation**: Form fields show validation errors inline. Dialog stays open until valid or cancelled.

## Tailwind Classes (key selectors)

```css
/* Overlay */
fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm
data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0

/* Content */
fixed left-[50%] top-[50%] z-[200]
translate-x-[-50%] translate-y-[-50%]
bg-surface-container-low
rounded-md
shadow-ambient
animate-slide-up

/* DialogHeader */
flex flex-col gap-1.5

/* DialogTitle */
text-title-sm font-semibold

/* DialogDescription */
text-body-sm text-on-surface-variant

/* DialogFooter */
flex flex-col-reverse sm:flex-row sm:justify-end gap-2

/* Close button (X) - top right */
absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100
```

## AlertDialog (Destructive Confirmations)

For destructive actions, use `AlertDialog` instead of `Dialog`. Import:

```tsx
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
```

AlertDialog includes:
- **AlertDialogCancel**: Closes the dialog without action (typically `variant="secondary"`).
- **AlertDialogAction**: Confirms the destructive action (typically `variant="destructive"`).

## Usage Guidelines

### Do

- Use `Dialog` for forms, editing content, and non-destructive confirmations.
- Use `AlertDialog` for destructive confirmations (delete, remove, irreversible changes).
- Close the dialog on Escape key press (handled by Radix by default).
- Close the dialog when clicking outside (handled by Radix by default; disable with `onInteractOutside={(e) => e.preventDefault()}` if needed).
- Focus the first focusable element inside the dialog on open (handled by Radix by default).
- Return focus to the trigger element when dialog closes (handled by Radix by default).
- Use the appropriate width tier for the content complexity.

### Don't

- Don't nest dialogs -- use a multi-step form within one dialog instead.
- Don't open a dialog from another dialog.
- Don't put too much content in a dialog -- if scrolling is extensive, consider a page or drawer instead.
- Don't use `Dialog` for destructive actions -- use `AlertDialog`.
- Don't remove the backdrop overlay -- it provides essential visual context.
- Don't disable the close button (X) -- users should always have an escape hatch.
