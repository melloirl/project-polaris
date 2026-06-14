<script setup lang="ts">
withDefaults(defineProps<{
  reason?: string
  open?: boolean
  block?: boolean
}>(), {
  reason: '',
  open: false,
  block: false,
})
</script>

<template>
  <span
    :class="[
      'eid-redaction',
      'ui-redaction',
      {
        'is-open': open,
        'eid-redaction--block': block,
        'ui-redaction--block': block
      }
    ]"
  >
    <span class="ui-redaction__content">
      <slot />
    </span>
    <span v-if="reason" class="eid-redaction__reason ui-redaction__reason">{{ reason }}</span>
  </span>
</template>

<style scoped lang="scss">
.eid-redaction,
.ui-redaction {
  display: inline;
  background: var(--eid-ink);
  color: var(--eid-ink);
  padding: 0 2px;
  user-select: none;
  white-space: nowrap;
}

.eid-redaction.is-open,
.ui-redaction.is-open {
  background: transparent;
  color: var(--text-primary);
  user-select: text;
}

.eid-redaction:not(.is-open) .ui-redaction__content,
.ui-redaction:not(.is-open) .ui-redaction__content {
  visibility: hidden;
}

.eid-redaction--block,
.ui-redaction--block {
  display: block;
  min-width: 0;
}

.eid-redaction__reason,
.ui-redaction__reason {
  display: inline-block;
  margin-left: var(--space-1);
  border: 1px solid var(--rule-danger);
  color: var(--text-danger);
  background: transparent;
  font-family: var(--font-ui);
  font-size: 9px;
  letter-spacing: var(--track-meta);
  padding: 1px 5px;
  text-transform: uppercase;
  user-select: auto;
  vertical-align: middle;
}
</style>
