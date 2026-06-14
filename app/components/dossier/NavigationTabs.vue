<template>
  <UiTabs
    class="dossier-tabs"
    :items="tabs"
    :model-value="ui.view"
    :aria-label="t('ui.tabs.aria')"
    @update:model-value="go"
  >
    <template #tools>
      <UiButton
        :variant="ui.gm ? 'active-gm' : 'default'"
        :title="t('ui.toolbar.gmTitle')"
        @click="toggleGm"
      >
        {{ t('ui.toolbar.gmMode', { state: ui.gm ? t('ui.toolbar.on') : t('ui.toolbar.off') }) }}
      </UiButton>
      <UiButton @click="download">{{ t('ui.toolbar.export') }}</UiButton>
      <UiButton @click="importInput?.click()">{{ t('ui.toolbar.import') }}</UiButton>
      <UiButton @click="print">{{ t('ui.toolbar.print') }}</UiButton>
      <input ref="importInput" class="dossier-tabs__hidden-input" type="file" accept="application/json" @change="importFile">
    </template>
  </UiTabs>
</template>

<script setup lang="ts">
import type { DossierView } from '~/types/dossier'
import type { UiTabItem } from '~/types/ui'

const {
  ui,
  setView,
  toggleGm,
  exportJson,
  importJson,
} = useCampaignDossier()
const { t } = useDossierI18n()

const importInput = ref<HTMLInputElement | null>(null)

const tabs: UiTabItem[] = [
  { label: t('ui.tabs.dossier'), value: 'dossier', href: '#dossier' },
  { label: t('ui.tabs.archive'), value: 'archive', href: '#archive' },
  { label: t('ui.tabs.operations'), value: 'operations', href: '#operations' },
  { label: t('ui.tabs.reference'), value: 'reference', href: '#reference' },
]

function go(view: string) {
  setView(view)
  if (import.meta.client) {
    window.location.hash = view as DossierView
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

<style scoped lang="scss">
.dossier-tabs {
  padding: 0 28px;
}

.dossier-tabs__hidden-input {
  display: none;
}
</style>
