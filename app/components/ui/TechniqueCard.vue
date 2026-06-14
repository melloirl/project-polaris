<script setup lang="ts">
import type { UiCardTone, UiInstrumentGlyphName } from '~/types/ui'

const props = withDefaults(defineProps<{
  name: string
  faction?: string
  tone?: UiCardTone
  glyph?: UiInstrumentGlyphName
  tags?: string
  cost?: string
  effect?: string
  requirement?: string
  risk?: string
}>(), {
  faction: 'General',
  tone: 'ink',
  glyph: 'technique',
  tags: '',
  cost: '',
  effect: '',
  requirement: '',
  risk: '',
})

defineEmits<{
  remove: []
}>()

const toneColor = computed(() => {
  if (props.tone === 'eden') return 'var(--eid-eden)'
  if (props.tone === 'echo') return 'var(--eid-echo)'
  if (props.tone === 'pact') return 'var(--eid-stamp)'
  return 'var(--eid-ink)'
})

const parsedCost = computed(() => {
  const [kind, amount] = props.cost.split(':')
  return {
    kind: kind === 'resonance' ? 'resonance' : 'signal',
    amount: Math.max(0, Number(amount) || 0),
  }
})
</script>

<template>
  <article class="ui-technique" :style="{ '--tech-color': toneColor }">
    <div class="ui-technique__rail" aria-hidden="true">
      <span class="ui-technique__rail-label">{{ faction }}</span>
    </div>
    <div class="ui-technique__main">
      <header class="ui-technique__head">
        <span class="ui-technique__name">
          <UiInstrumentGlyph :name="glyph" :size="17" />
          {{ name }}
        </span>
        <span v-if="tags" class="ui-technique__tags">{{ tags }}</span>
      </header>
      <div class="ui-technique__body">
        <div v-if="cost" :class="['ui-technique__cost', `ui-technique__cost--${parsedCost.kind}`]">
          <span>Cost</span>
          <span v-if="parsedCost.kind === 'signal'" class="ui-technique__pips">
            <i v-for="index in parsedCost.amount" :key="index" />
          </span>
          <strong v-else>+{{ parsedCost.amount }}%</strong>
        </div>
        <p v-if="effect">{{ effect }}</p>
        <p v-if="requirement" class="ui-technique__req">{{ requirement }}</p>
        <p v-if="risk" class="ui-technique__risk">{{ risk }}</p>
      </div>
      <footer v-if="$slots.footer" class="ui-technique__foot">
        <slot name="footer" />
      </footer>
    </div>
  </article>
</template>

<style scoped lang="scss">
.ui-technique {
  display: flex;
  border: 1px solid color-mix(in srgb, var(--tech-color) 50%, var(--eid-ink));
  border-left: 0;
  background: var(--surface-panel);
}

.ui-technique__rail {
  display: grid;
  width: 28px;
  flex: 0 0 28px;
  place-items: center;
  background: var(--tech-color);
  color: var(--eid-paper);
}

.ui-technique__rail-label {
  font-family: var(--font-ui);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: var(--track-meta);
  text-transform: uppercase;
  transform: rotate(180deg);
  writing-mode: vertical-rl;
}

.ui-technique__main {
  min-width: 0;
  flex: 1;
}

.ui-technique__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-3);
  border-bottom: var(--border-dotted);
}

.ui-technique__name {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-weight: 700;
}

.ui-technique__tags {
  font-size: 9px;
  letter-spacing: var(--track-meta);
  opacity: 0.7;
  text-transform: uppercase;
}

.ui-technique__body {
  display: grid;
  gap: var(--space-2);
  padding: var(--space-3);
  font-size: var(--type-2);
}

.ui-technique__cost {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: var(--space-2);
  border: 1px solid var(--rule-soft);
  background: var(--surface-inset);
  padding: 2px var(--space-2);
  font-size: 9px;
  letter-spacing: var(--track-meta);
  text-transform: uppercase;
}

.ui-technique__pips {
  display: inline-flex;
  gap: 3px;

  i {
    width: 9px;
    height: 9px;
    background: var(--eid-echo);
  }
}

.ui-technique__cost--resonance strong,
.ui-technique__risk {
  color: var(--text-eden);
}

.ui-technique__risk {
  font-style: italic;
}

.ui-technique__req {
  opacity: 0.75;
}

.ui-technique__foot {
  border-top: var(--border-dotted);
  padding: 4px 9px;
  text-align: right;
}
</style>
