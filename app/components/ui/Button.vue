<script setup lang="ts">
export type ButtonVariant = 'primary' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

withDefaults(defineProps<{
  variant?: ButtonVariant;
  size?: ButtonSize;
  fill?: boolean;
  disabled?: boolean;
  stretch?: boolean;
}>(), {
  variant: 'primary',
  size: 'md',
  fill: false,
  disabled: false,
  stretch: false
});

</script>

<template>
  <button
    :class="[
      'button',
      `button--${variant}`,
      `button--${size}`,
      fill ? 'button--fill' : '',
      stretch ? 'button--stretch' : ''
    ]"
    :disabled
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
.button {
  --button-font-size: var(--type-1);
  --button-padding-block: var(--space-1);
  --button-padding-inline: var(--space-4);
  --button-min-height: 28px;

  display: inline-flex;
  min-height: var(--button-min-height);
  align-items: center;
  justify-content: center;
  font-family: var(--font-record);
  font-size: var(--button-font-size);
  line-height: var(--leading-tight);
  text-transform: uppercase;
  letter-spacing: var(--track-meta);
  border: var(--border-hard);
  border-color: var(--button-border, var(--button-fg, currentColor));
  background-color: var(--button-bg, transparent);
  color: var(--button-fg, currentColor);
  padding: var(--button-padding-block) var(--button-padding-inline);
  cursor: pointer;
  transition:
    background var(--motion-fast),
    border-color var(--motion-fast),
    color var(--motion-fast),
    outline-color var(--motion-fast);

  &:hover:not(:disabled) {
    border-color: var(--button-hover-border, var(--button-hover-fg, var(--button-border, var(--button-fg, currentColor))));
    background-color: var(--button-hover-bg, var(--button-bg, transparent));
    color: var(--button-hover-fg, var(--button-fg, currentColor));
  }
}

.button:focus {
  outline: none;
}

.button:focus-visible:not(:disabled) {
  outline: 1px solid var(--button-focus, var(--rule-hard));
  outline-offset: 3px;
}

.button:disabled {
  opacity: .5;
  cursor: not-allowed;
}

.button--sm {
  --button-font-size: var(--type-1);
  --button-padding-block: var(--space-1);
  --button-padding-inline: var(--space-3);
  --button-min-height: 26px;
}

.button--md {
  --button-font-size: var(--type-1);
  --button-padding-block: var(--space-2);
  --button-padding-inline: var(--space-4);
  --button-min-height: 32px;
}

.button--lg {
  --button-font-size: var(--type-2);
  --button-padding-block: var(--space-3);
  --button-padding-inline: var(--space-6);
  --button-min-height: 38px;
}

.button--stretch {
  width: 100%;
}

.button--primary {
  --button-bg: var(--surface-page);
  --button-fg: var(--text-primary);
  --button-focus: var(--rule-hard);
  --button-hover-bg: var(--surface-inverse);
  --button-hover-fg: var(--text-inverse);
}

.button--danger {
  --button-bg: var(--surface-page);
  --button-fg: var(--text-danger);
  --button-border: var(--rule-danger);
  --button-focus: var(--rule-danger);
  --button-hover-bg: var(--status-authority);
  --button-hover-fg: var(--text-inverse);
}

.button--primary.button--fill {
  --button-bg: var(--surface-inverse);
  --button-fg: var(--text-inverse);
  --button-hover-bg: var(--status-authority);
  --button-hover-fg: var(--text-inverse);
}

.button--danger.button--fill {
  --button-bg: var(--status-authority);
  --button-fg: var(--text-inverse);
  --button-border: var(--rule-danger);
  --button-hover-bg: var(--surface-inverse);
  --button-hover-fg: var(--text-inverse);
  --button-hover-border: var(--rule-hard);
}
</style>
