<script setup lang="ts">
const props = withDefaults(defineProps<{
  value?: number
  edenLimit?: number
  echoLimit?: number
  labels?: [string, string]
}>(), {
  value: 0,
  edenLimit: -5,
  echoLimit: 5,
  labels: () => ['Occult Eden', 'Echologist'],
})

const emit = defineEmits<{
  change: [value: number]
}>()

const values = Array.from({ length: 11 }, (_, index) => index - 5)
const boundedValue = computed(() => clampRange(Number(props.value) || 0, -5, 5))

function isBarred(value: number) {
  return value < props.edenLimit || value > props.echoLimit
}

function cellClass(value: number) {
  return {
    'is-neg': value < 0,
    'is-pos': value > 0,
    'is-zero': value === 0,
    'is-cur': value === boundedValue.value,
    'is-barred': isBarred(value),
  }
}

function select(value: number) {
  if (!isBarred(value)) {
    emit('change', value)
  }
}
</script>

<template>
  <div class="ui-karma">
    <div class="ui-karma__ruler">
      <button
        v-for="item in values"
        :key="item"
        type="button"
        :class="['ui-karma__cell', cellClass(item)]"
        :disabled="isBarred(item)"
        @click="select(item)"
      >
        {{ formatSignedValue(item, item > 0) }}
      </button>
    </div>
    <div class="ui-karma__labels">
      <span>{{ labels[0] }}</span>
      <span>{{ labels[1] }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ui-karma {
  margin-top: var(--space-3);
}

.ui-karma__ruler {
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  border: var(--border-hard);
}

.ui-karma__cell {
  border: 0;
  border-right: 1px solid var(--rule-soft);
  background: var(--surface-inset);
  color: var(--text-primary);
  cursor: pointer;
  font-size: var(--type-0);
  padding: 5px 0;
  text-align: center;
  user-select: none;

  &:last-child {
    border-right: 0;
  }
}

.ui-karma__cell.is-neg {
  color: var(--text-eden);
}

.ui-karma__cell.is-pos {
  color: var(--text-echo);
}

.ui-karma__cell.is-cur {
  color: var(--text-inverse);
  font-weight: 700;
}

.ui-karma__cell.is-cur.is-neg {
  background: var(--eid-eden);
}

.ui-karma__cell.is-cur.is-pos {
  background: var(--eid-echo);
}

.ui-karma__cell.is-cur.is-zero {
  background: var(--surface-inverse);
}

.ui-karma__cell.is-barred {
  cursor: not-allowed;
  opacity: 0.45;
  text-decoration: line-through;
}

.ui-karma__labels {
  display: flex;
  justify-content: space-between;
  margin-top: 3px;
  font-size: 9px;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  span:first-child {
    color: var(--text-eden);
  }

  span:last-child {
    color: var(--text-echo);
  }
}
</style>
