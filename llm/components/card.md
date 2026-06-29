# Card

## Overview

Container component for grouping related content. Composed of slotted sub-components for flexible layout (header / title / description / content / footer). Built on the shadcn/ui Card pattern.

Two implementations exist in the codebase:

- **Cortex convention (PRIMARY)** — as shipped in cortex-note-app. The root uses the Cortex panel surface `bg-surface-container-low` + `border ghost-border` + `shadow-xs`, and sub-parts use Cortex typography tokens. This is the convention to follow.
- **shadcn baseline** — as shipped in cortex-coder-front. The root keeps the raw shadcn `bg-card` + `border` + `shadow-sm` with `gap-6`/`py-6` padding, a grid-based `CardHeader`, and an extra `CardAction` slot. Use only when matching the unmodified shadcn set.

**Import path**: `@/components/ui/card`

**Dependencies**: none beyond `cn()` (no class-variance-authority; there are no CVA variants).

## Import

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
```

`CardAction` is **only** exported by the shadcn baseline (cortex-coder-front), not by the Cortex convention build.

## Sub-Components (Cortex convention)

| Component | Role | Styling |
|---|---|---|
| Card | Root container | `rounded-md border ghost-border bg-surface-container-low text-card-foreground shadow-xs` |
| CardHeader | Top section (title + description) | `flex flex-col gap-1.5 p-5` |
| CardTitle | Heading within header | `text-title-sm font-semibold leading-none tracking-tight text-on-surface` |
| CardDescription | Subtitle or helper text | `text-body-sm text-on-surface-variant` |
| CardContent | Main body content | `p-5 pt-0` (no top padding so it tucks under the header) |
| CardFooter | Bottom action area | `flex items-center p-5 pt-0` |

The Cortex build is `forwardRef`-based (each part forwards `ref` to its `<div>`) and sets `displayName`.

### shadcn baseline differences (cortex-coder-front)

| Part | Baseline className |
|---|---|
| Card | `bg-card text-card-foreground flex flex-col gap-6 rounded-md border py-6 shadow-sm` |
| CardHeader | `@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6` |
| CardTitle | `leading-none font-semibold` |
| CardDescription | `text-muted-foreground text-sm` |
| CardAction | `col-start-2 row-span-2 row-start-1 self-start justify-self-end` |
| CardContent | `px-6` |
| CardFooter | `flex items-center px-6 [.border-t]:pt-6` |

Notable baseline-only behaviors: a `CardAction` slot (grid-placed top-right when present), `@container`-driven header, and `[.border-b]`/`[.border-t]` selectors that add padding only when you add a divider class. Each part carries a `data-slot` attribute (`card`, `card-header`, `card-title`, `card-description`, `card-action`, `card-content`, `card-footer`).

## Props

All sub-components are plain `<div>` wrappers — they accept every native `div` prop. There are no variant props.

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | undefined | Additional CSS classes, merged via `cn()` |
| children | ReactNode | — | Slot content |
| ...props | `HTMLAttributes<HTMLDivElement>` | — | Any native div attribute (id, onClick, data-*, ref, etc.) |

## States

- **Default**: Static container with the ghost border and a subtle `shadow-xs`. No interactive states on the card itself.
- **Hover (if interactive)**: The card has no hover styling. To make a card clickable, wrap it in a `Link` / `button` or add hover classes (e.g. `hover:bg-surface-container-high`) yourself.
- **Empty**: `CardContent` should render its own empty-state messaging.

## Layout Patterns

### Standard card (Cortex convention)

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Optional description</CardDescription>
  </CardHeader>
  <CardContent>
    Main content here
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Header with an action on the right

The Cortex build has no `CardAction` slot. Lay out the header as a flex row and push the action with `ml-auto` (or `justify-between`):

```tsx
<CardHeader className="flex-row items-center justify-between">
  <div className="flex flex-col gap-1.5">
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </div>
  <Button variant="ghost" size="icon" className="ml-auto">
    <MoreHorizontal className="w-4 h-4" strokeWidth={1.5} />
  </Button>
</CardHeader>
```

On the shadcn baseline you can instead drop a `<CardAction>` inside `<CardHeader>`; the header grid auto-places it top-right.

## Reference implementation

Cortex convention (cortex-note-app) — verbatim root and parts:

```tsx
// Card
"rounded-md border ghost-border bg-surface-container-low text-card-foreground shadow-xs"
// CardHeader
"flex flex-col gap-1.5 p-5"
// CardTitle
"text-title-sm font-semibold leading-none tracking-tight text-on-surface"
// CardDescription
"text-body-sm text-on-surface-variant"
// CardContent
"p-5 pt-0"
// CardFooter
"flex items-center p-5 pt-0"
```

shadcn baseline (cortex-coder-front) — verbatim root:

```tsx
// Card
"bg-card text-card-foreground flex flex-col gap-6 rounded-md border py-6 shadow-sm"
```

## Usage Guidelines

### Do

- Use the Cortex panel surface (`bg-surface-container-low` + `border ghost-border` + `shadow-xs`) for new cards.
- Use `CardHeader` for titles and descriptions; keep the `p-5` padding consistent.
- Use `CardContent` for the body and `CardFooter` for bottom action buttons.
- Keep card content concise and scannable.

### Don't

- Don't expect a `CardAction` export in the Cortex build — it ships only in the shadcn baseline. Use `ml-auto` in the header instead.
- Don't put interactive actions loose in `CardContent` — group them in `CardFooter`.
- Don't nest Cards inside Cards — it muddies the surface hierarchy.
- Don't remove the border — the ghost border defines the panel.
- Don't exceed `rounded-md` (6px); the card root uses exactly `rounded-md`.
