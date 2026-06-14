<script setup lang="ts">
import type { UiWoundRow } from '~/types/ui'

defineProps<{
  rows: UiWoundRow[]
}>()

defineEmits<{
  toggle: [key: string, index: number]
}>()
</script>

<template>
  <div class="ui-wounds">
    <div v-for="row in rows" :key="row.key" class="ui-wounds__row">
      <span class="ui-wounds__label">{{ row.label }}</span>
      <span class="ui-wounds__boxes">
        <button
          v-for="(value, index) in row.values"
          :key="index"
          type="button"
          :class="['ui-wounds__box', { 'is-on': value }]"
          :aria-label="`${row.label} ${index + 1}`"
          @click="$emit('toggle', row.key, index)"
        />
      </span>
      <em v-if="row.note">{{ row.note }}</em>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ui-wounds__row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: 5px;

  em {
    font-size: var(--type-1);
    font-style: normal;
    opacity: 0.7;
  }
}

.ui-wounds__label {
  width: 64px;
  font-family: var(--font-ui);
  font-size: var(--type-0);
  letter-spacing: var(--track-meta);
  text-transform: uppercase;
}

.ui-wounds__boxes {
  display: inline-flex;
  gap: var(--space-3);
}

.ui-wounds__box {
  width: 18px;
  height: 18px;
  border: var(--border-hard);
  background: var(--surface-page);
  cursor: pointer;

  &.is-on {
    background: var(--eid-stamp);
  }
}
</style>
