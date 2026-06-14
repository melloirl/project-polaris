<script setup lang="ts">
import type { UiAccentTone, UiInstrumentGlyphName } from '~/types/ui'

const props = withDefaults(defineProps<{
  name: string
  type?: string
  glyph?: UiInstrumentGlyphName
  charge?: number
  capacity?: number
  store?: UiAccentTone
  serial?: string
  fn?: string
  tracking?: string
}>(), {
  type: 'Device',
  glyph: 'device',
  charge: 0,
  capacity: 20,
  store: 'echo',
  serial: '',
  fn: '',
  tracking: '',
})

const storeColor = computed(() => {
  if (props.store === 'eden') return 'var(--eid-eden)'
  if (props.store === 'stamp') return 'var(--eid-stamp)'
  if (props.store === 'ink') return 'var(--eid-ink)'
  return 'var(--eid-echo)'
})

const filledSegments = computed(() => clampRange(Math.round(Number(props.charge) || 0), 0, 20))
const capacitySegment = computed(() => clampRange(Math.round(Number(props.capacity) || 0), 0, 20))
</script>

<template>
  <article class="ui-gear" :style="{ '--gear-store': storeColor }">
    <aside class="ui-gear__plate">
      <slot name="media">
        <UiInstrumentGlyph :name="glyph" :size="28" />
      </slot>
      <span v-if="serial" class="ui-gear__serial">{{ serial }}</span>
    </aside>
    <div class="ui-gear__main">
      <header class="ui-gear__head">
        <strong>{{ name }}</strong>
        <span>{{ type }}</span>
      </header>
      <div class="ui-gear__cells">
        <div class="ui-gear__cells-body">
          <span
            v-for="index in 20"
            :key="index"
            :class="['ui-gear__seg', { 'is-on': index <= filledSegments }]"
          />
          <span class="ui-gear__cap" :style="{ left: `${capacitySegment * 5}%` }" />
        </div>
      </div>
      <p v-if="fn">{{ fn }}</p>
      <p v-if="tracking" class="ui-gear__tracking">{{ tracking }}</p>
      <slot name="footer" />
    </div>
  </article>
</template>

<style scoped lang="scss">
.ui-gear {
  display: flex;
  border: var(--border-hard);
  background: var(--surface-panel);
}

.ui-gear__plate {
  display: grid;
  width: 78px;
  flex: 0 0 78px;
  place-items: center;
  border-right: var(--border-hard);
  background: var(--surface-inset);
  padding: var(--space-3);
  text-align: center;
}

.ui-gear__serial {
  margin-top: var(--space-2);
  color: var(--text-danger);
  border: 1.5px solid var(--rule-danger);
  font-size: 8px;
  letter-spacing: var(--track-meta);
  padding: 1px 3px;
  text-transform: uppercase;
  transform: rotate(-1.5deg);
}

.ui-gear__main {
  display: grid;
  min-width: 0;
  flex: 1;
  gap: var(--space-2);
  padding: var(--space-3);
  font-size: var(--type-2);
}

.ui-gear__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-3);

  strong {
    font-size: var(--type-3);
  }

  span {
    font-size: 9px;
    letter-spacing: var(--track-meta);
    opacity: 0.7;
    text-transform: uppercase;
  }
}

.ui-gear__cells {
  position: relative;
}

.ui-gear__cells-body {
  position: relative;
  display: flex;
  height: 18px;
  border: 1px solid var(--eid-ink);
}

.ui-gear__seg {
  flex: 1;
  border-right: 1px solid color-mix(in srgb, var(--eid-ink) 20%, transparent);

  &:last-child {
    border-right: 0;
  }

  &.is-on {
    background: var(--gear-store);
  }
}

.ui-gear__cap {
  position: absolute;
  top: -2px;
  bottom: -2px;
  border-left: 2px dotted var(--eid-stamp);
}

.ui-gear__tracking {
  opacity: 0.72;
}
</style>
