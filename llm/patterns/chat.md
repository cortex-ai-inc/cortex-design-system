# Chat

## Overview

Chat interface pattern used for AI assistant conversations, ticket comments, and messaging. Messages are rendered using the `Item` component with agent/user visual variants. Message bodies support full Markdown rendering (including tables, task lists, and code blocks) via `react-markdown` and `remark-gfm`. Code diffs use `react-diff-view` with syntax highlighting via refractor/Prism.

## Key Rules

### Message Display
- **Agent messages**: Use the `muted` variant of Item with the bot/assistant icon in ItemMedia.
- **User messages**: Use the `outline` variant with the user avatar in ItemMedia.
- **Timestamps**: Displayed as secondary text using `safeFormatDistanceToNow()`.
- **Message actions**: Copy, Edit, and Delete buttons in ItemActions, shown on hover.

### Markdown Rendering
- **Library**: `react-markdown` with `remark-gfm` plugin.
- **Supported elements**: Paragraphs, headings, links, lists (ordered/unordered), tables, task lists, strikethrough, inline code, code blocks, blockquotes.
- **Code blocks**: Syntax highlighted via refractor (Prism) with a dark theme.
- **Chat prose class**: `.prose-chat` — a custom Tailwind typography variant for chat content.
- **Inline code**: `.chat-inline-code` — styled with `bg-surface-container-high/50 text-code-sm font-mono px-1 rounded-sm`.

### Prism Syntax Colors (Dark Theme)

| Token | Color | Style |
|---|---|---|
| Comments | `rgba(194,198,214,0.5)` | italic |
| Keywords | `#ADC6FF` (k-primary) | normal |
| Strings | `#4ADE80` (k-secondary) | normal |
| Numbers | `#FBBF24` (k-warning) | normal |
| Functions | `#93C5FD` | light blue |
| Tags | `#F9A8D4` | pink |
| Punctuation | `rgba(194,198,214,0.7)` | normal |
| Operators | `rgba(194,198,214,0.9)` | normal |

### Code Diff View
- **Library**: `react-diff-view` for displaying side-by-side or unified diffs.
- **Diff colors**: Green background for additions, red for deletions, matching k-secondary and k-error tones.
- **Line numbers**: Rendered in a narrow column with `text-on-surface-variant/50`.

## Message Component Pattern

```tsx
interface ChatMessageProps {
  role: "agent" | "user"
  content: string
  timestamp: string
  userName?: string
  userAvatar?: string
  onCopy?: () => void
  onEdit?: () => void
  onDelete?: () => void
  isLoading?: boolean
}

export function ChatMessage({
  role,
  content,
  timestamp,
  userName,
  userAvatar,
  onCopy,
  onEdit,
  onDelete,
  isLoading,
}: ChatMessageProps) {
  const isAgent = role === "agent"

  return (
    <Item variant={isAgent ? "muted" : "outline"}>
      <ItemMedia>
        {isAgent ? (
          <div className="w-8 h-8 rounded-sm bg-k-primary/20 flex items-center justify-center">
            <Bot className="w-4 h-4 text-k-primary" strokeWidth={1.5} />
          </div>
        ) : (
          <Avatar
            initials={getInitials(userName || "User")}
            className="w-8 h-8"
          />
        )}
      </ItemMedia>

      <ItemContent>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-label-sm text-on-surface-variant">
            {isAgent ? "Assistant" : userName || "User"}
          </span>
          <span className="text-xs text-on-surface-variant/50">
            {safeFormatDistanceToNow(timestamp)}
          </span>
          {isLoading && <Loader2 className="w-3 h-3 animate-spin text-k-primary" />}
        </div>

        <div className="prose-chat">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "")
                const isInline = !match && !className

                if (isInline) {
                  return (
                    <code className="chat-inline-code" {...props}>
                      {children}
                    </code>
                  )
                }

                const language = match ? match[1] : ""
                return (
                  <CodeBlock language={language}>
                    {String(children).replace(/\n$/, "")}
                  </CodeBlock>
                )
              },
              table({ children }) {
                return (
                  <div className="overflow-x-auto my-2">
                    <table className="min-w-full text-sm border-collapse">
                      {children}
                    </table>
                  </div>
                )
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </ItemContent>

      <ItemActions>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onCopy && (
            <Button variant="ghost" size="icon-sm" onClick={onCopy} aria-label="Copy message">
              <Copy className="w-4 h-4" />
            </Button>
          )}
          {onEdit && (
            <Button variant="ghost" size="icon-sm" onClick={onEdit} aria-label="Edit message">
              <Edit3 className="w-4 h-4" />
            </Button>
          )}
          {onDelete && (
            <Button variant="ghost" size="icon-sm" onClick={onDelete} aria-label="Delete message">
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </ItemActions>
    </Item>
  )
}
```

## CodeBlock Component

