<template>
  <UiRecordCard
    :name="name"
    :tag="meta"
    :tone="tone"
    :glyph="glyph"
    :wide="wide"
  >
    <template #name>
      <DossierEditableValue
        class="record-card__name"
        :model-value="name"
        :label="t('ui.cards.cardName')"
        @commit="$emit('commit-name', $event)"
      />
    </template>
    <template #tag>
      <DossierEditableValue
        v-if="editableMeta"
        class="record-card__meta"
        :model-value="meta"
        :label="t('ui.cards.cardSource')"
        @commit="$emit('commit-meta', $event)"
      />
      <span v-else class="record-card__meta">{{ meta }}</span>
    </template>
    <template #rows>
      <div v-for="row in rows" :key="row.key" class="record-card__row">
        <span class="record-card__key">{{ row.label }}</span>
        <DossierEditableValue
          class="record-card__value"
          :model-value="row.value"
          :label="row.label"
          @commit="$emit('commit-row', row.key, $event)"
        />
      </div>
    </template>
    <template #footer>
      <UiButton variant="danger" size="sm" @click="$emit('remove')">{{ t('ui.cards.remove') }}</UiButton>
    </template>
  </UiRecordCard>
</template>

<script setup lang="ts">
import type { UiCardTone, UiInstrumentGlyphName } from '~/types/ui'

const props = defineProps<{
  name: string
  meta: string
  rows: Array<{ key: string, label: string, value: string }>
  metaClass?: string
  editableMeta?: boolean
  wide?: boolean
}>()

defineEmits<{
  'commit-name': [value: string]
  'commit-meta': [value: string]
  'commit-row': [key: string, value: string]
  remove: []
}>()

const { t } = useDossierI18n()

const tone = computed<UiCardTone>(() => {
  if (props.metaClass === 'fac-eden') return 'eden'
  if (props.metaClass === 'fac-echologist') return 'echo'
  if (props.metaClass === 'fac-pact') return 'pact'
  return 'ink'
})

const glyph = computed<UiInstrumentGlyphName>(() => {
  if (tone.value === 'eden' || tone.value === 'pact') return 'technique'
  if (tone.value === 'echo') return 'device'
  return 'mark'
})
</script>

<style scoped lang="scss">
.record-card__name {
  flex: 1;
  min-height: 18px;
  border-bottom: 0;
  font-size: 13px;
  font-weight: 700;
}

.record-card__meta {
  min-height: 16px;
  border-bottom: 0;
  font-size: 9px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.record-card__row {
  display: flex;
  gap: var(--space-3);
  font-size: var(--type-2);
}

.record-card__key {
  min-width: 86px;
  padding-top: 2px;
  font-size: 9px;
  letter-spacing: var(--track-meta);
  opacity: 0.7;
  text-transform: uppercase;
}

.record-card__value {
  flex: 1;
  min-height: 18px;
  border-bottom-color: var(--rule-soft);
}
</style>
