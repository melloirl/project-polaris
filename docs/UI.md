# UI.md — Eidolon 1970s Frontend Design System

**Project:** Resonance / Ressonância Polimento  
**Scope:** Frontend-facing wiki, dossier, character sheet, case log, and sheet-management application  
**Status:** Draft v0.1  
**Primary implementation target:** single-page HTML or componentized frontend using SCSS, vanilla JS-compatible patterns, and printable dossier output

---

## 1. Design sentence

**Eidolon’s 1970s UI is a federal-modernist research identity pretending the supernatural is just another paperwork category.**

The app should feel like something Eidolon could plausibly have built for internal records: useful, structured, modular, compartmentalized, printable, and quietly dehumanizing. The UI is not a “retro horror skin.” It is a working institutional tool whose horror comes from how calmly it handles impossible events.

---

## 2. Source basis

This design system is derived from three current project sources:

- `resonance_s2_dossier.html` — current single-file dossier implementation, flat seven-color palette, typewriter mono, tabs, GM mode, import/export, archive, operations log, reference view, and print behavior.
- `resonance_1970s_eidolon_campaign_foundation.md` — campaign tone, 1970s Eidolon premise, Welderhide dependency, institutional horror, and the “asset to person” arc.
- `resonance_s2_character_sheet_progression_model_v0_1.md` — character sheet model, player sheet vs. GM classified dossier, Signal, Resonance, Karma, Access, Gear, Harm, and modular dossier structure.

External visual reference anchors:

- NASA Graphics Standards Manual, 1976 — identity discipline, logotype rules, stationery, forms, vehicle/signage systems.
- EPA Graphic Standards System, 1977 — modular public-agency identity and rational visual order.
- National Park Service Unigrid, 1977 — repeatable grid system that lets many content types feel unified.
- NARA declassification/redaction material — redaction codes, withdrawn material, classification logic.
- IBM design program / Paul Rand-era corporate modernism — restrained institutional clarity, not ornamental nostalgia.
- OCR-A / machine-readable typography — serials, labels, device tags, forms, and early machine-processing flavor.

---

## 3. Product principles

### 3.1 Instrument first, artifact second

The interface must be fast to use during play. Dossier flavor supports play; it must never slow down table decisions.

The user should quickly answer:

```text
What do I need to know right now?
What changed since last case?
What is hidden, sealed, or suspicious?
What can the player honestly use?
What is GM-only context?
```

### 3.2 Records, not pages

Every major screen should be treated as a record class, not a generic webpage.

Recommended app sections:

| Navigation label | In-world class | Function |
|---|---|---|
| Personnel File | Personnel dossier | Character sheet and GM dossier |
| Central Archive | Archive record | Wiki/lore records |
| Case Registry | Operations file | Cases, sessions, investigations |
| Field Manual | Reference record | Rules and quick reference |
| Evidence Locker | Evidence packet | Clues, files, photos, transcripts, props |
| Division Index | Institutional index | Eidolon divisions, staff, access rules |

### 3.3 Keep visible math honest

Hidden information may create context, consequences, access pressure, or future revelations. It must not secretly contradict visible player-facing stats.

Good hidden information:

```text
Eidolon has flagged this character as compatible with a future resonant cell trial.
```

Bad hidden information:

```text
The player secretly has less Signal than displayed.
```

### 3.4 Every major state change leaves a paper trail

When Signal, Resonance, Karma, Harm, Access, Gear charge, or clearance changes, the app should invite a note.

Examples:

```text
Resonance +5% — Source / incident:
Karma moved to -1 — Karma-Moving Act:
Access changed to Watched — Handler note:
Gear charge used — Device / case:
Wound marked — Cause / recovery note:
```

This makes bookkeeping become campaign memory.

### 3.5 The UI should become stranger only when the fiction earns it

Default Eidolon UI is clean, dry, and functional. Resonance contamination, violet/teal visual intrusion, broken grids, impossible repetitions, and corrupted records should appear sparingly.

---

## 4. SCSS token foundation

The current HTML defines a strong flat seven-color palette. Preserve that constraint as the base layer. Do not introduce gradients, arbitrary alpha overlays, or decorative color variants unless they become explicit tokens.

### 4.1 Core color tokens

