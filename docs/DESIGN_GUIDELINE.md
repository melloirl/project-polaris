# DESIGN_GUIDELINE.md — Eidolon 1970s Visual & Artifact Design Guide

**Project:** Resonance / Ressonância Polimento  
**Scope:** Logos, printed artifacts, clues, ambience, handouts, faction visuals, evidence packets, and general RPG visual material  
**Status:** Draft v0.1  
**Companion document:** `UI.md`

---

## 1. Core aesthetic sentence

**1970s Eidolon is federal-modernist bureaucracy slowly contaminated by Resonance.**

The visual language should not begin as occult, neon, or horror-forward. It should begin as confident institutional design: clean grids, file numbers, seals, technical diagrams, forms, route slips, and controlled typography. The supernatural should appear as pressure on that system: contradictions, duplicated pages, impossible metadata, violet/teal intrusions, and records that no longer agree with themselves.

---

## 2. Design pillars

### 2.1 Useful institutional clarity

Eidolon believes it can classify the impossible. Its documents should look like they were built to work: legible, repeatable, modular, and boring in a threatening way.

### 2.2 Procedure as horror

The frightening element is often not the event itself. It is the institution’s calm response to it.

Example tone:

```text
SUBJECT RESPONSE: ACCEPTABLE
DEVICE FAILURE: PRODUCTIVE
CIVILIAN DISCLOSURE RISK: CONTAINED
FIELD TEAM MEMORY INTEGRITY: PENDING REVIEW
```

### 2.3 Contamination must be earned

Violet/teal intrusions, broken grids, doubled text, and supernatural artifacts should be used sparingly. The default artifact should be disciplined. The uncanny version should feel like a violation of that discipline.

### 2.4 Eidolon must be tempting

The design should communicate real competence. Eidolon is not a messy villain lair. It produces useful tools, credible reports, and life-saving infrastructure. That makes its moral compromises more powerful.

---

## 3. Research anchors and what to borrow

### NASA Graphics Standards Manual, 1976

Borrow:

```text
Strict logo rules
Clear reproduction standards
Stationery and form systems
Technical diagrams
Vehicle/signage discipline
Minimal, confident identity
```

Use for:

```text
Eidolon mark rules
Division stationery
Field equipment labels
Protocol diagrams
Facility signage
Official memos
```

Do not borrow:

```text
Space-age optimism as-is
Bright patriotic palette
Overly clean future-tech polish
```

### EPA Graphic Standards System, 1977

Borrow:

```text
Modular government identity
Flexible but consistent layouts
Public-agency authority
Rational visual hierarchy
```

Use for:

```text
Eidolon public-facing pilot programs
Welderhide civic partnership documents
Division-coded publications
Institutional reports
```

Do not borrow:

```text
Open environmental friendliness without subversion
Bright public-service warmth unless it is part of a cover identity
```

### National Park Service Unigrid, 1977

Borrow:

```text
Repeatable grid formats
Standardized folding/printing logic
Strong page hierarchy
Many topics unified by one system
```

Use for:

```text
Printable handouts
Field manuals
Case packets
Map-and-text layouts
Archive articles
```

Do not borrow:

```text
Tourist warmth without institutional unease
Photographic richness that overwhelms clues
```

### NARA declassification / redaction logic

Borrow:

```text
Redaction codes
Withdrawal notices
Review status
Reasoned withholding
Classified copy language
```

Use for:

```text
Redacted clues
Sealed personnel files
Contradictory copies
GM-only handouts
Declassified 1990s echoes
```

Do not borrow:

```text
Random black bars as decoration
Unclear redaction with no meaning
```

### IBM / Paul Rand-era corporate modernism

Borrow:

```text
Practical simplicity
Strong wordmarks
Clear corporate identity
Restrained confidence
```

Use for:

```text
Future-facing Eidolon identity bridge
Wordmarks
Equipment labels
Corporate transition documents
```

Do not borrow:

```text
Too much friendly consumer polish for 1970s classified Eidolon
```

### OCR-A / machine-readable type

Borrow:

```text
Machine-readable serial flavor
Device tags
Accounting-like identifiers
Early computer processing texture
```

Use for:

```text
Battery labels
Access cards
Punch-card inspired forms
File IDs
Lab stickers
```

Do not borrow:

```text
Whole paragraphs in OCR-like fonts
Unreadable tech styling
```

---

## 4. Palette and SCSS artifact tokens

Use the same seven-color foundation as the UI.

```scss
$eid-color-paper: #EFE7D6 !default;
$eid-color-paper-2: #E4D9C2 !default;
$eid-color-ink: #2B2722 !default;
$eid-color-rule: #C2B496 !default;
$eid-color-stamp: #9E2B25 !default;
$eid-color-eden: #5C4B73 !default;
$eid-color-echo: #3E6259 !default;
```

### 4.1 Artifact semantic tokens

```scss
$artifact-surface: $eid-color-paper !default;
$artifact-surface-inset: $eid-color-paper-2 !default;
$artifact-ink: $eid-color-ink !default;
$artifact-rule: $eid-color-rule !default;
$artifact-authority: $eid-color-stamp !default;
$artifact-resonance: $eid-color-eden !default;
$artifact-signal: $eid-color-echo !default;
```

### 4.2 Classification tokens

```scss
$classification-restricted: $eid-color-stamp !default;
$classification-eyes-only: $eid-color-stamp !default;
$classification-sealed: $eid-color-stamp !default;
$classification-field-copy: $eid-color-ink !default;
$classification-duplicate: $eid-color-rule !default;
$classification-purged-copy: $eid-color-echo !default;
$classification-unreconciled: $eid-color-eden !default;
```

### 4.3 Faction tokens

```scss
$faction-eidolon: $eid-color-ink !default;
$faction-occult-eden: $eid-color-eden !default;
$faction-echologist: $eid-color-echo !default;
$faction-geist: $eid-color-eden !default;
$faction-welderhide-civic: $eid-color-rule !default;
```

Use faction color as a small signal: a rule line, stamp, annotation mark, icon, or label. Do not flood pages with faction color.

---

## 5. Typography rules

### 5.1 Two-voice type system

Use two voices:

| Voice | Typeface direction | Use |
|---|---|---|
| Institutional | Helvetica/Arial-like sans | logos, headers, division identity, navigation, manual covers |
| Dossier | Courier/typewriter mono | entered data, notes, case fields, transcripts, file content |

SCSS:

```scss
$artifact-font-institutional: Arial, Helvetica, ui-sans-serif, sans-serif !default;
$artifact-font-dossier: 'Courier Prime', 'Courier New', ui-monospace, monospace !default;
$artifact-font-serial: 'Courier New', ui-monospace, monospace !default;
```

### 5.2 Usage rules

- Do not use more than two primary typefaces in a single artifact.
- Use uppercase and tracking for institutional metadata.
- Use typewriter mono for record content and human notes.
- Use OCR-like text only for serials and device labels.
- Use handwritten annotations sparingly and only when the source is human, field-level, or contaminated.

---

## 6. Logo system directions

The current Eidolon logo feels thematically sound but later-era: polished, luminous, signal/energy-forward, and closer to the 1990s technology identity. The 1970s mark should feel like the ancestor: stamped, measured, technical, and a little unfinished.

### 6.1 Direction A — Directorate Seal

Best for:

```text
Personnel files
Official memos
Forms
Restricted stationery
Division documents
```

Structure:

```text
Outer ring: EIDOLON ADVANCED RESEARCH DIRECTORATE
Secondary ring: division / field office / year
Inner field: simplified E, aperture, or target
Optional: 12 divisions as segmented perimeter
```

Rules:

- Works in one color first.
- No glow.
- Thick enough for photocopy and stamp reproduction.
- Slight stamp degradation allowed.
- Must remain readable at small sizes.
- Should feel like an agency seal, not a consumer app icon.

### 6.2 Direction B — Harmonics Prototype Mark

Best for:

```text
Theoretical Harmonics
Engineering
Resonant cell labels
Prototype manuals
Battery diagrams
```

