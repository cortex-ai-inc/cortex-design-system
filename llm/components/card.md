# Card

## Overview

Container component for grouping related content. Composed of multiple sub-components for flexible layout. Uses shadcn/ui Card pattern with slotted sub-components.

**Import path**: `@/components/ui/card`

**Dependencies**: class-variance-authority

**Note**: Available in cortex-coder-front but NOT in cortex-support-front.

## Import

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
```

## Sub-Components

| Component | Role | Styling |
|---|---|---|
| Card | Root container | border ghost-border, bg-card (CSS variable), rounded-md, shadow-xs |
| CardHeader | Top section (title + description + action) | flex flex-col gap-1.5 p-5 |
| CardTitle | Heading within header | text-title-sm font-semibold |
| CardDescription | Subtitle or helper text | text-body-sm text-on-surface-variant |
| CardAction | Action slot in header | ml-auto (pushes to the right in flex row) |
| CardContent | Main body content | p-5 pt-0 (no top padding when preceded by header) |
| CardFooter | Bottom action area | flex items-center p-5 pt-0 |

## Props

### Card

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | undefined | Additional CSS classes via cn() |
| children | ReactNode | required | Card content (typically CardHeader, CardContent, CardFooter) |

### CardHeader

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | undefined | Additional CSS classes via cn() |
| children | ReactNode | required | Typically CardTitle, CardDescription, CardAction |

### CardTitle

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | undefined | Additional CSS classes via cn() |
| children | ReactNode | required | Title text or content |

### CardDescription

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | undefined | Additional CSS classes via cn() |
| children | ReactNode | required | Description text or content |

### CardAction

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | undefined | Additional CSS classes via cn() |
| children | ReactNode | required | Action elements (buttons, dropdowns, etc.) |

### CardContent

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | undefined | Additional CSS classes via cn() |
| children | ReactNode | required | Main content |

### CardFooter

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | undefined | Additional CSS classes via cn() |
| children | ReactNode | required | Footer actions (typically buttons) |

## States

- **Default**: Static container with ghost border and subtle shadow. No interactive states on the card itself.
- **Hover (if interactive)**: When a card needs to be clickable, wrap it with a Link or use a Button with `asChild`. The card itself does not have hover styling.
- **Empty**: CardContent should handle its own empty state with appropriate messaging.

## Layout Patterns

### Standard Card with Header, Content, Footer

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Optional description</CardDescription>
    <CardAction>
      <Button variant="ghost" size="icon">...</Button>
    </CardAction>
  </CardHeader>
  <CardContent>
    Main content here
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Header with Action on Right

CardHeader with CardTitle + CardDescription on the left and CardAction on the right:

```tsx
<CardHeader className="flex-row items-center justify-between">
  <div className="flex flex-col gap-1">
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </div>
  <CardAction>
    <Button variant="ghost" size="icon">...</Button>
  </CardAction>
</CardHeader>
```

## Tailwind Classes (key selectors)

```css
/* Card root */
rounded-md border bg-card text-card-foreground shadow-xs

/* CardHeader */
flex flex-col gap-1.5 p-5

/* CardTitle */
text-title-sm font-semibold leading-none tracking-tight

/* CardDescription */
text-body-sm text-on-surface-variant

/* CardContent */
p-5 pt-0

/* CardFooter */
flex items-center p-5 pt-0
```

## Usage Guidelines

### Do

- Use CardHeader for titles and descriptions with consistent padding.
- Use CardAction for placing actions (buttons, dropdowns) in the header area aligned to the right.
- Use CardContent for the main body with standard padding.
- Use CardFooter for action buttons at the bottom.
- Keep card content concise and scannable.

### Don't

- Don't put interactive elements directly in CardContent without proper spacing -- use CardFooter for actions.
- Don't nest Cards inside other Cards -- it creates visual confusion.
- Don't remove the border from Cards -- the ghost border defines the card container.
- Don't use Cards for single-line items -- use a list or table instead.
