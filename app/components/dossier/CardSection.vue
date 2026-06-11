<template>
  <template v-if="character && validKind">
    <div class="eid-card-list">
      <DossierRecordCard
        v-for="(item, index) in list"
        :key="item.id"
        :name="cardName(item, index)"
        :meta="cardMeta(item, index)"
        :editable-meta="kind === 'techniques'"
        :meta-class="cardMetaClass(item)"
        :wide="kind === 'log'"
        :rows="rowsFor(item)"
        @commit-name="commitName(index, $event)"
        @commit-meta="commitMeta(index, $event)"
        @commit-row="(key, value) => commitRow(index, key, value)"
        @remove="remove(item.id)"
      />
      <p v-if="!list.length" class="eid-note">{{ emptyLabels[kind] }}</p>
    </div>

    <div v-if="kind === 'techniques'" class="eid-add-row eid-no-print">
      <button
        v-for="faction in techniqueFactions"
        :key="faction"
        class="eid-button"
        type="button"
        @click="addCard('techniques', faction)"
      >
        + {{ faction === 'Geist Pact' ? 'Pact Ability' : faction }}
      </button>
    </div>
    <div v-else class="eid-add-row eid-no-print">
      <button class="eid-button" type="button" @click="addCard(kind)">{{ addLabels[kind] }}</button>
    </div>
  </template>
</template>

<script setup lang="ts">
import type { CustomSection } from '~/types/dossier'
import { getPath } from '~/utils/dossier'

const props = defineProps<{
  kind: CustomSection | ''
}>()

type CardKind = 'armor' | 'techniques' | 'gear' | 'marks' | 'log'

const { activeChar: character, commitCharacterPath, addCard, removeCard } = useCampaignDossier()

const validKind = computed(() => ['armor', 'techniques', 'gear', 'marks', 'log'].includes(props.kind))
const kind = computed(() => props.kind as CardKind)
const list = computed(() => validKind.value && character.value ? character.value[kind.value] : [])

const cardRows: Record<CardKind, Array<{ key: string, label: string }>> = {
  armor: [
    { key: 'slots', label: 'Protection Slots' },
    { key: 'applies', label: 'Applies Against' },
    { key: 'notApplies', label: 'Does Not Apply' },
    { key: 'notes', label: 'Notes' },
  ],
  techniques: [
    { key: 'tags', label: 'Tags' },
    { key: 'type', label: 'Type' },
    { key: 'effect', label: 'Effect' },
    { key: 'cost', label: 'Cost' },
    { key: 'hardReq', label: 'Hard Requirements' },
    { key: 'softReq', label: 'Soft Requirements' },
    { key: 'karma', label: 'Karma' },
    { key: 'gear', label: 'Gear' },
    { key: 'risk', label: 'Risk / Limitation' },
  ],
  gear: [
    { key: 'type', label: 'Type' },
    { key: 'capacity', label: 'Capacity' },
    { key: 'charge', label: 'Current Charge' },
    { key: 'func', label: 'Function' },
    { key: 'compat', label: 'Compatible Techniques' },
    { key: 'requirements', label: 'Requirements' },
    { key: 'risk', label: 'Risk' },
    { key: 'maintenance', label: 'Maintenance' },
    { key: 'tracking', label: 'Tracking / Access' },
    { key: 'notes', label: 'Notes' },
  ],
  marks: [
    { key: 'source', label: 'Source' },
    { key: 'symptom', label: 'Symptom' },
    { key: 'effect', label: 'Mechanical Effect' },
    { key: 'duration', label: 'Duration' },
    { key: 'notes', label: 'Notes' },
  ],
  log: [
    { key: 'caseName', label: 'Case' },
    { key: 'advancement', label: 'Advancement Chosen' },
    { key: 'domains', label: 'Domain Changes' },
    { key: 'techniques', label: 'Techniques Learned' },
    { key: 'karmaActs', label: 'Karma-Moving Acts' },
    { key: 'access', label: 'Access Changes' },
    { key: 'gear', label: 'Gear Changes' },
    { key: 'wounds', label: 'Wounds / Scars' },
    { key: 'notes', label: 'Notes' },
  ],
}

const addLabels: Record<CardKind, string> = {
  armor: '+ Add Protection',
  techniques: '+ General',
  gear: '+ Register Device',
  marks: '+ Record Mark / Haunting',
  log: '+ Log Advancement',
}

const emptyLabels: Record<CardKind, string> = {
  armor: 'No protection registered.',
  techniques: 'No techniques registered.',
  gear: 'No devices registered.',
  marks: 'No marks or hauntings on file.',
  log: 'Log is empty. Entries are added after completed cases.',
}

const techniqueFactions = ['General', 'Eidolon', 'Occult Eden', 'Echologist', 'Geist Pact']

function facClass(faction: string) {
  if (faction === 'Occult Eden') return 'fac-eden'
  if (faction === 'Echologist') return 'fac-echologist'
  if (faction === 'Geist Pact') return 'fac-pact'
  return 'fac-general'
}

function cardName(item: { id: string }, index: number) {
  return kind.value === 'log' ? `Entry ${String(index + 1).padStart(2, '0')}` : String(getPath(item, 'name') || '')
}

function cardMeta(item: { id: string }, _index: number) {
  if (kind.value === 'armor') return 'Protection'
  if (kind.value === 'gear') return 'Device'
  if (kind.value === 'marks') return 'Geist Mark'
  if (kind.value === 'log') return 'Advancement'
  return String(getPath(item, 'faction') || 'General')
}

function cardMetaClass(item: { id: string }) {
  if (kind.value === 'marks') return 'fac-eden'
  if (kind.value === 'techniques') return facClass(String(getPath(item, 'faction') || 'General'))
  return ''
}

function rowsFor(item: { id: string }) {
  return cardRows[kind.value].map(row => ({ ...row, value: String(getPath(item, row.key) ?? '') }))
}

function commitName(index: number, value: string) {
  if (kind.value !== 'log') {
    commitCharacterPath(`${kind.value}.${index}.name`, value)
  }
}

function commitMeta(index: number, value: string) {
  if (kind.value === 'techniques') {
    commitCharacterPath(`${kind.value}.${index}.faction`, value)
  }
}

function commitRow(index: number, key: string, value: string) {
  commitCharacterPath(`${kind.value}.${index}.${key}`, value)
}

function remove(id: string) {
  if (confirm('Destroy this record? This cannot be undone.')) {
    removeCard(kind.value, id)
  }
}
</script>
