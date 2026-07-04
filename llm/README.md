# Cortex Design System — LLM Documentation

This directory contains machine-readable documentation optimized for LLM consumption. Clean markdown, structured tables, JSON schemas, and cross-references.

## How to read this documentation

If you are an LLM helping with a Cortex product, start with:

1. **`/CLAUDE.md`** — Design principles, token quick-reference, component index, constraints
2. **`getting-started.md`** — Installation, Tailwind config, setup instructions
3. **`design-tokens.md`** — Complete reference: colors, typography, spacing, shadows, animations
4. **`components/*.md`** — Individual component documentation as needed
5. **`patterns/*.md`** — Layout, navigation, forms, and other patterns

## File Index

### Foundation

| File | Description |
|---|---|
| `getting-started.md` | Installation, Tailwind config, font setup, cn() utility, shadcn config |
| `design-tokens.md` | Complete reference: colors, typography, spacing, radius, shadows, animations, z-index, gradients |

### Components (`components/`)

| Component | Radix | File |
|---|---|---|
| Accordion | Radix Accordion | `components/accordion.md` |
| Alert | — | `components/alert.md` |
| Avatar | Radix Avatar | `components/avatar.md` |
| Badge | — | `components/badge.md` |
| Breadcrumb | — | `components/breadcrumb.md` |
| Button | Radix Slot | `components/button.md` |
| Calendar | react-day-picker | `components/date-picker.md` |
| Card | — | `components/card.md` |
| Checkbox | Radix Checkbox | `components/checkbox.md` |
| Combobox | cmdk + Radix Popover | `components/combobox.md` |
| Command Palette | cmdk | `components/command-palette.md` |
| DatePicker | react-day-picker | `components/date-picker.md` |
| Dialog | Radix Dialog | `components/dialog.md` |
| Drawer | vaul | `components/modal.md` |
| DropdownMenu | Radix DropdownMenu | `components/dropdown-menu.md` |
| Empty State | — | `components/empty-state.md` |
| Field (Form) | — | `components/form.md` |
| FileUpload | — | `components/file-upload.md` |
| Form | react-hook-form | `components/form.md` |
| Input | — | `components/input.md` |
| InputGroup | — | `components/input-group.md` |
| Item (List) | — | `components/item.md` |
| Kbd | — | `components/kbd.md` |
| Modal (Sheet) | Radix Dialog | `components/modal.md` |
| Notification Bell | — | `components/notification.md` |
| Pagination | — | `components/pagination.md` |
| Popover | Radix Popover | `components/popover.md` |
| Progress | Radix Progress | `components/progress.md` |
| RadioGroup | Radix RadioGroup | `components/radio-group.md` |
| Select | Radix Select | `components/select.md` |
| Sheet | Radix Dialog | `components/modal.md` |
| Sidebar | — | `components/sidebar.md` |
| Skeleton | — | `components/skeleton.md` |
| Slider | Radix Slider | `components/slider.md` |
| Spinner | — | `components/spinner.md` |
| StatusDot | — | `components/status-dot.md` |
| Stepper | — | `components/stepper.md` |
| Switch | Radix Switch | `components/switch.md` |
| Table | — | `components/table.md` |
| Tabs | Radix Tabs | `components/tabs.md` |
| Textarea | — | `components/input.md` |
| Toast | sonner | `components/toast.md` |
| Tooltip | Radix Tooltip | `components/tooltip.md` |
| TopBar | — | `components/topbar.md` |

### Patterns (`patterns/`)

| File | Description |
|---|---|
| `patterns/layout.md` | App shell, page headers, responsive behavior, z-index, width caps |
| `patterns/navigation.md` | Sidebar, topbar breadcrumbs, active states, mobile nav |
| `patterns/forms.md` | Form grids, field orientation, validation, form sections |
| `patterns/iconography.md` | lucide-react usage, sizing, stroke width, icon grid |
| `patterns/rich-text.md` | TipTap editor setup, toolbar, paste handler, rendering |
| `patterns/chat.md` | Chat messages, markdown rendering, syntax highlighting, diff view |

## Standard Component Documentation Format

Each component file follows this structure:

```markdown
---
name: component-name
description: Brief one-line description
status: stable | deprecated
dependencies: [radix-ui, lucide-react, ...]
---

# Component Name

## Overview

Brief description with import path.

## Import

```tsx
import { Component } from "@/components/ui/component"
```

## Variants

Table of visual variants with Tailwind classes and use cases.

## Props

Table with: Prop, Type, Default, Description.

## States

Normal, hover, focus, disabled, loading, error — when applicable.

## Usage Guidelines

### Do's and Don'ts

## Examples

```tsx
<Component variant="primary" />
```
```
