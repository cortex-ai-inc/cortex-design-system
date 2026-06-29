# Avatar

## Overview

User avatar built on the Radix UI `Avatar` primitive. Displays an image when one loads successfully, otherwise shows fallback content (typically initials) on a surface tint. Used in user menus, comment threads, ticket assignments, and user lists.

The Cortex variant uses `rounded-sm` (4px), **not** the shadcn default `rounded-full`. Default size is `h-10 w-10` (40px).

## Import

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
```

## Anatomy / Sub-components

| Component | Description |
|---|---|
| `Avatar` | Root container; fixed size, clips overflow, `rounded-sm` |
| `AvatarImage` | `<img>` element; fills the container preserving aspect ratio |
| `AvatarFallback` | Shown while the image loads or if it fails — centered content on `bg-surface-container-high` |

```tsx
<Avatar>
  <AvatarImage src={user.avatarUrl} alt={user.name} />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

## Reference implementation

Core className strings, quoted verbatim from `cortex-support-front` (primary source):

```tsx
// Avatar (Root)
"relative flex h-10 w-10 shrink-0 overflow-hidden rounded-sm"

// AvatarImage
"aspect-square h-full w-full"

// AvatarFallback
"flex h-full w-full items-center justify-center rounded-sm bg-surface-container-high text-on-surface"
```

All three are thin wrappers over `AvatarPrimitive.Root` / `.Image` / `.Fallback` via `React.forwardRef`; the only custom styling is the className above. There is no `cva`, no variant prop, and no `data-slot` attribute.

> Variation: `cortex-coder-front` ships the unmodified shadcn defaults (`size-8`, `rounded-full`, `bg-muted` fallback). Cortex products follow the `cortex-support-front` styling above: `h-10 w-10`, `rounded-sm`, `bg-surface-container-high text-on-surface`.

## Props

All props pass through to the underlying Radix primitives.

### Avatar

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | `undefined` | Additional classes (e.g. to override size) |
| `children` | `React.ReactNode` | required | `AvatarImage` + `AvatarFallback` |

### AvatarImage

| Prop | Type | Default | Description |
|---|---|---|---|
| `src` | `string` | required | Image URL |
| `alt` | `string` | `""` | Alt text |
| `onLoadingStatusChange` | `(status) => void` | `undefined` | Radix callback: `idle \| loading \| loaded \| error` |
| `className` | `string` | `undefined` | Additional classes |

### AvatarFallback

| Prop | Type | Default | Description |
|---|---|---|---|
| `delayMs` | `number` | `undefined` | Delay before rendering fallback (avoids flash on fast loads) |
| `className` | `string` | `undefined` | Additional classes |
| `children` | `React.ReactNode` | required | Fallback content (typically initials) |

## Styling

| Part | CSS Classes | Notes |
|---|---|---|
| Avatar (root) | `relative flex h-10 w-10 shrink-0 overflow-hidden rounded-sm` | 40×40px, clips children, 4px radius |
| AvatarImage | `aspect-square h-full w-full` | Fills container, square aspect ratio |
| AvatarFallback | `flex h-full w-full items-center justify-center rounded-sm bg-surface-container-high text-on-surface` | Centered content, `#282A30` tint, primary text |

### Resizing

There is no `size` prop. Override dimensions by passing utility classes through `className` on the root:

```tsx
<Avatar className="h-8 w-8">…</Avatar>   {/* 32px */}
<Avatar className="h-6 w-6">…</Avatar>   {/* 24px, inline */}
<Avatar className="h-12 w-12">…</Avatar> {/* 48px, profile */}
```

## States

| State | Behavior |
|---|---|
| Image loaded | `AvatarImage` renders the photo filling the container. |
| Image loading | `AvatarFallback` is shown (use `delayMs` to avoid a flash). |
| Image error / missing | Radix swaps to `AvatarFallback` automatically. |
| No `src` provided | Only `AvatarFallback` renders. |

Radix manages the load/error transition internally based on `AvatarImage`'s loading status — no manual error handling required.

## Usage Guidelines

### Do

- Always pair `AvatarImage` with an `AvatarFallback` so loading and error states have content.
- Put initials (or a lucide user icon) in `AvatarFallback`.
- Set a meaningful `alt` on `AvatarImage` for accessibility.
- Use `delayMs={600}` on `AvatarFallback` to avoid flashing initials when images load quickly.
- Resize via `className` (`h-8 w-8`, `h-6 w-6`, etc.) — keep width and height equal.

### Don't

- Do NOT render `AvatarImage` alone — always include `AvatarFallback`.
- Do NOT change the radius to `rounded-full`; Cortex avatars are `rounded-sm`.
- Do NOT stretch the avatar; keep it square (`aspect-square` on the image enforces this).
- Do NOT expect a `getInitials`/`getAvatarColor` helper or a `variant`/`size` prop — none exist in this component. Compute initials and any deterministic color at the call site and pass them in.
