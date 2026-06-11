<template>
  <div class="eid-layout eid-layout--index-record">
    <aside class="eid-index">
      <div class="eid-index__head">Operations Log - Cases & Sessions</div>
      <button
        v-for="record in db.operations"
        :key="record.id"
        class="eid-index__entry"
        :class="{ cur: record.id === activeOperation?.id }"
        type="button"
        @click="selectOperation(record.id)"
      >
        <span>{{ record.code || 'CASE' }} / {{ record.status }}</span>{{ record.title }}
      </button>
      <div class="eid-index__foot eid-no-print">
        <button class="eid-button" type="button" @click="addOperationRecord">+ New Case File</button>
      </div>
    </aside>

    <article v-if="activeOperation" class="eid-article">
      <DossierEditableValue
        class="eid-article__title"
        :model-value="activeOperation.title"
        label="Case title"
        @commit="commitOperation('title', $event)"
      />
      <div class="eid-article__meta">Operations file / case rhythm: Investigation -> Conclusion -> Preparation -> Clash</div>
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
        <button class="eid-button eid-button--danger" type="button" @click="destroyOperation">Destroy Record</button>
      </div>
    </article>
    <p v-else class="eid-note">No operations on file.</p>
  </div>
  <p class="eid-note eid-view-note">Session manager seed: one record per case or session. Escalate through deeper impossibility, not bigger monsters. Each case should quietly feed the keystone project.</p>
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

const fields: Array<{ key: keyof OperationRecord, label: string }> = [
  { key: 'code', label: 'Case Code' },
  { key: 'date', label: 'Date' },
  { key: 'status', label: 'Status' },
  { key: 'investigation', label: '1 / Investigation' },
  { key: 'conclusion', label: '2 / Conclusion' },
  { key: 'preparation', label: '3 / Preparation' },
  { key: 'clash', label: '4 / Clash' },
  { key: 'advancementMenu', label: 'Advancement Menu' },
  { key: 'gmNotes', label: 'GM Notes' },
]

function destroyOperation() {
  if (confirm('Destroy this case file?')) {
    removeOperationRecord()
  }
}
</script>
