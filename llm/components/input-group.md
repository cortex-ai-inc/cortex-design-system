# InputGroup

## Overview

Custom compound component for grouping an input with addons or buttons. Supports addons positioned on any side (start, end, top, bottom) and integrated action buttons. Used for search bars with icons, input fields with validation indicators, and fields with inline actions (copy, generate, clear).

## Import

```tsx
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
```

## Sub-components

| Component | Description |
|---|---|
| `InputGroup` | Root flex container that aligns children in a row |
| `InputGroupAddon` | Static text, icon, or indicator positioned alongside the input |
| `InputGroupButton` | Action button integrated into the group (smaller variants) |
| `InputGroupInput` | Input element that fills remaining space |

## Props

### InputGroup

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | `undefined` | Additional classes |
| `children` | `React.ReactNode` | required | Addon, Input, Button children |

### InputGroupAddon

| Prop | Type | Default | Description |
|---|---|---|---|
| `align` | `"inline-start" \| "inline-end" \| "block-start" \| "block-end"` | `"inline-start"` | Addon position |
| `className` | `string` | `undefined` | Additional classes |
| `children` | `React.ReactNode` | required | Content (text, icon, or indicator) |

### InputGroupButton

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `"xs" \| "sm" \| "icon-xs" \| "icon-sm"` | `"sm"` | Button size |
| `variant` | `"default" \| "ghost"` | `"ghost"` | Button style |
| `className` | `string` | `undefined` | Additional classes |
| ... | Button props | | All standard Button props pass through |

### InputGroupInput

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | `undefined` | Additional classes |
| ... | Input props | | All standard Input props pass through |

## Align modes

| Mode | Position | Description |
|---|---|---|
| `inline-start` | Left side | Addon placed before the input (default) |
| `inline-end` | Right side | Addon placed after the input |
| `block-start` | Top | Addon placed above the input |
| `block-end` | Bottom | Addon placed below the input |

## Styling

| Part | CSS Classes | Description |
|---|---|---|
| InputGroup | `group flex items-stretch w-full` | Flex container, items stretch to equal height |
| InputGroupAddon | `inline-flex items-center justify-center rounded-sm border border-on-surface-variant/20 bg-surface-container-high px-3 text-body-sm text-on-surface-variant` | Styled as a badge-like element matching input borders |
| InputGroupButton (xs) | `h-7 px-2 text-body-sm` | 28px compact button |
| InputGroupButton (sm) | `h-8 px-3 text-body-sm` | 32px small button |
| InputGroupButton (icon-xs) | `h-7 w-7 p-0` | 28x28px icon-only button |
| InputGroupButton (icon-sm) | `h-8 w-8 p-0` | 32x32px icon-only button |

## Button size variants

| Size | CSS Classes | Description |
|---|---|---|
| `xs` | `h-7 px-2 text-body-sm` | Compact text button, 28px tall |
| `sm` | `h-8 px-3 text-body-sm` | Small text button, 32px tall |
| `icon-xs` | `h-7 w-7 p-0` | Icon-only, 28x28px |
| `icon-sm` | `h-8 w-8 p-0` | Icon-only, 32x32px |

## States

- **Default**: Input and addon/button sit flush in a flex row, same height via `items-stretch`.
- **Addon-only**: Addon renders as a subtle decorative element with matching border and dark background.
- **Button-only**: Ghost-style button integrated inline.
- **Addon + Button**: Both can appear on either side of the input.
- **Focus**: Standard input focus ring applies to `InputGroupInput`; addon/button borders remain unchanged.
- **Disabled**: Disabled state applies to the input or button individually.
- **Edge — no input**: Not applicable; InputGroup requires at least InputGroupInput.

## Tailwind Classes

| Selector | Description |
|---|---|
| `group flex items-stretch w-full` | InputGroup root |
| `inline-flex items-center justify-center rounded-sm border border-on-surface-variant/20 bg-surface-container-high px-3 text-body-sm text-on-surface-variant` | Addon styling |
| `h-7 px-2 text-body-sm` | Button size xs |
| `h-8 px-3 text-body-sm` | Button size sm |
| `h-7 w-7 p-0` | Icon button xs |
| `h-8 w-8 p-0` | Icon button sm |

## Usage

```tsx
// Search with icon addon
<InputGroup>
  <InputGroupAddon align="inline-start">
    <Search className="h-4 w-4" />
  </InputGroupAddon>
  <InputGroupInput placeholder="Search tickets..." />
</InputGroup>

// Input with clear button
<InputGroup>
  <InputGroupInput value={search} onChange={handleChange} />
  {search && (
    <InputGroupButton size="icon-sm" onClick={handleClear}>
      <X className="h-4 w-4" />
    </InputGroupButton>
  )}
</InputGroup>

// Currency input with addon and button
<InputGroup>
  <InputGroupAddon align="inline-start">$</InputGroupAddon>
  <InputGroupInput type="number" step="0.01" />
  <InputGroupButton size="sm" onClick={applyMax}>
    Max
  </InputGroupButton>
</InputGroup>

// Input with bottom addon (hint text)
<InputGroup>
  <InputGroupInput placeholder="Enter URL" />
  <InputGroupAddon align="block-end">
    Must start with https://
  </InputGroupAddon>
</InputGroup>
```

## Usage Guidelines

### Do

- Use InputGroup for search bars with icon addons.
- Use InputGroup for fields with inline action buttons (copy, generate, clear).
- Use `icon-sm` or `icon-xs` for icon-only buttons to maintain alignment.
- Use `inline-start` addons for prefixes ($, https://, icons).
- Use `inline-end` addons for suffixes (units, status indicators).
- Use `block-end` addons for helper text below the input.

### Don't

- Do NOT use InputGroup for form fields without addons or buttons — use plain Input.
- Do NOT use more than one addon per side in the same InputGroup.
- Do NOT use InputGroup as a replacement for Select or other compound inputs.
- Do NOT mix `block-*` and `inline-*` addons in the same InputGroup.
- Do NOT use text buttons larger than `sm` in InputGroup — they will break vertical alignment.
