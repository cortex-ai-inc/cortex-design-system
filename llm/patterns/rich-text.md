# Rich Text

## Overview

WYSIWYG rich text editing built on **TipTap** (ProseMirror wrapper). Used for ticket descriptions, comments, and any multi-line formatted content. The editor is paired with a toolbar, a paste handler for images, and an SSR-friendly renderer that sanitizes output with `isomorphic-dompurify`.

## Key Rules

- **Editor**: TipTap with extensions: StarterKit (h2/h3 only, no h1), Image (inline=false, base64), Link, Placeholder.
- **Toolbar groups**:
  - Text formatting: Bold, Italic, Strike
  - Headings: Heading 2, Heading 3
  - Lists: Bullet list, Ordered list
  - Insert: Link, Image
  - Block: Blockquote
- **Paste handler**: Intercepts paste events, extracts image files from clipboard, converts to base64 data URLs. Max file size: 10 MB.
- **Rendering**: `isomorphic-dompurify` sanitizes the HTML output on both server and client.
- **Allowed HTML tags**: `p`, `a`, `strong`, `em`, `h2`, `h3`, `ul`, `ol`, `li`, `blockquote`, `pre`, `code`, `img`.
- **SSR**: On the server, render a static placeholder `div` with the sanitized HTML content. The TipTap editor mounts only on the client via a client-only wrapper.
- **Placeholder text**: `"Write something..."` shown when the editor is empty.

## Props

### RichTextEditor

| Prop | Type | Default | Description |
|---|---|---|---|
| value | string | `""` | Initial HTML content |
| onChange | (html: string) => void | — | Content change callback |
| placeholder | string | `"Write something..."` | Placeholder text |
| editable | boolean | true | Whether the editor is editable |
| className | string | — | Additional classes |

### RichTextRenderer

| Prop | Type | Default | Description |
|---|---|---|---|
| content | string | — | HTML string to render |
| className | string | — | Additional classes |
| fallback | string | `"No description provided."` | Text shown when content is empty |

## Editor Structure

```tsx
"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"

import { RichTextToolbar } from "@/components/rich-text/rich-text-toolbar"

interface RichTextEditorProps {
  value?: string
  onChange?: (html: string) => void
  placeholder?: string
  editable?: boolean
  className?: string
}

export function RichTextEditor({
  value = "",
  onChange,
  placeholder = "Write something...",
  editable = true,
  className,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] }, // no h1
      }),
      Image.configure({ inline: false }),
      Link.configure({ openOnClick: true }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    editable,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
  })

  if (!editor) return <div className="h-40" />

  return (
    <div className={cn("border border-[rgba(194,198,214,0.15)] rounded-sm", className)}>
      {editable && <RichTextToolbar editor={editor} />}
      <EditorContent editor={editor} className="px-4 py-3 min-h-[200px]" />
    </div>
  )
}
```

## Toolbar Structure

```tsx
interface RichTextToolbarProps {
  editor: Editor
}

export function RichTextToolbar({ editor }: RichTextToolbarProps) {
  return (
    <div className="flex items-center gap-1 p-2 border-b border-[rgba(194,198,214,0.15)] flex-wrap">
      {/* Text formatting */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("bold")}
        label="Bold"
      >
        <Bold className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive("italic")}
        label="Italic"
      >
        <Italic className="w-4 h-4" />
      </ToolbarButton>

      <Separator orientation="vertical" className="mx-1 h-5" />

      {/* Headings */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive("heading", { level: 2 })}
        label="Heading 2"
      >
        <Heading2 className="w-4 h-4" />
      </ToolbarButton>

      <Separator orientation="vertical" className="mx-1 h-5" />

      {/* Lists */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive("bulletList")}
        label="Bullet list"
      >
        <List className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive("orderedList")}
        label="Ordered list"
      >
        <ListOrdered className="w-4 h-4" />
      </ToolbarButton>

      <Separator orientation="vertical" className="mx-1 h-5" />

      {/* Insert */}
      <ToolbarButton onClick={addLink} active={editor.isActive("link")} label="Link">
        <LinkIcon className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={addImage} label="Image">
        <ImageIcon className="w-4 h-4" />
      </ToolbarButton>

      {/* Block */}
      <Separator orientation="vertical" className="mx-1 h-5" />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive("blockquote")}
        label="Blockquote"
      >
        <Quote className="w-4 h-4" />
      </ToolbarButton>
    </div>
  )
}
```

## Renderer (SSR-safe)

```tsx
import DOMPurify from "isomorphic-dompurify"

const ALLOWED_TAGS = ["p", "a", "strong", "em", "h2", "h3", "ul", "ol", "li",
  "blockquote", "pre", "code", "img", "br", "hr"]

interface RichTextRendererProps {
  content?: string | null
  className?: string
  fallback?: string
}

export function RichTextRenderer({
  content,
  className,
  fallback = "No description provided.",
}: RichTextRendererProps) {
  if (!content) {
    return <p className="text-on-surface-variant text-sm italic">{fallback}</p>
  }

  const sanitized = DOMPurify.sanitize(content, {
    ALLOWED_TAGS,
    ALLOWED_ATTR: ["href", "src", "alt", "target", "rel"],
  })

  return (
    <div
      className={cn("prose prose-sm prose-invert max-w-none", className)}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  )
}
```

## Paste Handler

```tsx
export function handleImagePaste(
  event: ClipboardEvent,
  editor: Editor,
  maxSizeMB: number = 10
): boolean {
  const items = event.clipboardData?.items
  if (!items) return false

  for (const item of Array.from(items)) {
    if (item.type.startsWith("image/")) {
      const file = item.getAsFile()
      if (!file) continue

      if (file.size > maxSizeMB * 1024 * 1024) {
        toast.error(`Image must be under ${maxSizeMB} MB`)
        return true
      }

      const reader = new FileReader()
      reader.onload = () => {
        const url = reader.result as string
        editor.chain().focus().setImage({ src: url }).run()
      }
      reader.readAsDataURL(file)
      return true
    }
  }

  return false
}
```

## Usage Guidelines

### Do
- Use the RichTextEditor for any multi-line formatted content (descriptions, comments, notes).
- Use the RichTextRenderer to display saved content, passing the sanitized HTML string.
- Always provide an `onChange` handler to capture content updates.
- Set `editable={false}` for read-only display of editor content.

### Don't
- Don't render TipTap editor directly on the server — wrap in a client-only component or use the `RichTextRenderer` for SSR.
- Don't allow h1 in the editor — use h2 and h3 only for heading hierarchy.
- Don't paste images larger than 10 MB — the paste handler will reject them.
- Don't use dangerouslySetInnerHTML without first sanitizing through DOMPurify.
