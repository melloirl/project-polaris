<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  code: string
  note?: string
  gm?: boolean
  collapsed?: boolean
}>(), {
  note: '',
  gm: false,
  collapsed: false,
})

defineEmits<{
  toggle: []
}>()
</script>

<template>
  <section :class="['ui-form-section', { 'ui-form-section--gm': gm, 'is-collapsed': collapsed }]">
    <button
      class="ui-form-section__head"
      type="button"
      :aria-expanded="!collapsed"
      @click="$emit('toggle')"
    >
      <h2>{{ title }}</h2>
      <span class="ui-form-section__code">{{ code }}</span>
    </button>
    <div v-show="!collapsed" class="ui-form-section__body">
      <slot />
      <p v-if="note" class="ui-form-section__note">{{ note }}</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.ui-form-section {
  margin-bottom: 20px;
  border: var(--border-panel);
  background: var(--surface-panel);
}

.ui-form-section--gm {
  border: var(--border-status);
  border-color: var(--rule-danger);
}

.ui-form-section__head {
  display: flex;
  width: 100%;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-4);
  border: 0;
  border-bottom: var(--border-hard);
  background: var(--surface-inset);
  color: var(--text-primary);
  cursor: pointer;
  text-align: left;

  h2 {
    font-family: var(--font-ui);
    font-size: var(--type-2);
    font-weight: 700;
    letter-spacing: var(--track-wide);
    line-height: var(--leading-tight);
    text-transform: uppercase;
  }
}

.ui-form-section--gm .ui-form-section__head {
  border-bottom-color: var(--rule-danger);
  background: var(--surface-page);

  h2 {
    color: var(--text-danger);
  }
}

.ui-form-section__code {
  flex: 0 0 auto;
  font-family: var(--font-mono);
  font-size: var(--type-0);
  letter-spacing: var(--track-meta);
  opacity: 0.8;
  text-transform: uppercase;
}

.ui-form-section__body {
  padding: var(--space-4) var(--space-5);
}

.ui-form-section__note {
  margin-top: var(--space-3);
  font-size: var(--type-1);
  line-height: 1.45;
  opacity: 0.7;
}
</style>
