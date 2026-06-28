# Input / Textarea

## Overview

Base text input and textarea components styled consistently with the design system. Both share the same visual language: dark surface background, ghost borders, and focus rings in k-primary-container. Used directly in forms or wrapped with `FormControl` when using the Form compound.

## Import

```tsx
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
```

## Input

### Variants

| Variant | CSS Classes | Visual Description | Use Case |
|---|---|---|---|
| Default | `h-10 w-full rounded-sm border border-on-surface-variant/20 bg-surface-dim px-3 py-2 text-body-sm text-on-surface` | Dark background, subtle border, small body text | Standard text, email, password inputs |
| File | `h-10 w-full rounded-sm border border-on-surface-variant/20 bg-surface-dim px-3 py-2 text-body-sm text-on-surface file:text-body-sm file:font-medium` | Same as default, with file-button styling | File upload fields |

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | `undefined` | Additional classes merged with `cn()` |
| `type` | `string` | `"text"` | HTML input type |
| `disabled` | `boolean` | `false` | Disables interaction and dims appearance |
| ... | HTMLInputElement props | — | All native input attributes pass through |

### States

- **Default**: Dark background (`bg-surface-dim`), `text-on-surface` value, ghost border at 20% opacity.
- **Placeholder**: Text rendered in `text-on-surface-variant/50`.
- **Focus**: `outline-none` removes default outline, `ring-2 ring-k-primary-container/50` provides a blue-toned focus ring.
- **Disabled**: `opacity-50 cursor-not-allowed`, prevents interaction.
- **Error**: Applied via parent `FormMessage` — the input itself does not change border color; error is shown as text below.
- **File input**: Uses native file button styling via `file:` prefix utilities.
- **Hover**: No visual change (consistent with design system).

### Tailwind Classes

| Selector | Description |
|---|---|
| `.input` | Base input class |
| `h-10` | Fixed height 40px |
| `w-full` | Full width |
| `rounded-sm` | 4px border radius |
| `border border-on-surface-variant/20` | Ghost border |
| `bg-surface-dim` | Dark surface background |
| `px-3 py-2` | Horizontal 12px, vertical 8px padding |
| `text-body-sm text-on-surface` | 13px body text in on-surface color |
| `placeholder:text-on-surface-variant/50` | Dim placeholder |
| `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-k-primary-container/50` | Focus ring |
| `disabled:opacity-50 disabled:cursor-not-allowed` | Disabled state |

## Textarea

### Variants

| Variant | CSS Classes | Visual Description | Use Case |
|---|---|---|---|
| Default | `flex w-full rounded-sm border border-on-surface-variant/20 bg-surface-dim px-3 py-2 text-body-sm text-on-surface placeholder:text-on-surface-variant/50 min-h-[80px]` | Same styling as Input but taller with resizable height | Multi-line text, descriptions, comments |

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | `undefined` | Additional classes merged with `cn()` |
| `disabled` | `boolean` | `false` | Disables interaction and dims appearance |
| `value` | `string` | `""` | Controlled value |
| `onChange` | `(e: ChangeEvent<HTMLTextAreaElement>) => void` | — | Change handler |
| `placeholder` | `string` | `undefined` | Placeholder text |
| ... | HTMLTextAreaElement props | — | All native textarea attributes pass through |

### States

- **Default**: Same as Input — dark background, ghost border, small body text.
- **Placeholder**: `text-on-surface-variant/50`.
- **Focus**: `outline-none ring-2 ring-k-primary-container/50`.
- **Disabled**: `opacity-50 cursor-not-allowed`.
- **Empty**: Shows placeholder, `min-h-[80px]` ensures minimum height.
- **Filled**: Content scrolls vertically within the textarea.

### Tailwind Classes

| Selector | Description |
|---|---|
| `min-h-[80px]` | Minimum height 80px |
| `resize-y` | Vertically resizable (applied via className when needed) |
| (all Input classes apply) | |

## Usage Guidelines

### Do

- Use `type="email"` for email fields to enable browser validation.
- Use `Input` for single-line values (name, email, search, password).
- Use `Textarea` for multi-line content (descriptions, notes, comments).
- Wrap inside `FormControl` when using the Form compound component.
- Use `placeholder` text that describes the expected value.

### Don't

- Do NOT override the focus ring styling; keep `ring-k-primary-container/50`.
- Do NOT use Input for rich text or markdown editing — use the TipTap editor.
- Do NOT change background color on hover; the system uses static backgrounds.
- Do NOT wrap Input/Textarea directly in `FormItem` without `FormControl`.
- Do NOT set custom heights on Textarea via className; use `min-h` instead to preserve flexibility.
