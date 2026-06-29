# Form

## Overview

Thin compound wrapper around **react-hook-form** (shadcn/ui New York style). It wires field state, accessibility ids, and error styling into a small set of components: `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`. A `useFormField` hook exposes the active field's id/name/error.

There is no custom submit wrapper or styling shell — `Form` is simply react-hook-form's `FormProvider`, and submission is wired with the native `<form onSubmit={form.handleSubmit(...)}>`. This follows the "no modals for create/edit" rule: create and edit flows are full-page or inline forms, never modals.

## Import

```tsx
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useFormField,
} from "@/components/ui/form"
```

## Anatomy

| Component | Underlying | Purpose |
|---|---|---|
| `Form` | `FormProvider` (react-hook-form) | Provides form context. Spread the `useForm()` return into it. |
| `FormField` | `Controller` | Renders a controlled field via `render` prop; child receives `{ field, fieldState, formState }`. |
| `FormItem` | `<div>` | Field group wrapper. Generates a `useId()` for label/description/message wiring. |
| `FormLabel` | `Label` (`@/components/ui/label`, wraps Radix `LabelPrimitive.Root`) | Label bound to the control via `htmlFor`; turns destructive on error. |
| `FormControl` | `Slot` (Radix) | Wraps the input, injecting `id`, `aria-describedby`, `aria-invalid`. |
| `FormDescription` | `<p>` | Muted helper text below the field. |
| `FormMessage` | `<p>` | Validation error text. Renders `null` when there is no error/children. |
| `useFormField` | hook | Returns `{ id, name, formItemId, formDescriptionId, formMessageId, ...fieldState }`. |

> `Form` is a re-export of `FormProvider` — there is **no** custom `form`/`onSubmit`/`fieldsetClassName` prop. There is **no** `FormSection` component and **no** `.form-field`/`.form-label` CSS utility classes. Wire submission yourself with `<form onSubmit={form.handleSubmit(onSubmit)}>`.

## Element classes

| Component | className (verbatim) | Notes |
|---|---|---|
| `FormItem` | `grid gap-2` | Stacks label, control, description, message. |
| `FormLabel` | `data-[error=true]:text-destructive` | Inherits all `Label` base styles; `data-error` set from field error. `text-destructive` maps to the `k-error` (`#F87171`) token. |
| `FormDescription` | `text-muted-foreground text-sm` | `text-muted-foreground` maps to `on-surface-variant`. |
| `FormMessage` | `text-destructive text-sm` | Error color = `k-error` (`#F87171`). |

## Accessibility wiring

`useFormField` derives stable ids from the `FormItem` id:

- `formItemId` → `${id}-form-item` (set as the control's `id`)
- `formDescriptionId` → `${id}-form-item-description`
- `formMessageId` → `${id}-form-item-message`

`FormControl` applies `aria-invalid={!!error}` and points `aria-describedby` at the description id (and additionally the message id when an error is present). `FormLabel` sets `htmlFor={formItemId}`.

## States

- **Default**: Description shown (if present), no message.
- **Error**: `FormLabel` gets `data-error="true"` → `text-destructive`; `FormMessage` renders the error string in `text-destructive`; `FormControl` sets `aria-invalid`.
- **No message**: `FormMessage` returns `null` when there is neither an error nor `children`.
- **Submission / loading / success**: Not handled by these components. Manage via the submit handler (e.g. React Query `useMutation`) and disable the submit button / show a spinner externally.

## Usage

```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"

const schema = z.object({
  title: z.string().min(1, "Title is required"),
})

function MyForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { title: "" },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => console.log(data))}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormDescription>Shown in lists and headings.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  )
}
```

## Reference implementation

```tsx
const Form = FormProvider

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId()
  return (
    <FormItemContext.Provider value={{ id }}>
      <div data-slot="form-item" className={cn("grid gap-2", className)} {...props} />
    </FormItemContext.Provider>
  )
}

function FormLabel({ className, ...props }) {
  const { error, formItemId } = useFormField()
  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()
  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  )
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField()
  return (
    <p data-slot="form-description" id={formDescriptionId}
       className={cn("text-muted-foreground text-sm", className)} {...props} />
  )
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : props.children
  if (!body) return null
  return (
    <p data-slot="form-message" id={formMessageId}
       className={cn("text-destructive text-sm", className)} {...props}>
      {body}
    </p>
  )
}
```

## Usage Guidelines

### Do

- Spread `useForm()` into `Form` (`<Form {...form}>`) and wire submission with `<form onSubmit={form.handleSubmit(onSubmit)}>`.
- Pass `control={form.control}` and a `name` to every `FormField`, and use its `render` prop.
- Wrap the actual input in `FormControl` so id / `aria-describedby` / `aria-invalid` are applied.
- Use `FormMessage` (no children) to auto-display the field's validation error.
- Group fields with `grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5`; cap form width at `max-w-5xl`.

### Don't

- Do NOT pass `form`/`onSubmit`/`fieldsetClassName` props to `Form` — they do not exist; `Form` is `FormProvider`.
- Do NOT reference a `FormSection` component or `.form-field`/`.form-label` classes — they are not part of this module.
- Do NOT use modals for create/edit flows — use full-page or inline forms.
- Do NOT forget to wrap controlled inputs in `FormControl`.
