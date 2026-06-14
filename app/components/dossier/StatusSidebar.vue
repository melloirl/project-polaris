<template>
  <aside class="eid-status-sidebar">
    <UiStatusPanel :title="t('ui.status.signal')" :mini="t('ui.status.signalMini')" accent="echo" glyph="signal">
      <UiBigRead :value="`${currentSignal} / ${maxSignal}`" :label="t('ui.status.cleanFrequency')" tone="echo" />
      <UiSignalPips
        :max="maxSignal"
        :current="currentSignal"
        :label="t('ui.status.signal')"
        @change="commitSignal"
      />
      <p class="eid-note">
        {{ t('ui.status.signalNote') }}
        <UiStepper
          :model-value="character.signal.maxMod || 0"
          :label="t('ui.status.signalMaxModifier')"
          :min="-5"
          :max="5"
          @change="changeRanged('signal.maxMod', character.signal.maxMod || 0, $event, -5, 5)"
        />
      </p>
    </UiStatusPanel>

    <UiStatusPanel :title="t('ui.status.resonance')" :mini="t('ui.status.contamination')" accent="eden" glyph="resonance">
      <UiBigRead :value="`${character.resonance.pct}%`" :label="stage.name" tone="eden" />
      <UiResonanceGauge :pct="character.resonance.pct" :stages="resonanceStageNames" />
      <p class="eid-note">{{ t('ui.status.nextThreshold', { threshold }) }}</p>
      <div class="eid-add-row eid-no-print">
        <UiButton v-for="delta in [-5, -1, 1, 5]" :key="delta" size="sm" @click="changeResonance(delta)">
          {{ delta > 0 ? '+' : '' }}{{ delta }}
        </UiButton>
      </div>
    </UiStatusPanel>

    <UiStatusPanel :title="t('ui.status.karma')" :mini="t('ui.status.karmaMini')" glyph="karma">
      <UiBigRead :value="formatSignedValue(character.karma.value, character.karma.value > 0)" :label="karmaPath(character.karma.value, karmaPathLabels)" />
      <p class="eid-note eid-note--tight">{{ t('ui.status.stage', { stage: karmaLabel }) }}</p>
      <UiKarmaRuler
        :value="character.karma.value"
        :eden-limit="character.karma.edenLimit"
        :echo-limit="character.karma.echoLimit"
        :labels="[t('ui.status.karmaLeft'), t('ui.status.karmaRight')]"
        @change="requestKarma"
      />
      <p class="eid-note">
        {{ t('ui.status.limitsEden') }}
        <UiStepper
          :model-value="character.karma.edenLimit"
          :label="t('ui.status.edenLimit')"
          :min="-5"
          :max="0"
          @change="changeRanged('karma.edenLimit', character.karma.edenLimit, $event, -5, 0)"
        />
        {{ t('ui.status.echologist') }}
        <UiStepper
          :model-value="character.karma.echoLimit"
          :label="t('ui.status.echologistLimit')"
          :min="0"
          :max="5"
          @change="changeRanged('karma.echoLimit', character.karma.echoLimit, $event, 0, 5)"
        />
      </p>
    </UiStatusPanel>

    <UiStatusPanel :title="t('ui.status.harm')" :mini="t('ui.status.woundSlots')" accent="stamp" glyph="harm">
      <UiWoundBoxes :rows="woundRows" @toggle="toggleWoundByKey" />
      <p class="eid-note">{{ t('ui.status.harmNote') }}</p>
    </UiStatusPanel>

    <UiStatusPanel :title="t('ui.status.access')" :mini="t('ui.status.institutionalLeash')" glyph="access">
      <UiBigRead :value="character.access.state" small />
      <p class="eid-note">{{ character.access.scope || t('ui.status.scopeUnrecorded') }}</p>
      <p class="eid-note">{{ t('ui.status.damage', { damage: character.access.damage || t('ui.common.none') }) }}</p>
    </UiStatusPanel>
  </aside>
</template>

<script setup lang="ts">
import type { CharacterRecord } from '~/types/dossier'
import type { UiWoundRow } from '~/types/ui'
import { karmaPath, karmaStage, nextThreshold, signalMax, stageFor } from '~/utils/dossier'

const props = defineProps<{
  character: CharacterRecord
}>()

const { REF, step, changeResonance, setSignal: setSignalValue, setKarma, toggleWound } = useCampaignDossier()
const { t, tm } = useDossierI18n()

const maxSignal = computed(() => signalMax(props.character))
const currentSignal = computed(() => Math.min(props.character.signal.current, maxSignal.value))
const stage = computed(() => stageFor(REF.resonanceStages, props.character.resonance.pct))
const threshold = computed(() => nextThreshold(REF.resonanceStages, props.character.resonance.pct))
const resonanceStageNames = computed(() => REF.resonanceStages.slice(0, 5).map(item => item.name))
const karmaLabel = computed(() => karmaStage(REF.karmaDepth, REF.karmaStageNames, props.character.karma.value))
const karmaPathLabels = tm<{ eden: string, echologist: string, neutral: string }>('dossier.karmaPath')
const woundRows = computed<UiWoundRow[]>(() => [
  { key: 'minor', label: t('ui.status.minor'), values: props.character.harm.minor },
  { key: 'serious', label: t('ui.status.serious'), values: props.character.harm.serious, note: t('ui.status.whenRelevant') },
  { key: 'critical', label: t('ui.status.critical'), values: props.character.harm.critical },
])

function changeRanged(path: string, currentValue: number, nextValue: number, min: number, max: number) {
  step(path, nextValue - currentValue, min, max)
}

function commitSignal(current: number) {
  setSignalValue(current)
}

function requestKarma(value: number) {
  if (value === props.character.karma.value) {
    return
  }

  const act = prompt(t('ui.status.karmaPrompt'), props.character.karma.lastAct || '')
  if (act !== null) {
    setKarma(value, act)
  }
}

function toggleWoundByKey(key: string, index: number) {
  if (key === 'minor' || key === 'serious' || key === 'critical') {
    toggleWound(key, index)
  }
}
</script>
