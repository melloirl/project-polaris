import type {
  AdvancementLog,
  ArchiveRecord,
  Armor,
  CampaignDb,
  CharacterRecord,
  Gear,
  Mark,
  OperationRecord,
  ReferenceData,
  SectionDefinition,
  Technique,
} from '~/types/dossier'
import { uid } from '~/utils/dossier'

export const REF: ReferenceData = {
  resonanceStages: [
    { min: 0, max: 19, name: 'Clear' },
    { min: 20, max: 39, name: 'Touched' },
    { min: 40, max: 59, name: 'Atravessado' },
    { min: 60, max: 79, name: 'Marked' },
    { min: 80, max: 99, name: 'Consumed' },
    { min: 100, max: 100, name: 'Echo / Lost' },
  ],
  karmaDepth: {
    '-5': 'Occult Eden apex',
    '-4': 'Occult Eden deep commitment',
    '-3': 'Occult Eden true initiation',
    '-2': 'Occult Eden initiate',
    '-1': 'Occult Eden-touched',
    0: 'Eidolon / neutral instrument',
    1: 'Echologist-touched',
    2: 'Echologist initiate',
    3: 'Echologist true initiation',
    4: 'Echologist deep commitment',
    5: 'Echologist apex',
  },
  karmaStageNames: {
    '-1': 'Whisper-Touched',
    0: 'Calibrated Instrument',
    1: 'Static-Cleansed',
  },
  attributes: [
    { key: 'corpo', name: 'Corpo', desc: 'Physical force, endurance, coordination, bodily resilience.' },
    { key: 'mente', name: 'Mente', desc: 'Reasoning, memory, analysis, technical understanding, patterns.' },
    { key: 'carisma', name: 'Carisma', desc: 'Presence, persuasion, empathy, social intuition, performance.' },
    { key: 'vontade', name: 'Vontade', desc: 'Composure, identity, focus, resistance, inner stability.' },
  ],
  domains: [
    { key: 'physical', name: 'Physical', desc: 'Running, climbing, forcing, carrying, resisting strain.' },
    { key: 'fieldwork', name: 'Fieldwork', desc: 'Stealth, awareness, tracking, searching dangerous spaces.' },
    { key: 'research', name: 'Research', desc: 'Archives, documents, case theory, pattern reconstruction.' },
    { key: 'technical', name: 'Technical', desc: 'Machines, electronics, medical procedure, device repair.' },
    { key: 'social', name: 'Social', desc: 'Persuasion, deception, contacts, reading people.' },
    { key: 'occult', name: 'Occult', desc: 'Ritual logic, Geist lore, Resonance theory, forbidden texts.' },
    { key: 'combat', name: 'Combat', desc: 'Tactical violence, restraint, fighting under pressure.' },
  ],
  difficulty: [[8, 'Easy'], [12, 'Routine'], [15, 'Challenging'], [18, 'Difficult'], ['20+', 'Extreme']],
  accessStates: ['Restricted', 'Provisional', 'Watched', 'Contained', 'Full Access', 'Compromised', 'Blacklisted', 'Hunted / Burned'],
}

export function blankTechnique(faction = 'General'): Technique {
  return {
    id: uid(),
    name: 'New Technique',
    faction,
    tags: '',
    type: 'Position-Gated',
    effect: '',
    cost: '',
    hardReq: '',
    softReq: '',
    karma: '',
    gear: '',
    risk: '',
  }
}

export function blankGear(): Gear {
  return {
    id: uid(),
    name: 'New Device',
    type: '',
    capacity: '',
    charge: '',
    func: '',
    compat: '',
    requirements: '',
    risk: '',
    maintenance: '',
    tracking: '',
    notes: '',
  }
}

export function blankMark(): Mark {
  return { id: uid(), name: 'New Mark', source: '', symptom: '', effect: '', duration: '', notes: '' }
}

export function blankLog(): AdvancementLog {
  return {
    id: uid(),
    caseName: '',
    advancement: '',
    domains: '',
    techniques: '',
    karmaActs: '',
    access: '',
    gear: '',
    wounds: '',
    notes: '',
  }
}

export function blankArmor(): Armor {
  return { id: uid(), name: 'New Protection', slots: '', applies: '', notApplies: '', notes: '' }
}

export function blankCase(): OperationRecord {
  return {
    id: uid(),
    code: '',
    title: 'New Case',
    date: '',
    status: 'Open',
    investigation: '',
    conclusion: '',
    preparation: '',
    clash: '',
    advancementMenu: '',
    gmNotes: '',
  }
}

