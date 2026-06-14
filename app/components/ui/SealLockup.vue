<script setup lang="ts">
const props = defineProps<{
  mode?: 'stamp' | 'label'
}>()

const shouldShowLabel = computed(() => {
  return props.mode !== 'stamp'
})

const shouldShowStamp = computed(() => {
  return props.mode !== 'label'
})
</script>

<template>
  <div class="seal">
    <span v-if="shouldShowStamp" class="sigil" style="width: 44px; height: 44px; font-size: 22px;">
      E
    </span>
    <span v-if="shouldShowLabel" class="seal__label">
      <span class="seal__name">
        Eidolon
      </span>
      <span class="seal__sub">
        Advanced Research Directorate
      </span>
    </span>
  </div>
</template>

<style scoped lang="scss">
.seal {
  display: inline-flex;
  align-items: center;
  gap: var(--space-4);
  min-width: 0;

  &__label {
    min-width: 0;
  }

  &__name {
    display: block;
    font-family: var(--font-ui);
    font-size: var(--type-4);
    font-weight: 700;
    letter-spacing: var(--track-wide);
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: uppercase;
    white-space: nowrap;
  }

  &__sub {
    display: block;
    font-family: var(--font-ui);
    font-size: var(--type-1);
    letter-spacing: var(--track-meta);
    margin-top: 3px;
    overflow: hidden;
    opacity: .8;
    text-overflow: ellipsis;
    text-transform: uppercase;
    white-space: nowrap;
  }
}

.sigil {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  border: 2px solid var(--rule-hard);
  border-radius: var(--radius-circle);
  font-family: var(--font-ui);
  font-weight: 700;
  line-height: 1;
}
</style>
