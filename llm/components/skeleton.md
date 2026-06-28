# Skeleton

## Overview

Simple CSS-only skeleton placeholder for content loading states.

## Import

```
import { Skeleton } from "@/components/ui/skeleton"
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | "" | Additional CSS classes for shape/size |

## Base style

| Property | Value |
|----------|-------|
| Animation | animate-pulse |
| Border radius | rounded-sm |
| Background | bg-surface-container-high/50 |

## Usage patterns

```
// Text line
<Skeleton className="h-4 w-[250px]" />
<Skeleton className="h-4 w-[200px]" />
<Skeleton className="h-4 w-[150px]" />

// Avatar
<Skeleton className="h-10 w-10 rounded-full" />

// Card
<div className="space-y-3">
  <Skeleton className="h-[200px] w-full rounded-xl" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>

// Table row
<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>
```

## Related

- Table — skeleton rows for loading state
- Card — skeleton card for content loading
