# Stepper

> Status: new component — no product source yet. This spec is the canonical target for generation.

## Overview

Custom compound component for multi-step flows (wizards, onboarding, setup). Shows where the user is in an ordered sequence via 24px circular indicators connected by thin lines. **No Radix primitive** — it renders semantic HTML: a `<nav aria-label="Progress">` wrapping an `<ol>`, one `<li>` per step.

Indicator colors follow the StatusDot precedent: blue (`k-primary-container`) for current/completed, red tints for error, ghost outline for pending. The circular indicators are one of the sanctioned `rounded-full` uses — they are inherently circular, like StatusDot.

## Import

```tsx
import {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperSeparator,
  StepperTitle,
  StepperDescription,
} from "@/components/ui/stepper"
```

## Anatomy

```
Stepper                       — root; <nav aria-label="Progress"> + <ol>; orientation + controlled value
  └─ StepperItem              — <li>; carries data-state="pending" | "current" | "completed" | "error"
       ├─ StepperTrigger      — optional <button> wrapper; only completed steps are clickable
       │    └─ StepperIndicator — 24px circle: step number, Check, or X
       ├─ StepperTitle        — step label
       └─ StepperDescription  — optional supporting line (mostly vertical orientation)
  └─ StepperSeparator         — connector line between items
```

## Indicator

Base recipe (all states):

```
"flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-label-sm font-medium transition-colors"
```

`rounded-full` is allowed here — the indicator is an inherently circular element (StatusDot precedent). Glyphs: the step number in `text-label-sm`, or `Check` / `X` at `h-3.5 w-3.5` with `strokeWidth={2.5}` (the compact-glyph recipe shared with Checkbox).

### Indicator states

| State | Indicator recipe | Glyph | Title |
|---|---|---|---|
| pending | `border ghost-border-20 bg-transparent text-on-surface-variant` | Step number | `text-on-surface-variant` |
| current | `border-transparent bg-k-primary-container text-surface-container-lowest` | Step number (dark on blue) | `text-on-surface font-medium`; item gets `aria-current="step"` |
| completed | `border-transparent bg-k-primary-container text-surface-container-lowest` | `Check` `h-3.5 w-3.5` `strokeWidth={2.5}` — dark glyph on blue fill, same recipe as Checkbox | `text-on-surface-variant` |
| error | `border border-k-error/40 bg-k-error/20 text-k-error` | `X` (or the step number) | `text-k-error` |

Active/completed always means **blue fill + dark glyph** (`bg-k-primary-container` + `text-surface-container-lowest`) — never light text on the blue fill. The error state uses the semantic tint ladder (`/20` fill, `/40` border).

## Separator (connector)

