# Tabs

## Overview

Tabbed content switcher built on the Radix UI `Tabs` primitive. The list is a **segmented control**: a filled container (`bg-surface-container-high`) wrapping pill-style triggers, where the active trigger gets its own raised surface (`bg-surface-container-low`) and brighter text. There is **no** underline indicator. Content panels mount/unmount on tab selection (override with Radix's `forceMount`).

> **Primary source:** `cortex-support-front`. The class strings below document that branded implementation. A notable `cortex-coder-front` variation is called out at the end.

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
| `Tabs` | Root context provider (`TabsPrimitive.Root`); manages active value and orientation |
| `TabsList` | Segmented container for the triggers |
| `TabsTrigger` | Individual tab button (pill) |
| `TabsContent` | Content panel associated with a tab value |

## Anatomy

- **TabsList** — `inline-flex h-9` segmented bar with `rounded-sm`, `bg-surface-container-high` fill, and `p-1` so the active trigger's raised surface sits inset.
- **TabsTrigger** — `rounded-sm px-3 py-1` pill. Inactive: `text-on-surface-variant`, transparent. Active (`data-[state=active]`): `bg-surface-container-low text-on-surface`.
- **TabsContent** — panel with `mt-2` top spacing.

## Props

### Tabs

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | Controlled active tab value |
| `onValueChange` | `(value: string) => void` | `undefined` | Tab change handler |
| `defaultValue` | `string` | `undefined` | Default tab for uncontrolled usage |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Tab layout direction |
| `className` | `string` | `undefined` | Additional classes |

### TabsList

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | `undefined` | Additional classes |
| `children` | `React.ReactNode` | required | `TabsTrigger` elements |

### TabsTrigger

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | required | Matches a `TabsContent` value |
| `disabled` | `boolean` | `false` | Disables the tab |
| `className` | `string` | `undefined` | Additional classes |
| `children` | `React.ReactNode` | required | Tab label content |

### TabsContent

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | required | Matches a `TabsTrigger` value |
| `forceMount` | `boolean` | `undefined` | Keep panel mounted when inactive (Radix prop) |
| `className` | `string` | `undefined` | Additional classes |
| `children` | `React.ReactNode` | required | Panel content |

## Styling

| Part | CSS Classes | Description |
|---|---|---|
| TabsList | `inline-flex h-9 items-center justify-center rounded-sm bg-surface-container-high p-1 text-on-surface-variant` | Compact 36px segmented bar; container fill, dim default text |
| TabsTrigger (base) | `inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1 text-body-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50` | 13px medium pill, transparent background |
| TabsTrigger (active) | `data-[state=active]:bg-surface-container-low data-[state=active]:text-on-surface` | Raised inset surface + brighter text. No shadow. |
| TabsContent | `mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` | Top spacing + focus ring |

## States

- **Inactive tab** — `text-on-surface-variant`, transparent background, clickable.
- **Active tab** — `data-[state=active]:bg-surface-container-low data-[state=active]:text-on-surface`. The raised inset surface (one tonal step below the list fill) is what reads as "selected" — there is no underline and no shadow.
- **Disabled tab** — `disabled:opacity-50 disabled:pointer-events-none`. Cannot be selected.
- **Focus** — `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` on both triggers and content panels.
- **Hover** — pointer cursor only; no background change on inactive tabs.
- **Content mount** — content mounts/unmounts on tab change by default. Pass `forceMount` to a `TabsContent` to preserve DOM/scroll/form state.

## Reference implementation

`TabsList` (segmented container):

```tsx
"inline-flex h-9 items-center justify-center rounded-sm bg-surface-container-high p-1 text-on-surface-variant"
```

`TabsTrigger` (active state is the raised inset surface — no underline):

```tsx
"inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1 text-body-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-surface-container-low data-[state=active]:text-on-surface"
```

`TabsContent`:

```tsx
"mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
```

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
- Use `value` + `onValueChange` for controlled tabs tied to URL params or state.
- Use `disabled` on tabs that are not yet available.
- Use `forceMount` on panels that should preserve scroll position or form state.

### Don't

- Do NOT use Tabs for navigation between pages — use the router for that.
- Do NOT use more than 6-7 tabs in a single `TabsList`.
- Do NOT put complex forms with unsaved state in tabs that unmount without `forceMount`.
- Do NOT remove `bg-surface-container-high` from `TabsList` — the container fill is what makes the segmented active surface read as raised.
- Do NOT add an underline indicator — the active state is the raised `bg-surface-container-low` surface.

## Variation — cortex-coder-front

The `cortex-coder-front` Tabs are still segmented but use a slightly different tone scale and add a subtle shadow on the active trigger:

- `Tabs` root adds `flex flex-col gap-2`.
- `TabsList` fill is `bg-surface-container-low` with `p-[3px]`, `w-fit max-w-full`, horizontal overflow scroll, and `gap-1` between triggers.
- `TabsTrigger` is `flex-1 shrink-0` with a transparent border, `gap-1.5`, `transition-[color,box-shadow]`, and icon sizing `[&_svg:not([class*='size-'])]:size-4`. Active state is `data-[state=active]:bg-surface-container-high data-[state=active]:text-on-surface data-[state=active]:shadow-sm` (note: fill is `-high` here, vs `-low` in support-front, because the list fill is `-low`).
- `TabsContent` is `flex-1 outline-none` (no `mt-2`).