```tsx
import { refractor } from "refractor"
import tsx from "refractor/lang/tsx"
import typescript from "refractor/lang/typescript"
import bash from "refractor/lang/bash"
import json from "refractor/lang/json"
import css from "refractor/lang/css"

refractor.register(tsx)
refractor.register(typescript)
refractor.register(bash)
refractor.register(json)
refractor.register(css)

interface CodeBlockProps {
  language: string
  children: string
}

export function CodeBlock({ language, children }: CodeBlockProps) {
  let highlighted: ReactNode

  try {
    const result = refractor.highlight(children, language)
    highlighted = result.children.map((node, i) => (
      <span key={i} className={cn(
        node.properties.className?.join(" "),
        prismColorMap(node.properties.className)
      )}>
        {node.children}
      </span>
    ))
  } catch {
    highlighted = children
  }

  return (
    <div className="relative group my-3 rounded-sm bg-surface-container-high/30">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-1.5
        border-b border-[rgba(194,198,214,0.10)]">
        <span className="text-label-sm text-on-surface-variant/50">{language}</span>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => navigator.clipboard.writeText(children)}
          aria-label="Copy code"
        >
          <Copy className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* Code */}
      <pre className="p-3 overflow-x-auto text-code-sm leading-relaxed">
        <code>{highlighted}</code>
      </pre>
    </div>
  )
}

function prismColorMap(className?: string[]): string {
  // Maps Prism token classes to Tailwind text colors
  if (!className) return ""

  const cls = className.join(" ")

  if (cls.includes("comment") || cls.includes("prolog") || cls.includes("doctype"))
    return "text-[rgba(194,198,214,0.5)] italic"
  if (cls.includes("keyword") || cls.includes("selector") || cls.includes("builtin"))
    return "text-k-primary"
  if (cls.includes("string") || cls.includes("attr-value"))
    return "text-k-secondary"
  if (cls.includes("number") || cls.includes("boolean"))
    return "text-k-warning"
  if (cls.includes("function") || cls.includes("class-name"))
    return "text-[#93C5FD]"
  if (cls.includes("tag") || cls.includes("namespace"))
    return "text-[#F9A8D4]"
  if (cls.includes("punctuation"))
    return "text-[rgba(194,198,214,0.7)]"
  if (cls.includes("operator"))
    return "text-[rgba(194,198,214,0.9)]"

  return ""
}
```

## Chat Prose Styles

```css
.prose-chat {
  /* Base */
  --tw-prose-body: theme("colors.on-surface");
  --tw-prose-headings: theme("colors.on-surface");
  --tw-prose-links: theme("colors.k-primary");
  --tw-prose-bold: theme("colors.on-surface");
  --tw-prose-code: theme("colors.k-primary");
  --tw-prose-pre-bg: theme("colors.surface-container-high / 0.3");
  --tw-prose-quotes: theme("colors.on-surface-variant");
  --tw-prose-quote-borders: theme("colors.k-primary / 0.3");

  font-size: 13px;
  line-height: 1.6;
  max-width: none;
}

.chat-inline-code {
  background-color: rgba(40, 42, 48, 0.5);
  padding: 1px 4px;
  border-radius: 4px;
  font-family: "JetBrains Mono", monospace;
  font-size: 12px;
  color: theme("colors.k-primary");
}
```

## Diff View Pattern

```tsx
import { Diff, Hunk, parseDiff } from "react-diff-view"

interface DiffViewProps {
  diff: string // unified diff string
}

export function DiffView({ diff }: DiffViewProps) {
  const files = parseDiff(diff)

  return (
    <div className="space-y-4">
      {files.map((file, i) => (
        <div key={i} className="rounded-sm border border-[rgba(194,198,214,0.15)]
          overflow-hidden">
          <div className="px-3 py-1.5 bg-surface-container-high/30
            text-code-sm font-mono text-on-surface-variant">
            {file.newPath || file.oldPath}
          </div>
          <Diff viewType="unified" diff={file} className="text-code-sm">
            {(hunks) => hunks.map((hunk) => (
              <Hunk key={hunk.content} hunk={hunk} />
            ))}
          </Diff>
        </div>
      ))}
    </div>
  )
}
```

## Usage Guidelines

### Do
- Use `prose-chat` class for all chat markdown content to ensure consistent typography.
- Show hover actions (copy, edit, delete) only on hover via `opacity-0 group-hover:opacity-100`.
- Use `safeFormatDistanceToNow()` for relative timestamps with null safety.
- Render agent messages with the `muted` Item variant and user messages with `outline`.
- Display a loading spinner (Loader2) on the last agent message while streaming.

### Don't
- Don't render raw HTML in chat messages — always use react-markdown for Markdown content.
- Don't disable syntax highlighting for code blocks — register languages in refractor.
- Don't show edit/delete actions for messages the user doesn't own.
- Don't use the full prose class — use `prose-chat` which is optimized for chat (smaller font, narrower spacing).
