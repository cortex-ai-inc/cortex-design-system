# Popover

> Status: new component — no product source yet. This spec is the canonical target for generation.

## Overview

Floating contextual panel anchored to a trigger element, built on the Radix UI `Popover` primitive. Popover is a **foundation primitive**: the upcoming Combobox and DatePicker components render their listbox/calendar inside a `PopoverContent`. Use it for non-modal contextual panels — filter controls, quick settings, inline pickers — where the surrounding page stays interactive.

**Import path**: `@/components/ui/popover`

**Dependencies**: `@radix-ui/react-popover`

## Import

```tsx
import {
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover"
```

## Sub-components

| Component | Source | Purpose |
|---|---|---|
| `Popover` | `PopoverPrimitive.Root` (re-export) | Root context provider; manages open state |
| `PopoverTrigger` | `PopoverPrimitive.Trigger` (re-export) | The element that toggles the panel (renders its child via `asChild`) |
| `PopoverAnchor` | `PopoverPrimitive.Anchor` (re-export) | Optional custom anchor when the panel should position against something other than the trigger |
| `PopoverContent` | `forwardRef` wrapper | Portal-rendered floating panel (the only styled part) |

## Variants

None. `PopoverContent` is a single styled surface with a `w-72 p-4` default. For composed content that manages its own padding (Combobox command list, DatePicker calendar grid), override with `className="w-auto p-0"` — the `p-0` override is the expected pattern, not a hack.

## Props

### Popover (Root)

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | `undefined` | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Uncontrolled initial state |
| `onOpenChange` | `(open: boolean) => void` | `undefined` | Open-state change handler |
| `modal` | `boolean` | `false` | When `true`, traps focus and blocks outside interaction. Keep `false` — Cortex popovers are non-modal panels |

### PopoverContent

| Prop | Type | Default | Description |
|---|---|---|---|
| `align` | `"start" \| "center" \| "end"` | `"center"` | Alignment against the trigger/anchor |
| `sideOffset` | `number` | `4` | Gap in px between trigger and panel |
| `className` | `string` | `undefined` | Additional classes merged via `cn()` |

`side` (`"top" | "right" | "bottom" | "left"`, default `"bottom"`) and the other Radix positioning props pass through untouched.

## Styling

| Part | CSS Classes | Description |
|---|---|---|
| Content | `z-50 w-72 rounded-md border border-on-surface-variant/10 bg-surface-container-low p-4 shadow-overlay animate-fade-in outline-none` | Floating panel on the `surface-container-low` surface, hairline `on-surface-variant/10` border, `rounded-md` (6px), `shadow-overlay` elevation, 200ms fade-in |

> Z-index: the source string says `z-50` (stock shadcn); the canonical Cortex layer for dropdowns/tooltips/popovers is `z-[100]`. Normalize to `z-[100]` when generating.

> `shadow-overlay` (`0 8px 24px rgba(0,0,0,0.40)`) is the elevation token for small floating panels (selects, dropdowns, tooltips, popovers); dialogs keep `shadow-ambient`.

## States

- **Closed**: nothing rendered (content is portal-mounted on open).
- **Open**: panel fades in with `animate-fade-in` (200ms = `--motion-base`, ease-out), offset `sideOffset={4}` from the trigger.
- **Focus**: opening moves focus into the panel; `Esc` closes and returns focus to the trigger; clicking outside closes (non-modal, page stays interactive). The panel itself is `outline-none` — interactive children inside carry their own focus rings.
- **Disabled**: no built-in disabled state; disable the trigger element instead.

## Reference implementation

`PopoverContent` canonical className (verbatim target):

```
z-50 w-72 rounded-md border border-on-surface-variant/10 bg-surface-container-low p-4 shadow-overlay animate-fade-in outline-none
```

```tsx
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border border-on-surface-variant/10 bg-surface-container-low p-4 shadow-overlay animate-fade-in outline-none",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
```

## Usage patterns

Filter panel (typical non-modal contextual panel):

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">
      <ListFilter className="w-4 h-4" strokeWidth={1.5} />
      Filters
    </Button>
  </PopoverTrigger>
  <PopoverContent align="start" className="w-80">
    <div className="flex flex-col gap-4">
      <p className="text-label-sm uppercase text-on-surface-variant">Filter results</p>
      <div className="flex items-center gap-2">
        <Checkbox id="f-open" />
        <Label htmlFor="f-open">Open tickets only</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="f-mine" />
        <Label htmlFor="f-mine">Assigned to me</Label>
      </div>
    </div>
  </PopoverContent>
</Popover>
```

Width-matching the trigger (Combobox pattern — panel exactly as wide as its trigger):

```tsx
<PopoverContent className="w-[--radix-popover-trigger-width] p-0">
  {/* Command list, option list, ... */}
</PopoverContent>
```

## Usage Guidelines

### Do

- Use Popover for non-modal contextual panels: filters, quick settings, inline pickers.
- Keep `modal={false}` (the default) so the page remains interactive.
- Override to `w-auto p-0` when composing content that manages its own padding (Combobox, DatePicker).
- Use `align="start"` for panels attached to left-aligned toolbar buttons.
- Keep the trigger a real focusable element (`asChild` with a Button).

### Don't

- Do NOT use Popover for action menus — use DropdownMenu (roving focus, typeahead, menu semantics).
- Do NOT put create/edit forms in a Popover — forms get dedicated pages (system rule: no modals/popovers for forms).
- Do NOT use Popover for confirmations — use AlertDialog.
- Do NOT use it for hover-only hints — use Tooltip.
- Do NOT stack popovers inside popovers.

## Related

- `dropdown-menu.md` — menus vs panels: DropdownMenu is for lists of actions; Popover is for free-form panel content
- `tooltip.md` — hover-reveal text; same `shadow-overlay` + z-[100] float layer
- `combobox.md` (upcoming) — composes Popover + Command
- `date-picker.md` (upcoming) — composes Popover + Calendar
