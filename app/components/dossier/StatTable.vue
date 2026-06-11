<template>
  <table class="eid-stat">
    <tbody>
      <tr v-for="definition in definitions" :key="definition.key">
        <td class="name">{{ definition.name }}</td>
        <td class="desc">{{ definition.desc }}</td>
        <td class="ctl">
          <DossierStepperControl
            :value="valueFor(definition.key)"
            :label="definition.name"
            :signed="type === 'attributes'"
            @step="step(`${type}.${definition.key}`, $event, type === 'attributes' ? -1 : 0, 5)"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
const props = defineProps<{
  type: 'attributes' | 'domains'
}>()

const { REF, activeChar, step } = useCampaignDossier()

const definitions = computed(() => props.type === 'attributes' ? REF.attributes : REF.domains)

function valueFor(key: string) {
  return activeChar.value?.[props.type][key] || 0
}
</script>
