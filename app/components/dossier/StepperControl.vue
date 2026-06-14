<script setup lang="ts">
const props = defineProps<{
  value: number
  label: string
  signed?: boolean
  min?: number
  max?: number
}>()

const emit = defineEmits<{
  step: [delta: number]
}>()

function change(nextValue: number) {
  emit('step', nextValue - props.value)
}
</script>

<template>
  <UiStepper
    :model-value="value"
    :label="label"
    :signed="signed"
    :min="min"
    :max="max"
    @change="change"
  />
</template>
