<script setup lang="ts">
import { UI_INSTRUMENT_GLYPHS } from '~/types/ui'
import type { UiClassificationKind, UiRecordRow, UiTabItem, UiWoundRow } from '~/types/ui'

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
      { token: '--eid-echo', alias: 'echo' },
    ],
  },
  {
    label: 'Status',
    colors: [
      { token: '--status-authority', alias: 'authority' },
      { token: '--status-resonance', alias: 'resonance' },
      { token: '--status-signal', alias: 'signal' },
      { token: '--status-confirmed', alias: 'confirmed' },
      { token: '--status-unknown', alias: 'unknown' },
    ],
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
    ],
  },
]

const tabs: UiTabItem[] = [
  { label: 'Dossier', value: 'dossier' },
  { label: 'Archive', value: 'archive' },
  { label: 'Operations', value: 'operations' },
  { label: 'Reference', value: 'reference' },
]

const activeTab = ref('dossier')
const sectionCollapsed = ref(false)
const fieldValue = ref('Irene Vasquez')
const stepValue = ref(3)
const signalValue = ref(3)
const resonancePct = ref(42)
const karmaValue = ref(-1)
const redactionOpen = ref(false)

const woundRows = ref<UiWoundRow[]>([
  { key: 'minor', label: 'Minor', values: [true, false] },
  { key: 'serious', label: 'Serious', values: [false, false], note: 'when relevant' },
  { key: 'critical', label: 'Critical', values: [false] },
])

const recordRows: UiRecordRow[] = [
  { label: 'Source', value: 'OPS-CASE-01' },
  { label: 'Confidence', value: 'Field-Reported' },
]

const classificationKinds: Array<{ kind: UiClassificationKind, label: string }> = [
  { kind: 'confirmed', label: 'Confirmed' },
  { kind: 'contradicted', label: 'Contradicted' },
  { kind: 'eyes-only', label: 'Eyes Only' },
  { kind: 'field-reported', label: 'Field-Reported' },
  { kind: 'purged-copy', label: 'Purged Copy' },
  { kind: 'unreconciled', label: 'Unreconciled' },
]

function toggleWound(key: string, index: number) {
  const row = woundRows.value.find(item => item.key === key)
  if (row) {
    row.values[index] = !row.values[index]
  }
}
</script>

