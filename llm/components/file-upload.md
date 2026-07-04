# FileUpload

> Status: new component — no product source yet. This spec is the canonical target for generation.

## Overview

Compound component for uploading files via drag-and-drop or click-to-browse. Built on a **native `<input type="file">`** (visually hidden) plus **HTML5 drag events** (`dragenter` / `dragover` / `dragleave` / `drop`) — no library is required. `react-dropzone` is an OPTIONAL convenience for hook-based state management, not a dependency of this spec.

Selected files render as a list of **Item** rows (see `item.md`) below the dropzone: uploading rows embed a **Progress** bar (see `progress.md`), completed rows show a green check, failed rows tint red and offer a retry action. Files rejected client-side (wrong type, too large) never enter the list — they surface as an error Alert below the dropzone (see `alert.md`).

## Import

```tsx
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadList,
  FileUploadItem,
} from "@/components/ui/file-upload"
```

## Anatomy

```
FileUpload                    — root; owns file state, renders the hidden <input type="file">
  └─ FileUploadDropzone       — click + drag target; keyboard-accessible
  └─ FileUploadList           — renders as ItemGroup (role="list")
       └─ FileUploadItem      — Item variant="outline" size="sm", one per file
            ├─ ItemMedia      — variant="icon"; File / FileText / Image lucide icon
            ├─ ItemContent    — ItemTitle (filename) + ItemDescription (size / status)
            │    └─ Progress  — only while uploading (h-1.5, with percent label)
            └─ ItemActions    — ghost icon Buttons: X (remove) / RotateCw (retry)
```

`FileUploadList` and `FileUploadItem` are thin wrappers over the Item family — they reuse `ItemGroup`, `Item`, `ItemMedia`, `ItemContent`, `ItemTitle`, `ItemDescription`, and `ItemActions` verbatim rather than reinventing row layout.

## Dropzone

Full class recipe for `FileUploadDropzone`:

```
"flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed ghost-border-20 bg-transparent p-8 text-center cursor-pointer transition-colors hover:bg-surface-container-low/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-k-primary-container/50"
```

| Part | Recipe |
|---|---|
| Icon box | `size-8 border rounded-sm` container (same recipe as `ItemMedia variant="icon"`), holding `UploadCloud` at `w-5 h-5 text-on-surface-variant` |
| Primary line | `text-body-sm text-on-surface` — "Drag files here or click to browse" |
| Constraint hint | `text-body-sm text-on-surface-variant/70` — e.g. "PNG, PDF up to 10 MB" |

The dashed `border-2` is the one sanctioned exception to the "no heavy borders" rule — it signals a drop target. Radius stays `rounded-md` (6px), respecting the 6px cap.

### Keyboard & accessibility

- Dropzone renders with `role="button"` and `tabIndex={0}`; **Enter** and **Space** open the file dialog (they forward a click to the hidden input).
- The constraint hint has an `id`, and the dropzone points at it with `aria-describedby`, so screen readers announce the accepted types/size limit.
- The hidden input carries the `accept` and `multiple` attributes so the native dialog pre-filters files.
- When disabled: `aria-disabled="true"` plus `opacity-50 pointer-events-none`.
- Focus ring is always 2px: `focus-visible:ring-2 focus-visible:ring-k-primary-container/50` on the dropzone; the ghost icon buttons inside rows use the standard control ring (`focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`).

## States

| State | Recipe | Notes |
|---|---|---|
| Idle | Base dropzone recipe above | Dashed `ghost-border-20`, transparent fill |
| Dragover | `data-[dragover]:border-k-primary-container data-[dragover]:bg-k-primary-container/5` | Set `data-dragover` on `dragenter`, clear on `dragleave`/`drop`; solid blue border + 5% blue tint |
| Uploading (row) | `Progress` at `h-1.5` inside `ItemContent`, percent in `text-code-sm text-on-surface-variant` right-aligned next to the title | Progress indicator is `bg-k-primary-container` per `progress.md` |
| Success (row) | `Check` icon `w-4 h-4 text-k-secondary` (or `StatusDot status="success"`); `ItemDescription` shows size · "Uploaded" | Green = success, per semantic color rules |
| Error (row) | Item border `border-k-error/40`, `ItemTitle` gets `text-k-error`, failure reason in the description; `ItemActions` shows a RotateCw retry ghost button | Follows the semantic tint ladder (rest /20 → hover /30 → border /40) used by destructive Button |
| Rejected (pre-upload) | File never enters the list; an error Alert (`alert.md`, destructive variant) renders below the dropzone naming the file and the violated constraint | E.g. "report.docx — file type not accepted" |
| Disabled | `opacity-50 pointer-events-none` on the dropzone + `disabled` on the hidden input | Standard disabled recipe |

## Props

### FileUpload (root)

