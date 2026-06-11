<template>
  <article class="eid-card" :class="{ 'eid-card--wide': wide }">
    <header class="eid-card__head">
      <DossierEditableValue
        class="eid-card__name"
        :model-value="name"
        :label="t('ui.cards.cardName')"
        @commit="$emit('commit-name', $event)"
      />
      <DossierEditableValue
        v-if="editableMeta"
        class="eid-card__meta"
        :class="metaClass"
        :model-value="meta"
        :label="t('ui.cards.cardSource')"
        @commit="$emit('commit-meta', $event)"
      />
      <span v-else class="eid-card__meta" :class="metaClass">{{ meta }}</span>
    </header>
    <div class="eid-card__body">
      <div v-for="row in rows" :key="row.key" class="eid-card__row">
        <span class="eid-card__key">{{ row.label }}</span>
        <DossierEditableValue
          class="eid-card__value"
          :model-value="row.value"
          :label="row.label"
          @commit="$emit('commit-row', row.key, $event)"
        />
      </div>
    </div>
    <footer class="eid-card__foot eid-no-print">
      <button class="eid-button eid-button--danger" type="button" @click="$emit('remove')">{{ t('ui.cards.remove') }}</button>
    </footer>
  </article>
</template>

<script setup lang="ts">
defineProps<{
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
</script>