```scss
// ============================================================
// Eidolon 1970s Core Palette
// Flat hex values only. No rgba dependence in the base system.
// ============================================================

$eid-color-paper: #EFE7D6 !default; // aged file paper, primary surface
$eid-color-paper-2: #E4D9C2 !default; // inset paper, panels, tabs
$eid-color-ink: #2B2722 !default; // body text, truth, confirmed record
$eid-color-rule: #C2B496 !default; // dividers, dotted lines, inactive metadata
$eid-color-stamp: #9E2B25 !default; // classification, danger, denial, sealed record
$eid-color-eden: #5C4B73 !default; // Occult Eden, accumulation, haunting, Resonance pressure
$eid-color-echo: #3E6259 !default; // Echologist, Signal, cleansing, clean frequency
```

### 4.2 Semantic color tokens

Use semantic tokens in components. Avoid referencing raw palette tokens directly outside the token layer.

```scss
// Surfaces
$eid-surface-page: $eid-color-paper !default;
$eid-surface-panel: $eid-color-paper !default;
$eid-surface-inset: $eid-color-paper-2 !default;
$eid-surface-active: $eid-color-paper !default;
$eid-surface-inverse: $eid-color-ink !default;

// Text
$eid-text-primary: $eid-color-ink !default;
$eid-text-muted: $eid-color-ink !default; // pair with opacity or pattern only if allowed
$eid-text-inverse: $eid-color-paper !default;
$eid-text-danger: $eid-color-stamp !default;
$eid-text-eden: $eid-color-eden !default;
$eid-text-echo: $eid-color-echo !default;

// Borders and rules
$eid-rule-soft: $eid-color-rule !default;
$eid-rule-hard: $eid-color-ink !default;
$eid-rule-danger: $eid-color-stamp !default;
$eid-rule-eden: $eid-color-eden !default;
$eid-rule-echo: $eid-color-echo !default;

// Status semantics
$eid-status-authority: $eid-color-stamp !default;
$eid-status-resonance: $eid-color-eden !default;
$eid-status-signal: $eid-color-echo !default;
$eid-status-confirmed: $eid-color-ink !default;
$eid-status-unknown: $eid-color-rule !default;
```

### 4.3 Optional neutral frame tokens

The current HTML uses a darker outer page background. Keep it outside the seven core colors as an environment/frame token, not as a content token.

```scss
$eid-frame-bg: #3A352D !default; // browser/background frame only
$eid-print-bg: #FFFFFF !default; // print reset only
```

### 4.4 Color usage law

| Token | Use | Avoid |
|---|---|---|
| Paper | Default readable surface | Making every nested panel the same surface without borders |
| Paper 2 | Inset fields, tabs, table headers, panels | Large body backgrounds that reduce contrast |
| Ink | Confirmed record, body copy, hard borders | Random decoration |
| Rule | Dotted dividers, metadata separators, inactive controls | Important text |
| Stamp red | Authority, restriction, denial, GM-only, severe access damage | Decorative emphasis or “cool horror color” |
| Eden violet | Resonance, Geist pressure, Occult Eden, accumulation | Generic magic or random mystery |
| Echologist teal | Signal, purge, recovery, clean frequency, Echologist | Generic success state unless Signal/coherence-related |

### 4.5 Typography tokens

The current dossier uses a typewriter mono, which is strong. Add a controlled sans layer for institutional headers and wayfinding to create 1970s standards-manual flavor.

```scss
$eid-font-sans: Arial, Helvetica, ui-sans-serif, sans-serif !default;
$eid-font-mono: 'Courier Prime', 'Courier New', ui-monospace, monospace !default;

// Roles
$eid-font-ui: $eid-font-sans !default;       // navigation, record class, app chrome
$eid-font-record: $eid-font-mono !default;   // entered data, fields, logs, notes
$eid-font-stamp: $eid-font-mono !default;    // stamps and classification marks
$eid-font-serial: $eid-font-mono !default;   // file numbers, device IDs, coordinates
```

Recommended typographic behavior:

| Type role | Font | Case | Tracking | Use |
|---|---|---|---|---|
| Product/agency identity | Sans | Uppercase | Wide | Eidolon header, division labels |
| Record text | Mono | Mixed | Normal | notes, fields, body content |
| Metadata | Mono | Uppercase | Medium-wide | file refs, form rev, status |
| Classification stamp | Mono | Uppercase | Extra-wide | restricted, eyes only, sealed |
| Device serial | Mono/OCR-like | Uppercase/digits | Fixed | gear labels, battery refs |

SCSS:

```scss
$eid-type-size-0: 0.625rem !default; // 10px metadata
$eid-type-size-1: 0.6875rem !default; // 11px small labels
$eid-type-size-2: 0.75rem !default; // 12px tabs, headers
$eid-type-size-3: 0.875rem !default; // 14px body
$eid-type-size-4: 1rem !default; // 16px article h2
$eid-type-size-5: 1.25rem !default; // 20px letterhead
$eid-type-size-6: 1.625rem !default; // 26px big readout

$eid-leading-tight: 1.2 !default;
$eid-leading-normal: 1.5 !default;
$eid-leading-reading: 1.6 !default;

$eid-track-tight: 0.08em !default;
$eid-track-meta: 0.14em !default;
$eid-track-wide: 0.22em !default;
$eid-track-stamp: 0.30em !default;
```

### 4.6 Spacing tokens

Use measured, bureaucratic spacing. Avoid lush, cinematic spacing unless creating a special landing page.

```scss
$eid-space-1: 0.25rem !default;  // 4px
$eid-space-2: 0.375rem !default; // 6px
$eid-space-3: 0.5rem !default;   // 8px
$eid-space-4: 0.75rem !default;  // 12px
$eid-space-5: 0.875rem !default; // 14px
$eid-space-6: 1rem !default;     // 16px
$eid-space-7: 1.125rem !default; // 18px
$eid-space-8: 1.375rem !default; // 22px
$eid-space-9: 1.5rem !default;   // 24px
$eid-space-10: 1.75rem !default; // 28px
$eid-space-11: 2.25rem !default; // 36px
$eid-space-12: 3.75rem !default; // 60px
```

### 4.7 Border and rule tokens

```scss
$eid-border-hairline: 1px solid $eid-rule-soft !default;
$eid-border-hard: 1px solid $eid-rule-hard !default;
$eid-border-double: 3px double $eid-rule-hard !default;
$eid-border-panel: 1px solid $eid-rule-hard !default;
$eid-border-status: 2px solid $eid-rule-hard !default;
$eid-border-stamp: 3px solid $eid-rule-danger !default;
$eid-border-dotted: 1px dotted $eid-rule-soft !default;
$eid-border-field: 1px dotted $eid-rule-hard !default;

$eid-radius-none: 0 !default;
$eid-radius-circle: 50% !default;
```

No rounded cards by default. Rounding should be reserved for circular seals, pips, dials, or explicitly technical instrument elements.

### 4.8 Layout tokens

```scss
$eid-page-max-width: 1180px !default;
$eid-sidebar-width: 330px !default;
$eid-index-width: 250px !default;

$eid-break-mobile: 700px !default;
$eid-break-tablet: 820px !default;
$eid-break-sidebar: 900px !default;

$eid-grid-gap: $eid-space-9 !default;
$eid-card-gap: $eid-space-4 !default;
```

### 4.9 Motion tokens

Motion should be minimal. The 1970s dossier should not feel slick, bouncy, or app-store polished.

```scss
$eid-motion-fast: 120ms !default;
$eid-motion-normal: 180ms !default;
$eid-motion-ease: steps(2, end) !default; // optional: mechanical feel
```

Use motion only for:

- collapsing/expanding records
- focus changes
- mode changes
- subtle stamp or print-state transitions

Always respect reduced motion.

```scss
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

### 4.10 Z-index tokens

```scss
$eid-z-base: 0 !default;
$eid-z-header: 10 !default;
$eid-z-stamp: 20 !default;
$eid-z-popover: 40 !default;
$eid-z-modal: 80 !default;
$eid-z-print-only: 100 !default;
```

---

## 5. SCSS file organization

Recommended structure:

```text
styles/
  00-tokens/
    _colors.scss
    _type.scss
    _spacing.scss
    _borders.scss
    _layout.scss
    _motion.scss
  01-tools/
    _mixins.scss
    _record-mixins.scss
    _print.scss
  02-base/
    _reset.scss
    _document.scss
    _typography.scss
    _forms.scss
  03-components/
    _letterhead.scss
    _stamp.scss
    _tabs.scss
    _buttons.scss
    _record-shell.scss
    _form-section.scss
    _field.scss
    _status-panel.scss
    _gauge.scss
    _karma-ruler.scss
    _pips.scss
    _wounds.scss
    _card.scss
    _index-list.scss
    _article.scss
    _redaction.scss
    _routing-strip.scss
    _audit-log.scss
  04-views/
    _personnel-file.scss
    _central-archive.scss
    _case-registry.scss
    _field-manual.scss
    _evidence-locker.scss
  05-modes/
    _gm-mode.scss
    _compromised-mode.scss
    _print.scss
  main.scss
