import {
  blankArmor,
  blankCase,
  blankCharacter,
  blankGear,
  blankLog,
  blankMark,
  blankTechnique,
  createInitialDb,
  REF,
} from '~/data/dossier'
import { getLocaleMessages } from '~/i18n/messages'
import type {
  ArchiveRecord,
  CampaignDb,
  DossierUiState,
  DossierView,
  OperationRecord,
} from '~/types/dossier'
import { cloneRecord, setPath, signalMax, uid } from '~/utils/dossier'

const views: DossierView[] = ['dossier', 'archive', 'operations', 'reference']

function normalizeDb(input: unknown): CampaignDb {
  if (!input || typeof input !== 'object') {
    throw new Error(getLocaleMessages().ui.common.notCampaignFile)
  }

  const record = input as Partial<CampaignDb>
  if (!Array.isArray(record.characters)) {
    throw new Error(getLocaleMessages().ui.common.notCampaignFile)
  }

  return {
    meta: {
      system: record.meta?.system || getLocaleMessages().dossier.system,
      formRev: record.meta?.formRev || getLocaleMessages().dossier.formRev,
      exported: record.meta?.exported || null,
      schemaVersion: record.meta?.schemaVersion || 1,
    },
    characters: record.characters,
    archive: Array.isArray(record.archive) ? record.archive : [],
    operations: Array.isArray(record.operations) ? record.operations : [],
  }
}

