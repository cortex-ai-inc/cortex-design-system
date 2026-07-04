# Kbd

> Status: new component — no product source yet. This spec is the canonical target for generation.

## Overview

Small chip that renders a keyboard key using the native `<kbd>` element. Non-interactive like Badge — it displays a physical key, it never receives clicks or focus. No library dependency.

**Import path**: `@/components/ui/kbd`

**Dependencies**: none

## Import

```tsx
import { Kbd, KbdGroup } from "@/components/ui/kbd"
```

## Sub-components

| Component | Element | Description |
|---|---|---|
| `Kbd` | `kbd` | Single key chip — mono 11px on `surface-container-high`, ghost border, `h-5` |
| `KbdGroup` | `span` | Inline row for key combinations, with an optional `+` separator span |

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | `undefined` | Additional classes merged via `cn()` |
| `children` | `ReactNode` | required | Key label (`Esc`, `⌘`, `K`, `↵`, ...) |

Both sub-components take only `className`/`children` plus native element props.

## Reference implementation

`Kbd` canonical className (verbatim target):

```
inline-flex h-5 min-w-5 items-center justify-center gap-1 rounded-sm border ghost-border bg-surface-container-high px-1.5 font-mono text-[11px] font-medium text-on-surface-variant select-none
```

`KbdGroup` canonical className:

```
inline-flex items-center gap-1
```

Optional separator between keys inside a group:

```tsx
<span className="text-on-surface-variant/50">+</span>
```

## States

None. Kbd is a passive label — no hover, focus, active, or disabled states (same stance as Badge).

## Usage

```tsx
// Single keys
<Kbd>Esc</Kbd>  <Kbd>↵</Kbd>  <Kbd>⌘</Kbd>  <Kbd>↑</Kbd>

// Combos
<KbdGroup>
  <Kbd>⌘</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>

<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <span className="text-on-surface-variant/50">+</span>
  <Kbd>Shift</Kbd>
  <span className="text-on-surface-variant/50">+</span>
  <Kbd>P</Kbd>
</KbdGroup>

// Inside an input suffix (InputGroup already styles [&>kbd])
<InputGroup>
  <InputGroupInput placeholder="Search..." />
  <InputGroupAddon align="inline-end">
    <Kbd>⌘K</Kbd>
  </InputGroupAddon>
</InputGroup>

// Next to a menu item shortcut
<DropdownMenuItem>
  Save
  <KbdGroup className="ml-auto">
    <Kbd>⌘</Kbd>
    <Kbd>S</Kbd>
  </KbdGroup>
</DropdownMenuItem>
```

## Usage Guidelines

### Do

- Use Kbd only for physical keyboard keys and key combinations.
- Use `KbdGroup` for combos; keep the `+` separator at `text-on-surface-variant/50`.
- Use standard glyphs for modifiers: `⌘` `⇧` `⌥` `Ctrl` `Alt`, and `↵` `↑` `↓` `←` `→` `Esc` `Tab`.
- Keep key labels to the key cap text — one key per chip.

### Don't

- Do NOT make Kbd clickable — use a Button if the shortcut should be triggerable.
- Do NOT use Kbd for arbitrary emphasis or generic tags — use Badge or `<code>`.
- Do NOT restyle per context — the chip is fixed at mono 11px, `h-5`, `rounded-sm`.

## Related

- `input-group.md` — `InputGroupAddon` already styles bare `[&>kbd]` children (radius normalization)
- `command-palette.md` — `CommandShortcut` renders textual shortcuts inside Command items (`ml-auto text-xs tracking-widest`); use Kbd when you want the chip treatment
