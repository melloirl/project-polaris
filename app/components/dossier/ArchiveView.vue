<template>
  <div class="eid-layout eid-layout--index-record">
    <aside class="eid-index">
      <div class="eid-index__head">Central Archive - Setting Records</div>
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
        <button class="eid-button" type="button" @click="addArchiveRecord">+ New Record</button>
      </div>
    </aside>

    <article v-if="activeArchive" class="eid-article">
      <DossierEditableValue
        class="eid-article__title"
        :model-value="activeArchive.title"
        label="Archive title"
        @commit="commitArchive('title', $event)"
      />
      <div class="eid-article__meta">
        Classification:
        <DossierEditableValue
          class="eid-article__meta-edit"
          :model-value="activeArchive.tag"
          label="Archive classification"
          @commit="commitArchive('tag', $event)"
        />
        / Archive Ref. {{ activeArchive.id.toUpperCase() }}
      </div>
      <DossierEditableValue
        class="eid-article__body"
        :model-value="activeArchive.body"
        label="Archive body"
        @commit="commitArchive('body', $event)"
      />
      <div class="eid-add-row eid-no-print">
        <button class="eid-button eid-button--danger" type="button" @click="destroyArchive">Destroy Record</button>
      </div>
    </article>
    <p v-else class="eid-note">Archive is empty.</p>
  </div>
  <p class="eid-note eid-view-note">Wiki seed: each record is a freely editable article. Extend by adding records for divisions, NPCs, Geists, cases, and locations - or add new collections in the DB.</p>
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

function destroyArchive() {
  if (confirm('Destroy this archive record?')) {
    removeArchiveRecord()
  }
}
</script>
