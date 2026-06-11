<template>
  <span class="eid-step">
    <button class="eid-button eid-step__button" type="button" :aria-label="t('ui.controls.decrease', { label })" @click="$emit('step', -1)">-</button>
    <span class="eid-step__num">{{ formattedValue }}</span>
    <button class="eid-button eid-step__button" type="button" :aria-label="t('ui.controls.increase', { label })" @click="$emit('step', 1)">+</button>
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: number
  label: string
  signed?: boolean
}>()

defineEmits<{
  step: [delta: number]
}>()

const formattedValue = computed(() => props.signed && props.value >= 0 ? `+${props.value}` : String(props.value))
const { t } = useDossierI18n()
</script>
