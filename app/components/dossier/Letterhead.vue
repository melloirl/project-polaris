<template>
  <header class="eid-letterhead">
    <div class="eid-org">
      <div class="eid-org__sigil" aria-hidden="true">E</div>
      <div>
        <h1>{{ t('ui.letterhead.organization') }}</h1>
        <div class="eid-org__sub">{{ t('ui.letterhead.subline') }}</div>
      </div>
    </div>
    <div class="eid-stamp">{{ stamp }}</div>
    <div class="eid-fileline">
      {{ t('ui.letterhead.fileRef') }} <b>{{ fileRef }}</b><br>
      {{ t('ui.letterhead.eraLabel') }} <b>{{ t('ui.letterhead.era') }}</b><br>
      {{ t('ui.letterhead.formRevLabel') }} <b>{{ t('ui.letterhead.formRev') }}</b>
    </div>
  </header>
</template>

<script setup lang="ts">
const { fileRef, stamp } = useCampaignDossier()
const { t } = useDossierI18n()
</script>