export function blankCharacter(name = ''): CharacterRecord {
  return {
    id: uid(),
    fileNo: 'EID/70-' + String(Math.floor(Math.random() * 900) + 100),
    identity: {
      name,
      age: '',
      gender: '',
      appearance: '',
      personality: '',
      motivation: '',
      fear: '',
      background: '',
      relationships: '',
      whyEidolonCares: '',
    },
    occupation: { role: '', description: '', handler: '', startingGear: '', notes: '' },
    attributes: { corpo: 0, mente: 0, carisma: 0, vontade: 0 },
    domains: { physical: 0, fieldwork: 0, research: 0, technical: 0, social: 0, occult: 0, combat: 0 },
    signal: { current: 2, maxMod: 0, anchor: '', recoveryNotes: '', permanentMods: '' },
    resonance: { pct: 0, symptoms: '', permanentChanges: '' },
    karma: { value: 0, lastAct: '', investments: '', edenLimit: -5, echoLimit: 5, scars: '' },
    access: { state: 'Restricted', scope: '', handler: '', permitted: '', restricted: '', gearSupport: '', damage: '' },
    harm: { minor: [false, false], serious: [false, false], critical: [false], recoveryNotes: '', scars: '' },
    armor: [],
    mental: { state: '', conditions: '', notes: '' },
    techniques: [
      {
        ...blankTechnique('General'),
        name: 'Ground Yourself',
        tags: 'Signal, Stabilization, Self',
        effect: 'Spend 1 Signal to hold identity steady through a brief resonance surge, false memory, Geist pressure, panic spiral, or emotional bleed.',
        cost: '1 Signal.',
        hardReq: 'Current Signal 1+.',
        softReq: 'You must be able to name yourself, access your Anchor, or be grounded by another character.',
      },
    ],
    gear: [],
    pact: {
      geistName: '',
      tier: '',
      domain: '',
      signature: '',
      formed: '',
      resonanceGained: '',
      terms: '',
      abilities: '',
      restrictions: '',
      demands: '',
      risks: '',
      relationship: '',
      debt: '',
    },
    marks: [],
    log: [],
    gm: {
      trueReason: '',
      classification: '',
      handlerAgenda: '',
      treatmentConsequences: '',
      factionInterest: '',
      geistAgenda: '',
      npcTrust: '',
      factionStanding: '',
      futureConsequence: '',
      caseRelevance: '',
    },
  }
}

