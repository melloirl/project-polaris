<script setup lang="ts">
const props = withDefaults(defineProps<{
  pct: number
  stages?: string[]
}>(), {
  stages: () => ['Clear', 'Stained', 'Atravessado', 'Breached', 'Consumed'],
})

const boundedPct = computed(() => clampRange(Math.round(Number(props.pct) || 0), 0, 100))
const currentStage = computed(() => Math.min(4, Math.floor(boundedPct.value / 20)))
const maskStyle = computed(() => ({
  left: `${boundedPct.value}%`,
}))
const edgeStyle = computed(() => ({
  left: `${boundedPct.value}%`,
}))
</script>

<template>
  <div class="ui-gauge">
    <div class="ui-gauge__track">
      <div class="ui-gauge__bands">
        <span v-for="index in 5" :key="index" :class="['ui-gauge__band', `ui-gauge__band--${index}`]" />
      </div>
      <div class="ui-gauge__mask" :style="maskStyle" />
      <div class="ui-gauge__edge" :style="edgeStyle" />
    </div>
    <div class="ui-gauge__stages">
      <span
        v-for="(stage, index) in stages.slice(0, 5)"
        :key="stage"
        :class="{ 'is-current': index === currentStage }"
      >
        {{ stage }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ui-gauge {
  margin-top: var(--space-3);
}

.ui-gauge__track {
  position: relative;
  height: 26px;
  overflow: hidden;
  border: var(--border-hard);
  background: var(--surface-inset);
}

.ui-gauge__bands {
  position: absolute;
  inset: 0;
  display: flex;
}

.ui-gauge__band {
  flex: 1;
  border-right: 1px solid color-mix(in srgb, var(--eid-ink) 30%, transparent);
  background: color-mix(in srgb, var(--eid-eden) 22%, var(--surface-inset));

  &:last-child {
    border-right: 0;
  }
}

.ui-gauge__band--2 {
  background: color-mix(in srgb, var(--eid-eden) 34%, var(--surface-inset));
}

.ui-gauge__band--3 {
  background: color-mix(in srgb, var(--eid-eden) 48%, var(--surface-inset));
}

.ui-gauge__band--4 {
  background: color-mix(in srgb, var(--eid-eden) 62%, var(--surface-inset));
}

.ui-gauge__band--5 {
  background: color-mix(in srgb, var(--eid-eden) 78%, var(--eid-ink));
}

.ui-gauge__mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background: var(--surface-inset);
}

.ui-gauge__edge {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--eid-ink);
}

.ui-gauge__stages {
  display: flex;
  margin-top: 3px;
  color: var(--text-eden);
  font-size: 8.5px;
  letter-spacing: 0.06em;
  text-transform: uppercase;

  span {
    width: 20%;
    overflow: hidden;
    text-align: center;
    white-space: nowrap;
  }

  .is-current {
    color: var(--text-primary);
    font-weight: 700;
    text-decoration: underline;
  }
}
</style>
