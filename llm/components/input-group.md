# InputGroup

## Overview

Custom compound component for grouping an input (or textarea) with addons and action buttons. Addons can be aligned inline (start/end) or stacked block-wise (top/bottom), and the whole group renders as a single bordered control with one shared focus ring. Used for search bars with icons, fields with inline actions (copy, clear, generate), prefix/suffix labels, and textareas with toolbar rows.

## Import

```tsx
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group"
```

## Sub-components

| Component | Element | Description |
|---|---|---|
| `InputGroup` | `div[role=group]` | Root flex container; draws the border, focus ring, and error state |
| `InputGroupAddon` | `div[role=group]` | Slot for icons/text/buttons positioned by `align`; clicking it focuses the input |
| `InputGroupButton` | `Button` | Action button sized to fit inside the group (defaults to ghost) |
| `InputGroupText` | `span` | Inline muted text/icon label (no addon positioning) |
| `InputGroupInput` | `Input` | Borderless input that fills remaining space |
| `InputGroupTextarea` | `Textarea` | Borderless, non-resizable textarea variant |

## Props

### InputGroup

Extends `React.ComponentProps<"div">`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | `undefined` | Additional classes |
| `children` | `React.ReactNode` | required | Addon / Input / Textarea / Button children |

### InputGroupAddon

Extends `React.ComponentProps<"div">` + `VariantProps`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `align` | `"inline-start" \| "inline-end" \| "block-start" \| "block-end"` | `"inline-start"` | Addon position; written to `data-align` |
| `className` | `string` | `undefined` | Additional classes |
| `children` | `React.ReactNode` | required | Content (text, icon, button) |

### InputGroupButton

