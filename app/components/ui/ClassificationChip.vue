<script setup lang="ts">
import type { UiClassificationKind, UiClassificationTone } from '~/types/ui'

const props = withDefaults(defineProps<{
  kind?: UiClassificationKind
  tone?: UiClassificationTone
}>(), {
  kind: undefined,
  tone: undefined,
})

const mappedTone = computed<UiClassificationTone>(() => {
  if (props.tone) return props.tone
  if (props.kind === 'confirmed') return 'ink'
  if (props.kind === 'field-reported') return 'muted'
  if (props.kind === 'purged-copy') return 'echo'
  if (props.kind === 'unreconciled') return 'eden'
  return 'danger'
})
</script>

<template>
  <span :class="['ui-chip', `ui-chip--${mappedTone}`]">
    <slot />
  </span>
</template>

<style scoped lang="scss">
.ui-chip {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  border: var(--border-hard);
  background: var(--surface-inset);
  color: var(--text-primary);
  font-family: var(--font-ui);
  font-size: var(--type-0);
  font-weight: 700;
  letter-spacing: var(--track-wide);
  line-height: var(--leading-tight);
  padding: 4px 9px;
  text-transform: uppercase;
}

.ui-chip--danger {
  border-color: var(--rule-danger);
  color: var(--text-danger);
}

.ui-chip--eden {
  border-color: var(--rule-eden);
  color: var(--text-eden);
}

.ui-chip--echo {
  border-color: var(--rule-echo);
  color: var(--text-echo);
}

.ui-chip--muted {
  border-color: var(--rule-soft);
  opacity: 0.8;
}
</style>
