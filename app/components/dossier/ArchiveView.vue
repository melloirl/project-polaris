<template>
  <div class="eid-layout eid-layout--index-record">
    <aside class="eid-index">
      <div class="eid-index__head">{{ t('ui.archive.indexHead') }}</div>
      <button
        v-for="record in db.archive"
        :key="record.id"
        class="eid-index__entry"
        :class="{ cur: record.id === activeArchive?.id }"
        type="button"
        @click="selectArchive(record.id)"
      >
        <span>{{ record.tag }}</span>{{ record.title }}
      </button>
      <div class="eid-index__foot eid-no-print">
        <button class="eid-button" type="button" @click="addArchiveRecord">{{ t('ui.archive.newRecord') }}</button>
      </div>
    </aside>

    <article v-if="activeArchive" class="eid-article">
      <DossierEditableValue
        class="eid-article__title"
        :model-value="activeArchive.title"
        :label="t('ui.archive.titleLabel')"
        @commit="commitArchive('title', $event)"
      />
      <div class="eid-article__meta">
        {{ t('ui.archive.classification') }}
        <DossierEditableValue
          class="eid-article__meta-edit"
          :model-value="activeArchive.tag"
          :label="t('ui.archive.classificationLabel')"
          @commit="commitArchive('tag', $event)"
        />
        / {{ t('ui.archive.archiveRef') }} {{ activeArchive.id.toUpperCase() }}
      </div>
      <DossierEditableValue
        class="eid-article__body"
        :model-value="activeArchive.body"
        :label="t('ui.archive.bodyLabel')"
        @commit="commitArchive('body', $event)"
      />
      <div class="eid-add-row eid-no-print">
        <button class="eid-button eid-button--danger" type="button" @click="destroyArchive">{{ t('ui.archive.destroy') }}</button>
      </div>
    </article>
    <p v-else class="eid-note">{{ t('ui.archive.empty') }}</p>
  </div>
  <p class="eid-note eid-view-note">{{ t('ui.archive.note') }}</p>
</template>

<script setup lang="ts">
const {
  db,
  activeArchive,
  selectArchive,
  commitArchive,
  addArchiveRecord,
  removeArchiveRecord,
} = useCampaignDossier()
const { t } = useDossierI18n()

function destroyArchive() {
  if (confirm(t('ui.archive.destroyConfirm'))) {
    removeArchiveRecord()
  }
}
</script>