export function sampleCharacter(): CharacterRecord {
  const character = blankCharacter('Irene Vasquez')
  character.id = 'char-irene-vasquez'
  character.fileNo = 'EID/70-114'
  character.techniques[0]!.id = 'tech-ground-yourself'

  Object.assign(character.identity, {
    age: '29',
    gender: 'F',
    appearance: 'Practical clothes under a maintenance coat; permanent solder burns on both hands.',
    personality: 'Methodical, dry, quietly stubborn.',
    motivation: "Pay off her brother's debt before Eidolon decides it owns him too.",
    fear: 'Becoming useful enough that they never let her leave.',
    background: 'Civilian electronics repair, recruited after fixing a device she was never supposed to see working.',
    relationships: 'Tomas Vasquez (brother, indebted); Supervisor Hale (handler, Engineering).',
    whyEidolonCares: 'Useful technical labor; not trusted with full theory.',
  })

  Object.assign(character.occupation, {
    role: 'Eidolon Field Technician',
    description: 'Low-clearance technical employee assigned to maintain, calibrate, and troubleshoot unstable field equipment.',
    handler: 'Supervisor Hale - Engineering Division',
    startingGear: 'Diagnostic meter, insulated tool kit, restricted maintenance badge, calibration notebook.',
    notes: 'Permitted: maintenance areas, assigned devices, basic field support.',
  })

  character.attributes = { corpo: 1, mente: 3, carisma: 0, vontade: 2 }
  character.domains = { physical: 1, fieldwork: 1, research: 1, technical: 2, social: 0, occult: 0, combat: 0 }
  character.signal.current = 4
  character.signal.anchor = 'Every morning: black coffee and a written schedule.'
  character.signal.recoveryNotes = 'Recovers when she keeps the morning routine, or when Tomas calls.'

  Object.assign(character.access, {
    state: 'Restricted',
    scope: 'Maintenance areas, assigned devices, basic field support',
    handler: 'Supervisor Hale',
    permitted: 'Workshops, motor pool, field staging',
    restricted: 'Theoretical Harmonics wing, Subject Management, Archives B-level',
    gearSupport: 'Standard repair and replacement through Engineering requisition',
    damage: 'None',
  })

  character.techniques.push({
    ...blankTechnique('General'),
    id: 'tech-read-the-static',
    name: 'Read the Static',
    tags: 'Detection, Resonance, Investigation',
    type: 'Position-Gated',
    effect: 'When examining a resonant site, object, or person, ask the GM one basic question about emotional residue, dominant feeling, or recent spectral disturbance.',
    cost: 'Gain 1-5% Resonance or accept a minor symptom.',
    hardReq: 'Touched Resonance or access to basic Eidolon detection equipment.',
    softReq: 'The scene must contain meaningful resonant residue.',
    risk: 'The answer may come through sensation rather than clean information.',
  })

  character.gear.push({
    ...blankGear(),
    id: 'gear-resonant-cell-mk1',
    name: 'Resonant Cell Mk.I',
    type: 'Portable resonant battery',
    capacity: '20% stored Resonance',
    charge: '8%',
    func: 'Stores Resonance externally and powers compatible Eidolon techniques.',
    compat: 'Harmonic Discharge, Emergency Calibration',
    risk: 'Overload, leakage, tracking, malfunction, confiscation',
    maintenance: 'Requires Eidolon calibration support',
    tracking: 'Serial-logged; unauthorized use is recorded.',
  })

  character.gm = {
    trueReason: 'Blood sample flagged compatible with battery containment trials (Batch 7).',
    classification: 'MED-7c - latent resonant susceptibility, unconfirmed.',
    handlerAgenda: 'Hale reports her error rates to Theoretical Harmonics, not Engineering.',
    treatmentConsequences: '',
    factionInterest: 'An Echologist cell has noticed her repair signatures on purged sites.',
    geistAgenda: '',
    npcTrust: 'Motor pool crew trusts her; lab staff treat her as expendable.',
    factionStanding: '',
    futureConsequence: 'A protocol may carry her name into the 1990s files.',
    caseRelevance: '',
  }

  return character
}

