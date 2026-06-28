# Form

## Overview

Form system built on react-hook-form with Zod validation via `@hookform/resolvers/zod`. Uses a compound component pattern (`Form`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`) wrapping Radix's `Slot` for controlled form fields. A separate `Field` compound component (`Field`, `FieldSet`, `FieldGroup`, `FieldLabel`, `FieldTitle`, `FieldContent`, `FieldDescription`, `FieldError`, `FieldSeparator`, `FieldLegend`) provides an alternative layout-oriented API with orientation modes.

The architecture follows a "no modals for create/edit" rule: create and edit flows are handled as full-page or inline forms, never inside modals.

## Import

```tsx
// react-hook-form based
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/ui/form"

// Field compound
import {
  Field,
  FieldSet,
  FieldGroup,
  FieldLabel,
  FieldTitle,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldSeparator,
  FieldLegend,
} from "@/components/ui/field"
```

## Form (react-hook-form wrapper)

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `form` | `UseFormReturn<T>` | required | Return value from `useForm()` or `useZodForm()` |
| `onSubmit` | `(data: T) => void \| Promise<void>` | required | Form submission handler |
| `className` | `string` | `undefined` | Additional classes |
| `children` | `React.ReactNode` | required | Form content |
| `fieldsetClassName` | `string` | `undefined` | Classes for inner fieldset |
| `id` | `string` | `undefined` | HTML id attribute |

### Sub-components

| Component | Purpose |
|---|---|
| `FormField` | Renders a controlled field via render prop (children receive `field` object) |
| `FormItem` | Wrapper for a single form field group (adds margin/stacking) |
| `FormLabel` | Renders `<label>` with form text styling |
| `FormControl` | Wraps the input element using Radix Slot for controlled behavior |
| `FormDescription` | Descriptive text below the field |
| `FormMessage` | Validation error message (auto-shown when error exists on the field) |

### States

- **Loading**: Disable submit button, show spinner. Mutations managed externally via React Query `useMutation`.
- **Validation error**: Zod schema validation errors surface via `FormMessage` per field. Errors appear after `form.handleSubmit` validation or on blur (configured in `useForm`).
- **Submission error**: Server errors displayed as a toast (sonner) or a top-of-form alert. Handled in the mutation's `onError` callback.
- **Success**: Toast notification, redirect or reset form. Handled in the mutation's `onSuccess` callback.

### Tailwind Classes

| Selector | Purpose |
|---|---|
| `.form-field` | Field spacing container |
| `.form-label` | Label text style |
| `.form-description` | Helper text style |
| `.form-message` | Error text style (k-error color) |

### Usage

```tsx
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
})

function MyForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", description: "" },
  })
  const mutation = useMutation({
    mutationFn: (data) => api.post("/resource", data),
    onSuccess: () => { toast.success("Created"); form.reset() },
    onError: (e) => { toast.error(e.message) },
  })

  return (
    <Form form={form} onSubmit={(data) => mutation.mutateAsync(data)}>
      <FormField
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Enter title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit" loading={mutation.isPending}>Save</Button>
    </Form>
  )
}
```

## Field (layout-oriented compound)

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `orientation` | `"vertical" \| "horizontal" \| "responsive"` | `"vertical"` | Layout direction |

### Orientation modes

| Mode | Behavior |
|---|---|
| `vertical` | Label stacked above content (default). |
| `horizontal` | Label and input side by side (label on left, content on right). |
| `responsive` | Horizontal on `md:` breakpoint and above, vertical on smaller screens. |

### Sub-components

| Component | Description |
|---|---|
| `Field` | Root wrapper, controls orientation |
| `FieldSet` | Groups multiple fields into a logical section |
| `FieldGroup` | Inline group of related controls within a field |
| `FieldLabel` | Label element |
| `FieldTitle` | Section title (bold) |
| `FieldContent` | Wrapper for input/control elements |
| `FieldDescription` | Helper text |
| `FieldError` | Validation error display |
| `FieldSeparator` | Visual divider between sections |
| `FieldLegend` | Legend for a FieldSet |

## FormSection

### Overview

Card-like grouping for form sections with an icon, title, and description. Used to visually separate form sections on the page.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `icon` | `React.ElementType` | required | Lucide icon component |
| `title` | `string` | required | Section heading |
| `description` | `string` | required | Section description |
| `children` | `React.ReactNode` | required | Form fields in this section |
| `className` | `string` | `undefined` | Additional classes |

### Tailwind Classes

| Selector | Purpose |
|---|---|
| `max-w-5xl` | Width cap on the form container |
| `grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5` | Two-column grid on medium+ screens |

## Usage Guidelines

### Do

- Use `FormField` + `FormItem` for individual fields with validation.
- Use `Field` with `orientation="responsive"` for label-input pairs on wide forms.
- Use `FormSection` to group related fields with a descriptive heading.
- Use `grid grid-cols-1 md:grid-cols-2` layout for multi-column forms.
- Cap form width at `max-w-5xl`.
- Handle submission state via `useMutation` from React Query.
- Show validation errors inline via `FormMessage`.

### Don't

- Do NOT use modals for create/edit flows. Use full-page or inline forms.
- Do NOT manage form submission state manually — always use React Query mutations.
- Do NOT use `Field` compound and `Form` compound together in the same form hierarchy; pick one API.
- Do NOT use `horizontal` orientation for very long or complex inputs; prefer `vertical`.
- Do NOT forget to wrap controlled inputs with `FormControl`.