```

For a single-file HTML build, keep the same conceptual sections in comments.

---

## 6. Core mixins

### 6.1 Metadata label

```scss
@mixin eid-meta-label {
  font-family: $eid-font-record;
  font-size: $eid-type-size-0;
  letter-spacing: $eid-track-meta;
  text-transform: uppercase;
  color: $eid-text-primary;
}
```

### 6.2 Section heading

```scss
@mixin eid-section-heading {
  font-family: $eid-font-ui;
  font-size: $eid-type-size-2;
  letter-spacing: $eid-track-wide;
  text-transform: uppercase;
  font-weight: 700;
}
```

### 6.3 Record surface

```scss
@mixin eid-record-surface($border: $eid-border-panel) {
  background: $eid-surface-panel;
  color: $eid-text-primary;
  border: $border;
}
```

### 6.4 Dotted form value

```scss
@mixin eid-field-value {
  font-family: $eid-font-record;
  min-height: 1.3125rem;
  padding: $eid-space-1 $eid-space-1;
  border-bottom: $eid-border-field;
  outline: none;
  white-space: pre-wrap;

  &:focus {
    background: $eid-surface-inset;
    border-bottom-style: solid;
  }

  &:empty::before {
    content: '—';
    color: $eid-rule-soft;
  }
}
```

### 6.5 Classification stamp

```scss
@mixin eid-classification-stamp($color: $eid-status-authority) {
  font-family: $eid-font-stamp;
  border: $eid-border-stamp;
  color: $color;
  padding: $eid-space-1 $eid-space-5;
  font-weight: 700;
  letter-spacing: $eid-track-stamp;
  text-transform: uppercase;
  font-size: $eid-type-size-3;
  transform: rotate(-3deg);
}
```

### 6.6 Monochrome technical label

```scss
@mixin eid-serial-label {
  font-family: $eid-font-serial;
  font-size: $eid-type-size-0;
  letter-spacing: $eid-track-meta;
  text-transform: uppercase;
  border: $eid-border-hard;
  padding: $eid-space-1 $eid-space-2;
  background: $eid-surface-inset;
}
```

---

## 7. Application shell

### 7.1 Body / page frame

The app should feel like a paper system placed inside a dark work surface or archive scanner.

```scss
html {
  background: $eid-frame-bg;
}

body {
  max-width: $eid-page-max-width;
  min-height: 100vh;
  margin: 0 auto;
  background: $eid-surface-page;
  color: $eid-text-primary;
  font-family: $eid-font-record;
  font-size: $eid-type-size-3;
  line-height: $eid-leading-normal;
  border-left: $eid-border-hairline;
  border-right: $eid-border-hairline;
}
```

### 7.2 Letterhead

Letterhead is identity + classification + file metadata.

Required elements:

```text
Eidolon mark / prototype seal
Organization name
Subline: division or system name
Classification stamp
File reference
Era / operation context
Form revision
```

Recommended component structure:

```html
<header class="eid-letterhead">
  <div class="eid-org-lockup">
    <div class="eid-org-sigil">E</div>
    <div>
      <h1>Eidolon</h1>
      <p>Advanced Research Directorate — Personnel Dossier System</p>
    </div>
  </div>

  <div class="eid-stamp">Restricted</div>

  <div class="eid-fileline">
    File Ref. <b>EID/70-114</b><br>
    Era: <b>1970s — Welderhide Operations</b><br>
    Form Rev. <b>S2 / v0.1</b>
  </div>
