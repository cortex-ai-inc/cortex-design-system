# DatePicker

> Status: new component — no product source yet. This spec is the canonical target for generation.

## Overview

Date selection built **by composition**: a `react-day-picker` Calendar rendered inside a Radix `Popover`, opened from a Button styled as an Input-height form field. Covers three shapes:

- **DatePicker** — `mode="single"`, one date, popover closes on pick.
- **DateRangePicker** — `mode="range"`, `numberOfMonths={2}`, from/to dates for filters and reporting.
- **Presets rail** — optional left column of quick ranges (Today, Last 7 days, …) next to the calendar.

> **This spec doubles as the Calendar documentation.** `CLAUDE.md` lists a `Calendar` component (react-day-picker) with no spec of its own — the Calendar classNames table below is its source of truth, whether the calendar renders inside this popover or standalone (e.g. an inline availability view).

## Import

```tsx
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
```

## Anatomy

```
Popover                                    — open state + positioning (Radix Popover)
├─ PopoverTrigger asChild
│   └─ Button variant="outline"            — restyled to Input tokens (h-9 form field)
│       ├─ CalendarIcon                    — mr-2 h-4 w-4 text-on-surface-variant
│       └─ formatted value | placeholder   — date-fns format; placeholder text-on-surface-variant/50
└─ PopoverContent className="w-auto p-0"   — panel hugs the calendar
    ├─ (optional) presets rail             — flex flex-col gap-1 border-r ghost-border p-3 min-w-36
    └─ Calendar                            — react-day-picker; mode="single" | "range"
```

The popover panel follows the shared floating-panel recipe documented in `popover.md` (`bg-surface-container-low border border-on-surface-variant/10 rounded-md shadow-overlay animate-fade-in`, canonical layer `z-[100]`).

## Trigger

| Part | CSS Classes | Description |
|---|---|---|
| Button | `h-9 w-full justify-start text-left font-normal rounded-sm border ghost-border-20 bg-surface-dim px-3 text-body-sm` | `variant="outline"` restyled to the Input/Select field tokens; left-aligned like an Input, not centered like a Button |
| Icon | `CalendarIcon` — `mr-2 h-4 w-4 text-on-surface-variant` | Leading calendar glyph, `strokeWidth={1.5}` |
| Placeholder | `text-on-surface-variant/50` | Shown when no date is selected (e.g. "Pick a date") |
| Value | `text-on-surface`, formatted with date-fns | `format(date, "PPP")` for single (e.g. "July 4th, 2026"); `format(from, "LLL dd, y") + " – " + format(to, "LLL dd, y")` for ranges |
| Focus | `focus:ring-2 focus:ring-k-primary-container/50` (no offset) | Form-field ring, same as Input/Select |
| Disabled | `disabled:opacity-50 disabled:cursor-not-allowed` | Standard disabled treatment |

## Calendar classNames

Canonical `react-day-picker` classNames — day cells are **squares (`rounded-sm`), never circles** (Key Constraint 1: `rounded-full` is reserved for inherently circular elements).

| Part | CSS Classes | Description |
|---|---|---|
| Caption label | `text-body-sm font-medium text-on-surface` | Month + year, e.g. "July 2026" |
| Nav buttons | Button `ghost` restyled `h-7 w-7` with `ChevronLeft` / `ChevronRight` (`h-4 w-4`, `strokeWidth={1.5}`) | Previous/next month |
| Head cell | `w-9 text-label-sm text-on-surface-variant font-normal` | Weekday initials (uppercase 11px label style) |
| Day (base) | `h-9 w-9 rounded-sm text-body-sm hover:bg-surface-container-high focus-visible:ring-2 focus-visible:ring-k-primary-container/50` | 36px square cell; hover fill; 2px ring on keyboard focus |
| Selected / range ends | `bg-k-primary-container text-surface-container-lowest` | Blue fill + **dark** glyph (selected = dark-on-blue, per canon) |
| Range middle | `bg-k-primary-container/20 text-on-surface rounded-none` | 20% blue tint band; radius removed so the band reads continuous |
| Today | `border ghost-border-20 text-k-primary` | Outlined, light-blue number — never a filled circle |
| Outside days | `text-on-surface-variant/40` | Leading/trailing days of adjacent months |
| Disabled days | `text-on-surface-variant/30 opacity-50` | Un-selectable dates (`disabled` matcher) |

## Presets rail (optional)

A left column of quick ranges rendered inside `PopoverContent`, before the Calendar:

| Part | CSS Classes | Description |
|---|---|---|
| Rail | `flex flex-col gap-1 border-r ghost-border p-3 min-w-36` | Vertical stack separated from the calendar by a ghost hairline |
| Preset buttons | Button `variant="ghost" size="sm"` + `justify-start` | Today · Yesterday · Last 7 days · Last 30 days · This month |

Selecting a preset sets the range immediately (and typically closes the popover); picking days in the calendar overrides it.

## Props (Calendar)

