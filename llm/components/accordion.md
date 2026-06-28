# Accordion

## Overview

Stacked expandable sections built on Radix UI Accordion primitive. Each item is separated by a `border-b` divider; the last item removes the border via `last:border-b-0`. The trigger includes a `ChevronDown` icon that rotates 180 degrees on open state.

## Import

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
```

## Variants

| Variant | Type Prop | Behavior | Use Case |
|---|---|---|---|
| single | `type="single"` | One panel open at a time | FAQ, settings groups, collapsible sections |
| multiple | `type="multiple"` | Multiple panels open simultaneously | Sidebar filters, multi-category forms |

## Props

### Accordion (Root)

| Prop | Type | Default | Description |
|---|---|---|---|
| type | `"single" | "multiple"` | `"single"` | Collapse behavior |
| collapsible | boolean | `true` (single) | Allow closing the open item (single mode) |
| defaultValue | string \| string[] | — | Initially open value(s) |
| value | string \| string[] | — | Controlled open value(s) |
| onValueChange | (value) => void | — | Controlled change handler |
| className | string | — | Additional classes |

### AccordionItem

| Prop | Type | Default | Description |
|---|---|---|---|
| value | string | required | Unique identifier for the item |
| className | string | — | Additional classes |
| disabled | boolean | false | Disable the item |

### AccordionTrigger

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | — | Additional classes |
| children | ReactNode | — | Trigger label content |
| asChild | boolean | false | Render as child element |

### AccordionContent

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | — | Additional classes |
| children | ReactNode | — | Panel content |
| forceMount | boolean | false | Keep mounted when closed |

## States / Notes

- **Trigger layout**: `flex flex-1 items-center justify-between py-4` — the chevron sits on the right and rotates `rotate-180` when the `[data-state=open]` attribute is present, achieved via `transition-transform duration-200`.
- **Content animation**: Uses Tailwind keyframes `animate-accordion-down` (open) and `animate-accordion-up` (close) for smooth height transitions.
- **Disabled items**: The entire AccordionItem is non-interactive; trigger hover/active styles are suppressed.
- **Nesting**: Avoid nesting Accordion components directly; use separate Accordion instances per section.

### Example

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
- Use single mode for navigation-like panels where only one section should be visible.
- Use multiple mode for filter panels where each section is independent.
- Keep trigger labels concise — one to three words preferred.
- Use consistent content padding inside AccordionContent (`pb-4 pt-0`).

### Don't
- Don't put interactive controls (buttons, inputs) inside AccordionTrigger.
- Don't nest Accordion within Accordion — use separate instances.
- Don't use accordion for tab-like navigation; use Tabs component instead.
- Don't set `collapsible: false` in single mode unless the user must always have one section open.
