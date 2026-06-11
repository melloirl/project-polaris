<template>
  <aside class="eid-status-sidebar">
    <section class="eid-status-panel">
      <h3>{{ t('ui.status.signal') }} <span>{{ t('ui.status.signalMini') }}</span></h3>
      <div class="eid-status-panel__pad">
        <div class="eid-bigread">{{ currentSignal }} / {{ maxSignal }} <small>{{ t('ui.status.cleanFrequency') }}</small></div>
        <div class="eid-pips">
          <button
            v-for="(_, index) in maxSignal"
            :key="index"
            class="eid-pip"
            :class="{ on: index < currentSignal }"
            type="button"
            :aria-label="t('ui.status.signalPip', { value: index < currentSignal ? index : index + 1 })"
            @click="setSignalByPip(index)"
          />
        </div>
        <p class="eid-note">
          {{ t('ui.status.signalNote') }}
          <DossierStepperControl
            :value="character.signal.maxMod || 0"
            :label="t('ui.status.signalMaxModifier')"
            @step="step('signal.maxMod', $event, -5, 5)"
          />
        </p>
      </div>
    </section>

    <section class="eid-status-panel">
      <h3>{{ t('ui.status.resonance') }} <span>{{ t('ui.status.contamination') }}</span></h3>
      <div class="eid-status-panel__pad">
        <div class="eid-bigread">{{ character.resonance.pct }}% <small>{{ stage.name }}</small></div>
        <div class="eid-gauge">
          <div class="eid-gauge__track">
            <div class="eid-gauge__fill" :style="{ width: `${character.resonance.pct}%` }" />
            <div v-for="tick in [20, 40, 60, 80]" :key="tick" class="eid-gauge__tick" :style="{ left: `${tick}%` }" />
          </div>
          <div class="eid-gauge__stages">
            <span v-for="item in REF.resonanceStages.slice(0, 5)" :key="item.name" :class="{ cur: item === stage }">{{ item.name }}</span>
          </div>
        </div>
        <p class="eid-note">{{ t('ui.status.nextThreshold', { threshold }) }}</p>
        <div class="eid-add-row eid-no-print">
          <button v-for="delta in [-5, -1, 1, 5]" :key="delta" class="eid-button" type="button" @click="changeResonance(delta)">
            {{ delta > 0 ? '+' : '' }}{{ delta }}
          </button>
        </div>
      </div>
    </section>

    <section class="eid-status-panel">
      <h3>{{ t('ui.status.karma') }} <span>{{ t('ui.status.karmaMini') }}</span></h3>
      <div class="eid-status-panel__pad">
        <div class="eid-bigread">{{ character.karma.value > 0 ? '+' : '' }}{{ character.karma.value }} <small>{{ karmaPath(character.karma.value, karmaPathLabels) }}</small></div>
        <p class="eid-note eid-note--tight">{{ t('ui.status.stage', { stage: karmaLabel }) }}</p>
        <div class="eid-kruler">
          <button
            v-for="value in karmaValues"
            :key="value"
            class="eid-kruler__cell"
            :class="karmaCellClass(value)"
            type="button"
            :disabled="value < character.karma.edenLimit || value > character.karma.echoLimit"
            @click="requestKarma(value)"
          >
            {{ value > 0 ? '+' : '' }}{{ value }}
          </button>
        </div>
        <div class="eid-klabels"><span>{{ t('ui.status.karmaLeft') }}</span><span>{{ t('ui.status.karmaRight') }}</span></div>
        <p class="eid-note">
          {{ t('ui.status.limitsEden') }}
          <DossierStepperControl :value="character.karma.edenLimit" :label="t('ui.status.edenLimit')" @step="step('karma.edenLimit', $event, -5, 0)" />
          {{ t('ui.status.echologist') }}
          <DossierStepperControl :value="character.karma.echoLimit" :label="t('ui.status.echologistLimit')" @step="step('karma.echoLimit', $event, 0, 5)" />
        </p>
      </div>
    </section>

    <section class="eid-status-panel">
      <h3>{{ t('ui.status.harm') }} <span>{{ t('ui.status.woundSlots') }}</span></h3>
      <div class="eid-status-panel__pad eid-wounds">
        <div class="eid-wound-row"><span>{{ t('ui.status.minor') }}</span><WoundBoxes kind="minor" :label="t('ui.status.minor')" :values="character.harm.minor" /></div>
        <div class="eid-wound-row"><span>{{ t('ui.status.serious') }}</span><WoundBoxes kind="serious" :label="t('ui.status.serious')" :values="character.harm.serious" /><em>{{ t('ui.status.whenRelevant') }}</em></div>
        <div class="eid-wound-row"><span>{{ t('ui.status.critical') }}</span><WoundBoxes kind="critical" :label="t('ui.status.critical')" :values="character.harm.critical" /></div>
        <p class="eid-note">{{ t('ui.status.harmNote') }}</p>
      </div>
    </section>

    <section class="eid-status-panel">
      <h3>{{ t('ui.status.access') }} <span>{{ t('ui.status.institutionalLeash') }}</span></h3>
      <div class="eid-status-panel__pad">
        <div class="eid-bigread eid-bigread--small">{{ character.access.state }}</div>
        <p class="eid-note">{{ character.access.scope || t('ui.status.scopeUnrecorded') }}</p>
        <p class="eid-note">{{ t('ui.status.damage', { damage: character.access.damage || t('ui.common.none') }) }}</p>
      </div>
    </section>
  </aside>
</template>

<script setup lang="ts">
import type { CharacterRecord } from '~/types/dossier'
import { karmaPath, karmaStage, nextThreshold, signalMax, stageFor } from '~/utils/dossier'

const props = defineProps<{
  character: CharacterRecord
}>()

const { REF, step, changeResonance, setSignalByPip, setKarma, toggleWound } = useCampaignDossier()
const { t, tm } = useDossierI18n()

const maxSignal = computed(() => signalMax(props.character))
const currentSignal = computed(() => Math.min(props.character.signal.current, maxSignal.value))
const stage = computed(() => stageFor(REF.resonanceStages, props.character.resonance.pct))
const threshold = computed(() => nextThreshold(REF.resonanceStages, props.character.resonance.pct))
const karmaValues = Array.from({ length: 11 }, (_, index) => index - 5)
const karmaLabel = computed(() => karmaStage(REF.karmaDepth, REF.karmaStageNames, props.character.karma.value))
const karmaPathLabels = tm<{ eden: string, echologist: string, neutral: string }>('dossier.karmaPath')

function karmaCellClass(value: number) {
  return {
    neg: value < 0,
    pos: value > 0,
    zero: value === 0,
    cur: value === props.character.karma.value,
    barred: value < props.character.karma.edenLimit || value > props.character.karma.echoLimit,
  }
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

const WoundBoxes = defineComponent({
  props: {
    kind: {
      type: String as PropType<'minor' | 'serious' | 'critical'>,
      required: true,
    },
    values: {
      type: Array as PropType<boolean[]>,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  setup(componentProps) {
    return () => h('span', { class: 'eid-wound-boxes' }, componentProps.values.map((value, index) =>
      h('button', {
        class: ['eid-wound-box', { on: value }],
        type: 'button',
        'aria-label': t('ui.status.toggleWound', { kind: componentProps.label, index: index + 1 }),
        onClick: () => toggleWound(componentProps.kind, index),
      }),
    ))
  },
})
</script>