</header>
```

### 7.3 Navigation

Tabs should read as record dividers, not modern browser tabs.

Rules:

- Uppercase labels.
- Wide tracking.
- Hard borders.
- Active tab visually joins the paper surface.
- Tool buttons stay on the right when space allows.
- On mobile, tabs wrap rather than collapse into an ambiguous hamburger by default.

Recommended labels:

```text
Personnel File
Central Archive
Case Registry
Field Manual
Evidence Locker
```

### 7.4 Main layout

Personnel file view:

```scss
.eid-layout--dossier {
  display: grid;
  grid-template-columns: 1fr $eid-sidebar-width;
  gap: $eid-grid-gap;
  align-items: start;

  @media (max-width: $eid-break-sidebar) {
    grid-template-columns: 1fr;
  }
}
```

Archive / case view:

```scss
.eid-layout--index-record {
  display: grid;
  grid-template-columns: $eid-index-width 1fr;
  gap: $eid-space-8;
  align-items: start;

  @media (max-width: $eid-break-tablet) {
    grid-template-columns: 1fr;
  }
}
```

---

## 8. Record metadata pattern

Every view should include a metadata block. This creates institutional consistency and helps the wiki become a campaign machine.

Recommended metadata fields:

```text
Record Class:
Record ID:
Classification:
Division:
Handler / Author:
Access State:
Last Amended:
Form Revision:
Cross-References:
Contradiction Count:
Source Confidence:
```

### 8.1 Source confidence labels

```text
CONFIRMED
CONTRADICTED
FIELD-REPORTED
EXECUTIVE ONLY
PURGED COPY
UNRECONCILED
WITHDRAWN
PARTIAL TRANSCRIPT
```

SCSS:

```scss
$eid-confidence-colors: (
  confirmed: $eid-status-confirmed,
  contradicted: $eid-status-authority,
  field-reported: $eid-rule-soft,
  executive-only: $eid-status-authority,
  purged-copy: $eid-status-echo,
  unreconciled: $eid-status-resonance,
  withdrawn: $eid-rule-hard,
  partial-transcript: $eid-rule-soft
) !default;
```

Use the color sparingly: border, label text, or stamp only. Do not recolor entire pages.

---

## 9. Component rules

### 9.1 Form section

Use for dossier modules and rule sections.

Rules:

- Header is clickable if collapsible.
- Section code appears in the header right side.
- Body uses field grid, tables, cards, or notes.
- Notes are small, helpful, and mechanical.

Component anatomy:

```html
<section class="eid-form-section">
  <header class="eid-form-section__head">
    <h2>Identity</h2>
    <span>FORM E-1 · S2/v0.1</span>
  </header>
  <div class="eid-form-section__body">
    ...
  </div>
</section>
```

SCSS:

```scss
.eid-form-section {
  @include eid-record-surface;
  margin-bottom: $eid-space-8;

  &__head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: $eid-space-3;
    padding: $eid-space-2 $eid-space-4;
    border-bottom: $eid-border-hard;
    background: $eid-surface-inset;
    cursor: pointer;
  }

  &__head h2 {
    @include eid-section-heading;
  }

  &__head span {
    @include eid-meta-label;
  }

  &__body {
    padding: $eid-space-4 $eid-space-5;
  }

  &.is-collapsed &__body {
    display: none;
  }
}
```

### 9.2 Field grid

```scss
.eid-field-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $eid-space-3 $eid-space-8;

  @media (max-width: $eid-break-mobile) {
    grid-template-columns: 1fr;
  }
}

