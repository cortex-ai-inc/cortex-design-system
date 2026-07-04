# Combobox

> Status: new component — no product source yet. This spec is the canonical target for generation.

## Overview

Searchable select built **by composition**: a `cmdk` `Command` list rendered inside a Radix `Popover`, opened from a Button that is styled as a form field. Combobox is a **recipe, not a new primitive** — it composes the existing Popover and Command components (optionally wrapped in a local convenience component). The trigger copies the Select trigger tokens verbatim (`h-9`, `ghost-border-20`, `bg-surface-dim`, 2px focus ring) so a Combobox sits flush next to Inputs and Selects in the same form grid.

Two modes are specified here:

- **Combobox (single)** — one value; the popover closes on selection; the selected item shows a trailing blue `Check`.
- **MultiSelect** — multiple values; the trigger grows to hold Badge chips; items toggle without closing the popover.

## Import

```tsx
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, ChevronsUpDown, X } from "lucide-react"
```

## Anatomy

```
Popover                                       — open state + positioning (Radix Popover)
├─ PopoverTrigger asChild
│   └─ Button role="combobox" aria-expanded   — styled as a form field (Select trigger tokens)
│       ├─ value text | placeholder           — placeholder: text-on-surface-variant/50
│       └─ ChevronsUpDown                     — h-4 w-4 shrink-0 opacity-50
└─ PopoverContent                             — w-[--radix-popover-trigger-width] p-0
    └─ Command                                — cmdk root (filtering, keyboard nav)
        ├─ CommandInput                       — search field, h-9 row with leading Search icon
        └─ CommandList
            ├─ CommandEmpty                   — "No results found."
            └─ CommandGroup
                └─ CommandItem + Check        — trailing check on the selected item
```

There is no `combobox.tsx` primitive to generate — only this composition (plus an optional convenience wrapper, below). The popover panel itself follows the shared floating-panel recipe documented in `popover.md`.

## Props (composition points)

### Trigger (`Button` inside `PopoverTrigger asChild`)

| Prop | Type | Default | Description |
|---|---|---|---|
| `role` | `"combobox"` | required | ARIA role for the pattern |
| `aria-expanded` | `boolean` | required | Mirror of the Popover `open` state |
| `variant` | `"outline"` | `"outline"` | Fully restyled by the field className below |
| `disabled` | `boolean` | `false` | Disables the field (`opacity-50`, no pointer) |
| `className` | `string` | — | Must include the canonical field tokens (see Styling) |

### PopoverContent

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | `"w-[--radix-popover-trigger-width] p-0"` | Panel matches trigger width; `p-0` lets Command own its padding |
| `align` | `"start" \| "center" \| "end"` | `"start"` | Align panel with the field edge |

### CommandItem

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | Filter/selection value (cmdk matches against it) |
| `onSelect` | `(value: string) => void` | — | Set value; close popover (single) or toggle (multi) |
| `disabled` | `boolean` | `false` | `data-[disabled=true]:opacity-50`, no pointer events |

### Convenience wrapper (optional)

If a product wraps the recipe as `<Combobox />`, use this prop surface:

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `{ value: string; label: string; disabled?: boolean }[]` | required | Option list |
| `value` | `string \| string[]` | — | Controlled value; `string[]` in multiple mode |
| `onValueChange` | `(value: string \| string[]) => void` | — | Change handler |
| `multiple` | `boolean` | `false` | Enables MultiSelect behavior (chips, no close on select) |
| `placeholder` | `string` | `"Select..."` | Trigger text when empty |
| `searchPlaceholder` | `string` | `"Search..."` | CommandInput placeholder |
| `emptyText` | `string` | `"No results found."` | CommandEmpty content |
| `loading` | `boolean` | `false` | Replaces the list with the spinner row |
| `disabled` | `boolean` | `false` | Disables the trigger |

## Styling

| Part | CSS Classes | Description |
|---|---|---|
| Trigger | `flex h-9 w-full items-center justify-between rounded-sm border ghost-border-20 bg-surface-dim px-3 py-2 text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-k-primary-container/50 disabled:cursor-not-allowed disabled:opacity-50` | Identical to the Select trigger (`h-9` form-control height); overrides Button variant styling |
| Trigger icon | `ChevronsUpDown` — `h-4 w-4 shrink-0 opacity-50` | Signals "searchable" (Select keeps the single `ChevronDown`) |
| Placeholder | `text-on-surface-variant/50` | Applied to the value span when no selection |
| Content | `w-[--radix-popover-trigger-width] p-0` on the shared panel recipe: `bg-surface-container-low border border-on-surface-variant/10 rounded-md shadow-overlay animate-fade-in` | Panel width tracks the trigger; canonical layer `z-[100]` (stock shadcn strings say `z-50`) |
| Item (highlighted) | `data-[selected=true]:bg-surface-container-high` | cmdk pointer/keyboard highlight — same fill as Select item focus |
| Item check | `Check` — `ml-auto h-4 w-4 text-k-primary-container` | Trailing blue check on the selected item; render `opacity-0` when unselected to keep row width stable |

> Selection is indicated by the trailing check, not a filled row — the `bg-k-primary-container` + dark-text treatment is reserved for the highlighted/active surfaces of controls like Calendar days and Checkbox, not for list rows that must remain scannable.

## MultiSelect variant

Differences from the single-select recipe:

| Part | CSS Classes | Description |
|---|---|---|
| Trigger | `min-h-9 h-auto flex-wrap gap-1 py-1.5` (replacing `h-9`) | Field grows vertically as chips wrap |
| Selection chips | Badge `default`: `bg-surface-container-high text-on-surface-variant rounded-sm` + `[&_svg]:size-3` | One chip per selected value with a trailing `X` icon (12px) that removes it |
| Overflow chip | Same Badge tokens, label `+N more` | Cap visible chips (e.g. 3); collapse the rest |
| Items | Toggle on select — popover **stays open** | Set cmdk item `onSelect` to toggle the value without calling `setOpen(false)` |
| Item check | Same trailing `Check text-k-primary-container` | Shown on every currently-selected item |

Chip removal (`X`) must call `stopPropagation` so it does not reopen/close the popover.

## States

- **Closed/default**: Trigger shows the selected label (or placeholder in `text-on-surface-variant/50`) + `ChevronsUpDown`.
- **Open**: Panel fades in (`animate-fade-in`, 200ms ease-out) at the trigger width; `CommandInput` receives focus automatically.
- **Focus (trigger)**: `focus:ring-2 focus:ring-k-primary-container/50`, no offset — form-field ring.
- **Disabled (trigger)**: `disabled:opacity-50 disabled:cursor-not-allowed`.
- **Item highlighted**: `data-[selected=true]:bg-surface-container-high` (cmdk "selected" = highlighted, not chosen).
- **Item selected (chosen)**: trailing `Check` in `text-k-primary-container`.
- **Loading (async)**: replace the list with a spinner row — `py-6 text-center`, `Spinner` size `sm` + "Searching…" in `text-body-sm text-on-surface-variant`.
- **Empty**: `CommandEmpty` renders "No results found." (`py-6 text-center text-body-sm text-on-surface-variant`).
- **Error**: no red border variant on the trigger — surface validation through the Form compound (`FormMessage` below the field), same as Input/Select.

## Reference implementation

Single-select recipe (canonical):

```tsx
const [open, setOpen] = useState(false)
const [value, setValue] = useState("")

<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      role="combobox"
      aria-expanded={open}
      className="flex h-9 w-full items-center justify-between rounded-sm border ghost-border-20 bg-surface-dim px-3 py-2 text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-k-primary-container/50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {value ? (
        options.find((o) => o.value === value)?.label
      ) : (
        <span className="text-on-surface-variant/50">Select assignee...</span>
      )}
      <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" strokeWidth={1.5} />
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
    <Command>
      <CommandInput placeholder="Search assignee..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {options.map((option) => (
            <CommandItem
              key={option.value}
              value={option.value}
              onSelect={(next) => {
                setValue(next === value ? "" : next)
                setOpen(false)
              }}
              className="data-[selected=true]:bg-surface-container-high"
            >
              {option.label}
              <Check
                strokeWidth={1.5}
                className={cn(
                  "ml-auto h-4 w-4 text-k-primary-container",
                  value === option.value ? "opacity-100" : "opacity-0"
                )}
              />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  </PopoverContent>
</Popover>
```

MultiSelect trigger content (replaces the value span; trigger className swaps `h-9` for `min-h-9 h-auto flex-wrap gap-1 py-1.5`):

```tsx
<div className="flex flex-wrap gap-1">
  {selected.slice(0, 3).map((v) => (
    <Badge key={v} className="bg-surface-container-high text-on-surface-variant rounded-sm gap-1 [&_svg]:size-3">
      {labelOf(v)}
      <X
        strokeWidth={1.5}
        onClick={(e) => {
          e.stopPropagation()
          toggle(v)
        }}
      />
    </Badge>
  ))}
  {selected.length > 3 && (
    <Badge className="bg-surface-container-high text-on-surface-variant rounded-sm">
      +{selected.length - 3} more
    </Badge>
  )}
</div>
```

In multiple mode, `CommandItem.onSelect` calls `toggle(value)` and does **not** call `setOpen(false)`.

Async loading row (replaces `CommandList` content while fetching):

```tsx
<div className="py-6 text-center">
  <Spinner size="sm" className="mx-auto" />
  <p className="mt-2 text-body-sm text-on-surface-variant">Searching…</p>
</div>
```

## Usage Guidelines

### Do

- Use a Combobox when the option list is **searchable and larger than ~7 entries** (users, projects, tags).
- Use it for **async lookups** — debounce the `CommandInput` value and show the spinner row while fetching.
- Use **MultiSelect** for multi-tag pickers (labels, watchers, categories) with Badge chips in the trigger.
- Keep the trigger at `h-9` (`min-h-9` in multiple mode) so it aligns with sibling Inputs and Selects.
- Set `PopoverContent` to `w-[--radix-popover-trigger-width] p-0` so the panel always matches the field width.
- Keep the popover open while toggling items in multiple mode.

### Don't

- Do NOT use a Combobox for **fewer than ~7 static options** — use Select (no search needed).
- Do NOT use it for global actions or navigation — that is the CommandDialog (`Cmd+K` palette).
- Do NOT build a new primitive — compose Popover + Command; at most add the convenience wrapper.
- Do NOT indicate selection by filling the row blue — use the trailing `Check` in `text-k-primary-container`.
- Do NOT close the popover on select in multiple mode, and do NOT let the chip `X` toggle the popover (stop propagation).
- Do NOT add a red error border to the trigger — errors surface via `FormMessage`.

## Related

- `select.md` — the trigger tokens are copied verbatim from SelectTrigger (`h-9` form control)
- `command-palette.md` — cmdk conventions (`CommandInput`, `CommandList`, `CommandEmpty`, highlight state)
- `popover.md` — shared floating-panel recipe (`bg-surface-container-low`, `shadow-overlay`, `z-[100]`)
- `badge.md` — chip tokens used by the MultiSelect trigger
