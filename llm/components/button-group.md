# ButtonGroup

## Overview

Custom layout primitive for joining related buttons (and other controls) into a single seamless cluster, horizontally or vertically. It does not render `Button` itself — you place your own `Button`, `Input`, `Select`, or `ButtonGroupText` children inside it, and the group strips the touching corners and shared borders so they read as one connected control.

The exported pieces are `ButtonGroup` (wrapper), `ButtonGroupText` (inline label/addon segment), and `ButtonGroupSeparator` (visual divider). The CVA `buttonGroupVariants` is also exported.

## Import

```tsx
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"
```

## Anatomy

```tsx
<ButtonGroup>
  <Button variant="outline">Bold</Button>
  <Button variant="outline">Italic</Button>
  <ButtonGroupSeparator />
  <Button variant="outline">Underline</Button>
</ButtonGroup>
```

`ButtonGroup` renders a `div` with `role="group"`, `data-slot="button-group"`, and `data-orientation`. Children can be any element — `Button`, `Input`, `Select`, `ButtonGroupText`, or a nested `ButtonGroup`.

## Props

### ButtonGroup (Root)

| Prop | Type | Default | Description |
|---|---|---|---|
| orientation | `"horizontal" \| "vertical"` | `"horizontal"` | Layout direction; sets `data-orientation` |
| className | string | — | Additional classes |
| ...props | `React.ComponentProps<"div">` | — | Standard div attributes |

### ButtonGroupText

| Prop | Type | Default | Description |
|---|---|---|---|
| asChild | boolean | `false` | Render as the child element (Radix `Slot`) instead of a `div` |
| className | string | — | Additional classes |
| ...props | `React.ComponentProps<"div">` | — | Standard div attributes |

Use `ButtonGroupText` for non-interactive inline segments — a unit label, a prefix, or a static piece of text joined into the group.

### ButtonGroupSeparator

| Prop | Type | Default | Description |
|---|---|---|---|
| orientation | `"horizontal" \| "vertical"` | `"vertical"` | Separator direction (defaults to vertical, perpendicular to a horizontal group) |
| className | string | — | Additional classes |
| ...props | `React.ComponentProps<typeof Separator>` | — | Forwarded to the underlying `Separator` |

## Orientation Styles

The group joins children by zeroing the touching corners and removing the duplicated shared border on every child except the first.

| Orientation | Layout | Per-child joining rules |
|---|---|---|
| horizontal (default) | `flex w-fit items-stretch` | non-first: `rounded-l-none border-l-0`; non-last: `rounded-r-none` |
| vertical | adds `flex-col` | non-first: `rounded-t-none border-t-0`; non-last: `rounded-b-none` |

## States / Notes

- **Joining**: Only the first child keeps its leading border and rounded leading corners. Every subsequent child drops the shared border (`border-l-0` / `border-t-0`) and the touching corners, producing one continuous outline.
- **Focus**: Children get `focus-visible:z-10 focus-visible:relative` so the focus ring is never clipped by an adjacent sibling. Use the standard button focus ring (`focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`) on the buttons themselves.
- **Inputs grow**: A child `<input>` flexes to fill available space (`[&>input]:flex-1`).
- **Nested groups**: When a `ButtonGroup` contains another `ButtonGroup`, a `gap-2` is applied between them.
- **ButtonGroupText**: Renders `bg-muted`, a `rounded-md border`, `px-4`, `text-sm font-medium`, and `shadow-xs`. Icons inside it are auto-sized to `size-4` (`w-4 h-4`).
- **Separator**: Uses `bg-input` and stretches to the group's cross axis (`self-stretch`, `data-[orientation=vertical]:h-auto`). It is optional — buttons abut cleanly without one.
- **Active state**: There is no built-in active variant. Indicate selection on the child itself, e.g. a `Button` with the brand blue `bg-k-primary-container` or an explicit `variant`.

## Reference implementation

Base CVA (`buttonGroupVariants`), verbatim:

```ts
const buttonGroupVariants = cva(
  "flex w-fit items-stretch [&>*]:focus-visible:z-10 [&>*]:focus-visible:relative [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md has-[>[data-slot=button-group]]:gap-2",
  {
    variants: {
      orientation: {
        horizontal:
          "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
        vertical:
          "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)
```

`ButtonGroupText` className, verbatim:

```ts
"bg-muted flex items-center gap-2 rounded-md border px-4 text-sm font-medium shadow-xs [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4"
```

`ButtonGroupSeparator` className, verbatim:

```ts
"bg-input relative !m-0 self-stretch data-[orientation=vertical]:h-auto"
```

## Examples

Toolbar of icon buttons with a separator:

```tsx
<ButtonGroup>
  <Button variant="outline" size="icon">
    <Bold className="w-4 h-4" strokeWidth={1.5} />
  </Button>
  <Button variant="outline" size="icon">
    <Italic className="w-4 h-4" strokeWidth={1.5} />
  </Button>
  <ButtonGroupSeparator />
  <Button variant="outline" size="icon">
    <List className="w-4 h-4" strokeWidth={1.5} />
  </Button>
</ButtonGroup>
```

Input with a joined text addon and action button:

```tsx
<ButtonGroup>
  <ButtonGroupText>https://</ButtonGroupText>
  <Input placeholder="example.com" />
  <Button variant="outline">Go</Button>
</ButtonGroup>
```

Vertical group:

```tsx
<ButtonGroup orientation="vertical">
  <Button variant="outline" className="justify-start">
    <AlignLeft className="w-4 h-4" strokeWidth={1.5} />
    Left
  </Button>
  <Button variant="outline" className="justify-start">
    <AlignCenter className="w-4 h-4" strokeWidth={1.5} />
    Center
  </Button>
  <Button variant="outline" className="justify-start">
    <AlignRight className="w-4 h-4" strokeWidth={1.5} />
    Right
  </Button>
</ButtonGroup>
```

## Usage Guidelines

### Do
- Use ButtonGroup for closely related controls (text formatting, alignment, view modes, input + addon).
- Place your own `Button` / `Input` / `Select` / `ButtonGroupText` children inside — the group only handles joining.
- Use `ButtonGroupText` for static labels or unit prefixes joined to a control.
- Use `ButtonGroupSeparator` to visually split distinct subgroups.
- Indicate the selected control on the child itself (e.g. `bg-k-primary-container`).

### Don't
- Don't expect a `ButtonGroupButton` export — it does not exist. Compose with the standard `Button`.
- Don't add manual border or corner overrides on children — the group already strips the shared border and touching corners.
- Don't use ButtonGroup for navigation tabs — use the Tabs component instead.
