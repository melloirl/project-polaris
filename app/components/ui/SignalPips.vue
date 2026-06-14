<script setup lang="ts">
const props = withDefaults(defineProps<{
  max?: number
  current?: number
  label?: string
  readonly?: boolean
}>(), {
  max: 4,
  current: 0,
  label: 'Signal',
  readonly: false,
})

const emit = defineEmits<{
  change: [current: number]
}>()

const boundedMax = computed(() => Math.max(0, Math.floor(Number(props.max) || 0)))
const boundedCurrent = computed(() => clampRange(Math.floor(Number(props.current) || 0), 0, boundedMax.value))

function select(index: number) {
  if (!props.readonly) {
    emit('change', index < boundedCurrent.value ? index : index + 1)
  }
}
</script>

<template>
  <span class="ui-pips">
    <button
      v-for="index in boundedMax"
      :key="index"
      type="button"
      :class="['ui-pips__pip', { 'is-on': index <= boundedCurrent }]"
      :aria-label="`${label} ${index}`"
      :disabled="readonly"
      @click="select(index - 1)"
    />
  </span>
</template>

<style scoped lang="scss">
.ui-pips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-2);
}

.ui-pips__pip {
  width: 20px;
  height: 20px;
  border: var(--border-hard);
  background: var(--surface-inset);
  cursor: pointer;

  &.is-on {
    background: var(--eid-echo);
  }

  &:disabled {
    cursor: default;
  }
}
</style>
