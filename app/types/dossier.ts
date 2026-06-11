export interface ResonanceStage {
  min: number
  max: number
  name: string
}

export interface StatDefinition {
  key: string
  name: string
  desc: string
}

export interface FieldDefinition {
  l: string
  p: string
  wide?: boolean
}

export interface SectionDefinition {
  code: string
  title: string
  kind: 'fields' | 'custom'
  fields?: FieldDefinition[]
  render?: CustomSection
  note?: string
}

export type CustomSection =
  | 'attributes'
  | 'domains'
  | 'access'
  | 'armor'
  | 'techniques'
  | 'gear'
  | 'marks'
  | 'log'

export interface Technique {
  id: string
  name: string
  faction: string
  tags: string
  type: string
  effect: string
  cost: string
  hardReq: string
  softReq: string
  karma: string
  gear: string
  risk: string
}

export interface Gear {
  id: string
  name: string
  type: string
  capacity: string
  charge: string
  func: string
  compat: string
  requirements: string
  risk: string
  maintenance: string
  tracking: string
  notes: string
}

export interface Mark {
  id: string
  name: string
  source: string
  symptom: string
  effect: string
  duration: string
  notes: string
}

export interface AdvancementLog {
  id: string
  caseName: string
  advancement: string
  domains: string
  techniques: string
  karmaActs: string
  access: string
  gear: string
  wounds: string
  notes: string
}

export interface Armor {
  id: string
  name: string
  slots: string
  applies: string
  notApplies: string
  notes: string
}

export interface CharacterRecord {
  id: string
  fileNo: string
  identity: {
    name: string
    age: string
    gender: string
    appearance: string
    personality: string
    motivation: string
    fear: string
    background: string
    relationships: string
    whyEidolonCares: string
  }
  occupation: {
    role: string
    description: string
    handler: string
    startingGear: string
    notes: string
  }
  attributes: Record<string, number>
  domains: Record<string, number>
  signal: {
    current: number
    maxMod: number
    anchor: string
    recoveryNotes: string
    permanentMods: string
  }
  resonance: {
    pct: number
    symptoms: string
    permanentChanges: string
  }
  karma: {
    value: number
    lastAct: string
    investments: string
    edenLimit: number
    echoLimit: number
    scars: string
  }
  access: {
    state: string
    scope: string
    handler: string
    permitted: string
    restricted: string
    gearSupport: string
    damage: string
  }
  harm: {
    minor: boolean[]
    serious: boolean[]
    critical: boolean[]
    recoveryNotes: string
    scars: string
  }
  armor: Armor[]
  mental: {
    state: string
    conditions: string
    notes: string
  }
  techniques: Technique[]
  gear: Gear[]
  pact: {
    geistName: string
    tier: string
    domain: string
    signature: string
    formed: string
    resonanceGained: string
    terms: string
    abilities: string
    restrictions: string
    demands: string
    risks: string
    relationship: string
    debt: string
  }
  marks: Mark[]
  log: AdvancementLog[]
  gm: {
    trueReason: string
    classification: string
    handlerAgenda: string
    treatmentConsequences: string
    factionInterest: string
    geistAgenda: string
    npcTrust: string
    factionStanding: string
    futureConsequence: string
    caseRelevance: string
  }
}

export interface ArchiveRecord {
  id: string
  tag: string
  title: string
  body: string
}

export interface OperationRecord {
  id: string
  code: string
  title: string
  date: string
  status: string
  investigation: string
  conclusion: string
  preparation: string
  clash: string
  advancementMenu: string
  gmNotes: string
}

export interface CampaignDb {
  meta: {
    system: string
    formRev: string
    exported: string | null
    schemaVersion?: number
  }
  characters: CharacterRecord[]
  archive: ArchiveRecord[]
  operations: OperationRecord[]
}

export interface DossierUiState {
  charId: string | null
  view: DossierView
  gm: boolean
  archiveId: string | null
  opsId: string | null
  collapsed: Record<string, boolean>
}

export type DossierView = 'dossier' | 'archive' | 'operations' | 'reference'

export interface ReferenceData {
  resonanceStages: ResonanceStage[]
  karmaDepth: Record<string, string>
  karmaStageNames: Record<string, string>
  attributes: StatDefinition[]
  domains: StatDefinition[]
  difficulty: Array<[number | string, string]>
  accessStates: string[]
}
