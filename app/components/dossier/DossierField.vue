<template>
  <div class="eid-field" :class="{ 'eid-field--wide': wide }">
    <label>{{ label }}</label>
    <DossierEditableValue
      :model-value="value"
      :label="label"
      @commit="$emit('commit', $event)"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value: string | number | null | undefined
  wide?: boolean
}>()

defineEmits<{
  commit: [value: string]
}>()
</script>