| Orientation | Recipe | Completed segment |
|---|---|---|
| horizontal | `h-px flex-1 bg-[rgba(194,198,214,0.15)]` (ghost-border) | `bg-k-primary-container` |
| vertical | `w-px min-h-6 ml-3` (aligned under the 24px indicator's center) | `bg-k-primary-container` |

A segment is "completed" when the step **before** it is completed — filled segments trail behind the current step.

## StepperTrigger

Optional `<button type="button">` wrapper around the indicator (and optionally the title) that lets users jump **back** to completed steps.

- Only completed steps are clickable; pending/future steps render the trigger `disabled` — never allow skipping ahead past validation.
- Focus ring is the standard compact-control recipe: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`.
- Disabled trigger: `disabled:opacity-50 disabled:pointer-events-none`.
- Hover on enabled triggers: subtle `transition-colors` over `--motion-fast` (150ms).

## Props

### Stepper (root)

| Prop | Type | Default | Description |
|---|---|---|---|
| value | `number` | — | Controlled current step (1-based) |
| onValueChange | `(value: number) => void` | — | Called when a `StepperTrigger` navigates to a completed step |
| orientation | `"horizontal" \| "vertical"` | `"horizontal"` | Layout axis; vertical adds room for descriptions |
| className | `string` | — | Additional classes merged via `cn()` |
| children | `ReactNode` | — | StepperItems + StepperSeparators |

### StepperItem

| Prop | Type | Default | Description |
|---|---|---|---|
| value | `number` | — | This step's index (1-based) |
| state | `"pending" \| "current" \| "completed" \| "error"` | derived | Override the derived state (e.g. force `error` after failed validation) |
| className | `string` | — | Additional classes |
| children | `ReactNode` | — | Trigger/Indicator + Title + Description |

Derived state: `value < root.value` → completed, `value === root.value` → current, `value > root.value` → pending. `state="error"` is always explicit.

## Accessibility

- Root renders `<nav aria-label="Progress">` containing an `<ol>`; each `StepperItem` is an `<li>` — the ordered list conveys sequence to screen readers.
- The current item carries `aria-current="step"`.
- Decorative glyphs (`Check`, `X`) are `aria-hidden`; the accessible name comes from the title text. For error steps append visually hidden text (e.g. "— has errors").
- `StepperSeparator` is presentational: `aria-hidden="true"`.

## Wizard pattern

Steppers head **wizard pages**. Steps are dedicated pages or sections of one page — **never modals** (create/edit flows never live in dialogs; see `../patterns/forms.md`).

- **Layout**: Stepper at the top of the page content, current step's form below it (standard form grid, `max-w-5xl` cap per `../patterns/forms.md`).
- **Footer**: `Button variant="secondary"` "Back" on the left, primary gradient CTA (`gradient-primary` + dark text) "Continue" on the right. On the final step the CTA becomes the submit action ("Create workspace", not "Continue").
- **Validation**: validate the current step (Zod schema per step) before advancing; on failure keep the user on the step and mark it `error`.
- **State**: keep entered values when navigating Back (single form store / react-hook-form context across steps) — never discard a step's data.
- **Jump-back**: wire `StepperTrigger` + `onValueChange` so completed steps are revisitable; forward navigation only happens through the Continue CTA.

```tsx
<Stepper value={step} onValueChange={setStep}>
  <StepperItem value={1}>
    <StepperTrigger>
      <StepperIndicator />
    </StepperTrigger>
    <StepperTitle>Account</StepperTitle>
  </StepperItem>
  <StepperSeparator />
  <StepperItem value={2}>
    <StepperTrigger>
      <StepperIndicator />
    </StepperTrigger>
    <StepperTitle>Workspace</StepperTitle>
  </StepperItem>
  <StepperSeparator />
  <StepperItem value={3}>
    <StepperTrigger>
      <StepperIndicator />
    </StepperTrigger>
    <StepperTitle>Invite team</StepperTitle>
  </StepperItem>
</Stepper>

{/* current step's form section */}

<div className="flex items-center justify-between">
  <Button variant="secondary" onClick={back} disabled={step === 1}>Back</Button>
  <Button onClick={next}>{step === 3 ? "Create workspace" : "Continue"}</Button>
</div>
```

## Usage Guidelines

### Do
- Keep wizards to 3–5 steps; collapse related fields into one step rather than adding more.
- Mark a step `error` when its validation fails, so users can see where to go back to.
- Keep titles short (1–2 words); put detail in `StepperDescription` (vertical orientation).
- Use vertical orientation when steps need descriptions or the flow lives in a narrow column.

### Don't
- Don't exceed 6 steps — split the flow or move optional settings out of the wizard.
- Don't build modal wizards — steps are pages or page sections (`../patterns/forms.md`).
- Don't skip per-step validation or let users jump forward past incomplete steps.
- Don't put light text on the blue indicator fill — the glyph is always dark (`text-surface-container-lowest`).

## Related

- `../patterns/forms.md` — form grid, validation, and the no-modals rule wizards inherit
- `status-dot.md` — color-semantics precedent for the indicator states
- `button.md` — Back (secondary) and Continue (primary gradient CTA) footer buttons
- `progress.md` — linear alternative when steps have no labels/navigation
