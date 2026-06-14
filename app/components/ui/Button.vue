<script setup lang="ts">
import type { UiButtonSize, UiButtonVariant } from '~/types/ui'

defineOptions({
  inheritAttrs: false,
})

withDefaults(defineProps<{
  variant?: UiButtonVariant
  size?: UiButtonSize
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  stretch?: boolean
}>(), {
  variant: 'default',
  size: 'md',
  type: 'button',
  disabled: false,
  stretch: false,
})
</script>

<template>
  <button
    v-bind="$attrs"
    :class="[
      'eid-btn',
      'ui-button',
      `eid-btn--${variant}`,
      `ui-button--${variant}`,
      `eid-btn--${size}`,
      `ui-button--${size}`,
      stretch ? 'eid-btn--stretch' : '',
      stretch ? 'ui-button--stretch' : ''
    ]"
    :type
    :disabled
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
.eid-btn,
.ui-button {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 28px;
  max-width: 100%;
  border: var(--border-hard);
  border-radius: var(--radius-none);
  background: var(--surface-page);
  color: var(--text-primary);
  cursor: pointer;
  font-family: var(--font-record);
  font-size: var(--type-1);
  letter-spacing: var(--track-meta);
  line-height: var(--leading-tight);
  padding: var(--space-1) var(--space-4);
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition:
    background var(--motion-fast),
    color var(--motion-fast);
  user-select: none;
  white-space: nowrap;

  &:hover:not(:disabled),
  &:focus-visible:not(:disabled) {
    background: var(--surface-inverse);
    color: var(--text-inverse);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
}

.eid-btn--sm,
.ui-button--sm {
  min-height: 24px;
  padding: 2px var(--space-3);
  font-size: var(--type-0);
}

.eid-btn--danger,
.ui-button--danger {
  border-color: var(--rule-danger);
  color: var(--text-danger);

  &:hover:not(:disabled),
  &:focus-visible:not(:disabled) {
    background: var(--status-authority);
    color: var(--text-inverse);
  }
}

.eid-btn--active-gm,
.ui-button--active-gm {
  border-color: var(--status-authority);
  background: var(--status-authority);
  color: var(--text-inverse);

  &:hover:not(:disabled),
  &:focus-visible:not(:disabled) {
    background: var(--surface-inverse);
  }
}

.eid-btn--stretch,
.ui-button--stretch {
  width: 100%;
  justify-self: stretch;
}
</style>
