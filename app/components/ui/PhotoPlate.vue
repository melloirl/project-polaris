<script setup lang="ts">
const props = withDefaults(defineProps<{
  label?: string
  meta?: string | string[]
  codename?: string
  title?: string
  codeNo?: string
  src?: string
}>(), {
  label: 'Subject Photograph',
  meta: () => ['EID/70-114', '3:4'],
  codename: '',
  title: '',
  codeNo: '',
  src: '',
})

const slots = useSlots()

const metaItems = computed(() => Array.isArray(props.meta) ? props.meta : [props.meta].filter(Boolean))
const hasCaption = computed(() => Boolean(props.codename || props.title || props.codeNo))
const hasCustomWell = computed(() => Boolean(slots.well))
</script>

<template>
  <figure class="ui-photo">
    <div class="ui-photo__plate">
      <div class="ui-photo__label">
        <span>{{ label }}</span>
        <span>Restricted</span>
      </div>
      <div :class="['ui-photo__well', { 'ui-photo__well--empty': !src && !hasCustomWell }]">
        <img v-if="src" :src="src" :alt="codename || title || label">
        <slot v-else-if="hasCustomWell" name="well" />
        <slot v-else name="well">
          <span class="ui-photo__target" aria-hidden="true" />
          <span class="ui-photo__empty">No image on file</span>
        </slot>
      </div>
      <div v-if="metaItems.length" class="ui-photo__meta">
        <span v-for="item in metaItems" :key="item">{{ item }}</span>
      </div>
      <slot />
    </div>
    <figcaption v-if="hasCaption" class="ui-photo__caption">
      <span class="ui-photo__codename">{{ codename || codeNo || 'Unregistered' }}</span>
      <span v-if="codeNo" class="ui-photo__code">{{ codeNo }}</span>
      <span v-if="title" class="ui-photo__title">{{ title }}</span>
    </figcaption>
  </figure>
</template>

<style scoped lang="scss">
.ui-photo {
  width: 100%;
}

.ui-photo__plate {
  position: relative;
  padding: 7px;
  border: var(--border-hard);
  background: var(--surface-inset);
}

.ui-photo__plate::before,
.ui-photo__plate::after {
  position: absolute;
  z-index: 1;
  width: 22px;
  height: 22px;
  border-color: var(--eid-stamp);
  content: "";
  opacity: 0.8;
  pointer-events: none;
}

.ui-photo__plate::before {
  top: 4px;
  left: 4px;
  border-top: 2px solid;
  border-left: 2px solid;
}

.ui-photo__plate::after {
  right: 4px;
  bottom: 4px;
  border-right: 2px solid;
  border-bottom: 2px solid;
}

.ui-photo__label {
  display: flex;
  justify-content: space-between;
  gap: var(--space-2);
  margin-bottom: 5px;
  color: var(--text-danger);
  font-size: 8px;
  font-weight: 700;
  letter-spacing: var(--track-meta);
  line-height: var(--leading-tight);
  text-transform: uppercase;

  &::before {
    content: "◇";
  }

  span:first-child {
    flex: 1 1 auto;
    min-width: 0;
  }

  span:last-child {
    flex: 0 0 auto;
  }
}

.ui-photo__well {
  position: relative;
  display: grid;
  aspect-ratio: 3 / 4;
  place-items: center;
  border: var(--border-hard);
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--text-primary) 10%, transparent) 1px, transparent 1px),
    linear-gradient(color-mix(in srgb, var(--text-primary) 10%, transparent) 1px, transparent 1px),
    color-mix(in srgb, var(--surface-page) 55%, transparent);
  background-size: 14px 14px;
  color: color-mix(in srgb, var(--text-primary) 58%, transparent);
  font-size: 9px;
  letter-spacing: 0.16em;
  overflow: hidden;
  padding: var(--space-3);
  text-align: center;
  text-transform: uppercase;

  img {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.ui-photo__well--empty::before {
  position: absolute;
  width: 145%;
  height: 18px;
  background: color-mix(in srgb, var(--rule-soft) 35%, transparent);
  content: "";
  transform: rotate(-45deg);
}

.ui-photo__target {
  position: relative;
  z-index: 1;
  width: 18px;
  height: 18px;
  border: 2px solid color-mix(in srgb, var(--text-primary) 36%, transparent);
  border-radius: 50%;

  &::before,
  &::after {
    position: absolute;
    background: color-mix(in srgb, var(--text-primary) 36%, transparent);
    content: "";
  }

  &::before {
    top: 7px;
    left: -8px;
    width: 30px;
    height: 1px;
  }

  &::after {
    top: -8px;
    left: 7px;
    width: 1px;
    height: 30px;
  }
}

.ui-photo__empty {
  position: absolute;
  z-index: 1;
  font-size: 8px;
}

.ui-photo__meta {
  display: flex;
  justify-content: space-between;
  gap: var(--space-2);
  margin-top: 4px;
  font-size: 7px;
  letter-spacing: var(--track-meta);
  line-height: 1;
  opacity: 0.72;
  text-transform: uppercase;
}

.ui-photo__caption {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 2px;
  margin-top: 5px;
  padding-top: 5px;
  border-top: 3px solid var(--subject-accent);
  font-size: 8px;
  letter-spacing: var(--track-meta);
  line-height: var(--leading-tight);
  text-transform: uppercase;
}

.ui-photo__codename {
  color: var(--subject-accent);
  font-family: var(--font-ui);
  font-size: var(--type-3);
  font-weight: 700;
  letter-spacing: var(--track-wide);
}

.ui-photo__title {
  grid-column: 1 / -1;
}

.ui-photo__title,
.ui-photo__code {
  opacity: 0.72;
}
</style>
