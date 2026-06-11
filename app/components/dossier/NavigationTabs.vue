<template>
  <nav class="eid-tabs" aria-label="Dossier views">
    <a
      v-for="tab in tabs"
      :key="tab.view"
      :href="`#/${tab.view}`"
      :class="{ active: ui.view === tab.view }"
      @click.prevent="go(tab.view)"
    >
      {{ tab.label }}
    </a>
    <span class="eid-tabs__spacer" />
    <span class="eid-tool-buttons">
      <button class="eid-button" :class="{ 'eid-button--active-gm': ui.gm }" type="button" title="Reveal GM classified dossier fields" @click="toggleGm">
        GM Mode: {{ ui.gm ? 'On' : 'Off' }}
      </button>
      <button class="eid-button" type="button" @click="download">Export File</button>
      <button class="eid-button" type="button" @click="importInput?.click()">Import File</button>
      <button class="eid-button" type="button" @click="print">Print</button>
      <input ref="importInput" class="eid-hidden-input" type="file" accept="application/json" @change="importFile">
    </span>
  </nav>
</template>

<script setup lang="ts">
import type { DossierView } from '~/types/dossier'

const {
  ui,
  setView,
  toggleGm,
  exportJson,
  importJson,
} = useCampaignDossier()

const importInput = ref<HTMLInputElement | null>(null)

const tabs: Array<{ label: string, view: DossierView }> = [
  { label: 'Dossier', view: 'dossier' },
  { label: 'Archive', view: 'archive' },
  { label: 'Operations Log', view: 'operations' },
  { label: 'Reference', view: 'reference' },
]

function go(view: DossierView) {
  setView(view)
  if (import.meta.client) {
    window.location.hash = `/${view}`
  }
}

function download() {
  if (!import.meta.client) {
    return
  }

  const blob = new Blob([exportJson()], { type: 'application/json' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'resonance_s2_campaign.json'
  link.click()
  URL.revokeObjectURL(link.href)
}

function importFile(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) {
    return
  }

  const reader = new FileReader()
  reader.onload = () => {
    try {
      importJson(String(reader.result || ''))
    }
    catch (error) {
      alert('Import failed: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }
  reader.readAsText(file)
  ;(event.target as HTMLInputElement).value = ''
}

function print() {
  window.print()
}
</script>
