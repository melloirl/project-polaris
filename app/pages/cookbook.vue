<script setup lang="ts">
const paletteGroups = [
  {
    label: 'Core',
    colors: [
      { token: '--eid-paper', alias: 'paper' },
      { token: '--eid-paper-2', alias: 'paper 2' },
      { token: '--eid-ink', alias: 'ink' },
      { token: '--eid-rule', alias: 'rule' },
      { token: '--eid-stamp', alias: 'stamp' },
      { token: '--eid-eden', alias: 'eden' },
      { token: '--eid-echo', alias: 'echo' }
    ]
  },
  {
    label: 'Surfaces',
    colors: [
      { token: '--surface-page', alias: '--paper' },
      { token: '--surface-panel', alias: '--paper' },
      { token: '--surface-inset', alias: '--paper-2' },
      { token: '--surface-active', alias: '--paper' },
      { token: '--surface-inverse', alias: '--ink' },
      { token: '--eid-frame-bg', alias: '--frame-bg' },
      { token: '--eid-print-bg', alias: '--print-bg' }
    ]
  },
  {
    label: 'Text',
    colors: [
      { token: '--text-primary', alias: '--ink' },
      { token: '--text-inverse', alias: '--paper' },
      { token: '--text-danger', alias: '--stamp' },
      { token: '--text-eden', alias: '--eden' },
      { token: '--text-echo', alias: '--echo' }
    ]
  },
  {
    label: 'Status',
    colors: [
      { token: '--status-authority', alias: '--stamp' },
      { token: '--status-resonance', alias: '--eden' },
      { token: '--status-signal', alias: '--echo' },
      { token: '--status-confirmed', alias: '--ink' },
      { token: '--status-unknown', alias: '--rule' }
    ]
  },
  {
    label: 'Rules',
    colors: [
      { token: '--rule-soft', alias: '--rule' },
      { token: '--rule-hard', alias: '--ink' },
      { token: '--rule-danger', alias: '--stamp' },
      { token: '--rule-eden', alias: '--eden' },
      { token: '--rule-echo', alias: '--echo' }
    ]
  },
  {
    label: 'Factions',
    colors: [
      { token: '--faction-eidolon', alias: 'eidolon' },
      { token: '--faction-eden', alias: 'eden' },
      { token: '--faction-echologist', alias: 'echologist' },
      { token: '--faction-geist', alias: 'geist' },
      { token: '--faction-welderhide', alias: 'welderhide' }
    ]
  },
  {
    label: 'Tints',
    colors: [
      { token: '--tint-eden', alias: 'eden tint' },
      { token: '--tint-echo', alias: 'echo tint' },
      { token: '--tint-stamp', alias: 'stamp tint' },
      { token: '--tint-ink', alias: 'ink tint' },
      { token: '--subject-accent-tint', alias: 'subject tint' }
    ]
  },
  {
    label: 'Files',
    colors: [
      { token: '--file-federal', alias: 'federal' },
      { token: '--file-amber', alias: 'amber' },
      { token: '--file-olive', alias: 'olive' },
      { token: '--file-slate', alias: 'slate' },
      { token: '--file-oxblood', alias: 'oxblood' },
      { token: '--file-rose', alias: 'rose' },
      { token: '--subject-accent', alias: 'subject' }
    ]
  }
];

const sealVariants = [
  {
    name: 'Complete',
    meta: 'sigil + label',
    props: {}
  },
  {
    name: 'Stamp',
    meta: 'sigil only',
    props: { mode: 'stamp' as const }
  },
  {
    name: 'Label',
    meta: 'wordmark only',
    props: { mode: 'label' as const }
  }
];

const buttonSizes = [
  { label: 'SM', value: 'sm' as const },
  { label: 'MD', value: 'md' as const },
  { label: 'LG', value: 'lg' as const }
];

const stampSizes = buttonSizes;

const buttonRows = [
  {
    name: 'Primary',
    meta: 'outline',
    props: { variant: 'primary' as const }
  },
  {
    name: 'Primary',
    meta: 'fill',
    props: { variant: 'primary' as const, fill: true }
  },
  {
    name: 'Danger',
    meta: 'outline',
    props: { variant: 'danger' as const }
  },
  {
    name: 'Danger',
    meta: 'fill',
    props: { variant: 'danger' as const, fill: true }
  },
  {
    name: 'Disabled',
    meta: 'primary',
    props: { variant: 'primary' as const, disabled: true }
  }
];

const stampVariants = [
  {
    name: 'Restricted',
    meta: 'authority',
    props: { angle: -3 }
  },
  {
    name: 'Eyes Only',
    meta: 'authority',
    props: { angle: 2 }
  },
  {
    name: 'Field Copy',
    meta: 'ink copy',
    props: { angle: -1 },
    style: '--color-stamp: var(--ink)'
  }
];
</script>

