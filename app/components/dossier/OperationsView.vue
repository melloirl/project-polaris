<template>
  <div class="eid-layout eid-layout--index-record">
    <aside class="eid-index">
      <div class="eid-index__head">{{ t('ui.operations.indexHead') }}</div>
      <button
        v-for="record in db.operations"
        :key="record.id"
        class="eid-index__entry"
        :class="{ cur: record.id === activeOperation?.id }"
        type="button"
        @click="selectOperation(record.id)"
      >
        <span>{{ record.code || t('ui.operations.caseFallback') }} / {{ record.status }}</span>{{ record.title }}
      </button>
      <div class="eid-index__foot eid-no-print">
        <button class="eid-button" type="button" @click="addOperationRecord">{{ t('ui.operations.newCase') }}</button>
      </div>
    </aside>

    <article v-if="activeOperation" class="eid-article">
      <DossierEditableValue
        class="eid-article__title"
        :model-value="activeOperation.title"
        :label="t('ui.operations.titleLabel')"
        @commit="commitOperation('title', $event)"
      />
      <div class="eid-article__meta">{{ t('ui.operations.meta') }}</div>
      <div class="eid-field-grid">
        <DossierField
          v-for="field in fields"
          :key="field.key"
          :label="field.label"
          :value="activeOperation[field.key]"
          wide
          @commit="commitOperation(field.key, $event)"
        />
      </div>
      <div class="eid-add-row eid-no-print">
        <button class="eid-button eid-button--danger" type="button" @click="destroyOperation">{{ t('ui.operations.destroy') }}</button>
      </div>
    </article>
    <p v-else class="eid-note">{{ t('ui.operations.empty') }}</p>
  </div>
  <p class="eid-note eid-view-note">{{ t('ui.operations.note') }}</p>
</template>

<script setup lang="ts">
import type { OperationRecord } from '~/types/dossier'

const {
  db,
  activeOperation,
  selectOperation,
  commitOperation,
  addOperationRecord,
  removeOperationRecord,
} = useCampaignDossier()
const { t, tm } = useDossierI18n()

const fields: Array<{ key: keyof OperationRecord, label: string }> = [
  { key: 'code', label: tm<string>('ui.operations.fields.code') },
  { key: 'date', label: tm<string>('ui.operations.fields.date') },
  { key: 'status', label: tm<string>('ui.operations.fields.status') },
  { key: 'investigation', label: tm<string>('ui.operations.fields.investigation') },
  { key: 'conclusion', label: tm<string>('ui.operations.fields.conclusion') },
  { key: 'preparation', label: tm<string>('ui.operations.fields.preparation') },
  { key: 'clash', label: tm<string>('ui.operations.fields.clash') },
  { key: 'advancementMenu', label: tm<string>('ui.operations.fields.advancementMenu') },
  { key: 'gmNotes', label: tm<string>('ui.operations.fields.gmNotes') },
]

function destroyOperation() {
  if (confirm(t('ui.operations.destroyConfirm'))) {
    removeOperationRecord()
  }
}
</script>
