<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
  meta?: string
  codename?: string
  title?: string
  codeNo?: string
  src?: string
}>(), {
  label: 'Subject Registration',
  meta: 'Eidolon Archive',
  codename: '',
  title: '',
  codeNo: '',
  src: '',
})
</script>

<template>
  <figure class="ui-photo">
    <div class="ui-photo__plate">
      <div class="ui-photo__label">
        <span>{{ label }}</span>
        <span v-if="meta">{{ meta }}</span>
      </div>
      <div class="ui-photo__well">
        <img v-if="src" :src="src" :alt="codename || title || label">
        <slot v-else name="well">
          <span>{{ codename || 'Photo Pending' }}</span>
        </slot>
      </div>
      <slot />
    </div>
    <figcaption class="ui-photo__caption">
      <span class="ui-photo__codename">{{ codename || codeNo || 'Unregistered' }}</span>
      <span v-if="title" class="ui-photo__title">{{ title }}</span>
      <span v-if="codeNo" class="ui-photo__code">{{ codeNo }}</span>
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
}

.ui-photo__well {
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
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.ui-photo__caption {
  display: grid;
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
  font-weight: 700;
  letter-spacing: var(--track-wide);
}

.ui-photo__title,
.ui-photo__code {
  opacity: 0.72;
}
</style>
