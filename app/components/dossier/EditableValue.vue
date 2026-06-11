<template>
  <div
    ref="editable"
    class="eid-field__value"
    :class="{ 'eid-field__value--empty': !modelValue }"
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
