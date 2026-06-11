<template>
  <div class="eid-layout eid-layout--dossier">
    <div>
      <ReferenceTable caption="Core Roll" :rows="[['d20 + Attribute + Domain >= Difficulty', 'Success / Partial (cost, delay, exposure) / Failure']]" />
      <ReferenceTable caption="Difficulty Scale" :head="['DC', 'Tier']" :rows="REF.difficulty" />
      <ReferenceTable caption="Resonance Stages" :head="['Range', 'Stage']" :rows="resonanceRows" />
      <ReferenceTable caption="Karma Track" :head="['Value', 'Depth']" :rows="karmaRows" />
      <ReferenceTable caption="Character Creation" :head="['Step', 'Action']" :rows="creationRows" />
    </div>
    <div>
      <ReferenceTable caption="Harm" :head="['Slot', 'Effect']" :rows="harmRows" />
      <ReferenceTable caption="Advancement Lanes" :rows="advancementRows" />
      <ReferenceTable caption="Pact Resonance Cost" :rows="pactRows" />
      <ReferenceTable caption="Design Spine" :rows="spineRows" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { REF } = useCampaignDossier()

const resonanceRows = computed(() => REF.resonanceStages.map(stage => [stage.min === 100 ? '100%' : `${stage.min}-${stage.max}%`, stage.name]))
const karmaRows = computed(() => Object.entries(REF.karmaDepth).sort((a, b) => Number(a[0]) - Number(b[0])).map(([value, label]) => [Number(value) > 0 ? `+${value}` : value, label]))

const creationRows = [
  ['1', 'Choose Role / Occupation (domain package, gear, access)'],
  ['2', 'Assign Attributes: +3, +2, +1, +0'],
  ['3', 'Apply Domain package; may move 1 point; none above 2'],
  ['4', 'Set Signal Max = Vontade + 2'],
  ['5', 'Define Anchor'],
  ['6', 'Resonance: 0% default / 10% minor exposure / 20% subject'],
  ['7', 'Karma: 0'],
  ['8', 'Gain Ground Yourself + 1 General Technique'],
  ['9', 'Record gear and Eidolon Access'],
  ['10', 'Fill Harm, Mental State, Identity, Relationships'],
  ['11', 'Prepare Advancement Log'],
]

const harmRows = [
  ['Minor [ ][ ]', 'Hurt but functioning; usually no penalty'],
  ['Serious [ ][ ]', '-2 when the wound directly interferes'],
  ['Critical [ ]', 'Cannot act normally without help, Signal, or cost'],
  ['Overflow', 'Minor full -> Serious; Serious full -> Critical'],
  ['Armor', 'Mark 1 relevant Protection Slot: reduce severity by one'],
]

const advancementRows = [
  ['Mundane Growth', 'what I have learned'],
  ['Technique Acquisition', 'what I can do'],
  ['Karma Movement', 'what I have become'],
]

const pactRows = [
  ['Limited pact', '+10% Resonance'],
  ['Deep pact', '+15%'],
  ['Possessive / life-altering', '+20%'],
]

const spineRows = [
  ['Attributes', 'natural approach'],
  ['Domains', 'trained competence'],
  ['Signal', 'clean human frequency'],
  ['Resonance', 'contamination, fuel, classification risk'],
  ['Karma', 'the path the soul has walked'],
  ['Techniques', 'structured progression'],
  ['Gear', 'external infrastructure'],
  ['Pacts', 'rare, costly bonds'],
  ['Access', 'institutional permission and dependency'],
  ['The players', 'begin as tools; the sheet records how they become people'],
]

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
