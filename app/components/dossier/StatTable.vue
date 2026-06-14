<template>
  <table class="eid-stat">
    <tbody>
      <tr v-for="definition in definitions" :key="definition.key">
        <td class="name">{{ definition.name }}</td>
        <td class="desc">{{ definition.desc }}</td>
        <td class="ctl">
          <UiStepper
            :model-value="valueFor(definition.key)"
            :label="definition.name"
            :signed="type === 'attributes'"
            :min="minimum"
            :max="5"
            @change="changeValue(definition.key, $event)"
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
const minimum = computed(() => props.type === 'attributes' ? -1 : 0)

function valueFor(key: string) {
  return activeChar.value?.[props.type][key] || 0
}

function changeValue(key: string, value: number) {
  step(`${props.type}.${key}`, value - valueFor(key), minimum.value, 5)
}
</script>
