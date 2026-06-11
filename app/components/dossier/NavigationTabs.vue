<template>
  <nav class="eid-tabs" :aria-label="t('ui.tabs.aria')">
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
      <button class="eid-button" :class="{ 'eid-button--active-gm': ui.gm }" type="button" :title="t('ui.toolbar.gmTitle')" @click="toggleGm">
        {{ t('ui.toolbar.gmMode', { state: ui.gm ? t('ui.toolbar.on') : t('ui.toolbar.off') }) }}
      </button>
      <button class="eid-button" type="button" @click="download">{{ t('ui.toolbar.export') }}</button>
      <button class="eid-button" type="button" @click="importInput?.click()">{{ t('ui.toolbar.import') }}</button>
      <button class="eid-button" type="button" @click="print">{{ t('ui.toolbar.print') }}</button>
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
const { t } = useDossierI18n()

const importInput = ref<HTMLInputElement | null>(null)

const tabs: Array<{ label: string, view: DossierView }> = [
  { label: t('ui.tabs.dossier'), view: 'dossier' },
  { label: t('ui.tabs.archive'), view: 'archive' },
  { label: t('ui.tabs.operations'), view: 'operations' },
  { label: t('ui.tabs.reference'), view: 'reference' },
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
  link.download = t('ui.toolbar.exportFilename')
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
      alert(t('ui.toolbar.importFailed', { message: error instanceof Error ? error.message : t('ui.common.unknownError') }))
    }
  }
  reader.readAsText(file)
  ;(event.target as HTMLInputElement).value = ''
}

function print() {
  window.print()
}
</script>
