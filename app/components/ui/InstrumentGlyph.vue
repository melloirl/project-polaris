<script setup lang="ts">
import type { UiInstrumentGlyphName } from '~/types/ui'

withDefaults(defineProps<{
  name: UiInstrumentGlyphName
  size?: number
  strokeWidth?: number
}>(), {
  size: 18,
  strokeWidth: 1.5,
})
</script>

<template>
  <svg
    class="ui-glyph"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    aria-hidden="true"
    :stroke-width="strokeWidth"
  >
    <g v-if="name === 'signal'">
      <path d="M3 13h3l2-5 4 10 3-8 2 3h4" />
      <path d="M4 18h16" />
    </g>
    <g v-else-if="name === 'resonance'">
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="7" />
      <path d="M12 1v4M12 19v4M1 12h4M19 12h4" />
    </g>
    <g v-else-if="name === 'karma'">
      <path d="M12 3v18" />
      <path d="M5 8h14" />
      <path d="M7 8l-3 7h6L7 8Z" />
      <path d="M17 8l-3 7h6l-3-7Z" />
    </g>
    <g v-else-if="name === 'harm'">
      <path d="M12 3v18M3 12h18" />
      <path d="M6 6l12 12M18 6L6 18" />
    </g>
    <g v-else-if="name === 'access'">
      <path d="M7 11V8a5 5 0 0 1 10 0v3" />
      <rect x="5" y="11" width="14" height="10" />
      <path d="M12 15v3" />
    </g>
    <g v-else-if="name === 'technique'">
      <path d="M4 17c4-10 12-10 16 0" />
      <path d="M6 17h12" />
      <path d="M12 4v5M9.5 6.5h5" />
    </g>
    <g v-else-if="name === 'device'">
      <rect x="5" y="5" width="14" height="14" />
      <path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4" />
      <circle cx="12" cy="12" r="2" />
    </g>
    <g v-else-if="name === 'mark'">
      <path d="M12 3l3 6 6 1-4.5 4.5 1 6L12 17l-5.5 3.5 1-6L3 10l6-1 3-6Z" />
    </g>
    <g v-else-if="name === 'subject'">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.5-4.5 14.5-4.5 16 0" />
      <path d="M12 12v4" />
    </g>
    <g v-else>
      <path d="M12 3v12" />
      <path d="M7 10l5 5 5-5" />
      <path d="M5 19h14M8 22h8" />
    </g>
  </svg>
</template>

<style scoped lang="scss">
.ui-glyph {
  display: inline-block;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  vertical-align: middle;
}
</style>