Extends `Omit<React.ComponentProps<typeof Button>, "size">` + `VariantProps`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `"xs" \| "sm" \| "icon-xs" \| "icon-sm"` | `"xs"` | Group-specific button size |
| `variant` | Button variants | `"ghost"` | Underlying Button variant |
| `type` | `string` | `"button"` | Defaults to `button` (won't submit forms) |
| `className` | `string` | `undefined` | Additional classes |
| ... | Button props | | All other Button props pass through |

### InputGroupInput / InputGroupTextarea

Extend `React.ComponentProps<"input">` / `React.ComponentProps<"textarea">`. Both carry `data-slot="input-group-control"` (the hook the root uses to detect focus/error). All native input/textarea props pass through.

## Align modes (`InputGroupAddon`)

| Mode | Position | Behavior |
|---|---|---|
| `inline-start` | Left, in-row (default) | `order-first`, `pl-3`; pulls buttons left with negative margin |
| `inline-end` | Right, in-row | `order-last`, `pr-3`; pulls buttons right with negative margin |
| `block-start` | Top, full-width row | Forces group to `flex-col`, addon spans full width above the input |
| `block-end` | Bottom, full-width row | Forces group to `flex-col`, addon spans full width below the input |

The root reacts to the addon's `data-align` via `has-[]` selectors: `inline-*` adds horizontal padding to the input, while `block-*` switches the group to `h-auto flex-col`.

## Button size variants

Sizes come from `inputGroupButtonVariants`, not the base Button. The base radius token is `--radius` (0.5rem); `calc(var(--radius)-5px)` yields ~3px.

| Size | Classes | Description |
|---|---|---|
| `xs` (default) | `h-6 gap-1 px-2 rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-3.5 has-[>svg]:px-2` | 24px text button |
| `sm` | `h-8 px-2.5 gap-1.5 rounded-md has-[>svg]:px-2.5` | 32px text button |
| `icon-xs` | `size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0` | 24×24px icon-only |
| `icon-sm` | `size-8 p-0 has-[>svg]:p-0` | 32×32px icon-only |

All sizes share the base `text-sm shadow-none flex gap-2 items-center`.

## States

- **Default**: Group renders `h-9`, `rounded-md`, `border-input`, `shadow-xs`, with children in a single `flex items-center` row.
- **Textarea**: Presence of a `>textarea` switches the group to `has-[>textarea]:h-auto`.
- **Focus**: When the inner control (`[data-slot=input-group-control]`) is `:focus-visible`, the root gets `border-ring` + `ring-ring/50 ring-[3px]`. The inner Input/Textarea suppress their own ring (`focus-visible:ring-0`).
- **Error**: When any slotted control has `aria-invalid=true`, the root gets `border-destructive` + `ring-destructive/20` (`dark:ring-destructive/40`).
- **Disabled**: Addons dim to `opacity-50` via `group-data-[disabled=true]/input-group:opacity-50`.
- **Click-to-focus**: Clicking an `InputGroupAddon` focuses the sibling `input` — unless the click lands on a `button` inside the addon.

## Reference implementation

Root `InputGroup` className (verbatim):

```tsx
"group/input-group border-input dark:bg-input/30 relative flex w-full items-center rounded-md border shadow-xs transition-[color,box-shadow] outline-none",
"h-9 min-w-0 has-[>textarea]:h-auto",
// alignment
"has-[>[data-align=inline-start]]:[&>input]:pl-2",
"has-[>[data-align=inline-end]]:[&>input]:pr-2",
"has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3",
"has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3",
// focus
"has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot=input-group-control]:focus-visible]:ring-[3px]",
// error
"has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40"
```

`inputGroupAddonVariants` base (verbatim):

```tsx
"text-muted-foreground flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium select-none [&>svg:not([class*='size-'])]:size-4 [&>kbd]:rounded-[calc(var(--radius)-5px)] group-data-[disabled=true]/input-group:opacity-50"
```

`InputGroupInput` className (verbatim):

```tsx
"flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent"
```

`InputGroupTextarea` className (verbatim):

```tsx
"flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent"
```

## Usage

```tsx
// Search with leading icon addon
<InputGroup>
  <InputGroupAddon align="inline-start">
    <Search className="w-4 h-4" strokeWidth={1.5} />
  </InputGroupAddon>
  <InputGroupInput placeholder="Search tickets..." />
</InputGroup>

// Input with trailing clear button
<InputGroup>
  <InputGroupInput value={search} onChange={handleChange} />
  <InputGroupAddon align="inline-end">
    <InputGroupButton size="icon-xs" onClick={handleClear}>
      <X className="w-4 h-4" strokeWidth={1.5} />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>

// Prefix text addon + trailing action
<InputGroup>
  <InputGroupAddon align="inline-start">
    <InputGroupText>https://</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="example.com" />
  <InputGroupAddon align="inline-end">
    <InputGroupButton size="sm" onClick={applyMax}>Apply</InputGroupButton>
  </InputGroupAddon>
</InputGroup>

// Textarea with a bottom toolbar addon
<InputGroup>
  <InputGroupTextarea placeholder="Write a message..." />
  <InputGroupAddon align="block-end">
    <InputGroupText>Markdown supported</InputGroupText>
    <InputGroupButton size="sm">Send</InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```

## Usage Guidelines

### Do

- Place addons inside `InputGroupAddon` and set `align` to position them; let the addon's click handler focus the input.
- Use `InputGroupButton` (not a raw Button) so buttons size and align correctly inside the group.
- Use `icon-xs` / `icon-sm` for icon-only actions; `xs` / `sm` for text actions.
- Use `block-start` / `block-end` for full-width toolbar rows, typically with `InputGroupTextarea`.
- Wrap inline label text in `InputGroupText` for consistent muted styling.

### Don't

- Do NOT use a plain `InputGroup` with no addon or button — use a standalone `Input` instead.
- Do NOT mix `block-*` and `inline-*` addons in the same group; pick one axis.
- Do NOT add your own `border`/`bg` to addons — they are transparent by design; the root owns the border and focus ring.
- Do NOT set `focus-visible:ring` on `InputGroupInput`/`InputGroupTextarea`; the root renders the shared ring.