| Prop | Type | Default | Description |
|---|---|---|---|
| accept | `string` | — | Accepted MIME types / extensions, forwarded to the hidden input (e.g. `"image/png,.pdf"`) |
| maxSize | `number` | — | Max file size in bytes; larger files fire `onFileRejected` |
| maxFiles | `number` | — | Max number of files; extra files fire `onFileRejected` |
| multiple | `boolean` | `false` | Allow multi-select / multi-drop, forwarded to the hidden input |
| disabled | `boolean` | `false` | Disables the dropzone and hidden input |
| onFilesAccepted | `(files: File[]) => void` | — | Called with files that pass all constraints |
| onFileRejected | `(file: File, reason: "type" \| "size" \| "count") => void` | — | Called per rejected file; drive the rejection Alert from this |
| onRemove | `(file: File) => void` | — | Called when a row's X action is clicked |
| onRetry | `(file: File) => void` | — | Called when a failed row's RotateCw action is clicked |
| className | `string` | — | Additional classes merged via `cn()` |
| children | `ReactNode` | — | Dropzone + list |

### FileUploadDropzone / FileUploadList / FileUploadItem

| Component | Props | Notes |
|---|---|---|
| FileUploadDropzone | `className`, `children`, `...div` | `role="button"`, `tabIndex={0}`, `aria-describedby` wired by the root |
| FileUploadList | `className`, `children`, `...div` | Renders `ItemGroup` (`role="list"`) |
| FileUploadItem | `file: File`, `status: "uploading" \| "success" \| "error"`, `progress?: number`, `className` | Renders `Item variant="outline" size="sm"` |

## Reference implementation

Row composition (uploading state):

```tsx
<FileUploadList>
  <FileUploadItem file={file} status="uploading" progress={45} asChild>
    <Item variant="outline" size="sm">
      <ItemMedia variant="icon">
        <FileText className="w-4 h-4" strokeWidth={1.5} />
      </ItemMedia>
      <ItemContent>
        <div className="flex items-center justify-between gap-2">
          <ItemTitle>quarterly-report.pdf</ItemTitle>
          <span className="text-code-sm text-on-surface-variant">45%</span>
        </div>
        <Progress value={45} className="h-1.5" />
      </ItemContent>
      <ItemActions>
        <Button variant="ghost" size="icon" aria-label="Remove file">
          <X className="w-4 h-4" strokeWidth={1.5} />
        </Button>
      </ItemActions>
    </Item>
  </FileUploadItem>
</FileUploadList>
```

Error row (failed upload):

```tsx
<Item variant="outline" size="sm" className="border-k-error/40">
  <ItemMedia variant="icon">
    <File className="w-4 h-4" strokeWidth={1.5} />
  </ItemMedia>
  <ItemContent>
    <ItemTitle className="text-k-error">design-mockups.fig</ItemTitle>
    <ItemDescription className="text-k-error/80">Upload failed — network error · 8.1 MB</ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button variant="ghost" size="icon" aria-label="Retry upload" onClick={() => onRetry(file)}>
      <RotateCw className="w-4 h-4" strokeWidth={1.5} />
    </Button>
    <Button variant="ghost" size="icon" aria-label="Remove file" onClick={() => onRemove(file)}>
      <X className="w-4 h-4" strokeWidth={1.5} />
    </Button>
  </ItemActions>
</Item>
```

## Usage patterns

```tsx
<FileUpload
  accept="image/png,.pdf"
  maxSize={10 * 1024 * 1024}
  maxFiles={5}
  multiple
  onFilesAccepted={startUploads}
  onFileRejected={(file, reason) => setRejections((r) => [...r, { file, reason }])}
  onRemove={removeFile}
  onRetry={retryUpload}
>
  <FileUploadDropzone>
    <div className="flex size-8 items-center justify-center rounded-sm border">
      <UploadCloud className="w-5 h-5 text-on-surface-variant" strokeWidth={1.5} />
    </div>
    <p className="text-body-sm text-on-surface">Drag files here or click to browse</p>
    <p className="text-body-sm text-on-surface-variant/70">PNG, PDF up to 10 MB</p>
  </FileUploadDropzone>
  {rejections.length > 0 && <Alert variant="destructive">…</Alert>}
  <FileUploadList>{files.map((f) => <FileUploadItem key={f.name} file={f} … />)}</FileUploadList>
</FileUpload>
```

## Usage Guidelines

### Do
- State the accepted types and max size upfront in the dropzone hint (`aria-describedby` points at it).
- List every accepted file as an Item row so users can track, remove, and retry individual uploads.
- Offer a retry action on failed rows — never force a full re-drop for one failed file.
- Validate `accept` / `maxSize` / `maxFiles` client-side and surface rejections in an error Alert below the dropzone.

### Don't
- Don't auto-upload silently without rendering the file list — users need per-file progress and control.
- Don't put upload flows inside modals — uploads belong on dedicated pages or page sections (create/edit flows are never modal).
- Don't rely on drag-and-drop alone — the dropzone must stay clickable and keyboard-operable (Enter/Space).
- Don't put light text on the dragover tint or swap the dashed border for a solid one at rest.

## Related

- `item.md` — row anatomy the file list is built from
- `progress.md` — uploading progress bar
- `alert.md` — rejection error banner below the dropzone
- `empty-state.md` — placeholder when a file manager view has no uploads yet
