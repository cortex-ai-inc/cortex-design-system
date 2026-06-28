# ButtonGroup

## Overview

Custom compound component for grouping related buttons together in a horizontal or vertical stack. Uses `ButtonGroup` (wrapper), `ButtonGroupButton` (individual action), and `ButtonGroupSeparator` (visual divider between buttons).

## Import

```tsx
import {
  ButtonGroup,
  ButtonGroupButton,
  ButtonGroupSeparator,
} from "@/components/ui/button-group"
```

## Props

### ButtonGroup (Root)

| Prop | Type | Default | Description |
|---|---|---|---|
| orientation | `"horizontal" | "vertical"` | `"horizontal"` | Layout direction of the group |
| className | string | — | Additional classes |
| children | ReactNode | — | ButtonGroupButton + ButtonGroupSeparator children |

### ButtonGroupButton

| Prop | Type | Default | Description |
|---|---|---|---|
| variant | Button variant | `"outline"` | Button style variant |
| size | `"sm" | "icon-sm"` | `"icon-sm"` | Button size — icon-sm is standard |
| className | string | — | Additional classes |
| children | ReactNode | — | Icon or label |
| ...props | ButtonProps | — | All standard Button props apply |

### ButtonGroupSeparator

| Prop | Type | Default | Description |
|---|---|---|---|
| orientation | `"horizontal" | "vertical"` | Inherits from ButtonGroup | Separator direction |
| className | string | — | Additional classes |

## Orientation Styles

| Orientation | ButtonGroup Layout | Separator | Border Radius Adjustment |
|---|---|---|---|
| horizontal | `flex items-stretch` | `w-px h-4 bg-border` | First child: `rounded-r-none`, last child: `rounded-l-none`, middle: `rounded-none` |
| vertical | `flex flex-col items-stretch` | `h-px w-4 bg-border self-center` | First child: `rounded-b-none`, last child: `rounded-t-none`, middle: `rounded-none` |

## States / Notes

- **Border radius**: Adjacent buttons have their touching corners zeroed out to create a seamless joined appearance. Applied via `[&>button:first-child]:rounded-r-none [&>button:last-child]:rounded-l-none [&>button:not(:first-child):not(:last-child)]:rounded-none` for horizontal orientation.
- **Active state**: Use `variant="default"` or `data-active` on the selected `ButtonGroupButton`.
- **Separator**: Optional; renders a thin `bg-border` line between buttons. Not needed when buttons naturally abut.
- **Icon sizing**: Buttons use `[&_svg]:size-4 [&_svg]:shrink-0` via the base button variant, consistent with standard Button.

### Example

```tsx
<ButtonGroup>
  <ButtonGroupButton size="icon-sm" variant="outline">
    <Bold className="w-4 h-4" />
  </ButtonGroupButton>
  <ButtonGroupButton size="icon-sm" variant="outline">
    <Italic className="w-4 h-4" />
  </ButtonGroupButton>
  <ButtonGroupSeparator />
  <ButtonGroupButton size="icon-sm" variant="outline">
    <List className="w-4 h-4" />
  </ButtonGroupButton>
</ButtonGroup>
```

Vertical variant with active state:

```tsx
<ButtonGroup orientation="vertical">
  <ButtonGroupButton variant="ghost" className="justify-start px-3">
    <AlignLeft className="w-4 h-4" />
    <span>Left</span>
  </ButtonGroupButton>
  <ButtonGroupButton variant="ghost" className="justify-start px-3" data-active>
    <AlignCenter className="w-4 h-4" />
    <span>Center</span>
  </ButtonGroupButton>
  <ButtonGroupButton variant="ghost" className="justify-start px-3">
    <AlignRight className="w-4 h-4" />
    <span>Right</span>
  </ButtonGroupButton>
</ButtonGroup>
```

## Usage Guidelines

### Do
- Use ButtonGroup for closely related toggles (text formatting, alignment, view modes).
- Use `icon-sm` size for toolbar-style groups with icons only.
- Use `ButtonGroupSeparator` to visually separate distinct subgroups within the group.
- Apply `data-active` or `variant="default"` to indicate the currently selected option.

### Don't
- Don't use ButtonGroup for primary action + dropdown menus (use a split-button pattern instead).
- Don't mix icon-only and labeled buttons in the same group — keep consistent.
- Don't place more than 6 buttons in a single group.
- Don't use ButtonGroup for navigation tabs — use the Tabs component instead.
