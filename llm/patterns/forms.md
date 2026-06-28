# Forms

## Overview

Form system built on `react-hook-form` with Zod validation via `@hookform/resolvers`. Uses a 2-column grid layout on desktop, single column on mobile. Field groups are wrapped in `FormSection` cards with icon, title, and description. All create/edit flows use dedicated pages — never modals.

## Key Rules

- **Grid layout**: `grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5` — single column on mobile, two columns above md breakpoint.
- **Full-width fields**: Use `md:col-span-2` for fields that should span both columns (rich text editors, textareas, multi-selects).
- **FormSection**: A card-like container `rounded-sm p-4 border border-[rgba(194,198,214,0.15)]` with an icon, title, and description header for grouping related fields.
- **Field orientation**:
  - **Vertical** (default): Label above input, stacked layout.
  - **Horizontal**: Label and input side by side (`flex items-center gap-4`) — used for toggles, switches, and compact fields.
- **Validation**: Zod schemas defined alongside the form, resolved via `zodResolver`.
- **Error state**: Input border becomes `border-k-error/50`, and a `FormMessage` appears below the field with the error text in `text-k-error text-sm`.
- **Submit button**: `flex justify-end gap-2` at the bottom of the form, with a primary submit button and a secondary cancel button.
- **View/Edit toggle**: Detail pages accept `?mode=edit` query parameter. When absent, the page renders in view mode (read-only). When present, fields become editable.
- **NO modals for create/edit**: All creation and editing happens on dedicated route pages, never in modals, sheets, or drawers.

## Props

### FormSection

| Prop | Type | Default | Description |
|---|---|---|---|
| icon | LucideIcon | — | Icon displayed in the section header |
| title | string | — | Section title |
| description | string | — | Section description (supports text-sm, text-on-surface-variant) |
| className | string | — | Additional classes |
| children | ReactNode | — | Form fields |

### FormField

| Prop | Type | Default | Description |
|---|---|---|---|
| name | string | required | Field name matching the Zod schema |
| control | Control | required | React Hook Form control |
| render | (field) => ReactNode | — | Render prop for the input component |

### FormItem

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | — | Additional classes |
| children | ReactNode | — | Label + input + message |

### FormLabel

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | — | Additional classes |
| children | ReactNode | — | Label text |
| required | boolean | false | Appends an asterisk indicator |

### FormMessage

| Prop | Type | Default | Description |
|---|---|---|---|
| className | string | — | Additional classes |
| children | ReactNode | — | Error message content |

## Form Patterns

### Standard validation schema

```tsx
import { z } from "zod"

const ticketSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  classificationId: z.string().min(1, "Classification is required"),
  tags: z.array(z.string()).optional(),
})

type TicketFormValues = z.infer<typeof ticketSchema>
```

### Form with sections

```tsx
const form = useForm<TicketFormValues>({
  resolver: zodResolver(ticketSchema),
  defaultValues: {
    title: "",
    priority: "medium",
  },
})

return (
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    {/* Basic Information */}
    <FormSection
      icon={Info}
      title="Basic Information"
      description="Provide the main details for this ticket."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        {/* Title — full width */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel required>Title</FormLabel>
              <Input placeholder="Enter ticket title" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Priority */}
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Classification */}
        <FormField
          control={form.control}
          name="classificationId"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Classification</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select classification" />
                </SelectTrigger>
                <SelectContent>
                  {classifications.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </FormSection>

    {/* Description */}
    <FormSection
      icon={FileText}
      title="Description"
      description="Detailed description of the issue."
    >
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <RichTextEditor value={field.value} onChange={field.onChange} />
            <FormMessage />
          </FormItem>
        )}
      />
    </FormSection>

    {/* Submit */}
    <div className="flex justify-end gap-2">
      <Button type="button" variant="outline" onClick={() => navigate(-1)}>
        Cancel
      </Button>
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? <Spinner /> : "Create Ticket"}
      </Button>
    </div>
  </form>
)
```

### View / Edit toggle

```tsx
function TicketDetailPage() {
  const search = useSearch({ from: ticketRoute })
  const isEdit = search.mode === "edit"

  return (
    <div>
      <PageHeader
        title="Ticket Detail"
        action={
          !isEdit ? (
            <Button onClick={() => navigate({ to: ".", search: { mode: "edit" } })}>
              <Edit3 className="w-4 h-4" /> Edit
            </Button>
          ) : null
        }
      />
      {isEdit ? <TicketEditForm /> : <TicketView />}
    </div>
  )
}
```

## States / Notes

- **Loading state**: Disable all inputs and show `Spinner` in the submit button during submission.
- **Error state (API)**: Show a toast (`sonner`) on mutation error, or an inline alert at the top of the form.
- **Success state**: Show a success toast and redirect to the detail page or list.
- **Dirty state**: Enable submit button only when `form.formState.isDirty` is true (optional, depends on UX).
- **Unsaved changes**: Warn before navigating away when `form.formState.isDirty` is true (use `window.onbeforeunload` or router blocker).

## Usage Guidelines

### Do
- Group related fields under `FormSection` cards with clear titles and descriptions.
- Use `md:col-span-2` for description fields and rich text editors.
- Always validate with Zod schemas — never use inline `required` props alone.
- Use the `?mode=edit` query parameter pattern for detail/edit page toggle.
- Place submit and cancel buttons at `flex justify-end gap-2` at the bottom.

### Don't
- Don't use modals, sheets, or drawers for create/edit forms — always use dedicated pages.
- Don't put more than 8 fields in a single FormSection — split into multiple sections.
- Don't forget to handle the loading/disabled state during submission.
- Don't mix vertical and horizontal field orientations in the same section.
