# Progressive Eidolon UI Component Tracker

## Current Focus

Complete.

## Next Up

- Keep `.playwright-cli` artifacts out of implementation commits.

## Done

- Added shared UI type contracts in `app/types/ui.ts`.
- Added ranged control helpers in `app/composables/useRangedControl.ts`.
- Implemented reusable `Ui*` components under `app/components/ui`.
- Migrated dossier buttons, tabs, fields, sections, photo plate, instruments, record cards, GM redaction, and toolbar controls to reusable UI components.
- Rebuilt `/cookbook` to exercise core, forms, instruments, records, and feedback components.
- Loaded all component reference pages over `python3 -m http.server 4173`.
- Verified `/cookbook` interactions and desktop/mobile overflow with Playwright.
- Verified the main dossier page renders navigation plus five status panels with no mobile overflow.

## Blocked/Notes

- Backend/data integration remains out of scope; components expose props, emits, and slots.
- `references/*` are treated as source-of-truth artifacts and were not edited.
- Nuxt dev server is running at `http://127.0.0.1:3001/` because port 3000 was occupied.

| Phase | Component | Reference | Visual | Tokens | Implemented | Cookbook | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | UiButton | `references/01 Buttons.html` | pass | yes | yes | yes | done | `default`, `danger`, `active-gm`; `md`, `sm`. |
| 1 | UiSeal | `references/02 Core.html` | pass | yes | yes | yes | done | Replaces letterhead sigil/wordmark. |
| 1 | UiStamp | `references/02 Core.html` | pass | yes | yes | yes | done | Tones: `danger`, `ink`, `eden`, `echo`. |
| 1 | UiTabs | `references/02 Core.html` | pass | yes | yes | yes | done | Navigation migrated. |
| 2 | UiFormSection | `references/03 Forms & Inputs.html` | pass | yes | yes | yes | done | Dossier section wrapper migrated. |
| 2 | UiField | `references/03 Forms & Inputs.html` | pass | yes | yes | yes | done | Editable/read-only modes. |
| 2 | UiStepper | `references/03 Forms & Inputs.html` | pass | yes | yes | yes | done | Uses `useRangedControl`. |
| 2 | UiPhotoPlate | `references/03 Forms & Inputs.html` | pass | yes | yes | yes | done | Identity photo frame migrated. |
| 3 | UiInstrumentGlyph | `references/04 Instruments.html` | pass | yes | yes | yes | done | Ten sanctioned glyphs. |
| 3 | UiStatusPanel | `references/04 Instruments.html` | pass | yes | yes | yes | done | Status sidebar migrated. |
| 3 | UiBigRead | `references/04 Instruments.html` | pass | yes | yes | yes | done | Status sidebar migrated. |
| 3 | UiSignalPips | `references/04 Instruments.html` | pass | yes | yes | yes | done | Emits selected count. |
| 3 | UiResonanceGauge | `references/04 Instruments.html` | pass | yes | yes | yes | done | Supports stage labels. |
| 3 | UiKarmaRuler | `references/04 Instruments.html` | pass | yes | yes | yes | done | Emits selected karma value. |
| 3 | UiWoundBoxes | `references/04 Instruments.html` | pass | yes | yes | yes | done | Emits row key and index. |
| 4 | UiRecordCard | `references/05 Records & Ability.html` | pass | yes | yes | yes | done | Dossier repeatable cards migrated. |
| 4 | UiTechniqueCard | `references/05 Records & Ability.html` | pass | yes | yes | yes | done | Cookbook example ready for future data wiring. |
| 4 | UiGearCard | `references/05 Records & Ability.html` | pass | yes | yes | yes | done | Cookbook example ready for future data wiring. |
| 5 | UiRedaction | `references/06 Feedback.html` | pass | yes | yes | yes | done | GM fields use block redactions. |
| 5 | UiClassificationChip | `references/06 Feedback.html` | pass | yes | yes | yes | done | Cookbook tone mapping examples. |
| 6 | Global SCSS cleanup | Existing app stylesheet | pass | yes | yes | n/a | done | Superseded component styles removed from `main.scss`. |