| Prop | Type | Default | Description |
|---|---|---|---|
| `mode` | `"single" \| "range"` | `"single"` | Selection behavior (react-day-picker also ships `"multiple"` — unused in Cortex) |
| `selected` | `Date \| DateRange` | — | Controlled selection (`{ from: Date; to?: Date }` for ranges) |
| `onSelect` | `(date: Date \| DateRange \| undefined) => void` | — | Selection change handler |
| `numberOfMonths` | `number` | `1` | Use `2` for range pickers |
| `disabled` | `Matcher \| Matcher[]` | — | Disable dates, e.g. `{ before: new Date() }` or `(date) => date > new Date()` |
| `defaultMonth` | `Date` | current month | Month shown on open (e.g. `selected?.from`) |

## States

- **Closed, empty**: trigger shows `CalendarIcon` + placeholder ("Pick a date") in `text-on-surface-variant/50`.
- **Closed, selected**: trigger shows the date-fns-formatted value in `text-on-surface`.
- **Open**: panel fades in (`animate-fade-in`, 200ms ease-out), `align="start"`, hugging the calendar (`w-auto p-0`).
- **Focus (trigger)**: `focus:ring-2 focus:ring-k-primary-container/50`.
- **Disabled (trigger)**: `disabled:opacity-50 disabled:cursor-not-allowed`.
- **Disabled dates**: `text-on-surface-variant/30 opacity-50`, not clickable (`disabled` matcher).
- **Range in progress**: after picking `from`, hovered/candidate days show the `bg-k-primary-container/20` band until `to` is picked; both ends render `bg-k-primary-container text-surface-container-lowest`.

## Reference implementation

Single date:

```tsx
const [date, setDate] = useState<Date>()

<Popover>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      className={cn(
        "h-9 w-full justify-start text-left font-normal rounded-sm border ghost-border-20 bg-surface-dim px-3 text-body-sm",
        !date && "text-on-surface-variant/50"
      )}
    >
      <CalendarIcon className="mr-2 h-4 w-4 text-on-surface-variant" strokeWidth={1.5} />
      {date ? format(date, "PPP") : <span>Pick a date</span>}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0" align="start">
    <Calendar mode="single" selected={date} onSelect={setDate} />
  </PopoverContent>
</Popover>
```

Range with presets rail:

```tsx
const [range, setRange] = useState<DateRange>()

<PopoverContent className="flex w-auto p-0" align="start">
  <div className="flex flex-col gap-1 border-r ghost-border p-3 min-w-36">
    {presets.map((preset) => (
      <Button
        key={preset.label}
        variant="ghost"
        size="sm"
        className="justify-start"
        onClick={() => setRange(preset.range)}
      >
        {preset.label}
      </Button>
    ))}
  </div>
  <Calendar
    mode="range"
    numberOfMonths={2}
    defaultMonth={range?.from}
    selected={range}
    onSelect={setRange}
  />
</PopoverContent>
```

Calendar day-cell classNames (core excerpt for `calendar.tsx`):

```
day: "h-9 w-9 rounded-sm text-body-sm hover:bg-surface-container-high focus-visible:ring-2 focus-visible:ring-k-primary-container/50"
day_selected: "bg-k-primary-container text-surface-container-lowest"
day_range_middle: "bg-k-primary-container/20 text-on-surface rounded-none"
day_today: "border ghost-border-20 text-k-primary"
day_outside: "text-on-surface-variant/40"
day_disabled: "text-on-surface-variant/30 opacity-50"
head_cell: "w-9 text-label-sm text-on-surface-variant font-normal"
caption_label: "text-body-sm font-medium text-on-surface"
```

## Usage Guidelines

### Do

- Keep the trigger at `h-9` so it aligns with sibling Inputs and Selects in the form grid.
- Format displayed values with **date-fns** (`PPP` for single dates, `LLL dd, y` for range ends).
- Use **DateRangePicker with `numberOfMonths={2}`** for reporting/analytics filters.
- Add the **presets rail** when users repeatedly pick the same relative ranges.
- Use the `disabled` matcher to block un-selectable dates (past dates, weekends, blackout windows).
- Set `defaultMonth` to the current selection so reopening shows context.

### Don't

- Do NOT use a plain paged calendar for far-past dates (e.g. birth dates) **without a dropdown caption** (`captionLayout="dropdown"` month/year selects) — paging back decades is hostile.
- Do NOT render a DatePicker **inside a modal** — create/edit forms live on dedicated pages (Key Constraint 6), and stacking a popover on a dialog fights the z-index scale.
- Do NOT make day cells circular — `rounded-sm` squares only; `rounded-full` is reserved for inherently circular elements.
- Do NOT mark today with a blue fill — today is outlined (`border ghost-border-20 text-k-primary`); the blue fill means *selected*.
- Do NOT put light text on the selected cell — selected is `bg-k-primary-container` with **dark** `text-surface-container-lowest`.

## Related

- `popover.md` — shared floating-panel recipe hosting the calendar (`shadow-overlay`, `z-[100]`)
- `input.md` — the field tokens the trigger mirrors (`h-9`, `ghost-border-20`, `bg-surface-dim`)
- `select.md` — sibling form-field trigger pattern (same height, border, focus ring)
