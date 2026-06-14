<template>
  <div class="eid-app-shell">
    <DossierLetterhead />
    <DossierNavigationTabs />
    <main class="eid-main">
      <PersonnelDossierView v-if="ui.view === 'dossier'" />
      <ArchiveRecordView v-else-if="ui.view === 'archive'" />
      <OperationsRecordView v-else-if="ui.view === 'operations'" />
      <ReferenceRecordView v-else />
    </main>
    <footer class="eid-footer">
      <span>{{ t('ui.footer.notice') }}</span>
      <span class="eid-footer__hint">{{ t('ui.footer.hint') }}</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import ArchiveRecordView from './ArchiveView.vue'
import PersonnelDossierView from './DossierView.vue'
import OperationsRecordView from './OperationsView.vue'
import ReferenceRecordView from './ReferenceView.vue'

const { ui, setView } = useCampaignDossier()
const { t } = useDossierI18n()

function syncHash() {
  const view = window.location.hash.replace(/^#\/?/, '') || 'dossier'
  setView(view)
}

onMounted(() => {
  syncHash()
  window.addEventListener('hashchange', syncHash)
})

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', syncHash)
})
</script>
