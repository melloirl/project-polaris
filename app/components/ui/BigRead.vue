<script setup lang="ts">
import type { UiAccentTone } from '~/types/ui'

withDefaults(defineProps<{
  value: string | number
  label?: string
  small?: boolean
  tone?: UiAccentTone
}>(), {
  label: '',
  small: false,
  tone: 'ink',
})
</script>

<template>
  <div :class="['ui-bigread', `ui-bigread--${tone}`, { 'ui-bigread--small': small }]">
    {{ value }}
    <small v-if="label">{{ label }}</small>
  </div>
</template>

<style scoped lang="scss">
.ui-bigread {
  font-family: var(--font-record);
  font-size: var(--type-6);
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: var(--leading-tight);

  small {
    font-size: var(--type-1);
    font-weight: 400;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
}

.ui-bigread--small {
  font-size: 18px;
}

.ui-bigread--eden {
  color: var(--text-eden);
}

.ui-bigread--echo {
  color: var(--text-echo);
}

.ui-bigread--stamp {
  color: var(--text-danger);
}
</style>
