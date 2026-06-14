<script setup lang="ts">
import type { UiCardTone, UiInstrumentGlyphName, UiRecordRow } from '~/types/ui'

withDefaults(defineProps<{
  name: string
  tag?: string
  tone?: UiCardTone
  glyph?: UiInstrumentGlyphName
  rows?: UiRecordRow[]
  wide?: boolean
}>(), {
  tag: '',
  tone: 'ink',
  glyph: undefined,
  rows: () => [],
  wide: false,
})
</script>

<template>
  <article :class="['ui-record-card', `ui-record-card--${tone}`, { 'ui-record-card--wide': wide }]">
    <header class="ui-record-card__head">
      <div class="ui-record-card__title">
        <UiInstrumentGlyph v-if="glyph" :name="glyph" :size="17" />
        <slot name="name">
          <span>{{ name }}</span>
        </slot>
      </div>
      <slot name="tag">
        <span v-if="tag" class="ui-record-card__tag">{{ tag }}</span>
      </slot>
    </header>
    <div class="ui-record-card__body">
      <slot name="media" />
      <slot name="rows">
        <div v-for="row in rows" :key="row.key || row.label" class="ui-record-card__row">
          <span class="ui-record-card__key">{{ row.label }}</span>
          <span class="ui-record-card__val">{{ row.value || '-' }}</span>
        </div>
      </slot>
    </div>
    <footer v-if="$slots.footer" class="ui-record-card__foot">
      <slot name="footer" />
    </footer>
  </article>
</template>

<style scoped lang="scss">
.ui-record-card {
  border: var(--border-panel);
  background: var(--surface-panel);
}

.ui-record-card--wide {
  grid-column: 1 / -1;
}

.ui-record-card__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-3);
  padding: 5px 9px;
  border-bottom: 2px solid var(--rule-hard);
  background: var(--surface-inset);
}

.ui-record-card__title {
  display: inline-flex;
  min-width: 0;
  flex: 1;
  align-items: center;
  gap: var(--space-2);
  font-size: 13px;
  font-weight: 700;
}

.ui-record-card__tag {
  flex: 0 0 auto;
  font-size: 9px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.ui-record-card__body {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: var(--space-3) 10px;
}

.ui-record-card__row {
  display: flex;
  gap: var(--space-3);
  font-size: var(--type-2);
}

.ui-record-card__key {
  min-width: 86px;
  padding-top: 2px;
  font-size: 9px;
  letter-spacing: var(--track-meta);
  opacity: 0.7;
  text-transform: uppercase;
}

.ui-record-card__val {
  flex: 1;
  min-height: 18px;
  border-bottom: 1px dotted var(--rule-soft);
  font-family: var(--font-record);
}

.ui-record-card__foot {
  border-top: var(--border-dotted);
  padding: 4px 9px;
  text-align: right;
}

.ui-record-card--eden {
  border-color: color-mix(in srgb, var(--eid-eden) 50%, var(--eid-ink));

  .ui-record-card__head {
    border-bottom-color: var(--eid-eden);
    background: var(--tint-eden);
    color: var(--text-eden);
  }
}

.ui-record-card--echo {
  border-color: color-mix(in srgb, var(--eid-echo) 50%, var(--eid-ink));

  .ui-record-card__head {
    border-bottom-color: var(--eid-echo);
    background: var(--tint-echo);
    color: var(--text-echo);
  }
}

.ui-record-card--pact {
  border-color: color-mix(in srgb, var(--eid-stamp) 50%, var(--eid-ink));

  .ui-record-card__head {
    border-bottom-color: var(--eid-stamp);
    background: var(--tint-stamp);
    color: var(--text-danger);
  }
}
</style>
