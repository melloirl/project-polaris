<script setup lang="ts">
const props = withDefaults(defineProps<{
  label: string
  modelValue: string | number | null | undefined
  wide?: boolean
  editable?: boolean
}>(), {
  wide: false,
  editable: true,
})

const emit = defineEmits<{
  commit: [value: string]
}>()

const editableRef = ref<HTMLElement | null>(null)

const isEmpty = computed(() => props.modelValue === null || props.modelValue === undefined || props.modelValue === '')

function writeValue() {
  if (editableRef.value && document.activeElement !== editableRef.value) {
    editableRef.value.textContent = String(props.modelValue ?? '')
  }
}

function commit(event: FocusEvent) {
  emit('commit', (event.target as HTMLElement).innerText.trim())
}

function blur() {
  editableRef.value?.blur()
}

watch(() => props.modelValue, writeValue)
onMounted(writeValue)
</script>

<template>
  <div :class="['ui-field', { 'ui-field--wide': wide }]">
    <label class="ui-field__label">{{ label }}</label>
    <div
      v-if="editable"
      ref="editableRef"
      :class="['ui-field__value', { 'is-empty': isEmpty }]"
      contenteditable="true"
      role="textbox"
      :aria-label="label"
      tabindex="0"
      @blur="commit"
      @keydown.ctrl.enter.prevent="blur"
      @keydown.meta.enter.prevent="blur"
    >{{ modelValue ?? '' }}</div>
    <div
      v-else
      :class="['ui-field__value', 'ui-field__value--readonly', { 'is-empty': isEmpty }]"
    >
      {{ modelValue ?? '' }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.ui-field {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 1px;
}

.ui-field--wide {
  grid-column: 1 / -1;
}

.ui-field__label {
  color: var(--text-primary);
  font-family: var(--font-ui);
  font-size: var(--type-0);
  letter-spacing: var(--track-meta);
  opacity: 0.75;
  text-transform: uppercase;
}

.ui-field__value {
  min-height: 21px;
  padding: 1px 2px;
  border-bottom: var(--border-field);
  font-family: var(--font-record);
  font-size: var(--type-3);
  outline: none;
  white-space: pre-wrap;

  &:focus {
    border-bottom-style: solid;
    background: var(--surface-inset);
  }
}

.ui-field__value--readonly {
  pointer-events: none;
}

.ui-field__value.is-empty::before {
  content: "-";
  opacity: 0.3;
}
</style>