.eid-field {
  display: flex;
  flex-direction: column;
  gap: 1px;

  &--wide {
    grid-column: 1 / -1;
  }

  label {
    @include eid-meta-label;
  }

  &__value {
    @include eid-field-value;
  }
}
```

### 9.3 Buttons

Buttons should feel like form controls, not modern app pills.

Rules:

- Rectangular.
- Mono or institutional sans.
- Uppercase.
- High contrast focus state.
- Red only for destructive, GM, sealed, or dangerous institutional actions.

```scss
.eid-button {
  font-family: $eid-font-record;
  font-size: $eid-type-size-1;
  letter-spacing: $eid-track-meta;
  text-transform: uppercase;
  background: $eid-surface-page;
  color: $eid-text-primary;
  border: $eid-border-hard;
  padding: $eid-space-1 $eid-space-4;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: $eid-surface-inverse;
    color: $eid-text-inverse;
  }

  &--danger {
    border-color: $eid-rule-danger;
    color: $eid-text-danger;

    &:hover,
    &:focus-visible {
      background: $eid-status-authority;
      color: $eid-text-inverse;
    }
  }

  &--active-gm {
    background: $eid-status-authority;
    color: $eid-text-inverse;
    border-color: $eid-status-authority;
  }
}
```

### 9.4 Status panel

Use for Signal, Resonance, Karma, Harm, Access, and major operational state.

Rules:

- Sidebar panels use stronger borders than ordinary cards.
- Big readouts are numeric first, explanation second.
- Interaction must be direct: click pips, click wound boxes, click track buttons.
- Narrative notes explain consequences without hiding math.

### 9.5 Resonance gauge

Visual rules:

- Eden violet fill.
- 20/40/60/80 stage ticks.
- Current stage underlined or bolded.
- At 100%, avoid extra gore/horror styling; use institutional severity.

SCSS map:

```scss
$eid-resonance-stages: (
  clear: (min: 0, max: 19),
  touched: (min: 20, max: 39),
  atravessado: (min: 40, max: 59),
  marked: (min: 60, max: 79),
  consumed: (min: 80, max: 99),
  echo-lost: (min: 100, max: 100)
) !default;
```

### 9.6 Karma ruler

Visual rules:

- 11 cells from -5 to +5.
- Negative cells use Eden violet text.
- Positive cells use Echologist teal text.
- Current negative uses Eden background.
- Current positive uses Echologist background.
- Current zero uses ink background.
- Barred values from Contradiction Scars are visibly crossed out and non-interactive.

### 9.7 Signal pips

Visual rules:

- Empty pips are paper/inset.
- Filled pips use Echologist teal.
- Count is low enough to be click targets.
- Pips represent coherence, not luck.

### 9.8 Wound boxes

Visual rules:

- Empty boxes are paper.
- Marked boxes use stamp red.
- Serious/critical labels should explain functional consequences, not graphic injury.

### 9.9 Cards

Use for Techniques, Gear, Armor, Marks, Pacts, and Evidence.

Rules:

- Card header includes name and source/faction/type.
- Card body is rows of key/value fields.
- Faction color appears only in source label or thin border.
- Eidolon gear uses device serial and maintenance/tracking fields.

Recommended card fields for Techniques:

```text
Name
Faction
Tags
Type
Effect
Cost
Hard Requirements
Soft Requirements
Karma
Gear
Risk / Limitation
```

Recommended card fields for Gear:

```text
Device Name
Type
Capacity
Current Charge
Function
Compatible Techniques
Requirements
Risk
Maintenance
Tracking / Access Concerns
Notes
```

### 9.10 Redactions

Redactions are not decoration. They are state.

Types:

```text
Administrative — player lacks clearance.
Protective — names/subjects hidden.
Contradictory — copies redact different facts.
Supernatural — record resists stable reading.
```

UI rules:

- Use redactions only where there is real hidden content, sealed content, or intentional uncertainty.
- Do not black-bar random words to make a page look cool.
- Include a reason label when appropriate: `WITHHELD`, `EYES ONLY`, `WITHDRAWN`, `PENDING REVIEW`.
- In GM mode, redactions may reveal editable content.
- Player-visible redactions should not imply all mysteries are solvable immediately.

SCSS:

```scss
.eid-redaction {
  background: $eid-surface-inverse;
  color: $eid-surface-inverse;
  user-select: none;

  &--open {
    background: transparent;
    color: $eid-text-primary;
    user-select: text;
  }
}
```

### 9.11 Classification stamps

Stamp labels:

```text
RESTRICTED
EYES ONLY
SEALED
WITHDRAWN
DUPLICATE
FIELD COPY
PURGED COPY
COMPROMISED
UNRECONCILED
```

Rules:

- Use one main stamp per record.
- Rotation should be small: -4deg to +3deg.
- Stamps are authority marks, not stickers.
- Stamp red is reserved for institutional severity.

### 9.12 Routing strip

A routing strip gives every artifact a procedural life.

Fields:

```text
Received By:
Division:
Action Required:
Review Date:
Forward To:
Signature:
```

Use on case briefs, evidence packets, memos, and GM handouts.

### 9.13 Audit trail

Major changes should produce optional audit entries.

Fields:

```text
Timestamp / Session:
Actor:
Record:
Change:
Reason:
Case Ref:
Visibility:
```

Visibility values:

```text
PLAYER
GM
SEALED
EXPORT ONLY
```

---

## 10. Modes and states

### 10.1 Player mode

Default state.

- GM-only content redacted.
- Visible math is complete and honest.
- Archive may show public/internal layers but hides executive truth.

### 10.2 GM mode

Authority state.

- Stamp changes to `EYES ONLY`.
- GM fields reveal and become editable.
- Hidden fields remain visually distinguishable.
- UI should remind the GM: hidden information creates context, not invisible contradictory stats.

### 10.3 Compromised record mode

For late campaign, duplicated records, corrupted files, or access damage.

Visual effects:

- Missing fields.
- Contradiction labels.
- Duplicate stamps.
- Altered file refs.
- Slight grid misalignment.
- Violet/teal intrusion only in affected records.

Do not apply compromised styling globally unless the whole app is in a special campaign state.

### 10.4 Access states

Recommended SCSS map:

```scss
$eid-access-states: (
  restricted: (label: 'Restricted', color: $eid-status-authority),
  provisional: (label: 'Provisional', color: $eid-rule-hard),
  watched: (label: 'Watched', color: $eid-status-authority),
  contained: (label: 'Contained', color: $eid-status-authority),
  full: (label: 'Full Access', color: $eid-rule-hard),
  compromised: (label: 'Compromised', color: $eid-status-authority),
  blacklisted: (label: 'Blacklisted', color: $eid-status-authority),
  hunted-burned: (label: 'Hunted / Burned', color: $eid-status-authority)
) !default;
```

Use color plus text, never color alone.

---

## 11. Wiki / archive UX

The Central Archive should support layered truth.

Recommended article structure:

```text
Record Title
Record Metadata
Public / Cover Description
Internal Eidolon Description
Known Field Effects
Contradictions / Missing Records
Player-Safe Clues
GM Truth
Related Cases
1990s Echo
Revision Notes
```

### 11.1 Archive index

Index entries should show:

```text
Tag / class
Title
Classification
Confidence
Last amended
```

### 11.2 Article state labels

```text
FIELD-REPORTED
CONFIRMED
CONTRADICTED
SEALED
PURGED COPY
DUPLICATE COPY
EXECUTIVE ONLY
```

### 11.3 Cross-reference pattern

Every article should be able to reference:

```text
People
Cases
Divisions
Devices
Locations
Geists
Artifacts
Future echoes
```

### 11.4 Clue pinning

Add clue flags to archive and case records:

```text
Visible Clue
Pattern Clue
GM Truth
1990s Echo
False Lead
Contradiction
```

Clues should not only explain the current case. They should help players eventually realize the cases were connected.

---

## 12. Case Registry UX

Each case should use the campaign’s operational rhythm:

```text
1. Investigation — What is happening?
2. Conclusion — What do we think this is?
3. Preparation — What tools, permissions, tactics, or sacrifices are needed?
4. Clash — What direct confrontation, containment, choice, or consequence resolves the case?
```

Recommended case record fields:

```text
Case Title
Case Code
Date
Status
Official Briefing
Actual Situation
Surface Objective
Hidden Objective
Resonance Function
Human Stake
Moral Pressure
Faction Interpretations
Evidence of Larger Pattern
Possible Outcomes
1990s Consequence
Advancement Menu
GM Notes
```

The UI should allow `Official Briefing` and `Actual Situation` to coexist. This makes misdirection procedural instead of arbitrary.

---

## 13. Personnel File UX

The Personnel File is the app’s highest-pressure screen during play.

Priority order:

1. Signal, Resonance, Karma, Harm, Access.
2. Current role and identity.
3. Techniques and gear.
4. Pact/marks/hauntings.
5. Advancement log.
6. GM classified dossier.

### 13.1 Sidebar sacred zone

The status sidebar should remain consistent across character records. Avoid moving these readouts between screens unless there is a major redesign.

Required sidebar blocks:

```text
Signal
Resonance
Karma
Harm
Access
```

Optional blocks:

```text
Current Gear Charge
Active Conditions
Case Assignment
Handler Note
```

### 13.2 Player sheet and GM dossier

The GM classified dossier should be visually related to the player sheet but clearly separated.

GM fields:

```text
True Reason Eidolon Cares
Hidden Medical Classification
Handler Agenda
Unrevealed Treatment Consequences
Secret Faction Interest
Geist Long-Term Agenda
NPC Trust & Suspicion
Faction Standing
Future 1990s Consequence
Hidden Case Relevance
```

---

## 14. Evidence Locker UX

Evidence should be navigable by record type and case.

Recommended evidence types:

```text
Memo
Photograph
Transcript
Device Label
Map
Newspaper Clipping
Lab Sheet
Access Card
Routing Slip
Witness Note
Withdrawal Notice
Audio Log Summary
Field Sketch
```

Evidence metadata:

```text
Evidence ID
Case Ref
Source
Custody
Classification
Condition
Visible Clue
Pattern Clue
GM Truth
Related Records
```

Evidence pages should support printable output.

---

## 15. Print rules

Print mode is a first-class product feature.

Print types:

| Print type | Use |
|---|---|
| Personnel File | character handout |
| Redacted Personnel File | player-safe file |
| GM Personnel File | complete GM reference |
| Case Brief | session start |
| Evidence Packet | clues and props |
| Incident Report | post-session record |
| Archive Record | lore handout |
| Field Manual Page | rule reference |

SCSS:

```scss
@media print {
  html {
    background: $eid-print-bg;
  }

  body {
    max-width: none;
    border: 0;
  }

  .eid-tabs,
  .eid-tool-buttons,
  .eid-add-row,
  .eid-character-picker,
  .eid-no-print {
    display: none !important;
  }

  .eid-form-section,
  .eid-card,
  .eid-status-panel,
  .eid-article {
    break-inside: avoid;
  }

  .eid-print-only {
    display: block !important;
  }
}
```

Print artifacts should include:

```text
File ref
Print date or session date
Classification
Page number
Form revision
Copy state: FIELD COPY / DUPLICATE / REDACTED / GM COPY
```

---

## 16. Accessibility rules

The aesthetic is degraded paper, but the product must remain readable.

Rules:

- Do not rely on color alone for state.
- Maintain readable contrast between text and paper.
- Keep editable fields keyboard-focusable.
- Use `:focus-visible` states that are at least as strong as hover states.
- Avoid tiny text for essential information.
- Never make redactions or corrupted text necessary for understanding player-facing rules.
- Respect reduced motion.
- Ensure printable output works without background colors when possible.

Recommended focus style:

```scss
:focus-visible {
  outline: 2px solid $eid-rule-hard;
  outline-offset: 2px;
}
```

---

## 17. Responsive rules

Mobile layout should preserve record identity, not become a generic app.

Rules:

- Stack the sidebar below the main record or place status panels before collapsible modules if the table needs quick access.
- Tabs may wrap.
- Form fields collapse to one column.
- Cards collapse to one column.
- Index + article views collapse to index first, article second.
- Letterhead wraps cleanly; classification stamp remains visible.

---

## 18. Building fitting UI screens

Use this process whenever adding a new screen.

### Step 1 — Identify the record class

Do not start with layout. Start with institutional identity.

```text
Is this a personnel file, archive record, case file, evidence item, field manual page, or division memo?
```

### Step 2 — Define the immediate table use

```text
What decision or memory does this screen support during play?
```

### Step 3 — Define visibility layers

```text
Player-visible
GM-only
Sealed/unavailable
Contradicted by another record
Future echo
```

### Step 4 — Add metadata before ornament

Every screen gets record metadata before special texture.

### Step 5 — Choose the component family

```text
Narrative article -> Archive Article
Structured stats -> Form Section
Repeatable abilities -> Cards
Live values -> Status Panel
Clue packets -> Evidence Record
```

### Step 6 — Add only earned flavor

Binder holes, stamps, redactions, copy marks, routing strips, and corruption should support the record’s function.

---

## 19. UI flavor additions for the existing dossier

These can be added without breaking the current single-file / vanilla JS direction.

### 19.1 Document hardware

```text
Binder holes on left edge
File-tab notch at top of active view
Microfilm frame numbers on archive pages
Routing strip on case records
Revision block in footer
Stamped duplicate/copy labels
```

### 19.2 Layered metadata

Add to Archive and Operations records:

```text
Record Class
Division
Clearance
Handler
Last Amended
Cross-References
Contradiction Count
```

### 19.3 Source confidence labels

Add state chips:

```text
CONFIRMED
CONTRADICTED
FIELD-REPORTED
EXECUTIVE ONLY
PURGED COPY
UNRECONCILED
```

### 19.4 Division-coded file prefixes

Use codes, not extra colors:

```text
TH-HAR-###      Theoretical Harmonics
MED-###         Medical Research
ENG-CELL-###    Engineering / resonant cells
OPS-CASE-###    Field Operations
SUBJ-###        Subject Management
ARC-###         Archive
```

### 19.5 Clue pinning

Add toggles or select fields:

```text
Visible Clue
Pattern Clue
GM Truth
1990s Echo
```

---

## 20. Do / don’t rules

### Do

- Make every screen useful first.
- Use the seven-color palette semantically.
- Use red only for authority, restriction, denial, danger, or sealed GM state.
- Let the interface feel calm in the face of impossible content.
- Make Eidolon competent enough to be tempting.
- Let print mode produce beautiful table artifacts.
- Treat changes as records, not only values.
- Use grids, file numbers, signatures, revision blocks, and access states.

### Don’t

- Do not make the UI look like a haunted house website.
- Do not add colors just to distinguish categories.
- Do not black-bar random text as decoration.
- Do not use glitch effects as default styling.
- Do not hide player-facing mechanics behind mystery.
- Do not let visual flavor reduce readability.
- Do not make Eidolon look too futuristic for the 1970s.
- Do not make the 1970s logo look like the polished 1990s technology brand.

---

## 21. Implementation checklist

Before merging a new UI component or screen, check:

```text
[ ] Does it have a record class?
[ ] Does it have useful metadata?
[ ] Does it use semantic color tokens?
[ ] Does it work in player and GM visibility states?
[ ] Does it print acceptably?
[ ] Does it remain readable on mobile?
[ ] Does it avoid decorative redactions?
[ ] Does it support the table’s immediate needs?
[ ] Does it feel like 1970s Eidolon rather than generic retro horror?
[ ] Does it preserve the human layer beneath the institutional layer?
```

---

## 22. Canon UI north star

The app should feel like a system that can record a haunting, deny a medical request, log a resonant battery fault, redact a person’s name, and print a case brief without changing tone.

That consistency is the horror.