<template>
<main class="cookbook">
  <header class="cookbook__masthead">
    <div>
      <p class="cookbook__eyebrow">
        Interface Reference
      </p>
      <h1>Polaris Cookbook</h1>
    </div>
    <UiSealLockup mode="stamp" />
  </header>

  <section class="cookbook__grid" aria-label="Component cookbook">
    <article class="cookbook-card cookbook-card--wide">
      <header class="cookbook-card__header">
        <div>
          <p class="cookbook__eyebrow">
            Foundation
          </p>
          <h2>Color Palette</h2>
        </div>
      </header>

      <div class="palette">
        <section v-for="group in paletteGroups" :key="group.label" class="palette__group">
          <h3>{{ group.label }}</h3>
          <div class="palette__items">
            <div v-for="color in group.colors" :key="color.token" class="palette__item">
              <span class="palette__pip" :style="{ backgroundColor: `var(${color.token})` }" />
              <span class="palette__token">{{ color.token }}</span>
              <span class="palette__alias">{{ color.alias }}</span>
            </div>
          </div>
        </section>
      </div>
    </article>

    <article class="cookbook-card cookbook-card--wide">
      <header class="cookbook-card__header">
        <div>
          <p class="cookbook__eyebrow">
            Brand
          </p>
          <h2>Seal Lockup</h2>
        </div>
        <span class="cookbook-card__meta">3 variants</span>
      </header>

      <div class="variant-grid variant-grid--seal">
        <section v-for="variant in sealVariants" :key="variant.name" class="variant">
          <header class="variant__header">
            <h3>{{ variant.name }}</h3>
            <span>{{ variant.meta }}</span>
          </header>
          <div class="variant__preview variant__preview--brand">
            <UiSealLockup v-bind="variant.props" />
          </div>
        </section>
      </div>
    </article>

    <article class="cookbook-card cookbook-card--wide">
      <header class="cookbook-card__header">
        <div>
          <p class="cookbook__eyebrow">
            Controls
          </p>
          <h2>Button</h2>
        </div>
        <span class="cookbook-card__meta">tone / fill / size</span>
      </header>

      <div class="button-matrix">
        <div class="button-matrix__head" aria-hidden="true" />
        <div v-for="size in buttonSizes" :key="size.value" class="button-matrix__size">
          {{ size.label }}
        </div>

        <template v-for="row in buttonRows" :key="`${row.name}-${row.meta}`">
          <div class="button-matrix__label">
            <strong>{{ row.name }}</strong>
            <span>{{ row.meta }}</span>
          </div>
          <div v-for="size in buttonSizes" :key="`${row.name}-${row.meta}-${size.value}`" class="button-matrix__cell">
            <UiButton v-bind="row.props" :size="size.value">
              Button
            </UiButton>
          </div>
        </template>
      </div>
    </article>

    <article class="cookbook-card cookbook-card--wide">
      <header class="cookbook-card__header">
        <div>
          <p class="cookbook__eyebrow">
            Brand
          </p>
          <h2>Stamp</h2>
        </div>
        <span class="cookbook-card__meta">restricted / eyes-only / field copy</span>
      </header>
      <div class="button-matrix stamp-matrix">
        <div class="button-matrix__head" aria-hidden="true" />
        <div v-for="size in stampSizes" :key="size.value" class="button-matrix__size">
          {{ size.label }}
        </div>

        <template v-for="variant in stampVariants" :key="variant.name">
          <div class="button-matrix__label">
            <strong>{{ variant.name }}</strong>
            <span>{{ variant.meta }}</span>
          </div>
          <div v-for="size in stampSizes" :key="`${variant.name}-${size.value}`" class="button-matrix__cell">
            <UiStamp v-bind="variant.props" :size="size.value" :style="variant.style">
              {{ variant.name }}
            </UiStamp>
          </div>
        </template>
      </div>
    </article>
  </section>
</main>
</template>

<style scoped lang="scss">
.cookbook {
  min-height: 100vh;
  max-width: var(--page-max-width);
  margin: 0 auto;
  padding: var(--space-9);
  background:
    linear-gradient(color-mix(in srgb, var(--rule-soft) 28%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--rule-soft) 22%, transparent) 1px, transparent 1px),
    var(--surface-page);
  background-size: 28px 28px;
  color: var(--text-primary);

  h1,
  h2,
  h3 {
    line-height: var(--leading-tight);
  }

  h1 {
    margin-top: var(--space-2);
    font-family: var(--font-ui);
    font-size: var(--type-6);
    letter-spacing: var(--track-wide);
    text-transform: uppercase;
  }

  h2 {
    font-size: var(--type-4);
    letter-spacing: var(--track-wide);
    text-transform: uppercase;
  }
}