Structure:

```text
Concentric receiver/emitter center
Segmented calibration gates
One missing/offset segment for instability
Registration ticks
Small serial line below
```

Rules:

- This is the best ancestor of the current polished mark.
- Use mostly ink or stamp red in 1970s documents.
- Eden violet or Echologist teal should appear only when the device or file is faction-contaminated.
- It can look slightly more technical than the Directorate Seal.

### 6.3 Direction C — Federal Modernist Wordmark

Best for:

```text
App header
Manual covers
Internal publications
Public-private partnership documents
Early corporate transition material
```

Structure:

```text
EIDOLON
ADVANCED RESEARCH DIRECTORATE
```

Rules:

- Wide uppercase sans.
- Strong horizontal alignment.
- No glow, no bevel, no chrome.
- Should bridge classified research and future corporate legitimacy.

### 6.4 Direction D — Contaminated Variant

Best for:

```text
Late-campaign clues
Corrupted copies
Geist-touched records
Contradictory artifacts
Hidden Great Transcendent traces
```

Rules:

- Never use as the default official logo.
- Appears only when the story has earned it.
- May duplicate a ring, rotate a segment, invert the center, or create impossible alignment.
- Use violet/teal sparingly.
- Should feel like the official mark has been copied by something that does not understand institutions but understands symbols.

### 6.5 Logo do/don’t

Do:

```text
Design in one color first.
Test at stamp size, file header size, and equipment-label size.
Create incorrect-use rules.
Create clear space rules.
Create division lockups.
Create photocopy-degraded variants.
```

Don’t:

```text
Do not add glow to the 1970s mark.
Do not use neon as a default.
Do not make the 1970s logo too slick.
Do not overuse contaminated versions.
Do not make the mark look occult by default.
```

---

## 7. Artifact tiers

Every visual artifact should belong to one of three tiers.

### 7.1 Tier A — Public / civic Welderhide

Purpose:

```text
Show how Eidolon’s influence looks like rescue, modernization, investment, and civic hope.
```

Examples:

```text
Municipal notices
Mine safety bulletins
Local newspaper clippings
Hospital intake forms
School flyers
Utility bills
Town council agendas
Public-private partnership brochures
Employment posters
Infrastructure notices
```

Visual language:

```text
Cheap print
Local civic seals
Newspaper columns
Optimistic modernization language
Mining geometry
Public benefit framing
```

Tone:

```text
Eidolon is not invading the city. It is renovating the city into dependence.
```

### 7.2 Tier B — Eidolon internal

Purpose:

```text
Show the institution’s competence, secrecy, hierarchy, and moral distance.
```

Examples:

```text
Personnel dossiers
Case briefs
Incident reports
Lab diagrams
Device tags
Requisition slips
Access cards
Routing memos
Training sheets
Containment summaries
Medical classification forms
```

Visual language:

```text
Grid
File numbers
Signatures
Revision codes
Division marks
Classification stamps
Typewritten notes
Cold hierarchy
```

Tone:

```text
The supernatural has a form number.
```

### 7.3 Tier C — Resonance-contaminated

Purpose:

```text
Show that Resonance pressures records, memory, identity, and causality.
```

Examples:

```text
Altered copies
Impossible transcripts
Duplicated pages with different contents
Photographs with wrong labels
Field diagrams that contradict themselves
Audio logs represented as broken waveforms
Redactions that reveal instead of hide
Maps whose coordinates repeat
```

Visual language:

```text
Misregistration
Repeated symbols
Broken grids
Unnatural symmetry
Violet/teal intrusion
Incorrect dates
Conflicting metadata
```

Tone:

```text
The file is still official. That is the problem.
```

---

## 8. Artifact templates

### 8.1 Personnel dossier

Required elements:

```text
Eidolon lockup
Classification stamp
File reference
Subject name
Role / occupation
Handler
Access state
Signal / Resonance / Karma summary
Harm summary
GM-only classification block when needed
Revision block
```

Flavor elements:

```text
Binder holes
Form codes
Dotted value fields
Typed addenda
Small routed signatures
```

### 8.2 Case brief

Required elements:

```text
Case code
Case title
Status
Official briefing
Surface objective
Assigned personnel
Equipment authorization
Known risks
Reporting instructions
```

GM version adds:

```text
Actual situation
Hidden objective
Resonance function
Evidence of larger pattern
Possible outcomes
1990s consequence
```

### 8.3 Incident report

Required elements:

```text
Incident code
Time/place
Personnel present
Event summary
Device behavior
Subject response
Containment outcome
Casualty / exposure summary without graphic detail
Recommended action
Reviewer signature
```

Tone rule:

```text
Dry institutional language is stronger than melodrama.
```

### 8.4 Lab sheet / calibration sheet

Required elements:

```text
Device ID
Batch number
Operator
Calibration date
Input frequency
Output drift
Containment status
Fault notes
Maintenance action
Signature
```

Use for resonant batteries, field detectors, containment boxes, and prototype devices.

### 8.5 Access card / badge

Required elements:

```text
Name
Photo or placeholder box
Division
Access state
Badge number
Expiration / review date
Handler
Restrictions
Machine-readable line
```

Design notes:

```text
Use one-color seal.
Use OCR-like serial line.
Add punched-hole or clip mark.
Keep it readable.
```

### 8.6 Evidence label

Required elements:

```text
Evidence ID
Case ref
Collected by
Date/time
Location
Chain of custody
Condition
Classification
Visible clue
Pattern clue
```

### 8.7 Newspaper clipping

Required elements:

```text
Publication name
Date
Headline
Column text
Photo box or caption
Civic optimism or local anxiety
Small clue embedded in ordinary reporting
```

Rules:

- Keep articles short for table use.
- Use mundane language.
- Hide the clue in context, not in tiny unreadable text.

### 8.8 Memo

Required elements:

```text
To
From
Division
Subject
Date
Distribution
Action required
Body
Routing / signature block
```

Memo tone examples:

```text
Request denied pending classification review.
Forward all subject notes to Theoretical Harmonics.
Do not discuss the Welderhide pilot language with municipal staff.
```

### 8.9 Transcript / audio log summary

Required elements:

```text
Tape ID
Location
Recorder / operator
Participants
Transcript confidence
Missing sections
Body
Reviewer note
```

Use `[UNINTELLIGIBLE]`, `[STATIC]`, and `[REDACTED]` sparingly. The transcript should still be playable.

### 8.10 Withdrawal notice

Required elements:

```text
Record withdrawn
Reason code
Review authority
Date withdrawn
Replacement summary if any
Appeal / review note
```

Use withdrawal notices as clues. A missing page can be more revealing than a visible one.

---

## 9. Redaction rules

Redactions are meaningful withholding, not visual decoration.

### 9.1 Four redaction types

| Type | Meaning | Use |
|---|---|---|
| Administrative | Clearance not high enough | Player-safe dossiers, early archive pages |
| Protective | Names/locations hidden | Witnesses, civilians, assets |
| Contradictory | Copies hide different things | Midpoint pattern clues |
| Supernatural | Text resists stable reading | Late or contaminated artifacts |

### 9.2 Redaction labels

```text
WITHHELD
EYES ONLY
WITHDRAWN
PENDING REVIEW
SOURCE PROTECTED
EXECUTIVE SEAL
UNRECONCILED COPY
```

### 9.3 Redaction do/don’t

Do:

```text
Use redactions to control pacing.
Use reason codes or review notes.
Let different copies reveal different truths.
Allow GM versions to show what was hidden.
```

Don’t:

```text
Do not redact random words.
Do not make clues unreadable.
Do not overfill every artifact with black bars.
Do not use redaction as a substitute for writing an actual clue.
```

---

## 10. Clue design rules

### 10.1 Every clue has two purposes

A Resonance clue should solve an immediate table need and feed the larger pattern.

```text
Immediate clue: What helps the players act now?
Pattern clue: What will matter when cases connect later?
```

Example:

```text
Artifact: Battery calibration sheet
Immediate clue: The prototype was active before the team arrived.
Pattern clue: The same harmonic code appears in three unrelated cases.
GM truth: The test was not accidental.
```

### 10.2 Clue chains beat lore dumps

Use recurring graphic details:

```text
Same form revision
Same battery batch number
Same division initials
Same handler signature
Same stamp angle
Same map coordinate
Same waveform
Same missing page count
Same phrase in different reports
```

The first appearance is texture. The second is suspicious. The third becomes pattern.

### 10.3 Clue visibility levels

```text
Visible Clue — players can act on it immediately.
Pattern Clue — matters later when repeated.
GM Truth — hidden explanation.
1990s Echo — future campaign connection.
False Lead — plausible but incorrect.
Contradiction — points to record tampering or supernatural instability.
```

### 10.4 Clue fairness

- Give players enough readable information to make choices.
- Do not hide essential clues only in graphic decoration.
- Make repeated identifiers searchable in the app.
- If a clue is visual, also include a text path to notice it.
- Do not make players solve typography tricks to progress.

---

## 11. Faction visual habits

Use the same base system, but change graphic behavior by source.

| Source | Visual behavior |
|---|---|
| Eidolon | Grid, seals, forms, measured diagrams, calibration marks, serials |
| Occult Eden | Violet annotations, circles, names, memory fragments, organic intrusions |
| Echologist | Teal cuts, clean erasures, voids, surgical marks, severance diagrams |
| Geist | Repetition, impossible symmetry, wrong dates, emotional language in technical fields |
| Welderhide civic | Local optimism, mining geometry, newspaper texture, public-private partnership language |

### 11.1 Eidolon

Visual qualities:

```text
Procedural
Measured
Cold
Legible
Traceable
```

Common marks:

```text
File refs
Revision numbers
Division codes
Classification stamps
Routing blocks
Device serials
```

### 11.2 Occult Eden

Visual qualities:

```text
Intimate
Remembering
Symbiotic
Dangerously empathetic
```

Common marks:

```text
Names in margins
Violet circles
Memory fragments
Hand annotations
Threshold diagrams
Soft repeating phrases
```

Avoid making Eden simply “evil magic.” Its danger comes from closeness and exposure.

### 11.3 Echologist

Visual qualities:

```text
Precise
Severing
Clean
Cold
Doctrinal
```

Common marks:

```text
Teal strike-lines
Clean gaps
Erasure marks
Ward diagrams
Severance notation
White space used as force
```

Avoid making Echologists automatically heroic. Their documents can be beautiful and still frightening in what they erase.

### 11.4 Geists

Visual qualities:

```text
Too focused
Too pure
Repetitive
Symbolically literal
Emotionally excessive
```

Common marks:

```text
Repeated words
Incorrect dates
Fields filled with emotional language
Names appearing where serials should be
Symmetry that ignores the grid
```

### 11.5 Welderhide civic

Visual qualities:

```text
Local
Optimistic
Industrial
Slightly worn
Public-facing
```

Common marks:

```text
Town seals
Mining shapes
Newspaper columns
Civic slogans
Job postings
Infrastructure diagrams
```

This layer should show dependency forming in public view.

---

## 12. Ambience design

Ambience includes table screens, background visuals, session title cards, sound-log pages, and printable packets.

### 12.1 General ambience rule

Start mundane. Let the impossible intrude.

Better:

```text
A clean case brief with one impossible field value.
```

Weaker:

```text
A page covered in spooky symbols before the players know why.
```

### 12.2 Session title cards

Format:

```text
CASE 04 — THE STILLWATER ARRAY
Welderhide Field Office
Restricted / Field Copy
Date
Assigned Team
One-line official objective
```

Optional late-campaign contamination:

```text
Case number appears twice.
Date disagrees with previous file.
Classification stamp is from a division that should not know this case exists.
```

### 12.3 Ambient case board

Use:

```text
Case codes
Map pins
Evidence IDs
Thread lines
Division labels
Missing page markers
```

Avoid:

```text
Overly cinematic conspiracy corkboards unless the players themselves build one.
```

