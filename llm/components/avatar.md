# Avatar

## Overview

User avatar built on Radix UI `Avatar` primitive. Displays an image when available, otherwise shows initials with a deterministic background color. Used in user menus, comment threads, ticket assignments, and user lists.

## Import

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
```

## Sub-components

| Component | Description |
|---|---|
| `Avatar` | Root container with sizing and clipping |
| `AvatarImage` | `<img>` element for the avatar image |
| `AvatarFallback` | Fallback content shown when image is loading or missing |

## Props

### Avatar

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | `undefined` | Additional classes |
| `children` | `React.ReactNode` | required | AvatarImage + AvatarFallback |

### AvatarImage

| Prop | Type | Default | Description |
|---|---|---|---|
| `src` | `string` | required | Image URL |
| `alt` | `string` | `""` | Alt text |
| `className` | `string` | `undefined` | Additional classes |

### AvatarFallback

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | `undefined` | Additional classes |
| `children` | `React.ReactNode` | required | Fallback content (typically initials) |
| `delayMs` | `number` | `undefined` | Delay before showing fallback (ms) |

## Styling

| Part | CSS Classes | Description |
|---|---|---|
| Avatar wrapper | `relative flex h-10 w-10 shrink-0 overflow-hidden rounded-sm` | 40x40px, no overflow, rounded-sm (4px) |
| AvatarImage | `aspect-square h-full w-full` | Fills container maintaining aspect ratio |
| AvatarFallback | `flex h-full w-full items-center justify-center rounded-sm bg-surface-container-high text-on-surface` | Centered initials, container background color |

## Variants

| Variant | Size Classes | Description |
|---|---|---|
| Default | `h-10 w-10` | 40x40px, standard user avatar |
| Small | `h-8 w-8` | 32x32px, compact contexts |
| Large | `h-12 w-12` | 48x48px, profile pages |
| XSmall | `h-6 w-6` | 24x24px, inline/badge contexts |

## Helper Functions

### getInitials(name: string): string

Returns the first letter of the first name and first letter of the last name, uppercased.

```
getInitials("John Doe")       // "JD"
getInitials("Alice")          // "A"
getInitials("")               // ""
getInitials("  ")             // ""
getInitials("Jean-Claude Van Damme")  // "JV"
```

Implementation: split on whitespace, filter empty, take first char of first and last tokens.

### getAvatarColor(name: string): string

Returns a deterministic background color from a palette based on a hash of the name. Same name always produces the same color.

Palette:
```
#4D8EFF (blue)
#4ADE80 (green)
#F87171 (red)
#FBBF24 (yellow)
#A78BFA (purple)
#F472B6 (pink)
#34D399 (emerald)
#FB923C (orange)
#60A5FA (light blue)
#E879F9 (fuchsia)
```

Hash algorithm: sum of char codes at positions 0, 2, 4, 6, 8, 10 modulo palette length. Handles empty strings (returns first color).

## States

- **Image loaded**: AvatarImage renders the user photo filling the container.
- **Image loading**: AvatarFallback shows initials (with optional `delayMs` to prevent flash).
- **Image error**: AvatarFallback shows initials (Radix handles error recovery).
- **No image (initials only)**: AvatarFallback with `getInitials(name)` result and `getAvatarColor(name)` background.
- **Empty name**: AvatarFallback shows a generic user icon or empty.

## Tailwind Classes

| Selector | Description |
|---|---|
| `relative flex h-10 w-10 shrink-0 overflow-hidden rounded-sm` | Avatar wrapper |
| `aspect-square h-full w-full` | AvatarImage fill |
| `flex h-full w-full items-center justify-center rounded-sm bg-surface-container-high text-on-surface` | AvatarFallback centering |

## Usage Guidelines

### Do

- Always provide `AvatarImage` with a valid `src` when an image is available.
- Always provide `AvatarFallback` with `getInitials(name)` as children.
- Use `getAvatarColor(name)` on the fallback via `style={{ backgroundColor: getAvatarColor(name) }}` for deterministic color coding.
- Use `delayMs={500}` on AvatarFallback to avoid flashing initials when images load quickly.
- Set `alt` on AvatarImage for accessibility.

### Don't

- Do NOT rely on AvatarImage alone — always include AvatarFallback for loading/error states.
- Do NOT hardcode background colors on AvatarFallback; use `getAvatarColor()`.
- Do NOT use Avatar without a meaningful `alt` attribute.
- Do NOT stretch the avatar — sizing is fixed per variant.
- Do NOT add border radius override; `rounded-sm` is the standard.
