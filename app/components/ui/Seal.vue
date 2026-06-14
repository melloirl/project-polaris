<script setup lang="ts">
import type { UiSealTone } from '~/types/ui'

const props = withDefaults(defineProps<{
  letter?: string
  name?: string
  sub?: string
  size?: number
  tone?: UiSealTone
  showWordmark?: boolean
}>(), {
  letter: 'E',
  name: 'Eidolon',
  sub: 'Advanced Research Directorate',
  size: 44,
  tone: 'ink',
  showWordmark: true,
})

const sealStyle = computed(() => ({
  '--seal-size': `${props.size}px`,
  '--seal-font-size': `${Math.max(12, Math.round(props.size * 0.5))}px`,
  '--seal-name-size': `${Math.max(14, Math.round(props.size * 0.32))}px`,
  '--seal-sub-size': `${Math.max(11, Math.round(props.size * 0.2))}px`,
}))
</script>

<template>
  <span
    class="ui-seal"
    :style="sealStyle"
    :aria-label="showWordmark ? undefined : name"
  >
    <span :class="['ui-seal__sigil', `ui-seal__sigil--${tone}`]" aria-hidden="true">
      {{ letter }}
    </span>
    <span v-if="showWordmark" class="ui-seal__wordmark">
      <span class="ui-seal__name">{{ name }}</span>
      <span class="ui-seal__sub">{{ sub }}</span>
    </span>
  </span>
</template>

<style scoped lang="scss">
.ui-seal {
  display: inline-flex;
  max-width: 100%;
  min-width: 0;
  align-items: center;
  gap: var(--space-4);
}

.ui-seal__sigil {
  display: flex;
  width: var(--seal-size);
  height: var(--seal-size);
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--eid-ink);
  border-radius: var(--radius-circle);
  color: var(--text-primary);
  font-family: var(--font-ui);
  font-size: var(--seal-font-size);
  font-weight: 700;
  line-height: 1;
}

.ui-seal__sigil--stamp {
  border-color: var(--eid-stamp);
  color: var(--eid-stamp);
}

.ui-seal__wordmark {
  flex: 1 1 auto;
  min-width: 0;
}

.ui-seal__name,
.ui-seal__sub {
  display: block;
  overflow: hidden;
  font-family: var(--font-ui);
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
}

.ui-seal__name {
  font-size: var(--seal-name-size);
  font-weight: 700;
  letter-spacing: var(--track-wide);
  line-height: var(--leading-tight);
}

.ui-seal__sub {
  margin-top: 3px;
  font-size: var(--seal-sub-size);
  letter-spacing: var(--track-meta);
  line-height: var(--leading-tight);
  opacity: 0.8;
  overflow: visible;
  text-overflow: clip;
  white-space: normal;
}
</style>
