# Input / Textarea

## Overview

Native `<input>` and `<textarea>` elements styled to the Cortex form-control convention: dark `bg-surface-dim` surface, ghost border at 20% opacity, compact `text-body-sm` (13px), and a blue-toned focus ring in `k-primary-container`. No CVA, no variants — a single base className applied via `cn()`. Used directly in forms or wrapped with `FormControl` inside the Form compound.

Two reference implementations exist. Both share the canonical default control height `h-9` (36px; the control scale is sm `h-8` / default `h-9` / lg `h-10`):

- **cortex-support-front** (primary, branded) — `h-9`, `rounded-sm`, `ghost-border-20` utility, `focus:ring-2`. This is the canonical Cortex form control documented below.
- **cortex-coder-front** — a near-stock shadcn variant: `rounded-md`, `border-input`, `bg-transparent`, `focus-visible:ring-2`, plus `file:` utilities and `aria-invalid` styling. See "Coder-front variant" below.

## Import

```tsx
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
```

## Reference implementation

Primary source — `cortex-support-front/.../ui/input.tsx`, canonical base className (height normalized to `h-9` per the vNext canon; see the migration note at the end of this file):

```tsx
"flex h-9 w-full rounded-sm border ghost-border-20 bg-surface-dim px-3 py-2 text-body-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-k-primary-container/50 disabled:cursor-not-allowed disabled:opacity-50"
```

`Textarea` (same source) shares the identical base, swapping `h-9` for `min-h-[80px]`:

```tsx
"flex min-h-[80px] w-full rounded-sm border ghost-border-20 bg-surface-dim px-3 py-2 text-body-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-k-primary-container/50 disabled:cursor-not-allowed disabled:opacity-50"
```

The coder-front `Input` base (shadcn) for reference:

```tsx
"file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
// + "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-2"
// + "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
```

> Focus-ring width: stock shadcn ships a 3px ring; Cortex normalizes to `ring-2` at port time.

## Input

There is a single, unvaried style. No CVA, no `variant` prop.

### Props

`Input` forwards a ref and spreads all native `React.InputHTMLAttributes<HTMLInputElement>`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | `undefined` | Additional classes merged with `cn()` |
| `type` | `string` | `"text"` | Native HTML input type |
| `disabled` | `boolean` | `false` | Disables interaction and dims to 50% opacity |
| ... | `HTMLInputElement` attributes | — | All native input attributes pass through |

### States

- **Default**: `bg-surface-dim` background, `text-on-surface` value, `border ghost-border-20` (= `rgba(194,198,214,0.20)`).
- **Placeholder**: `placeholder:text-on-surface-variant/50`.
- **Focus**: `focus:outline-none` removes the native outline; `focus:ring-2 focus:ring-k-primary-container/50` adds the blue focus ring, with no offset. (Note: `focus:`, not `focus-visible:` — the ring marks the active field even on mouse focus.)
- **Disabled**: `disabled:cursor-not-allowed disabled:opacity-50`.
- **Error**: The input itself does not change border color. Errors surface via `FormMessage` text below the field.
- **Hover**: No visual change — surfaces are static.
- **File / selection**: No `file:` or `selection:` utilities in the primary (support-front) component. Those exist only in the coder-front variant.

### Tailwind Classes

| Class | Description |
|---|---|
| `flex` | Flex container |
| `h-9` | Fixed height 36px (canonical default control height) |
| `w-full` | Full width |
| `rounded-sm` | 4px border radius |
| `border ghost-border-20` | Ghost border at 20% opacity (border-color utility, not `border-on-surface-variant/20`) |
| `bg-surface-dim` | App-surface background |
| `px-3 py-2` | 12px horizontal, 8px vertical padding |
| `text-body-sm text-on-surface` | 13px body text in primary text color |
| `placeholder:text-on-surface-variant/50` | Dim placeholder |
| `focus:outline-none focus:ring-2 focus:ring-k-primary-container/50` | Blue focus ring |
| `disabled:cursor-not-allowed disabled:opacity-50` | Disabled state |

## Textarea

Same base styling as `Input`, with `min-h-[80px]` replacing the fixed height. Forwards a ref and spreads native `React.TextareaHTMLAttributes<HTMLTextAreaElement>`. There is no `resize-y` in the source — resize behaviour is browser-default; apply `resize-none` or `resize-y` via `className` when needed.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | `undefined` | Additional classes merged with `cn()` |
| `disabled` | `boolean` | `false` | Disables interaction and dims to 50% opacity |
| `value` | `string` | — | Controlled value |
| `onChange` | `(e: ChangeEvent<HTMLTextAreaElement>) => void` | — | Change handler |
| `placeholder` | `string` | `undefined` | Placeholder text |
| ... | `HTMLTextAreaElement` attributes | — | All native textarea attributes pass through |

### States

- **Default / Focus / Disabled / Placeholder**: Identical to `Input`.
- **Empty**: Shows placeholder; `min-h-[80px]` guarantees minimum height.
- **Filled**: Content scrolls vertically within the textarea.

### Tailwind Classes

| Class | Description |
|---|---|
| `min-h-[80px]` | Minimum height 80px (replaces `h-9`) |
| (all other Input classes apply) | |

## Coder-front variant

The coder-front `Input` is a stock-shadcn function component (not `forwardRef`) with `data-slot="input"` and these notable differences from the primary:

- Sizing: `rounded-md`, `px-3 py-1`, `text-base md:text-sm` (vs. `rounded-sm`, `px-3 py-2`, `text-body-sm`). Height is `h-9` in both — control heights agree across products.
- Surface/border: `bg-transparent` + `border-input` (vs. `bg-surface-dim` + `ghost-border-20`); also `dark:bg-input/30`.
- Focus: `focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-2` (vs. `focus:ring-2 focus:ring-k-primary-container/50`); stock shadcn ships a 3px ring, normalized to `ring-2` at port time.
- Adds `shadow-xs`, `transition-[color,box-shadow]`, `file:` button utilities, `selection:` colors, and `aria-invalid:` border/ring handling.
- Resolves `autoComplete`: defaults to `'new-password'` when `type === 'password'`, otherwise `'off'`.

Prefer the support-front convention for branded Cortex product UI.

## Usage Guidelines

### Do

- Use `type="email"` / `type="password"` etc. to enable native validation and correct keyboards.
- Use `Input` for single-line values (name, email, search, password).
- Use `Textarea` for multi-line content (descriptions, notes, comments).
- Wrap inside `FormControl` when using the Form compound component.
- Use `placeholder` text that describes the expected value.

### Don't

- Do NOT override the focus ring; keep `focus:ring-2 focus:ring-k-primary-container/50`.
- Do NOT use `Input` for rich text or markdown — use the TipTap editor.
- Do NOT add a hover background; surfaces are static.
- Do NOT wrap `Input`/`Textarea` directly in `FormItem` without `FormControl`.
- Do NOT set a fixed height on `Textarea`; adjust `min-h-[...]` to preserve flexibility.

> MIGRATION(vNext): form controls are 36px — replace h-10 with h-9 in input.tsx / select.tsx trigger — affects cortex-support-front (coder-front already ships h-9).
