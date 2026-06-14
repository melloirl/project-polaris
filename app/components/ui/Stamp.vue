<script setup lang="ts">
import type { UiStampSize, UiStampTone } from '~/types/ui'

const props = withDefaults(defineProps<{
  tone?: UiStampTone
  size?: UiStampSize
  rotate?: number
}>(), {
  tone: 'danger',
  size: 'md',
  rotate: -3,
})

const stampStyle = computed(() => ({
  transform: `rotate(${props.rotate}deg)`,
}))
</script>

<template>
  <span
    :class="[
      'eid-stamp',
      'ui-stamp',
      `eid-stamp--${tone}`,
      `ui-stamp--${tone}`,
      `eid-stamp--${size}`,
      `ui-stamp--${size}`
    ]"
    :style="stampStyle"
  >
    <slot />
  </span>
</template>

<style scoped lang="scss">
.eid-stamp,
.ui-stamp {
  box-sizing: border-box;
  display: inline-block;
  justify-self: center;
  border: var(--border-stamp);
  background: transparent;
  color: var(--text-danger);
  font-family: var(--font-stamp);
  font-size: var(--type-3);
  font-weight: 700;
  letter-spacing: var(--track-stamp);
  line-height: var(--leading-tight);
  padding: var(--space-1) var(--space-5);
  text-transform: uppercase;
}

.eid-stamp--ink,
.ui-stamp--ink {
  border-color: var(--rule-hard);
  color: var(--text-primary);
}

.eid-stamp--eden,
.ui-stamp--eden {
  border-color: var(--rule-eden);
  color: var(--text-eden);
}

.eid-stamp--echo,
.ui-stamp--echo {
  border-color: var(--rule-echo);
  color: var(--text-echo);
}

.eid-stamp--sm,
.ui-stamp--sm {
  padding: 2px var(--space-3);
  font-size: var(--type-1);
}
</style>