.cookbook__masthead {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-8);
  margin-bottom: var(--space-9);
  padding: var(--space-7) 0 var(--space-8);
  border-bottom: var(--border-double);
}

.cookbook__eyebrow,
.cookbook-card__meta,
.variant__header span,
.palette__alias,
.button-matrix__size,
.button-matrix__label span {
  font-size: var(--type-1);
  letter-spacing: var(--track-meta);
  text-transform: uppercase;
}

.cookbook__eyebrow {
  font-weight: 700;
}

.cookbook__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-7);
}

.cookbook-card {
  display: grid;
  gap: var(--space-6);
  min-width: 0;
  padding: var(--space-6);
  border: var(--border-panel);
  border-radius: 4px;
  background: color-mix(in srgb, var(--surface-page) 88%, var(--surface-inset));
}

.cookbook-card--wide {
  grid-column: 1 / -1;
}

.cookbook-card__header,
.variant__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-5);
}

.cookbook-card__header {
  padding-bottom: var(--space-4);
  border-bottom: var(--border-dotted);
}

.cookbook-card__meta,
.variant__header span,
.palette__alias,
.button-matrix__label span {
  opacity: 0.68;
}

.palette {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-5);
}

.palette__group {
  display: grid;
  align-content: start;
  gap: var(--space-4);
  min-width: 0;

  h3 {
    font-size: var(--type-2);
    letter-spacing: var(--track-wide);
    text-transform: uppercase;
  }
}

.palette__items {
  display: grid;
  gap: var(--space-2);
}

.palette__item {
  display: grid;
  grid-template-columns: 18px minmax(0, 1fr) auto;
  align-items: center;
  gap: var(--space-3);
  min-width: 0;
  padding: var(--space-2);
  border: var(--border-hairline);
  background: color-mix(in srgb, var(--surface-inset) 52%, transparent);
}

.palette__pip {
  width: 18px;
  height: 18px;
  border: var(--border-hard);
}

.palette__token {
  overflow: hidden;
  font-size: var(--type-2);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.variant-grid {
  display: grid;
  gap: var(--space-5);
}

.variant-grid--seal {
  grid-template-columns: 1.45fr .8fr 1fr;
}

.variant {
  display: grid;
  grid-template-rows: auto 1fr;
  min-width: 0;
  border: var(--border-hairline);
  background: var(--surface-page);
}

.variant__header {
  min-height: 42px;
  padding: var(--space-3) var(--space-4);
  border-bottom: var(--border-dotted);

  h3 {
    font-size: var(--type-2);
    letter-spacing: var(--track-meta);
    text-transform: uppercase;
  }
}

.variant__preview {
  display: flex;
  min-height: 92px;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
  overflow: hidden;
}

.variant__preview--brand {
  justify-content: flex-start;
}

.button-matrix {
  display: grid;
  grid-template-columns: minmax(116px, .8fr) repeat(3, minmax(150px, 1fr));
  overflow-x: auto;
  border: var(--border-hard);
  background: var(--surface-page);
}

.button-matrix__head,
.button-matrix__size,
.button-matrix__label,
.button-matrix__cell {
  min-width: 0;
  border-right: var(--border-dotted);
  border-bottom: var(--border-dotted);
}

.button-matrix__size {
  display: flex;
  min-height: 36px;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  background: var(--surface-inset);
}

.button-matrix__label {
  display: grid;
  align-content: center;
  gap: 2px;
  min-height: 66px;
  padding: var(--space-3) var(--space-4);
  background: color-mix(in srgb, var(--surface-inset) 58%, transparent);

  strong {
    font-size: var(--type-2);
    letter-spacing: var(--track-meta);
    text-transform: uppercase;
  }
}

.button-matrix__cell {
  display: flex;
  min-height: 66px;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
}

.button-matrix__head,
.button-matrix__size:nth-child(4),
.button-matrix__cell:nth-child(4n) {
  border-right: 0;
}

.button-matrix__label:nth-last-child(-n + 4),
.button-matrix__cell:nth-last-child(-n + 3) {
  border-bottom: 0;
}

@media (max-width: 820px) {
  .cookbook {
    padding: var(--space-6);
  }

  .cookbook__masthead {
    align-items: center;
  }

  .cookbook__grid,
  .palette,
  .variant-grid--seal {
    grid-template-columns: 1fr;
  }

  .button-matrix {
    grid-template-columns: minmax(104px, .8fr) repeat(3, minmax(132px, 1fr));
  }
}

@media (max-width: 560px) {
  .cookbook {
    padding: var(--space-4);
  }

  .cookbook__masthead,
  .cookbook-card__header {
    flex-direction: column;
  }

  .cookbook h1 {
    font-size: var(--type-5);
  }
}
</style>
