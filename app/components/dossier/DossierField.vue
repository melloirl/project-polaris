<script setup lang="ts">
defineProps<{
  label: string
  value: string | number | null | undefined
  wide?: boolean
  editable?: boolean
}>()

defineEmits<{
  commit: [value: string]
}>()
</script>

<template>
  <UiField
    :label="label"
    :model-value="value"
    :wide="wide"
    :editable="editable"
    @commit="$emit('commit', $event)"
  />
</template>