export function useCampaignDossier() {
  const db = useState<CampaignDb>('campaign-db', createInitialDb)
  const ui = useState<DossierUiState>('campaign-ui', () => ({
    charId: db.value.characters[0]?.id || null,
    view: 'dossier',
    gm: false,
    archiveId: db.value.archive[0]?.id || null,
    opsId: db.value.operations[0]?.id || null,
    collapsed: {},
  }))

  const activeChar = computed(() => db.value.characters.find(character => character.id === ui.value.charId) || db.value.characters[0] || null)
  const activeArchive = computed(() => db.value.archive.find(record => record.id === ui.value.archiveId) || db.value.archive[0] || null)
  const activeOperation = computed(() => db.value.operations.find(record => record.id === ui.value.opsId) || db.value.operations[0] || null)
  const fileRef = computed(() => activeChar.value?.fileNo || 'EID/70--')
  const stamp = computed(() => ui.value.gm ? getLocaleMessages().dossier.stamps.eyesOnly : getLocaleMessages().dossier.stamps.restricted)

  function syncSelections() {
    ui.value.charId = activeChar.value?.id || null
    ui.value.archiveId = activeArchive.value?.id || null
    ui.value.opsId = activeOperation.value?.id || null
  }

  function setView(view: string) {
    ui.value.view = views.includes(view as DossierView) ? view as DossierView : 'dossier'
  }

  function toggleGm() {
    ui.value.gm = !ui.value.gm
  }

  function toggleSection(code: string) {
    ui.value.collapsed[code] = !ui.value.collapsed[code]
  }

  function commitCharacterPath(path: string, value: string) {
    const character = activeChar.value
    if (!character) {
      return
    }

    setPath(character, path, value)
    if (path.startsWith('access.')) {
      syncSelections()
    }
  }

  function commitArchive(path: keyof ArchiveRecord, value: string) {
    const record = activeArchive.value
    if (record) {
      record[path] = value
    }
  }

  function commitOperation(path: keyof OperationRecord, value: string) {
    const record = activeOperation.value
    if (record) {
      record[path] = value
    }
  }

  function step(path: string, delta: number, min: number, max: number) {
    const character = activeChar.value
    if (!character) {
      return
    }

    const keys = path.split('.')
    const current = Number(keys.reduce<unknown>((target, key) => {
      if (target == null || typeof target !== 'object') {
        return 0
      }
      return (target as Record<string, unknown>)[key]
    }, character)) || 0

    setPath(character, path, Math.max(min, Math.min(max, current + delta)))
    character.signal.current = Math.min(character.signal.current, signalMax(character))
  }

  function setSelect(path: string, value: string) {
    commitCharacterPath(path, value)
  }

  function changeResonance(delta: number) {
    const character = activeChar.value
    if (character) {
      character.resonance.pct = Math.max(0, Math.min(100, (Number(character.resonance.pct) || 0) + delta))
    }
  }

  function setSignalByPip(index: number) {
    const character = activeChar.value
    if (character) {
      const current = Math.min(character.signal.current, signalMax(character))
      character.signal.current = index < current ? index : index + 1
    }
  }

  function setKarma(value: number, act: string) {
    const character = activeChar.value
    if (!character || value < character.karma.edenLimit || value > character.karma.echoLimit) {
      return
    }

    character.karma.value = value
    if (act) {
      character.karma.lastAct = act
    }
  }

  function toggleWound(kind: 'minor' | 'serious' | 'critical', index: number) {
    const character = activeChar.value
    if (character?.harm[kind]) {
      character.harm[kind][index] = !character.harm[kind][index]
    }
  }

  function addCharacter(name: string) {
    const character = blankCharacter(name)
    db.value.characters.push(character)
    ui.value.charId = character.id
  }

  function duplicateCharacter() {
    const character = activeChar.value
    if (!character) {
      return
    }

    const copy = cloneRecord(character)
    copy.id = uid()
    copy.fileNo = `${character.fileNo}-B`
    copy.identity.name = `${character.identity.name || getLocaleMessages().ui.character.unnamed} (${getLocaleMessages().ui.common.copySuffix})`
    for (const collection of [copy.techniques, copy.gear, copy.marks, copy.log, copy.armor]) {
      collection.forEach(item => {
        item.id = uid()
      })
    }
    db.value.characters.push(copy)
    ui.value.charId = copy.id
  }

  function removeCharacter() {
    const character = activeChar.value
    if (!character || db.value.characters.length <= 1) {
      return false
    }

    db.value.characters = db.value.characters.filter(record => record.id !== character.id)
    ui.value.charId = db.value.characters[0]?.id || null
    return true
  }

  function addCard(kind: string, faction?: string) {
    const character = activeChar.value
    if (!character) {
      return
    }

    if (kind === 'techniques') character.techniques.push(blankTechnique(faction))
    if (kind === 'gear') character.gear.push(blankGear())
    if (kind === 'marks') character.marks.push(blankMark())
    if (kind === 'log') character.log.push(blankLog())
    if (kind === 'armor') character.armor.push(blankArmor())
  }

  function removeCard(kind: string, id: string) {
    const character = activeChar.value
    if (!character) {
      return
    }

    if (kind === 'techniques') character.techniques = character.techniques.filter(item => item.id !== id)
    if (kind === 'gear') character.gear = character.gear.filter(item => item.id !== id)
    if (kind === 'marks') character.marks = character.marks.filter(item => item.id !== id)
    if (kind === 'log') character.log = character.log.filter(item => item.id !== id)
    if (kind === 'armor') character.armor = character.armor.filter(item => item.id !== id)
  }

  function addArchiveRecord() {
    const locale = getLocaleMessages().dossier
    const record: ArchiveRecord = { id: uid(), tag: locale.blank.archiveTag, title: locale.blank.archiveTitle, body: '' }
    db.value.archive.push(record)
    ui.value.archiveId = record.id
  }

  function removeArchiveRecord() {
    if (!ui.value.archiveId) {
      return
    }

    db.value.archive = db.value.archive.filter(record => record.id !== ui.value.archiveId)
    ui.value.archiveId = db.value.archive[0]?.id || null
  }

  function addOperationRecord() {
    const record = blankCase()
    record.code = getLocaleMessages().ui.operations.caseFallback + ' ' + String(db.value.operations.length).padStart(2, '0')
    db.value.operations.push(record)
    ui.value.opsId = record.id
  }

  function removeOperationRecord() {
    if (!ui.value.opsId) {
      return
    }

    db.value.operations = db.value.operations.filter(record => record.id !== ui.value.opsId)
    ui.value.opsId = db.value.operations[0]?.id || null
  }

  function selectCharacter(id: string) {
    ui.value.charId = id
  }

  function selectArchive(id: string) {
    ui.value.archiveId = id
  }

  function selectOperation(id: string) {
    ui.value.opsId = id
  }

  function exportJson(): string {
    db.value.meta.exported = new Date().toISOString()
    db.value.meta.schemaVersion = 1
    return JSON.stringify(db.value, null, 2)
  }

  function importJson(source: string) {
    const parsed = normalizeDb(JSON.parse(source))
    db.value = parsed
    ui.value.charId = parsed.characters[0]?.id || null
    ui.value.archiveId = parsed.archive[0]?.id || null
    ui.value.opsId = parsed.operations[0]?.id || null
    ui.value.collapsed = {}
  }

  return {
    REF,
    db,
    ui,
    activeChar,
    activeArchive,
    activeOperation,
    fileRef,
    stamp,
    setView,
    toggleGm,
    toggleSection,
    commitCharacterPath,
    commitArchive,
    commitOperation,
    step,
    setSelect,
    changeResonance,
    setSignalByPip,
    setKarma,
    toggleWound,
    addCharacter,
    duplicateCharacter,
    removeCharacter,
    addCard,
    removeCard,
    addArchiveRecord,
    removeArchiveRecord,
    addOperationRecord,
    removeOperationRecord,
    selectCharacter,
    selectArchive,
    selectOperation,
    exportJson,
    importJson,
  }
}
