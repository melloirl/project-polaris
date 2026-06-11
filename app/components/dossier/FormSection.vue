<template>
  <section class="eid-form-section" :class="{ 'is-collapsed': collapsed, 'eid-form-section--gm': gm }">
    <header class="eid-form-section__head" role="button" tabindex="0" @click="$emit('toggle')" @keydown.enter.prevent="$emit('toggle')" @keydown.space.prevent="$emit('toggle')">
      <h2>{{ title }}</h2>
      <span>{{ code }}</span>
    </header>
    <div class="eid-form-section__body">
      <slot />
      <p v-if="note" class="eid-note">{{ note }}</p>
    </div>
  </section>
</template>

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
