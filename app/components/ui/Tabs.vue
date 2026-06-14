<script setup lang="ts">
import type { UiTabItem } from '~/types/ui'

const props = defineProps<{
  items: UiTabItem[]
  modelValue: string
  ariaLabel?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function isActive(item: UiTabItem) {
  return item.value === props.modelValue
}

function select(item: UiTabItem) {
  if (!item.disabled) {
    emit('update:modelValue', item.value)
  }
}
</script>

<template>
  <nav class="ui-tabs" :aria-label="ariaLabel">
    <template v-for="item in items" :key="item.value">
      <a
        v-if="item.href"
        :href="item.href"
        :class="['ui-tabs__tab', { 'is-active': isActive(item) }]"
        :aria-current="isActive(item) ? 'page' : undefined"
        :aria-disabled="item.disabled || undefined"
        @click.prevent="select(item)"
      >
        {{ item.label }}
      </a>
      <button
        v-else
        type="button"
        :class="['ui-tabs__tab', { 'is-active': isActive(item) }]"
        :aria-pressed="isActive(item)"
        :disabled="item.disabled"
        @click="select(item)"
      >
        {{ item.label }}
      </button>
    </template>
    <span class="ui-tabs__spacer" />
    <span v-if="$slots.tools" class="ui-tabs__tools">
      <slot name="tools" />
    </span>
  </nav>
</template>

<style scoped lang="scss">
.ui-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  border-bottom: var(--border-hard);
}

.ui-tabs__tab {
  margin-top: var(--space-3);
  margin-right: var(--space-2);
  padding: var(--space-3) var(--space-7) var(--space-2);
  border: 1px solid var(--rule-soft);
  border-bottom: 0;
  background: var(--surface-inset);
  color: var(--text-primary);
  cursor: pointer;
  font-family: var(--font-ui);
  font-size: var(--type-2);
  letter-spacing: var(--track-wide);
  text-decoration: none;
  text-transform: uppercase;

  &:disabled,
  &[aria-disabled="true"] {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

.ui-tabs__tab.is-active {
  position: relative;
  top: 1px;
  border-color: var(--eid-ink);
  background: var(--surface-page);
  box-shadow: inset 0 3px 0 var(--subject-accent);
  font-weight: 700;
}

.ui-tabs__spacer {
  flex: 1 1 auto;
}

.ui-tabs__tools {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) 0 var(--space-2);
}
</style>
