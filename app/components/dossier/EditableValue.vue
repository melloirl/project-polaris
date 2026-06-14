<template>
  <div
    ref="editable"
    class="dossier-editable"
    :class="{ 'is-empty': !modelValue }"
    contenteditable="true"
    role="textbox"
    :aria-label="label"
    tabindex="0"
    @blur="commit"
    @keydown.ctrl.enter.prevent="blur"
    @keydown.meta.enter.prevent="blur"
  >{{ modelValue ?? '' }}</div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string | number | null | undefined
  label: string
}>()

const emit = defineEmits<{
  commit: [value: string]
}>()

const editable = ref<HTMLElement | null>(null)

function writeValue() {
  if (editable.value && document.activeElement !== editable.value) {
    editable.value.textContent = String(props.modelValue ?? '')
  }
}

function commit(event: FocusEvent) {
  emit('commit', (event.target as HTMLElement).innerText.trim())
}

function blur() {
  editable.value?.blur()
}

watch(() => props.modelValue, writeValue)

onMounted(writeValue)
</script>

<style scoped lang="scss">
.dossier-editable {
  min-height: 21px;
  padding: 1px 2px;
  border-bottom: var(--border-field);
  font-family: var(--font-record);
  outline: none;
  white-space: pre-wrap;

  &:focus {
    border-bottom-style: solid;
    background: var(--surface-inset);
  }
}

.dossier-editable.is-empty::before {
  content: "-";
  opacity: 0.3;
}
</style>