<template>
  <main class="cookbook">
    <header class="cookbook__masthead">
      <div>
        <p class="cookbook__eyebrow">Interface Reference</p>
        <h1>Polaris Cookbook</h1>
      </div>
      <UiSeal :show-wordmark="false" />
    </header>

    <section class="cookbook__grid" aria-label="Component cookbook">
      <article class="cookbook-card cookbook-card--wide">
        <header class="cookbook-card__header">
          <div>
            <p class="cookbook__eyebrow">Foundation</p>
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
            <p class="cookbook__eyebrow">Core</p>
            <h2>Seal, Stamp, Button, Tabs</h2>
          </div>
        </header>
        <div class="variant-grid variant-grid--core">
          <section class="variant">
            <header class="variant__header"><h3>Seal</h3><span>wordmark / stamp</span></header>
            <div class="variant__preview variant__preview--stack">
              <UiSeal />
              <UiSeal tone="stamp" :show-wordmark="false" />
            </div>
          </section>
          <section class="variant">
            <header class="variant__header"><h3>Stamp</h3><span>tones</span></header>
            <div class="variant__preview variant__preview--stack">
              <UiStamp>Restricted</UiStamp>
              <UiStamp tone="ink" size="sm" :rotate="-1">Field Copy</UiStamp>
              <UiStamp tone="eden" :rotate="1">Unreconciled</UiStamp>
            </div>
          </section>
          <section class="variant">
            <header class="variant__header"><h3>Button</h3><span>states</span></header>
            <div class="variant__preview variant__preview--stack">
              <UiButton>Export File</UiButton>
              <UiButton variant="active-gm">GM Mode: On</UiButton>
              <UiButton variant="danger">Withdraw Record</UiButton>
              <UiButton disabled>Unavailable</UiButton>
            </div>
          </section>
          <section class="variant variant--wide">
            <header class="variant__header"><h3>Tabs</h3><span>{{ activeTab }}</span></header>
            <div class="variant__preview variant__preview--wide">
              <UiTabs :items="tabs" :model-value="activeTab" @update:model-value="activeTab = $event">
                <template #tools>
                  <UiButton size="sm">Tool</UiButton>
                </template>
              </UiTabs>
            </div>
          </section>
        </div>
      </article>

      <article class="cookbook-card cookbook-card--wide">
        <header class="cookbook-card__header">
          <div>
            <p class="cookbook__eyebrow">Forms</p>
            <h2>Section, Field, Stepper, Photo Plate</h2>
          </div>
        </header>
        <div class="variant-grid variant-grid--forms">
          <UiFormSection
            title="Identity Record"
            code="FORM E-1 / S2/v0.1"
            note="Filed copy pending handler countersign."
            :collapsed="sectionCollapsed"
            @toggle="sectionCollapsed = !sectionCollapsed"
          >
            <div class="field-pair">
              <UiField label="Subject" :model-value="fieldValue" @commit="fieldValue = $event" />
              <UiField label="Immutable" model-value="Read-only field" :editable="false" />
            </div>
          </UiFormSection>
          <section class="variant">
            <header class="variant__header"><h3>Stepper</h3><span>{{ stepValue }}</span></header>
            <div class="variant__preview">
              <UiStepper :model-value="stepValue" :min="-1" :max="5" signed @change="stepValue = $event" />
            </div>
          </section>
          <section class="variant photo-sample">
            <header class="variant__header"><h3>Photo Plate</h3><span>coded</span></header>
            <div class="variant__preview">
              <UiPhotoPlate codename="Wren" title="Field Technician" code-no="SUBJ-114" />
            </div>
          </section>
        </div>
      </article>

      <article class="cookbook-card cookbook-card--wide">
        <header class="cookbook-card__header">
          <div>
            <p class="cookbook__eyebrow">Instruments</p>
            <h2>Status Controls</h2>
          </div>
        </header>
        <div class="instrument-grid">
          <UiStatusPanel title="Signal" mini="Clean frequency" accent="echo" glyph="signal">
            <UiBigRead :value="`${signalValue} / 4`" label="available" tone="echo" />
            <UiSignalPips :max="4" :current="signalValue" @change="signalValue = $event" />
          </UiStatusPanel>
          <UiStatusPanel title="Resonance" mini="contamination" accent="eden" glyph="resonance">
            <UiBigRead :value="`${resonancePct}%`" label="Atravessado" tone="eden" />
            <UiResonanceGauge :pct="resonancePct" />
            <div class="cookbook-row">
              <UiButton size="sm" @click="resonancePct = clampRange(resonancePct - 5, 0, 100)">-5</UiButton>
              <UiButton size="sm" @click="resonancePct = clampRange(resonancePct + 5, 0, 100)">+5</UiButton>
            </div>
          </UiStatusPanel>
          <UiStatusPanel title="Karma" mini="path depth" glyph="karma">
            <UiBigRead :value="formatSignedValue(karmaValue, karmaValue > 0)" label="Occult Eden" />
            <UiKarmaRuler :value="karmaValue" :echo-limit="3" @change="karmaValue = $event" />
          </UiStatusPanel>
          <UiStatusPanel title="Harm" mini="wound slots" accent="stamp" glyph="harm">
            <UiWoundBoxes :rows="woundRows" @toggle="toggleWound" />
          </UiStatusPanel>
        </div>
        <div class="glyph-grid" aria-label="Instrument glyphs">
          <span v-for="glyph in UI_INSTRUMENT_GLYPHS" :key="glyph" class="glyph-grid__item">
            <UiInstrumentGlyph :name="glyph" :size="24" />
            {{ glyph }}
          </span>
        </div>
      </article>

      <article class="cookbook-card cookbook-card--wide">
        <header class="cookbook-card__header">
          <div>
            <p class="cookbook__eyebrow">Records</p>
            <h2>Cards</h2>
          </div>
        </header>
        <div class="record-grid">
          <UiRecordCard name="Photograph, Pumping Stn." tag="Evidence" glyph="mark" :rows="recordRows" />
          <UiRecordCard name="Read the Static" tag="Occult Eden" tone="eden" glyph="technique" :rows="[{ label: 'Effect', value: 'Ask one question about emotional residue.' }]" />
          <UiTechniqueCard name="Ground Yourself" faction="Eidolon" tags="reaction" cost="signal:1" effect="Clear one unstable sensory detail." />
          <UiTechniqueCard name="Borrowed Door" faction="Occult Eden" tone="eden" cost="resonance:5" effect="Open a route where no route was recorded." risk="Leaves an unreconciled mark." />
          <UiGearCard name="Resonant Cell Mk I" type="Containment Device" :charge="8" :capacity="20" store="eden" serial="SERIAL-LOGGED" fn="Stores unstable resonance for later purge." />
          <UiGearCard name="Signal Tap" type="Field Receiver" :charge="14" :capacity="16" store="echo" serial="FIELD COPY" tracking="Checked out to Handler D-4." />
        </div>
      </article>

      <article class="cookbook-card cookbook-card--wide">
        <header class="cookbook-card__header">
          <div>
            <p class="cookbook__eyebrow">Feedback</p>
            <h2>Redaction and Classification</h2>
          </div>
          <UiButton size="sm" :variant="redactionOpen ? 'active-gm' : 'default'" @click="redactionOpen = !redactionOpen">
            GM Mode: {{ redactionOpen ? 'On' : 'Off' }}
          </UiButton>
        </header>
        <p class="redaction-line">
          Witness identified as
          <UiRedaction reason="Source Protected" :open="redactionOpen">Tomas Vasquez, motor pool</UiRedaction>.
          Subject recalls a room that
          <UiRedaction reason="Withheld" :open="redactionOpen">does not appear on facility plan B-2</UiRedaction>.
        </p>
        <div class="chip-grid">
          <UiClassificationChip v-for="item in classificationKinds" :key="item.kind" :kind="item.kind">
            {{ item.label }}
          </UiClassificationChip>
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
.palette__alias {
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
.palette__alias {
  opacity: 0.68;
}

.palette,
.variant-grid,
.instrument-grid,
.record-grid {
  display: grid;
  gap: var(--space-5);
}

.palette {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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

.variant-grid--core {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.variant-grid--forms,
.instrument-grid,
.record-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.variant {
  display: grid;
  grid-template-rows: auto 1fr;
  min-width: 0;
  border: var(--border-hairline);
  background: var(--surface-page);
}

.variant--wide {
  grid-column: 1 / -1;
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

.variant__preview--stack,
.field-pair {
  display: grid;
  align-content: center;
  gap: var(--space-4);
}

.variant__preview--wide {
  display: block;
  min-height: auto;
  padding: var(--space-4);
}

.photo-sample {
  max-width: 240px;
}

.cookbook-row,
.chip-grid,
.glyph-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.glyph-grid {
  padding-top: var(--space-4);
  border-top: var(--border-dotted);
}

.glyph-grid__item {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  border: var(--border-hairline);
  background: var(--surface-page);
  font-size: var(--type-1);
  letter-spacing: var(--track-meta);
  padding: var(--space-2) var(--space-3);
  text-transform: uppercase;
}

.redaction-line {
  font-size: var(--type-3);
  line-height: var(--leading-reading);
}

@media (max-width: 820px) {
  .cookbook {
    padding: var(--space-6);
  }

  .cookbook__grid,
  .palette,
  .variant-grid--core,
  .variant-grid--forms,
  .instrument-grid,
  .record-grid {
    grid-template-columns: 1fr;
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