### 12.4 Field manual pages

Use:

```text
Clean diagrams
Numbered procedures
Warning boxes
Allowed/forbidden actions
Revision marks
```

Tone:

```text
Eidolon writes procedures for impossible events because it believes procedure can own them.
```

---

## 13. Texture and degradation

### 13.1 Allowed texture

Use lightly:

```text
Uneven photocopy edges
Slight paper speckle
Dotted form lines
Misregistered stamp
Typed-over corrections
Binder holes
Fold marks
Tape shadows
```

### 13.2 Avoid

```text
Heavy grunge overlays
Unreadable distress
Blood-like smears
Excessive glitch filters
Fake film damage on every artifact
Random occult symbols
```

Texture should imply use, copying, classification, and time. It should not drown information.

### 13.3 SCSS texture using only flat colors

Instead of alpha overlays, use repeating patterns with palette colors.

```scss
.artifact-paper-noise {
  background-color: $artifact-surface;
  background-image:
    linear-gradient(90deg, $artifact-rule 1px, transparent 1px),
    linear-gradient($artifact-rule 1px, transparent 1px);
  background-size: 96px 96px;
}
```

Use this sparingly and test print output.

---

## 14. Document hardware

Hardware elements make digital records feel physically handled.

Recommended elements:

```text
Binder holes
File tab notch
Staple mark
Routing slip
Page count
Microfilm frame number
Copy stamp
Punch-card edge
Archive box label
Paperclip shadow using flat shape
```

Use one or two per artifact. Too many becomes costume.

---

## 15. Division coding

Use file prefixes before adding new visual colors.

Suggested prefixes:

```text
TH-HAR-###      Theoretical Harmonics
MED-###         Medical Research
ENG-CELL-###    Engineering / resonant cells
OPS-CASE-###    Field Operations
SUBJ-###        Subject Management
ARC-###         Archive
CIV-WEL-###     Welderhide civic/public records
EXEC-###        Executive / inner circle
NDC-###         Declassification or later archive review
```

A file code should imply source, not just category.

Example:

```text
ENG-CELL-077 / Batch 7 / Calibration Drift Addendum
```

---

## 16. Layout laws

### 16.1 Grid

Use simple modular grids:

```text
1-column memo
2-column dossier field grid
Index + article split
Sidebar + main record
Folded-panel handout
Map + notes packet
```

### 16.2 Alignment

- Left-align most text.
- Use right alignment only for file metadata, signatures, page numbers, or tabular numeric fields.
- Keep stamps slightly rotated, but do not rotate body content.
- Use hard rules and dotted rules to organize information.

### 16.3 Density

Eidolon documents can be dense, but table artifacts need scanning paths.

Every artifact should have:

```text
Title
Classification
Record code
One clear body area
One clue or purpose
One metadata trail
```

---

## 17. Language and copywriting

### 17.1 Eidolon voice

Eidolon writes in controlled institutional language.

Common words:

```text
subject
asset
field team
incident
exposure
classification
calibration
containment
review
deviation
authorization
liability
productive failure
acceptable variance
```

Avoid overusing:

```text
ghost
magic
curse
demon
monster
```

Unless the artifact comes from a non-Eidolon source.

### 17.2 Civic Welderhide voice

Public records should sound hopeful, practical, and local.

Common phrases:

```text
new jobs
modernization
public-private partnership
revitalization
infrastructure improvement
energy reliability
community safety
research investment
```

### 17.3 Occult Eden voice

Use more relational language.

Common phrases:

```text
name
memory
threshold
witness
voice
return
communion
what remains
```

### 17.4 Echologist voice

Use precise, severing language.

Common phrases:

```text
clean frequency
severance
purge
contamination line
silence
white field
cut
refusal
```

### 17.5 Geist voice

Geist-influenced text should feel emotionally overfocused, not random.

Common patterns:

```text
Repeated emotional terms
Literal substitutions in technical fields
A name where a number should be
Dates that point to memory rather than chronology
```

---

## 18. Creating a new visual artifact

