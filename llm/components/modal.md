# Modal

## Overview

Two distinct modal primitives: **Sheet** (Radix Dialog-based slide-in panels) and **Drawer** (vaul-based mobile bottom sheets with drag-to-dismiss). Sheets are used for settings panels, detail sidebars, and filters. Drawers are used for mobile-friendly bottom actions.

## Import

```tsx
// Sheet (side panels)
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"

// Drawer (mobile bottom sheet)
import {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer"
```

## Props

### Sheet (Root)

| Prop | Type | Default | Description |
|---|---|---|---|
| open | boolean | — | Controlled open state |
| onOpenChange | (open: boolean) => void | — | Open state change handler |
| defaultOpen | boolean | false | Initial open state |
| modal | boolean | true | Whether to block interaction with rest of page |

### SheetContent

| Prop | Type | Default | Description |
|---|---|---|---|
| side | `"top" | "right" | "bottom" | "left"` | `"right"` | Which side the panel slides from |
| className | string | — | Additional classes |
| children | ReactNode | — | Content |
| onInteractOutside | (event) => void | — | Interact-outside handler |
| onEscapeKeyDown | (event) => void | — | Escape key handler |

### Drawer (Root)

| Prop | Type | Default | Description |
|---|---|---|---|
| open | boolean | — | Controlled open state |
| onOpenChange | (open: boolean) => void | — | Open state change handler |
| defaultOpen | boolean | false | Initial open state |
| shouldScaleBackground | boolean | true | Scale the background on drag |
| snapPoints | (string \| number)[] | — | Snap points array (e.g. `["148px", 0.5]`) |

### DrawerContent

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | — | Additional classes |
| children | ReactNode | — | Content |

## Sheet Side Variants

| Side | CSS Classes | Content Width | Use Case |
|---|---|---|---|
| right (default) | `inset-y-0 right-0 h-full border-l` | 3/4 width, `sm:max-w-sm` | Settings, details, filters |
| left | `inset-y-0 left-0 h-full border-r` | 3/4 width, `sm:max-w-sm` | Mobile sidebar, navigation |
| top | `inset-x-0 top-0 border-b` | Full width, `h-1/2` | Search panels, notifications |
| bottom | `inset-x-0 bottom-0 border-t` | Full width, `h-1/2` | Action sheets, pickers |

## Styles

| Element | CSS Classes |
|---|---|
| Overlay | `bg-black/50 fixed inset-0 z-50` |
| Sheet Content | `bg-background shadow-lg fixed z-50 gap-4 p-6` |
| Drawer Overlay | `bg-black/50 fixed inset-0 z-50` |
| Drawer Handle | `mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted` |
| Sheet/Drawer Header | `flex flex-col gap-1 text-center sm:text-left` |
| Sheet/Drawer Footer | `flex flex-col-reverse sm:flex-row sm:justify-end gap-2` |

## States / Notes

- **Sheet overlay**: Always renders `bg-black/50` for focus trapping.
- **Drawer handle**: A small rounded pill at the top of DrawerContent for visual drag affordance.
- **Z-index**: Both Sheet and Drawer render at `z-50`.
- **Close behavior**: Escape key closes both; clicking overlay closes both.
- **Scroll lock**: Body scroll is locked when either is open.
- **Mobile preference**: Use Drawer on mobile viewports, Sheet on desktop. Alternatively, use Drawer universally for bottom-sheet patterns.

### Sheet Example

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open filters</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Filters</SheetTitle>
      <SheetDescription>
        Narrow down the ticket list.
      </SheetDescription>
    </SheetHeader>
    {/* Filter controls */}
    <SheetFooter>
      <SheetClose asChild>
        <Button variant="outline">Cancel</Button>
      </SheetClose>
      <Button>Apply</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

### Drawer Example

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">More actions</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Actions</DrawerTitle>
      <DrawerDescription>Choose an action for this item.</DrawerDescription>
    </DrawerHeader>
    <div className="p-4 space-y-2">
      <Button variant="ghost" className="w-full justify-start">Edit</Button>
      <Button variant="ghost" className="w-full justify-start">Delete</Button>
    </div>
    <DrawerFooter>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

## Usage Guidelines

### Do
- Use Sheet for side panels that contain forms, detail views, or filters.
- Use Drawer for mobile-first bottom actions and confirmations.
- Always provide a SheetTitle and SheetDescription for accessibility.
- Use `asChild` on SheetTrigger / DrawerTrigger when wrapping custom button components.

### Don't
- Don't use Sheet for critical actions that require full-screen context (use dedicated route pages instead).
- Don't stack multiple Sheets — close one before opening another.
- Don't use Drawer on desktop viewports unless the pattern calls for a bottom sheet.
- Don't render long forms inside a Sheet — prefer a full page with `?mode=edit`.
