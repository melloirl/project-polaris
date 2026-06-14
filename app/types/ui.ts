export type UiButtonVariant = 'default' | 'danger' | 'active-gm'
export type UiButtonSize = 'md' | 'sm'
export type UiStampTone = 'danger' | 'ink' | 'eden' | 'echo'
export type UiStampSize = 'md' | 'sm'
export type UiSealTone = 'ink' | 'stamp'
export type UiAccentTone = 'ink' | 'stamp' | 'eden' | 'echo'
export type UiCardTone = 'ink' | 'eden' | 'echo' | 'pact'

export interface UiTabItem {
  label: string
  value: string
  href?: string
  disabled?: boolean
}

export type UiInstrumentGlyphName =
  | 'signal'
  | 'resonance'
  | 'karma'
  | 'harm'
  | 'access'
  | 'technique'
  | 'device'
  | 'mark'
  | 'subject'
  | 'ground'

export const UI_INSTRUMENT_GLYPHS: UiInstrumentGlyphName[] = [
  'signal',
  'resonance',
  'karma',
  'harm',
  'access',
  'technique',
  'device',
  'mark',
  'subject',
  'ground',
]

export interface UiRecordRow {
  key?: string
  label: string
  value: string | number | null | undefined
}

export interface UiWoundRow {
  key: string
  label: string
  values: boolean[]
  note?: string
}

export type UiClassificationKind =
  | 'confirmed'
  | 'contradicted'
  | 'eyes-only'
  | 'executive-only'
  | 'field-reported'
  | 'withdrawn'
  | 'purged-copy'
  | 'unreconciled'

export type UiClassificationTone = 'danger' | 'eden' | 'echo' | 'muted' | 'ink'