export const SECTIONS: SectionDefinition[] = [
  {
    code: 'FORM E-1',
    title: 'Identity',
    kind: 'fields',
    fields: [
      { l: 'Name', p: 'identity.name' },
      { l: 'Age', p: 'identity.age' },
      { l: 'Gender', p: 'identity.gender' },
      { l: 'Appearance', p: 'identity.appearance' },
      { l: 'Personality', p: 'identity.personality' },
      { l: 'Motivation', p: 'identity.motivation' },
      { l: 'Fear', p: 'identity.fear' },
      { l: 'Background / File Summary', p: 'identity.background', wide: true },
      { l: 'Important Relationships', p: 'identity.relationships', wide: true },
      { l: 'Why Eidolon Cares', p: 'identity.whyEidolonCares', wide: true },
    ],
    note: 'Keep the character human. The supernatural complicates identity - it does not replace it.',
  },
  {
    code: 'FORM E-2',
    title: 'Occupation / Role',
    kind: 'fields',
    fields: [
      { l: 'Role', p: 'occupation.role' },
      { l: 'Handler / Supervisor', p: 'occupation.handler' },
      { l: 'Description', p: 'occupation.description', wide: true },
      { l: 'Starting Gear', p: 'occupation.startingGear', wide: true },
      { l: 'Notes', p: 'occupation.notes', wide: true },
    ],
    note: 'Occupation is how Eidolon labels the character. It may not match how they see themselves.',
  },
  {
    code: 'FORM E-3',
    title: 'Attributes',
    kind: 'custom',
    render: 'attributes',
    note: 'Assign +3, +2, +1, +0 at creation. Attributes define natural approach; Domains define trained competence. Core roll: d20 + Attribute + Domain >= Difficulty.',
  },
  {
    code: 'FORM E-4',
    title: 'Domains',
    kind: 'custom',
    render: 'domains',
    note: 'Default spread: one at 2, three at 1, three at 0; the player may move one point. No starting domain above 2. Scale: 0 untrained, 1 trained, 2 expert, 3 exceptional.',
  },
  {
    code: 'FORM E-5',
    title: 'Signal & Anchor',
    kind: 'fields',
    fields: [
      { l: 'Anchor', p: 'signal.anchor', wide: true },
      { l: 'Recovery Notes', p: 'signal.recoveryNotes', wide: true },
      { l: 'Permanent Modifiers', p: 'signal.permanentMods', wide: true },
    ],
    note: 'Signal Max = Vontade + 2 (computed in the status panel). Signal is clean human frequency - spend it to stay yourself, not as generic reroll fuel. Recovers through grounding, not sleep alone.',
  },
  {
    code: 'FORM E-6',
    title: 'Resonance',
    kind: 'fields',
    fields: [
      { l: 'Symptoms / Manifestations', p: 'resonance.symptoms', wide: true },
      { l: 'Permanent Changes', p: 'resonance.permanentChanges', wide: true },
    ],
    note: 'Current % and stage live in the status panel. Stages are unlock keys and narrative pressure, not automatic penalties. Starting: 0% default, 10% minor prior exposure (GM-approved), 20% Resonant Subject.',
  },
  {
    code: 'FORM E-7',
    title: 'Karma',
    kind: 'fields',
    fields: [
      { l: 'Last Karma-Moving Act', p: 'karma.lastAct', wide: true },
      { l: 'Investment Techniques Used', p: 'karma.investments', wide: true },
      { l: 'Contradiction Scars', p: 'karma.scars', wide: true },
    ],
    note: 'Karma moves only through transparent Karma-Moving Acts - always telegraphed. Crossing zero is a story event, not a build option. Path limits are set on the ruler in the status panel.',
  },
  { code: 'FORM E-8', title: 'Eidolon Access', kind: 'custom', render: 'access', note: 'Access is institutional permission and dependency - not Karma. It must be useful before it is threatening.' },
  {
    code: 'FORM E-9',
    title: 'Harm & Recovery',
    kind: 'fields',
    fields: [
      { l: 'Recovery Notes', p: 'harm.recoveryNotes', wide: true },
      { l: 'Scars / Lasting Consequences', p: 'harm.scars', wide: true },
    ],
    note: 'Wound slots live in the status panel. Overflow: full Minor -> next becomes Serious; full Serious -> next becomes Critical. Serious wounds: -2 when directly interfering. Eidolon medical help works - and creates records, monitoring, debt, and dependency.',
  },
  { code: 'FORM E-10', title: 'Armor / Protection', kind: 'custom', render: 'armor', note: 'Mark one relevant Protection Slot to reduce a wound by one severity (Critical->Serious, Serious->Minor, Minor->ignored).' },
  {
    code: 'FORM E-11',
    title: 'Mental State',
    kind: 'fields',
    fields: [
      { l: 'Current State', p: 'mental.state' },
      { l: 'Active Mental Conditions', p: 'mental.conditions' },
      { l: 'Notes', p: 'mental.notes', wide: true },
    ],
    note: 'Light and narrative - there is no sanity HP track. Pressure shows through Signal loss, Anchor stress, symptoms, and consequences.',
  },
  { code: 'FORM E-12', title: 'Techniques & Skill Cards', kind: 'custom', render: 'techniques', note: 'Position-Gated techniques require visible conditions and do not move Karma. Investment techniques move Karma when unlocked or used - rare and defining. Soft requirements never hide secret numbers.' },
  { code: 'FORM E-13', title: 'Gear Registry', kind: 'custom', render: 'gear', note: 'Gear is external infrastructure; techniques are trained use. Carrying a device does not grant its techniques. Eidolon power is procedural - and traceable.' },
  {
    code: 'FORM E-14',
    title: 'Pact Addendum',
    kind: 'fields',
    fields: [
      { l: 'Geist Name / Title', p: 'pact.geistName' },
      { l: 'Geist Tier', p: 'pact.tier' },
      { l: 'Domain', p: 'pact.domain' },
      { l: 'Signature', p: 'pact.signature' },
      { l: 'How the Pact Was Formed', p: 'pact.formed', wide: true },
      { l: 'Resonance Gained', p: 'pact.resonanceGained' },
      { l: 'Current Relationship', p: 'pact.relationship' },
      { l: 'Pact Terms', p: 'pact.terms', wide: true },
      { l: 'Granted Abilities', p: 'pact.abilities', wide: true },
      { l: 'Restrictions', p: 'pact.restrictions' },
      { l: 'Demands', p: 'pact.demands' },
      { l: 'Risks', p: 'pact.risks' },
      { l: 'Broken Terms / Debt', p: 'pact.debt' },
    ],
    note: 'One major pact at a time. Forming one costs Resonance (+10% limited, +15% deep, +20% possessive). Apparitions cannot grant pacts; Lesser Geists leave marks and debts instead. A pact is a relationship, not an equipped spell.',
  },
  { code: 'FORM E-15', title: 'Exposure / Haunting Addendum', kind: 'custom', render: 'marks', note: 'Geist Marks are minor supernatural consequences - small but memorable. A mark can become a clue, a soft requirement, a pact seed, or a liability under observation.' },
  { code: 'FORM E-16', title: 'Incident / Advancement Log', kind: 'custom', render: 'log', note: 'Three lanes - Mundane Growth (what I learned), Technique Acquisition (what I can do), Karma Movement (what I have become). One advancement opportunity per completed case; the GM offers 2-3 grounded options.' },
]

