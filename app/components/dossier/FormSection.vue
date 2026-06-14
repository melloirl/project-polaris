<script setup lang="ts">
defineProps<{
  title: string
  code: string
  note?: string
  collapsed?: boolean
  gm?: boolean
}>()

defineEmits<{
  toggle: []
}>()
</script>

<template>
  <UiFormSection
    :title="title"
    :code="code"
    :note="note"
    :collapsed="collapsed"
    :gm="gm"
    collapsible
    @toggle="$emit('toggle')"
  >
    <slot />
  </UiFormSection>
</template>
