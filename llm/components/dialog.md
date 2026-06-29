# Dialog

## Overview

Modal overlay for focused user interactions that require attention before continuing. Built on Radix UI Dialog (`@radix-ui/react-dialog`).

For destructive confirmations requiring explicit acknowledgment, use the separate **AlertDialog** component (`@/components/ui/alert-dialog`).

**Import path**: `@/components/ui/dialog`

**Dependencies**: `@radix-ui/react-dialog`, `lucide-react` (close `X` icon). No `class-variance-authority` — this component has no CVA variants.

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
  DialogPortal,
  DialogOverlay,
} from "@/components/ui/dialog"
```

## Sub-Components

| Component | Role |
|---|---|
| Dialog | Root wrapper managing open/close state (`DialogPrimitive.Root`) |
| DialogTrigger | Element that opens the dialog |
| DialogContent | The dialog panel — renders `DialogPortal` + `DialogOverlay` + content, plus the built-in close button |
| DialogHeader | Top section grouping title and description |
| DialogTitle | Heading inside the dialog |
| DialogDescription | Optional description or instructions |
| DialogFooter | Bottom action area (typically buttons) |
| DialogClose | Element that closes the dialog (used for footer Cancel buttons) |
| DialogOverlay | Backdrop layer (rendered automatically by DialogContent) |
| DialogPortal | Portal target (rendered automatically by DialogContent) |

## Anatomy & Sizing

`DialogContent` renders its own `DialogOverlay` and a built-in close button (the `X` top-right). You only compose the inner pieces:

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button variant="secondary">Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Optional supporting text.</DialogDescription>
    </DialogHeader>
    {/* body */}
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="ghost">Cancel</Button>
      </DialogClose>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Width

The base content width is `w-full max-w-[calc(100%-2rem)] sm:max-w-lg` (≈512px). There are **no** built-in size variants — wider/narrower tiers are achieved by overriding `max-w-*` on `DialogContent`:

| Tier | className override | Use Case |
|---|---|---|
| Confirmations | `sm:max-w-[440px]` | Simple confirmations, short alerts |
| Forms (default-ish) | `sm:max-w-lg` (≈512px) / `sm:max-w-[560px]` | Form dialogs, medium content |
| Complex | `sm:max-w-[720px]` | Multi-column forms, rich content |

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
| showCloseButton | boolean | `true` | Renders the top-right `X` close button. Pass `false` to hide it |
| className | string | undefined | Additional CSS classes via `cn()` (use for width overrides) |
| children | ReactNode | required | Header, body, footer |

> Note: `showCloseButton` exists in cortex-coder-front. The cortex-support-front build always renders the close button (no prop).

`DialogHeader`, `DialogTitle`, `DialogDescription`, and `DialogFooter` each accept `className` and `children`.

## States

- **Closed**: Not rendered (removed from DOM via portal unmount).
- **Open**: Overlay fades in; content animates in. Radix manages focus trap, Escape-to-close, and click-outside-to-close.
- **Loading (during submit)**: Keep the dialog open; show a spinner and disable the submit button.
- **Error / Validation**: Show messages inline within the body; keep the dialog open until valid or cancelled.

## Reference implementation

Overlay (cortex-coder-front, primary source):

```
data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm
```

Content (cortex-coder-front, primary source):

```
bg-surface-container-low data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom-2 data-[state=open]:slide-in-from-bottom-2 fixed top-[50%] left-[50%] z-[200] grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-md border border-on-surface-variant/15 p-6 shadow-ambient duration-200 outline-none sm:max-w-lg
```

Built-in close button (cortex-coder-front):

```
text-on-surface-variant hover:text-on-surface ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4
```

Header / Footer / Title / Description (cortex-coder-front):

```
/* DialogHeader  */ flex flex-col gap-1.5 text-left
/* DialogFooter  */ flex flex-col-reverse gap-2 sm:flex-row sm:justify-end
/* DialogTitle   */ text-title-sm text-on-surface
/* DialogDescription */ text-body-sm text-on-surface-variant
```

> cortex-support-front variation: content uses `animate-slide-up` / overlay `animate-fade-in` (200ms) and zero content padding (`p-0`), with padding pushed into the parts — `DialogHeader` = `flex flex-col space-y-1.5 p-5 pb-0`, `DialogFooter` = `flex flex-row justify-end gap-2 p-3 pt-0`, `DialogTitle` adds `font-semibold`, close button uses `rounded-sm` with an explicit `h-4 w-4` icon. Functionally equivalent; follow cortex-coder-front for new work.

## Tokens used

| Element | Token / class |
|---|---|
| Overlay | `bg-black/60`, `backdrop-blur-sm`, `z-[200]` |
| Content surface | `bg-surface-container-low` |
| Content border | `border border-on-surface-variant/15` |
| Content radius | `rounded-md` (6px) |
| Content elevation | `shadow-ambient` |
| Content z-index | `z-[200]` |
| Title text | `text-title-sm text-on-surface` (16px / 600) |
| Description text | `text-body-sm text-on-surface-variant` (13px) |
| Close icon | lucide `X`, `size-4` (`w-4 h-4`) |

## Usage Guidelines

### Do

- Use `Dialog` for confirmations and short, focused interactions.
- Use `AlertDialog` (separate component) for destructive confirmations (delete, irreversible changes).
- Let Radix handle Escape-to-close, click-outside-to-close, focus trap, and return-focus (all default behavior).
- Disable click-outside with `onInteractOutside={(e) => e.preventDefault()}` only when data loss is a risk.
- Override `max-w-*` on `DialogContent` to match content complexity.

### Don't

- Don't use modals for create/edit forms — Cortex uses dedicated pages for those. Reserve dialogs for confirmations and small interactions.
- Don't nest dialogs or open a dialog from another dialog.
- Don't pack extensive scrolling content into a dialog — use a page or `Sheet`/`Drawer` instead.
- Don't remove the backdrop overlay — it provides essential visual context.
- Don't hide the close button unless an explicit footer action always remains as an escape hatch (`showCloseButton={false}`).
