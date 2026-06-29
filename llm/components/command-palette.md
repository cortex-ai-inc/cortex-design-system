# Command Palette

## Overview

Keyboard-driven command palette built on the `cmdk` library. The `Command` root is a plain
container (`bg-popover`, full-height flex column); `CommandDialog` wraps it inside a `Dialog`
overlay and renders its children directly inside a `Command`. Filtering is handled by
`CommandInput`, and `CommandItem` elements are organized inside `CommandGroup` sections.
Typically triggered by `Cmd+K` / `Ctrl+K`.

> Note: `CommandDialog` already renders a `Command` internally — pass `CommandInput` / `CommandList`
> as its children directly. Do **not** nest your own `<Command>` inside `<CommandDialog>`.

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

## Anatomy

| Part | Element | Notes |
|---|---|---|
| `Command` | `cmdk` root | `bg-popover text-popover-foreground`, `h-full w-full flex flex-col`, `rounded-md` |
| `CommandDialog` | `Dialog` + `Command` | Overlay wrapper; renders children inside an internal `Command` |
| `CommandInput` | wrapper `div` + `cmdk` Input | Wrapper `h-9 border-b px-3`; leading `SearchIcon` `size-4 opacity-50` |
| `CommandList` | `cmdk` List | `max-h-[300px]`, scrolls vertically |
| `CommandEmpty` | `cmdk` Empty | `py-6 text-center text-sm` |
| `CommandGroup` | `cmdk` Group | `p-1`; heading is `text-xs font-medium text-muted-foreground` |
| `CommandItem` | `cmdk` Item | `rounded-sm px-2 py-1.5 text-sm`; selected = `bg-accent` |
| `CommandShortcut` | `span` | Right-aligned (`ml-auto`) `text-xs tracking-widest text-muted-foreground` |
| `CommandSeparator` | `cmdk` Separator | `bg-border -mx-1 h-px` |

## Props

### CommandDialog

Extends `React.ComponentProps<typeof Dialog>` (so `open`, `onOpenChange`, `defaultOpen`, `modal`).

| Prop | Type | Default | Description |
|---|---|---|---|
| open | boolean | — | Controlled open state |
| onOpenChange | (open: boolean) => void | — | Open state change handler |
| defaultOpen | boolean | — | Initial open state (uncontrolled) |
| title | string | `"Command Palette"` | Visually-hidden (`sr-only`) `DialogTitle` for accessibility |
| description | string | `"Search for a command to run..."` | Visually-hidden `DialogDescription` |
| showCloseButton | boolean | true | Renders the Dialog close (×) button |
| className | string | — | Classes merged onto `DialogContent` |
| children | ReactNode | — | `CommandInput`, `CommandList`, etc. (rendered inside an internal `Command`) |

### Command (Root)

`React.ComponentProps<typeof CommandPrimitive>` (cmdk). Common props: `value`, `onValueChange`,
`filter`, `shouldFilter`, `loop`, `label`, `className`, `children`.

### CommandInput

`React.ComponentProps<typeof CommandPrimitive.Input>`.

| Prop | Type | Default | Description |
|---|---|---|---|
| placeholder | string | — | Input placeholder (no built-in default) |
| value | string | — | Controlled value |
| onValueChange | (value: string) => void | — | Change handler |
| className | string | — | Classes merged onto the input element |

### CommandList

`React.ComponentProps<typeof CommandPrimitive.List>` — `className`, `children`.

### CommandEmpty

`React.ComponentProps<typeof CommandPrimitive.Empty>`. No built-in default text — pass the message
as `children` (e.g. `No results found.`). Only renders when the filter produces zero matches.

### CommandGroup

`React.ComponentProps<typeof CommandPrimitive.Group>`.

| Prop | Type | Default | Description |
|---|---|---|---|
| heading | ReactNode | — | Group label rendered above items (`cmdk-group-heading`) |
| className | string | — | Additional classes |

### CommandItem

`React.ComponentProps<typeof CommandPrimitive.Item>`.

| Prop | Type | Default | Description |
|---|---|---|---|
| value | string | — | Value used for filtering / selection |
| onSelect | (value: string) => void | — | Selection callback |
| disabled | boolean | false | Disables the item (`data-[disabled=true]`) |
| className | string | — | Additional classes |
| children | ReactNode | — | Icon + label + optional `CommandShortcut` |

