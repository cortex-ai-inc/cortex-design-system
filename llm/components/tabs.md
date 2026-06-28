# Tabs

## Overview

Tabbed content switcher built on Radix UI `Tabs` primitive. Uses a segmented-control style list with an underline-like active indicator. Content panels mount/unmount on tab selection (can be overridden with `keepMounted`).

## Import

```tsx
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"
```

## Sub-components

| Component | Description |
|---|---|
| `Tabs` | Root context provider; manages active tab value and orientation |
| `TabsList` | Horizontal container for tab triggers |
| `TabsTrigger` | Individual tab button |
| `TabsContent` | Content panel associated with a tab value |

## Props

### Tabs

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | required | Controlled active tab value |
| `onValueChange` | `(value: string) => void` | `undefined` | Tab change handler |
| `defaultValue` | `string` | `undefined` | Default tab for uncontrolled usage |
| `className` | `string` | `undefined` | Additional classes |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Tab layout direction |

### TabsList

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | `undefined` | Additional classes |
| `children` | `React.ReactNode` | required | TabsTrigger elements |

### TabsTrigger

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | required | Matches TabsContent value |
| `disabled` | `boolean` | `false` | Disables the tab |
| `className` | `string` | `undefined` | Additional classes |
| `children` | `React.ReactNode` | required | Tab label content |

### TabsContent

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | required | Matches TabsTrigger value |
| `className` | `string` | `undefined` | Additional classes |
| `children` | `React.ReactNode` | required | Panel content |
| `forceMount` | `boolean` | `false` | Keep mounted when not active |

## Styling

| Part | CSS Classes | Description |
|---|---|---|
| TabsList | `inline-flex h-9 items-center justify-center rounded-sm bg-surface-container-high p-1` | Compact horizontal bar, 36px height, dark container background |
| TabsTrigger (inactive) | `inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1 text-body-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-k-primary-container/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-on-surface-variant` | Dim text, no background |
| TabsTrigger (active) | `bg-surface-container-low text-on-surface shadow-xs` | Elevated background, full brightness text, subtle shadow |
| TabsContent | `mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-k-primary-container/50 focus-visible:ring-offset-2` | Top margin spacing from tabs, focus ring |

## States

- **Inactive tab**: `text-on-surface-variant`, no background, clickable.
- **Active tab**: `bg-surface-container-low text-on-surface` with `shadow-xs`. Appears elevated above the list background.
- **Disabled tab**: `opacity-50 pointer-events-none`. Cannot be selected.
- **Focus**: `ring-2 ring-k-primary-container/50` on both triggers and content panels.
- **Hover**: Inherits cursor pointer; no background change on inactive tabs (consistent with design system).
- **Content mount**: Content is mounted/unmounted on tab change by default. Use `forceMount` on `TabsContent` to preserve DOM state.

## Tailwind Classes

| Selector | Description |
|---|---|
| `inline-flex h-9 items-center justify-center` | TabsList: flexbox row, centered, 36px |
| `rounded-sm` | 4px radius on list and triggers |
| `bg-surface-container-high` | TabsList background |
| `p-1` | 4px padding around trigger area |
| `bg-surface-container-low` | Active trigger background |
| `shadow-xs` | Active trigger shadow |
| `text-on-surface-variant` | Inactive trigger text |
| `text-on-surface` | Active trigger text |
| `text-body-sm font-medium` | 13px medium weight text |
| `mt-2` | Content top spacing |
| `transition-all duration-200` | Smooth state transitions |

## Usage

```tsx
<Tabs defaultValue="details" onValueChange={(v) => console.log(v)}>
  <TabsList>
    <TabsTrigger value="details">Details</TabsTrigger>
    <TabsTrigger value="comments">Comments</TabsTrigger>
    <TabsTrigger value="history" disabled>History</TabsTrigger>
  </TabsList>
  <TabsContent value="details">
    <p>Detail content here.</p>
  </TabsContent>
  <TabsContent value="comments">
    <p>Comments content here.</p>
  </TabsContent>
  <TabsContent value="history">
    <p>Coming soon.</p>
  </TabsContent>
</Tabs>
```

## Usage Guidelines

### Do

- Use Tabs to organize related content into switchable panels.
- Keep tab labels short (1-2 words).
- Use `defaultValue` for uncontrolled tabs.
- Use `value` and `onValueChange` for controlled tabs tied to URL params or state.
- Use `disabled` on tabs that are not yet available.
- Use `forceMount` on content panels that should preserve scroll position or form state.

### Don't

- Do NOT use Tabs for navigation between pages — use the router for that.
- Do NOT use more than 6-7 tabs in a single TabsList.
- Do NOT put complex forms with unsaved state in tabs that unmount on change without `forceMount`.
- Do NOT remove the bg-surface-container-high from TabsList — it provides the necessary contrast.
- Do NOT stack tabs vertically in horizontal layouts.