Use this workflow.

### Step 1 — Choose artifact tier

```text
A. Public / civic Welderhide
B. Eidolon internal
C. Resonance-contaminated
```

### Step 2 — Define table function

```text
Brief the players?
Give a clue?
Show institutional pressure?
Create a contradiction?
Record a consequence?
Foreshadow the 1990s?
```

### Step 3 — Define source and bias

```text
Who made this?
What do they know?
What are they hiding?
What do they misunderstand?
```

### Step 4 — Add metadata

```text
Record code
Date
Division/source
Classification
Copy state
Handler/reviewer
Revision
```

### Step 5 — Add the clue layer

```text
Visible clue
Pattern clue
GM truth
1990s echo
```

### Step 6 — Add only necessary texture

Choose one or two:

```text
Stamp
Routing strip
Binder hole
Photocopy wear
Redaction
Hand note
Misregistration
```

### Step 7 — Test readability

The artifact fails if the players cannot read it, use it, or remember why it matters.

---

## 19. Asset production checklist

Before finalizing an artifact:

```text
[ ] Does it belong to a clear tier?
[ ] Does it have a source and bias?
[ ] Does it have a record code or metadata trail?
[ ] Does it use the seven-color palette intentionally?
[ ] Is the clue readable?
[ ] Does the artifact support an immediate table purpose?
[ ] Does it feed a larger pattern or character consequence?
[ ] Are redactions meaningful rather than decorative?
[ ] Is supernatural contamination restrained and earned?
[ ] Does it print or display cleanly?
```

---

## 20. Example artifact concepts

### 20.1 Public civic poster

```text
Title: Welderhide Energy Reliability Initiative
Tier: Public / civic
Source: City council + Eidolon partnership office
Visible clue: Eidolon is funding infrastructure upgrades near old mine routes.
Pattern clue: Map nodes match future battery-grid placements.
Visual: Civic optimism, mining geometry, official seals, restrained Eidolon wordmark.
```

### 20.2 Internal calibration sheet

```text
Title: Resonant Cell Mk.I Drift Test
Tier: Eidolon internal
Source: Engineering / Theoretical Harmonics
Visible clue: Prototype was active before the incident.
Pattern clue: Batch number appears in later medical files.
Visual: Grid table, device serial, operator signature, red restricted stamp.
```

### 20.3 Contradictory transcript

```text
Title: Tape 07-B / Field Interview
Tier: Resonance-contaminated
Source: Field Operations copy
Visible clue: Witness remembers a room that does not appear on the facility plan.
Pattern clue: The same missing room appears in three separate cases.
Visual: Typewritten transcript, two timestamps for one answer, one line overwritten by another copy.
```

### 20.4 Withdrawal notice

```text
Title: ARC-WITHDRAWAL / Case 02 Addendum
Tier: Eidolon internal
Source: Archive review
Visible clue: A page was removed after the team filed its report.
Pattern clue: Reviewing division should not have had access to the case.
Visual: Sparse form, stamp, reason code, replacement summary.
```

### 20.5 Contaminated logo imprint

```text
Title: Unmarked field copy
Tier: Resonance-contaminated
Source: Unknown duplicate
Visible clue: Eidolon seal has twelve outer segments, but this copy has thirteen.
Pattern clue: The extra segment corresponds to a person erased from team records.
Visual: Slightly offset one-color seal, violet intrusion only at the extra segment.
```

---

## 21. What to avoid

Avoid these defaults:

```text
Generic paranormal investigation boards
Every artifact covered in symbols
Neon cyberpunk styling
Excessive fake aging
Illegible typewriter distress
Decorative redaction
Random glitch effects
Horror movie typography
Overexplaining the supernatural visually too early
Making Eidolon look obviously evil from the first page
```

The strongest Resonance artifact often looks ordinary until the players understand why it is not.

---

## 22. Final north star

A perfect 1970s Eidolon artifact should feel like this:

```text
Someone designed this to solve a problem.
Someone used it to hide a person.
Something impossible has started using the same form.
```

That is the campaign’s visual heart.
