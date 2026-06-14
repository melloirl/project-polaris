<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: number
  min?: number
  max?: number
  signed?: boolean
  label?: string
}>(), {
  min: Number.NEGATIVE_INFINITY,
  max: Number.POSITIVE_INFINITY,
  signed: false,
  label: '',
})

const emit = defineEmits<{
  change: [value: number]
}>()

const control = useRangedControl(() => ({
  modelValue: props.modelValue,
  min: props.min,
  max: props.max,
  signed: props.signed,
}))

function change(delta: number) {
  emit('change', control.stepBy(delta))
}
</script>

<template>
  <span class="ui-stepper">
    <button
      class="ui-stepper__button"
      type="button"
      :aria-label="label ? `Decrease ${label}` : 'Decrease'"
      :disabled="control.isAtMin.value"
      @click="change(-1)"
    >
      -
    </button>
    <span class="ui-stepper__num" aria-live="polite">
      {{ control.formattedValue.value }}
    </span>
    <button
      class="ui-stepper__button"
      type="button"
      :aria-label="label ? `Increase ${label}` : 'Increase'"
      :disabled="control.isAtMax.value"
      @click="change(1)"
    >
      +
    </button>
  </span>
</template>

<style scoped lang="scss">
.ui-stepper {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.ui-stepper__button {
  min-width: 23px;
  border: var(--border-hard);
  background: var(--surface-page);
  color: var(--text-primary);
  cursor: pointer;
  font-family: var(--font-record);
  font-size: var(--type-3);
  line-height: 20px;
  padding: 0 var(--space-2);

  &:hover:not(:disabled),
  &:focus-visible:not(:disabled) {
    background: var(--surface-inverse);
    color: var(--text-inverse);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.35;
  }
}

.ui-stepper__num {
  min-width: 34px;
  border: var(--border-hard);
  background: var(--surface-inset);
  font-size: var(--type-5);
  font-weight: 700;
  line-height: 24px;
  padding: 0 var(--space-1);
  text-align: center;
}
</style>
