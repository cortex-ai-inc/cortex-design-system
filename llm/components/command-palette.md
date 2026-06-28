# Command Palette

## Overview

Keyboard-driven command palette built on the `cmdk` library. Provides a `CommandDialog` wrapper (which uses the Dialog/Sheet component for overlay), a `CommandInput` for search filtering, and `CommandItem` elements organized inside `CommandGroup` sections. Typically triggered by `Cmd+K` / `Ctrl+K`.

## Import

```tsx
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "@/components/ui/command"
```

## Props

### CommandDialog

| Prop | Type | Default | Description |
|---|---|---|---|
| open | boolean | — | Controlled open state |
| onOpenChange | (open: boolean) => void | — | Open state change handler |
| children | ReactNode | — | Command component children |
| defaultOpen | boolean | false | Initial open state |

### Command (Root)

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | — | Additional classes |
| children | ReactNode | — | Command tree |
| label | string | `"Command palette"` | ARIA label for the composite |

### CommandInput

| Prop | Type | Default | Description |
|---|---|---|---|
| placeholder | string | `"Type a command or search..."` | Input placeholder |
| className | string | — | Additional classes |
| value | string | — | Controlled value |
| onValueChange | (value: string) => void | — | Change handler |

### CommandList

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | — | Additional classes |
| children | ReactNode | — | CommandGroup, CommandEmpty, CommandItem children |

### CommandEmpty

| Prop | Type | Default | Description |
|---|---|---|---|
| children | ReactNode | `"No results found."` | Empty state message |

### CommandGroup

| Prop | Type | Default | Description |
|---|---|---|---|
| heading | string | — | Group label displayed above items |
| className | string | — | Additional classes |
| children | ReactNode | — | CommandItem children |

### CommandItem

| Prop | Type | Default | Description |
|---|---|---|---|
| value | string | — | Value used for filtering |
| onSelect | (value: string) => void | — | Selection callback |
| disabled | boolean | false | Disable the item |
| className | string | — | Additional classes |
| children | ReactNode | — | Icon + label + shortcut content |

### CommandShortcut

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | — | Additional classes |
| children | ReactNode | — | Keyboard shortcut text (e.g. `⌘K`) |

### CommandSeparator

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | — | Additional classes |

## States / Notes

- **Open state**: `CommandDialog` wraps a Sheet (`side="top"` with full-width content). It must be controlled via `open` / `onOpenChange`.
- **Filtering**: `CommandInput` automatically filters `CommandItem` children by their `value` prop. No manual filter logic needed.
- **Keyboard navigation**: Arrow keys navigate items, Enter selects, Escape closes.
- **Empty state**: `CommandEmpty` renders when the filter produces no matches. Default message is "No results found."
- **Icons in items**: Use lucide-react icons at `w-4 h-4 strokeWidth={1.5}`, placed before the label text.
- **Shortcuts**: `CommandShortcut` renders as a small kbd element on the right side of `CommandItem`.

### Example

```tsx
const [open, setOpen] = useState(false)

// Toggle on Cmd+K
useEffect(() => {
  const down = (e: KeyboardEvent) => {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      setOpen((prev) => !prev)
    }
  }
  document.addEventListener("keydown", down)
  return () => document.removeEventListener("keydown", down)
}, [])

return (
  <CommandDialog open={open} onOpenChange={setOpen}>
    <Command>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem value="dashboard" onSelect={() => navigate("/dashboard")}>
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem value="tickets" onSelect={() => navigate("/tickets")}>
            <Ticket className="w-4 h-4" />
            <span>Tickets</span>
            <CommandShortcut>⌘T</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem value="new-ticket" onSelect={() => navigate("/tickets/new")}>
            <Plus className="w-4 h-4" />
            <span>Create ticket</span>
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  </CommandDialog>
)
```

## Usage Guidelines

### Do
- Register the `Cmd+K` / `Ctrl+K` keyboard shortcut globally (in the root layout or app shell).
- Group related items under `CommandGroup` with descriptive `heading` labels.
- Use `CommandSeparator` between distinct groups for visual clarity.
- Provide `CommandShortcut` for items that have dedicated keyboard shortcuts.
- Keep item labels short (2-4 words).

### Don't
- Don't render `CommandDialog` outside of the app root — keyboard focus trapping requires a stable DOM parent.
- Don't put more than 20 items in the palette; users rely on search to filter.
- Don't use long descriptions in CommandItem — use the label only.
- Don't forget to handle `onSelect` navigation or action execution.