### CommandShortcut

`React.ComponentProps<"span">` — `className`, `children` (e.g. `⌘K`).

### CommandSeparator

`React.ComponentProps<typeof CommandPrimitive.Separator>` — `className`.

## States / Notes

- **Open state**: `CommandDialog` is a `Dialog` (overlay + centered content), **not** a Sheet — there
  is no `side="top"`. Control it with `open` / `onOpenChange`. `title` / `description` are rendered
  `sr-only` for screen readers.
- **Filtering**: `CommandInput` automatically filters `CommandItem` children by `value`. No manual
  filter logic needed (override via the root `filter` / `shouldFilter` props).
- **Keyboard navigation**: Arrow keys move between items, Enter selects, Escape closes.
- **Selected item**: highlighted via `data-[selected=true]:bg-accent` + `text-accent-foreground`
  (shadcn accent, not the blue brand accent). Disabled items get `opacity-50`.
- **Icons in items**: lucide-react icons default to `size-4` (`w-4 h-4`) via the item's
  `[&_svg:not([class*='size-'])]:size-4` rule; uncolored icons inherit `text-muted-foreground`.
  Inside `CommandDialog`, the dialog override bumps input + item icons to `h-5 w-5` and the input
  row to `h-12`.
- **Shortcuts**: `CommandShortcut` is a right-aligned `span` (`ml-auto text-xs tracking-widest
  text-muted-foreground`).

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
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Navigation">
        <CommandItem value="dashboard" onSelect={() => navigate("/dashboard")}>
          <LayoutDashboard className="w-4 h-4" strokeWidth={1.5} />
          <span>Dashboard</span>
        </CommandItem>
        <CommandItem value="tickets" onSelect={() => navigate("/tickets")}>
          <Ticket className="w-4 h-4" strokeWidth={1.5} />
          <span>Tickets</span>
          <CommandShortcut>⌘T</CommandShortcut>
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Actions">
        <CommandItem value="new-ticket" onSelect={() => navigate("/tickets/new")}>
          <Plus className="w-4 h-4" strokeWidth={1.5} />
          <span>Create ticket</span>
          <CommandShortcut>⌘N</CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
)
```

For an inline (non-dialog) palette, use `Command` directly as the root and place `CommandInput` /
`CommandList` inside it.

## Reference implementation

Core className strings, quoted verbatim from `command.tsx`.

`Command` root:

```tsx
"bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md"
```

`CommandInput` (wrapper `div` is `flex h-9 items-center gap-2 border-b px-3` with a leading
`<SearchIcon className="size-4 shrink-0 opacity-50" />`):

```tsx
"placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
```

`CommandList`:

```tsx
"max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto"
```

`CommandGroup`:

```tsx
"text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium"
```

`CommandItem`:

```tsx
"data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
```

`CommandShortcut`:

```tsx
"text-muted-foreground ml-auto text-xs tracking-widest"
```

`CommandSeparator`:

```tsx
"bg-border -mx-1 h-px"
```

`CommandDialog` content + the dialog-scoped overrides applied to the inner `Command`:

```tsx
<DialogContent className={cn("overflow-hidden p-0", className)} showCloseButton={showCloseButton}>
  <Command className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
```

## Usage Guidelines

### Do
- Register the `Cmd+K` / `Ctrl+K` keyboard shortcut globally (in the root layout or app shell).
- Pass `CommandInput` / `CommandList` directly as `CommandDialog` children (it wraps `Command` for you).
- Group related items under `CommandGroup` with descriptive `heading` labels.
- Use `CommandSeparator` between distinct groups for visual clarity.
- Provide `CommandShortcut` for items that have dedicated keyboard shortcuts.
- Keep item labels short (2-4 words).

### Don't
- Don't nest your own `<Command>` inside `<CommandDialog>` — it already renders one internally.
- Don't assume a Sheet/`side="top"` overlay — `CommandDialog` is a centered `Dialog`.
- Don't put more than ~20 items in the palette; users rely on search to filter.
- Don't use long descriptions in `CommandItem` — use the label only.
- Don't forget to handle `onSelect` navigation or action execution.
