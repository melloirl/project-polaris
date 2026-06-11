<template>
  <div class="eid-layout eid-layout--dossier">
    <div>
      <ReferenceTable :caption="reference.coreRoll.caption" :rows="reference.coreRoll.rows" />
      <ReferenceTable :caption="reference.difficulty.caption" :head="reference.difficulty.head" :rows="REF.difficulty" />
      <ReferenceTable :caption="reference.resonanceStages.caption" :head="reference.resonanceStages.head" :rows="resonanceRows" />
      <ReferenceTable :caption="reference.karmaTrack.caption" :head="reference.karmaTrack.head" :rows="karmaRows" />
      <ReferenceTable :caption="reference.characterCreation.caption" :head="reference.characterCreation.head" :rows="reference.characterCreation.rows" />
    </div>
    <div>
      <ReferenceTable :caption="reference.harm.caption" :head="reference.harm.head" :rows="reference.harm.rows" />
      <ReferenceTable :caption="reference.advancement.caption" :rows="reference.advancement.rows" />
      <ReferenceTable :caption="reference.pactCost.caption" :rows="reference.pactCost.rows" />
      <ReferenceTable :caption="reference.designSpine.caption" :rows="reference.designSpine.rows" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { REF } = useCampaignDossier()
const { tm } = useDossierI18n()
const reference = tm<{
  coreRoll: { caption: string, rows: string[][] }
  difficulty: { caption: string, head: string[] }
  resonanceStages: { caption: string, head: string[] }
  karmaTrack: { caption: string, head: string[] }
  characterCreation: { caption: string, head: string[], rows: string[][] }
  harm: { caption: string, head: string[], rows: string[][] }
  advancement: { caption: string, rows: string[][] }
  pactCost: { caption: string, rows: string[][] }
  designSpine: { caption: string, rows: string[][] }
}>('ui.reference')

const resonanceRows = computed(() => REF.resonanceStages.map(stage => [stage.min === 100 ? '100%' : `${stage.min}-${stage.max}%`, stage.name]))
const karmaRows = computed(() => Object.entries(REF.karmaDepth).sort((a, b) => Number(a[0]) - Number(b[0])).map(([value, label]) => [Number(value) > 0 ? `+${value}` : value, label]))

const ReferenceTable = defineComponent({
  props: {
    caption: {
      type: String,
      required: true,
    },
    head: {
      type: Array as PropType<string[]>,
      default: undefined,
    },
    rows: {
      type: Array as PropType<Array<Array<string | number>>>,
      required: true,
    },
  },
  setup(props) {
    return () => h('table', { class: 'eid-ref' }, [
      h('caption', props.caption),
      props.head ? h('thead', h('tr', props.head.map(label => h('th', label)))) : null,
      h('tbody', props.rows.map(row => h('tr', row.map(cell => h('td', String(cell)))))),
    ])
  },
})
</script>