export const GM_FIELDS = [
  { l: 'True Reason Eidolon Cares', p: 'gm.trueReason' },
  { l: 'Hidden Medical Classification', p: 'gm.classification' },
  { l: 'Handler Agenda', p: 'gm.handlerAgenda' },
  { l: 'Unrevealed Treatment Consequences', p: 'gm.treatmentConsequences' },
  { l: 'Secret Faction Interest', p: 'gm.factionInterest' },
  { l: 'Geist Long-Term Agenda', p: 'gm.geistAgenda' },
  { l: 'NPC Trust & Suspicion', p: 'gm.npcTrust' },
  { l: 'Faction Standing', p: 'gm.factionStanding' },
  { l: 'Future 1990s Consequence', p: 'gm.futureConsequence' },
  { l: 'Hidden Case Relevance', p: 'gm.caseRelevance' },
]

export const seedArchive: ArchiveRecord[] = [
  {
    id: 'arc-eidolon-1970s',
    tag: 'Institution',
    title: 'Eidolon (1970s)',
    body: 'A classified, government-linked research project - not yet the public technological giant of the 1990s. Its science is promising, its methods secretive, its ambitions far larger than most personnel understand.\n\nKnowledge is compartmentalized in tiers: base personnel see classified-but-bland work; lower-mid staff know impossible things occur; upper-mid staff know Resonance touches consciousness and identity; only the inner circle understands the keystone project and the Great Transcendent.\n\nDesign rule: Eidolon must be tempting. It produces real good, real progress, and real protection - otherwise refusing it is too easy.',
  },
  {
    id: 'arc-welderhide',
    tag: 'Location',
    title: 'Welderhide',
    body: "A high-elevation mining city ringed by mountains. Three overlapping reasons it matters:\n\nGEOLOGICAL - the mountains, mines, and mineral formations act as a natural resonant chamber, amplifying and stabilizing Resonance and producing more naturally resonant individuals.\n\nECONOMIC - the mines are failing. The city is desperate to diversify, which makes it politically and financially receptive to Eidolon's investment. Conquest through dependency: it should look like salvation.\n\nHISTORICAL - it is where Adrian Voss first touched the Great Transcendent in the 1920s. To him, Welderhide is sacred. The origin point.",
  },
  {
    id: 'arc-adrian-voss',
    tag: 'Person',
    title: 'Adrian Voss',
    body: 'Founder of Eidolon. Not originally a superhuman genius - his transformation began in the Welderhide mines in the 1920s, where his consciousness made contact with the Great Transcendent.\n\nHe wants to solve mortality. He sees death, aging, grief, and loss as flaws to correct. The horror is that his cure does not preserve humanity - it freezes it: no death, but no growth, change, or future.\n\nHis mistake is not identifying suffering as a problem. It is believing he has the right to answer on behalf of everyone.',
  },
  {
    id: 'arc-great-transcendent',
    tag: 'Entity',
    title: 'The Great Transcendent',
    body: 'A sovereign-level Geist tied to the most dangerous horizon of Eidolon work. In the 1970s it should remain a deep gravitational presence, not a revealed antagonist - fragments, theological language buried in scientific notes, impossible data, strange executive behavior.\n\nThe players only need to understand enough to realize: whatever Eidolon is building, it is not truly for us.',
  },
  {
    id: 'arc-geists',
    tag: 'Lore',
    title: 'Geists',
    body: 'Born from human emotion, shaped by human beings - but extradimensional and alien because they are too pure. A Geist is a human emotion extrapolated beyond human limits.\n\nA Geist of grief does not move on. A Geist of hope does not give up. A Geist of love does not let go. A Geist of fear does not calm down.\n\nThesis: they are so human that they become alien.\n\nTiers: Apparition (no pact) -> Lesser (marks, debts, hauntings) -> Greater (true pact) -> Sovereign (identity-shaping pact).',
  },
  {
    id: 'arc-resonance-signal',
    tag: 'System',
    title: 'Resonance & Signal',
    body: 'Resonance is how much the impossible has entered you. Signal is how clearly you can still answer back as yourself.\n\nResonance (0-100%) is contamination, fuel, and classification risk. Stages are unlock keys and narrative tone, not automatic penalties: Clear -> Touched -> Atravessado -> Marked -> Consumed -> Echo/Lost.\n\nSignal (Max = Vontade + 2) is spent to resist Geist influence, stabilize identity, power Echologist techniques, and pull others back. It recovers through grounding - Anchor, human choices, refusal of temptation, safe downtime - not sleep alone.\n\nCentral rule: Resonance can be good for humanity, but never for free.',
  },
  {
    id: 'arc-karma-paths',
    tag: 'System',
    title: 'Karma & the Three Paths',
    body: 'Karma is a signed integer (-5 to +5): how far down a metaphysical path the soul has walked. Not XP, not morality, not reputation. It moves only through transparent Karma-Moving Acts, always telegraphed by the GM.\n\nOCCULT EDEN (-1 to -5) - Accumulate. Consumes Resonance as fuel. Communion, intimacy with the dead. Failure mode: powerful but increasingly distant from ordinary humanity.\n\nEIDOLON (0) - Channel. Routes Resonance through gear: bank, store, discharge. Failure mode: dependency on access, calibration, and the institution.\n\nECHOLOGIST (+1 to +5) - Purge. Uses Signal and clean frequency to reduce or weaponize the absence of Resonance. Failure mode: the deepest purifiers must touch what they hate to destroy it.\n\nHard reversals after real commitment leave Contradiction Scars that lower the ceiling on the opposite path.',
  },
  {
    id: 'arc-factions',
    tag: 'Faction',
    title: 'Factions as Philosophical Alignments',
    body: 'Factions are alignments, not adventuring teams - the squad stays operationally together while disagreeing about what their work means.\n\nEidolon-aligned: humanity survives through CONTROL. Effective, organized, morally compromised.\nEchologist-aligned: humanity survives through ADAPTATION. Principled, fragmented, possibly reckless.\nOccult Eden-aligned: humanity survives through UNDERSTANDING. Insightful, empathetic, dangerous.\n\nOpposing Eidolon should not automatically mean finding the correct answer.',
  },
  {
    id: 'arc-campaign-spine',
    tag: 'Campaign',
    title: '1970s Campaign Spine',
    body: 'Pitch: a squad of low-ranking or coerced Eidolon assets investigates increasingly impossible Resonance cases, only to realize they are helping build the infrastructure that will let Eidolon decide humanity future without consent.\n\nEmotional hook: "I did not sign up for this, but I have no choice."\nCore arc: Asset -> Witness -> Accomplice -> Doubter -> Actor.\n\nThree reveals: (1) The supernatural is real - and Eidolon has forms for it. (2) The cases were never separate. (3) We can choose.\n\nCentral lie: "We are developing technologies that will save humanity."\nHidden truth: "We are building infrastructure that will let Eidolon decide humanity future without humanity consent."\n\nEndpoint: not "the network is ready" - but "Oh God. It works."',
  },
]

export const seedOps: OperationRecord[] = [
  {
    ...blankCase(),
    id: 'case-template-first-assignment',
    code: 'CASE 01',
    title: '(Template) First Assignment',
    status: 'Template',
    investigation: 'What is happening? Strange reports, failing equipment, contradictory witnesses - ambiguity is allowed before the first threshold.',
    conclusion: 'What do we think this is?',
    preparation: 'Tools, tactics, rituals, permissions, or sacrifices needed.',
    clash: 'The direct confrontation, containment, choice, or consequence that resolves the case. After the first threshold, the supernatural is undeniable.',
    advancementMenu: 'Offer 2-3 grounded options: one tree technique, one mundane growth, one case-specific reward.',
    gmNotes: 'Seed one clue pointing at the keystone project.',
  },
]

export function createInitialDb(): CampaignDb {
  return {
    meta: { system: 'Resonance S2', formRev: 'v0.1', exported: null, schemaVersion: 1 },
    characters: [sampleCharacter()],
    archive: seedArchive.map(record => ({ ...record })),
    operations: seedOps.map(record => ({ ...record })),
  }
}
