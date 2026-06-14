<template>
  <header class="eid-letterhead">
    <div class="eid-org">
      <UiSeal
        letter="E"
        :name="t('ui.letterhead.organization')"
        :sub="t('ui.letterhead.subline')"
      />
    </div>
    <UiStamp :rotate="ui.gm ? 2 : -3">{{ stamp }}</UiStamp>
    <div class="eid-fileline">
      {{ t('ui.letterhead.fileRef') }} <b>{{ fileRef }}</b><br>
      {{ t('ui.letterhead.eraLabel') }} <b>{{ t('ui.letterhead.era') }}</b><br>
      {{ t('ui.letterhead.formRevLabel') }} <b>{{ t('ui.letterhead.formRev') }}</b>
    </div>
  </header>
</template>

<script setup lang="ts">
const { fileRef, stamp, ui } = useCampaignDossier()
const { t } = useDossierI18n()
</script>
