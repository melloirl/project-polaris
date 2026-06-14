<script setup lang="ts">
export type StampSize = 'sm' | 'md' | 'lg';

withDefaults(defineProps<{
  size?: StampSize;
  angle?: number;
}>(), {
  size: 'md',
  angle: 0
});

</script>

<template>
  <span
    :class="['stamp', `stamp--${size}`]"
    :style="`transform: rotate(${angle}deg)`"
  >
    <span class="stamp__content">
      <slot />
    </span>
  </span>
</template>

<style scoped lang="scss">
.stamp {
  --color-stamp: var(--stamp);
  --stamp-border-width: 3px;
  --stamp-font-size: var(--type-3);
  --stamp-padding-block: var(--space-1);
  --stamp-padding-inline: var(--space-5);

  display: inline-block;
  border: var(--stamp-border-width) solid var(--color-stamp);
  padding: var(--stamp-padding-block) var(--stamp-padding-inline);
  background: transparent;
  letter-spacing: var(--track-stamp);

  &__content {
    font-family: var(--font-stamp);
    font-weight: 700;
    color: var(--color-stamp);
    text-transform: uppercase;
    font-size: var(--stamp-font-size);
    line-height: var(--leading-tight);
  }
}

.stamp--sm {
  --stamp-border-width: 2px;
  --stamp-font-size: var(--type-2);
  --stamp-padding-block: var(--space-1);
  --stamp-padding-inline: var(--space-4);
}

.stamp--md {
  --stamp-border-width: 3px;
  --stamp-font-size: var(--type-3);
  --stamp-padding-block: var(--space-1);
  --stamp-padding-inline: var(--space-5);
}

.stamp--lg {
  --stamp-border-width: 3px;
  --stamp-font-size: var(--type-4);
  --stamp-padding-block: var(--space-2);
  --stamp-padding-inline: var(--space-6);
}
</style>
