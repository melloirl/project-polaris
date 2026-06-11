<template>
  <aside class="eid-status-sidebar">
    <section class="eid-status-panel">
      <h3>Signal <span>Max = Vontade + 2</span></h3>
      <div class="eid-status-panel__pad">
        <div class="eid-bigread">{{ currentSignal }} / {{ maxSignal }} <small>clean frequency</small></div>
        <div class="eid-pips">
          <button
            v-for="(_, index) in maxSignal"
            :key="index"
            class="eid-pip"
            :class="{ on: index < currentSignal }"
            type="button"
            :aria-label="`Set Signal to ${index < currentSignal ? index : index + 1}`"
            @click="setSignalByPip(index)"
          />
        </div>
        <p class="eid-note">
          Click pips to spend or recover. Temp max modifier:
          <DossierStepperControl
            :value="character.signal.maxMod || 0"
            label="Signal max modifier"
            @step="step('signal.maxMod', $event, -5, 5)"
          />
        </p>
      </div>
    </section>

    <section class="eid-status-panel">
      <h3>Resonance <span>contamination</span></h3>
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
        <p class="eid-note">Next threshold: {{ threshold }}</p>
        <div class="eid-add-row eid-no-print">
          <button v-for="delta in [-5, -1, 1, 5]" :key="delta" class="eid-button" type="button" @click="changeResonance(delta)">
            {{ delta > 0 ? '+' : '' }}{{ delta }}
          </button>
        </div>
      </div>
    </section>

    <section class="eid-status-panel">
      <h3>Karma <span>-5 Eden / +5 Echologist</span></h3>
      <div class="eid-status-panel__pad">
        <div class="eid-bigread">{{ character.karma.value > 0 ? '+' : '' }}{{ character.karma.value }} <small>{{ karmaPath(character.karma.value) }}</small></div>
        <p class="eid-note eid-note--tight">Stage: {{ karmaLabel }}</p>
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
        <div class="eid-klabels"><span>Occult Eden / Accumulate</span><span>Echologist / Purge</span></div>
        <p class="eid-note">
          Limits - Eden:
          <DossierStepperControl :value="character.karma.edenLimit" label="Eden limit" @step="step('karma.edenLimit', $event, -5, 0)" />
          Echologist:
          <DossierStepperControl :value="character.karma.echoLimit" label="Echologist limit" @step="step('karma.echoLimit', $event, 0, 5)" />
        </p>
      </div>
    </section>

    <section class="eid-status-panel">
      <h3>Harm <span>wound slots</span></h3>
      <div class="eid-status-panel__pad eid-wounds">
        <div class="eid-wound-row"><span>Minor</span><WoundBoxes kind="minor" :values="character.harm.minor" /></div>
        <div class="eid-wound-row"><span>Serious</span><WoundBoxes kind="serious" :values="character.harm.serious" /><em>-2 when relevant</em></div>
        <div class="eid-wound-row"><span>Critical</span><WoundBoxes kind="critical" :values="character.harm.critical" /></div>
        <p class="eid-note">Overflow: full Minor -> Serious; full Serious -> Critical. No death save - consequence follows from fiction.</p>
      </div>
    </section>

    <section class="eid-status-panel">
      <h3>Access <span>institutional leash</span></h3>
      <div class="eid-status-panel__pad">
        <div class="eid-bigread eid-bigread--small">{{ character.access.state }}</div>
        <p class="eid-note">{{ character.access.scope || 'Scope unrecorded.' }}</p>
        <p class="eid-note">Damage: {{ character.access.damage || 'None' }}</p>
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

const maxSignal = computed(() => signalMax(props.character))
const currentSignal = computed(() => Math.min(props.character.signal.current, maxSignal.value))
const stage = computed(() => stageFor(REF.resonanceStages, props.character.resonance.pct))
const threshold = computed(() => nextThreshold(REF.resonanceStages, props.character.resonance.pct))
const karmaValues = Array.from({ length: 11 }, (_, index) => index - 5)
const karmaLabel = computed(() => karmaStage(REF.karmaDepth, REF.karmaStageNames, props.character.karma.value))

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

  const act = prompt('Karma moves only through a Karma-Moving Act.\nRecord the act (telegraphed, deliberate, irreversible):', props.character.karma.lastAct || '')
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
  },
  setup(componentProps) {
    return () => h('span', { class: 'eid-wound-boxes' }, componentProps.values.map((value, index) =>
      h('button', {
        class: ['eid-wound-box', { on: value }],
        type: 'button',
        'aria-label': `Toggle ${componentProps.kind} wound ${index + 1}`,
        onClick: () => toggleWound(componentProps.kind, index),
      }),
    ))
  },
})
</script>
