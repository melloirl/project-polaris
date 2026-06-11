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
      <p v-if="!list.length" class="eid-note">{{ t(`ui.cards.empty.${kind}`) }}</p>
    </div>

    <div v-if="kind === 'techniques'" class="eid-add-row eid-no-print">
      <button
        v-for="faction in techniqueFactions"
        :key="faction"
        class="eid-button"
        type="button"
        @click="addCard('techniques', faction)"
      >
        + {{ faction === tm<string>('ui.cards.factions.geistPact') ? t('ui.cards.pactAbility') : faction }}
      </button>
    </div>
    <div v-else class="eid-add-row eid-no-print">
      <button class="eid-button" type="button" @click="addCard(kind)">{{ t(`ui.cards.add.${kind}`) }}</button>
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
const { t, tm } = useDossierI18n()

const validKind = computed(() => ['armor', 'techniques', 'gear', 'marks', 'log'].includes(props.kind))
const kind = computed(() => props.kind as CardKind)
const list = computed(() => validKind.value && character.value ? character.value[kind.value] : [])

const cardRows: Record<CardKind, Array<{ key: string, label: string }>> = {
  armor: [
    { key: 'slots', label: tm<string>('ui.cards.rows.armor.slots') },
    { key: 'applies', label: tm<string>('ui.cards.rows.armor.applies') },
    { key: 'notApplies', label: tm<string>('ui.cards.rows.armor.notApplies') },
    { key: 'notes', label: tm<string>('ui.cards.rows.armor.notes') },
  ],
  techniques: [
    { key: 'tags', label: tm<string>('ui.cards.rows.techniques.tags') },
    { key: 'type', label: tm<string>('ui.cards.rows.techniques.type') },
    { key: 'effect', label: tm<string>('ui.cards.rows.techniques.effect') },
    { key: 'cost', label: tm<string>('ui.cards.rows.techniques.cost') },
    { key: 'hardReq', label: tm<string>('ui.cards.rows.techniques.hardReq') },
    { key: 'softReq', label: tm<string>('ui.cards.rows.techniques.softReq') },
    { key: 'karma', label: tm<string>('ui.cards.rows.techniques.karma') },
    { key: 'gear', label: tm<string>('ui.cards.rows.techniques.gear') },
    { key: 'risk', label: tm<string>('ui.cards.rows.techniques.risk') },
  ],
  gear: [
    { key: 'type', label: tm<string>('ui.cards.rows.gear.type') },
    { key: 'capacity', label: tm<string>('ui.cards.rows.gear.capacity') },
    { key: 'charge', label: tm<string>('ui.cards.rows.gear.charge') },
    { key: 'func', label: tm<string>('ui.cards.rows.gear.func') },
    { key: 'compat', label: tm<string>('ui.cards.rows.gear.compat') },
    { key: 'requirements', label: tm<string>('ui.cards.rows.gear.requirements') },
    { key: 'risk', label: tm<string>('ui.cards.rows.gear.risk') },
    { key: 'maintenance', label: tm<string>('ui.cards.rows.gear.maintenance') },
    { key: 'tracking', label: tm<string>('ui.cards.rows.gear.tracking') },
    { key: 'notes', label: tm<string>('ui.cards.rows.gear.notes') },
  ],
  marks: [
    { key: 'source', label: tm<string>('ui.cards.rows.marks.source') },
    { key: 'symptom', label: tm<string>('ui.cards.rows.marks.symptom') },
    { key: 'effect', label: tm<string>('ui.cards.rows.marks.effect') },
    { key: 'duration', label: tm<string>('ui.cards.rows.marks.duration') },
    { key: 'notes', label: tm<string>('ui.cards.rows.marks.notes') },
  ],
  log: [
    { key: 'caseName', label: tm<string>('ui.cards.rows.log.caseName') },
    { key: 'advancement', label: tm<string>('ui.cards.rows.log.advancement') },
    { key: 'domains', label: tm<string>('ui.cards.rows.log.domains') },
    { key: 'techniques', label: tm<string>('ui.cards.rows.log.techniques') },
    { key: 'karmaActs', label: tm<string>('ui.cards.rows.log.karmaActs') },
    { key: 'access', label: tm<string>('ui.cards.rows.log.access') },
    { key: 'gear', label: tm<string>('ui.cards.rows.log.gear') },
    { key: 'wounds', label: tm<string>('ui.cards.rows.log.wounds') },
    { key: 'notes', label: tm<string>('ui.cards.rows.log.notes') },
  ],
}

const techniqueFactions = [
  tm<string>('ui.cards.factions.general'),
  tm<string>('ui.cards.factions.eidolon'),
  tm<string>('ui.cards.factions.occultEden'),
  tm<string>('ui.cards.factions.echologist'),
  tm<string>('ui.cards.factions.geistPact'),
]

function facClass(faction: string) {
  if (faction === tm<string>('ui.cards.factions.occultEden')) return 'fac-eden'
  if (faction === tm<string>('ui.cards.factions.echologist')) return 'fac-echologist'
  if (faction === tm<string>('ui.cards.factions.geistPact')) return 'fac-pact'
  return 'fac-general'
}

function cardName(item: { id: string }, index: number) {
  return kind.value === 'log' ? t('ui.cards.entry', { number: String(index + 1).padStart(2, '0') }) : String(getPath(item, 'name') || '')
}

function cardMeta(item: { id: string }, _index: number) {
  if (kind.value === 'armor') return t('ui.cards.meta.armor')
  if (kind.value === 'gear') return t('ui.cards.meta.gear')
  if (kind.value === 'marks') return t('ui.cards.meta.marks')
  if (kind.value === 'log') return t('ui.cards.meta.log')
  return String(getPath(item, 'faction') || tm<string>('ui.cards.factions.general'))
}

function cardMetaClass(item: { id: string }) {
  if (kind.value === 'marks') return 'fac-eden'
  if (kind.value === 'techniques') return facClass(String(getPath(item, 'faction') || tm<string>('ui.cards.factions.general')))
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
  if (confirm(t('ui.cards.destroyConfirm'))) {
    removeCard(kind.value, id)
  }
}
</script>
