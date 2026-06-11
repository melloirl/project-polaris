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
import { getLocaleMessages, type LocaleMessages } from '~/i18n/messages'
import { cloneRecord, uid } from '~/utils/dossier'

type DossierMessages = LocaleMessages['dossier']

function dossier(locale: DossierMessages = getLocaleMessages().dossier) {
  return locale
}

export function createReferenceData(locale: DossierMessages = dossier()): ReferenceData {
  return {
    resonanceStages: cloneRecord(locale.resonanceStages),
    karmaDepth: cloneRecord(locale.karmaDepth),
    karmaStageNames: cloneRecord(locale.karmaStageNames),
    attributes: cloneRecord(locale.attributes),
    domains: cloneRecord(locale.domains),
    difficulty: cloneRecord(locale.difficulty) as Array<[number | string, string]>,
    accessStates: [...locale.accessStates],
  }
}

export function createSections(locale: DossierMessages = dossier()): SectionDefinition[] {
  return cloneRecord(locale.sections) as SectionDefinition[]
}

export function createGmFields(locale: DossierMessages = dossier()) {
  return cloneRecord(locale.gmFields)
}

export function blankTechnique(faction?: string, locale: DossierMessages = dossier()): Technique {
  return {
    id: uid(),
    name: locale.blank.technique,
    faction: faction || getLocaleMessages().ui.cards.factions.general,
    tags: '',
    type: '',
    effect: '',
    cost: '',
    hardReq: '',
    softReq: '',
    karma: '',
    gear: '',
    risk: '',
  }
}

export function blankGear(locale: DossierMessages = dossier()): Gear {
  return {
    id: uid(),
    name: locale.blank.gear,
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

export function blankMark(locale: DossierMessages = dossier()): Mark {
  return { id: uid(), name: locale.blank.mark, source: '', symptom: '', effect: '', duration: '', notes: '' }
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

export function blankArmor(locale: DossierMessages = dossier()): Armor {
  return { id: uid(), name: locale.blank.armor, slots: '', applies: '', notApplies: '', notes: '' }
}

export function blankCase(locale: DossierMessages = dossier()): OperationRecord {
  return {
    id: uid(),
    code: '',
    title: locale.blank.case,
    date: '',
    status: locale.blank.caseStatus,
    investigation: '',
    conclusion: '',
    preparation: '',
    clash: '',
    advancementMenu: '',
    gmNotes: '',
  }
}

export function blankCharacter(name = '', locale: DossierMessages = dossier()): CharacterRecord {
  return {
    id: uid(),
    fileNo: locale.fileNoPrefix + String(Math.floor(Math.random() * 900) + 100),
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
    access: { state: locale.accessStates[0] || '', scope: '', handler: '', permitted: '', restricted: '', gearSupport: '', damage: '' },
    harm: { minor: [false, false], serious: [false, false], critical: [false], recoveryNotes: '', scars: '' },
    armor: [],
    mental: { state: '', conditions: '', notes: '' },
    techniques: [
      {
        ...blankTechnique(undefined, locale),
        ...locale.seeds.sampleCharacter.techniques.groundYourself,
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

export function sampleCharacter(locale: DossierMessages = dossier()): CharacterRecord {
  const seed = locale.seeds.sampleCharacter
  const character = blankCharacter(seed.name, locale)
  character.id = 'char-irene-vasquez'
  character.fileNo = 'EID/70-114'
  character.techniques[0]!.id = 'tech-ground-yourself'

  Object.assign(character.identity, seed.identity)
  Object.assign(character.occupation, seed.occupation)

  character.attributes = { corpo: 1, mente: 3, carisma: 0, vontade: 2 }
  character.domains = { physical: 1, fieldwork: 1, research: 1, technical: 2, social: 0, occult: 0, combat: 0 }
  character.signal.current = 4
  Object.assign(character.signal, seed.signal)
  Object.assign(character.access, seed.access)

  character.techniques.push({
    ...blankTechnique(undefined, locale),
    id: 'tech-read-the-static',
    ...seed.techniques.readStatic,
  })

  character.gear.push({
    ...blankGear(locale),
    id: 'gear-resonant-cell-mk1',
    ...seed.gear.resonantCell,
  })

  Object.assign(character.gm, seed.gm)

  return character
}

export function createSeedArchive(locale: DossierMessages = dossier()): ArchiveRecord[] {
  return cloneRecord(locale.seeds.archive)
}

export function createSeedOperations(locale: DossierMessages = dossier()): OperationRecord[] {
  return cloneRecord(locale.seeds.operations).map(record => ({
    date: '',
    ...record,
  }))
}

export function createInitialDb(locale: DossierMessages = dossier()): CampaignDb {
  return {
    meta: { system: locale.system, formRev: locale.formRev, exported: null, schemaVersion: 1 },
    characters: [sampleCharacter(locale)],
    archive: createSeedArchive(locale),
    operations: createSeedOperations(locale),
  }
}

export const REF = createReferenceData()
export const SECTIONS = createSections()
export const GM_FIELDS = createGmFields()
