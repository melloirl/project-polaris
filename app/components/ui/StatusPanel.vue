<script setup lang="ts">
import type { UiAccentTone, UiInstrumentGlyphName } from '~/types/ui'

withDefaults(defineProps<{
  title: string
  mini?: string
  accent?: UiAccentTone
  glyph?: UiInstrumentGlyphName
}>(), {
  mini: '',
  accent: 'ink',
  glyph: undefined,
})
</script>

<template>
  <section :class="['ui-status-panel', `ui-status-panel--${accent}`]">
    <header class="ui-status-panel__head">
      <span class="ui-status-panel__title">
        <UiInstrumentGlyph v-if="glyph" :name="glyph" :size="18" />
        {{ title }}
      </span>
      <span v-if="mini" class="ui-status-panel__mini">{{ mini }}</span>
    </header>
    <div class="ui-status-panel__body">
      <slot />
    </div>
  </section>
</template>

<style scoped lang="scss">
.ui-status-panel {
  margin-bottom: 18px;
  border: var(--border-status);
  background: var(--surface-panel);
}

.ui-status-panel__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  border-bottom: 2px solid var(--rule-hard);
  background: var(--surface-inset);
}

.ui-status-panel__title {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-ui);
  font-size: var(--type-1);
  font-weight: 700;
  letter-spacing: 0.26em;
  text-transform: uppercase;
}

.ui-status-panel__mini {
  font-size: 9px;
  letter-spacing: 0.12em;
  opacity: 0.7;
  text-align: right;
  text-transform: uppercase;
}

.ui-status-panel__body {
  padding: 10px var(--space-4);
}

.ui-status-panel--eden {
  border-color: var(--rule-eden);

  .ui-status-panel__head {
    border-bottom-color: var(--rule-eden);
    background: var(--tint-eden);
    color: var(--text-eden);
  }
}

.ui-status-panel--echo {
  border-color: var(--rule-echo);

  .ui-status-panel__head {
    border-bottom-color: var(--rule-echo);
    background: var(--tint-echo);
    color: var(--text-echo);
  }
}

.ui-status-panel--stamp {
  border-color: var(--rule-danger);

  .ui-status-panel__head {
    border-bottom-color: var(--rule-danger);
    background: var(--tint-stamp);
    color: var(--text-danger);
  }
}
</style>
