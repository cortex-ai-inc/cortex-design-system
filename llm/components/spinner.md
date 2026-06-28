# Spinner

## Overview

Custom loading spinner component with configurable size and accessible loading announcement.

## Import

```
import { Spinner } from "@/components/ui/spinner"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | "sm" | "md" | "lg" | "md" | Spinner dimensions |
| className | string | "" | Additional CSS classes |

## Size variants

| Size | Dimensions | Border width |
|------|------------|--------------|
| sm | w-4 h-4 | border-2 |
| md | w-5 h-5 | border-2 |
| lg | w-8 h-8 | border-3 |

## Style

| Property | Value |
|----------|-------|
| Border color | border-k-primary-container/30 |
| Top border | border-t-k-primary-container |
| Border radius | rounded-full |
| Animation | animate-spin |

## Accessibility

| Attribute | Value |
|-----------|-------|
| role | "status" |
| sr-only text | "Loading..." |

## Usage patterns

```
// Default (md)
<Spinner />

// Small
<Spinner size="sm" />

// Large with custom class
<Spinner size="lg" className="mx-auto" />
```

## Related

- Skeleton — alternative loading representation for content blocks
- Button — Spinner used inside buttons during loading state (button disabled, spinner replaces icon)
