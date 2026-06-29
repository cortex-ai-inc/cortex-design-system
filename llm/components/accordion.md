# Accordion

## Overview

Stacked expandable sections built on the Radix UI Accordion primitive. Each item is separated by a `border-b` divider; the last item removes the border via `last:border-b-0`. The trigger includes a `ChevronDownIcon` (lucide-react) that rotates 180 degrees when the item is open. There is no CVA / variant config — the component is a thin styled wrapper over Radix, exposing four parts via `data-slot` attributes.

## Import

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
```

## Anatomy

| Part | Radix primitive | `data-slot` | Notes |
|---|---|---|---|
| `Accordion` | `AccordionPrimitive.Root` | `accordion` | Pass-through; no default styling |
| `AccordionItem` | `AccordionPrimitive.Item` | `accordion-item` | `border-b last:border-b-0` divider |
| `AccordionTrigger` | `AccordionPrimitive.Header` + `Trigger` | `accordion-trigger` | Clickable header row with chevron |
| `AccordionContent` | `AccordionPrimitive.Content` | `accordion-content` | Animated collapsible region |

## Behavior modes (Radix `type` prop)

| Mode | Type Prop | Behavior | Use Case |
|---|---|---|---|
| single | `type="single"` | One panel open at a time | FAQ, settings groups, collapsible sections |
| multiple | `type="multiple"` | Multiple panels open simultaneously | Sidebar filters, multi-category forms |

> These are Radix `Root` behaviors, not styled component variants. The component itself ships no `variant` prop.

## Props

All props are forwarded to the underlying Radix primitives via `React.ComponentProps<...>`. The table below lists the commonly used ones.

### Accordion (Root)

| Prop | Type | Default | Description |
|---|---|---|---|
| type | `"single" \| "multiple"` | — (required) | Collapse behavior |
| collapsible | boolean | `false` | Allow closing the open item (single mode only) |
| defaultValue | string \| string[] | — | Initially open value(s) |
| value | string \| string[] | — | Controlled open value(s) |
| onValueChange | (value) => void | — | Controlled change handler |
| className | string | — | Additional classes (forwarded to Root) |

### AccordionItem

| Prop | Type | Default | Description |
|---|---|---|---|
| value | string | required | Unique identifier for the item |
| disabled | boolean | false | Disable the item |
| className | string | — | Merged via `cn()` after the base divider classes |

### AccordionTrigger

| Prop | Type | Default | Description |
|---|---|---|---|
| children | ReactNode | — | Trigger label content (rendered before the chevron) |
| className | string | — | Merged via `cn()` |

### AccordionContent

| Prop | Type | Default | Description |
|---|---|---|---|
| children | ReactNode | — | Panel content (wrapped in an inner `<div>`) |
| className | string | — | Applied to the inner content `<div>`, not the animated container |
| forceMount | boolean | false | Keep mounted when closed |

## States / Notes

- **Trigger layout**: `flex flex-1 items-start justify-between gap-4 py-4 text-left text-sm font-medium`. Items are top-aligned (`items-start`), so multi-line labels keep the chevron pinned to the top.
- **Trigger interaction**: `transition-all`, `hover:underline`, and disabled handling via `disabled:pointer-events-none disabled:opacity-50`.
- **Focus**: keyboard focus uses `focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]` plus `outline-none` (the shadcn New York focus treatment — note this is `ring-[3px]`, not the standard `ring-2` used elsewhere).
- **Chevron**: `ChevronDownIcon` styled `text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200`. It rotates via the trigger rule `[&[data-state=open]>svg]:rotate-180`.
- **Content animation**: the animated container carries `data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm` (the `accordion-down`/`accordion-up` keyframes run at 0.2s). Padding lives on the inner wrapper `<div>` as `pt-0 pb-4`.
- **Disabled items**: set `disabled` on `AccordionItem`; the trigger becomes non-interactive (`pointer-events-none`) and dims to `opacity-50`.

## Reference implementation

`AccordionItem` divider:

```tsx
className={cn("border-b last:border-b-0", className)}
```

`AccordionTrigger` (inside `<AccordionPrimitive.Header className="flex">`):

```tsx
className={cn(
  "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
  className
)}
```

Chevron icon:

```tsx
<ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
```

`AccordionContent` (animated container + inner padded wrapper):

```tsx
<AccordionPrimitive.Content
  data-slot="accordion-content"
  className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
  {...props}
>
  <div className={cn("pt-0 pb-4", className)}>{children}</div>
</AccordionPrimitive.Content>
```

## Example

```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section one</AccordionTrigger>
    <AccordionContent>
      Content for section one.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Section two</AccordionTrigger>
    <AccordionContent>
      Content for section two.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3" disabled>
    <AccordionTrigger>Section three (disabled)</AccordionTrigger>
    <AccordionContent>
      This section cannot be opened.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

## Usage Guidelines

### Do
- Pass `collapsible` in single mode if a user should be able to close the open section (it is `false` by default in Radix).
- Use multiple mode for filter panels where each section is independent.
- Keep trigger labels concise — one to three words preferred.
- Let `AccordionContent` own its `pt-0 pb-4` padding; add extra spacing via the `className` (it lands on the inner wrapper).

### Don't
- Don't put interactive controls (buttons, inputs) inside `AccordionTrigger` — the whole header is a button.
- Don't nest `Accordion` within `Accordion` — use separate instances.
- Don't use accordion for tab-like navigation; use the Tabs component instead.
- Don't expect a `variant` prop — there is none; style through `className`.
