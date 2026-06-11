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
      <span>Internal use only / Unauthorized disclosure is a federal offense</span>
      <span class="eid-footer__hint">Data lives in memory - use Export File to save your campaign as JSON.</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import ArchiveRecordView from './ArchiveView.vue'
import PersonnelDossierView from './DossierView.vue'
import OperationsRecordView from './OperationsView.vue'
import ReferenceRecordView from './ReferenceView.vue'

const { ui, setView } = useCampaignDossier()

function syncHash() {
  const view = window.location.hash.replace('#/', '') || 'dossier'
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
