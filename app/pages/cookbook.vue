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

const coreProps = {
  seal: [
    ['letter', 'string', '"E"', 'Glyph inside the ring.'],
    ['name', 'string', '"Eidolon"', 'Wordmark line.'],
    ['sub', 'string', '"Advanced Research Directorate"', 'Sub line under the wordmark.'],
    ['size', 'number', '44', 'Sigil diameter (px); scales the wordmark.'],
    ['tone', '"ink" | "stamp"', '"ink"', 'Ring color.'],
    ['showWordmark', 'boolean', 'true', 'Hide for the bare sigil.'],
  ],
  stamp: [
    ['children', 'Vue slot', '-', 'Stamp text (auto-uppercased).'],
    ['tone', '"danger" | "ink" | "eden" | "echo"', '"danger"', 'danger = classification red; others = source/faction marks.'],
    ['size', '"md" | "sm"', '"md"', 'sm for inline marks.'],
    ['rotate', 'number', '-3', 'Rotation in degrees. Keep -4...+3.'],
  ],
  tabs: [
    ['items', 'UiTabItem[]', '[]', 'Tab definitions.'],
    ['modelValue', 'string', '-', 'Active tab id.'],
    ['update:modelValue', '(id) => void', '-', 'Fired on tab click.'],
    ['tools', 'slot', '-', 'Right-aligned toolbar.'],
  ],
}

const coreCss = {
  seal: `.ui-seal { display: inline-flex; align-items: center; gap: var(--space-4); }
.ui-seal__sigil {
  display: flex; align-items: center; justify-content: center;
  border: 2px solid var(--eid-ink); border-radius: var(--radius-circle);
  font-family: var(--font-ui); font-weight: 700;
}
.ui-seal__sigil--stamp { border-color: var(--eid-stamp); color: var(--eid-stamp); }
.ui-seal__name {
  font-family: var(--font-ui); font-weight: 700;
  letter-spacing: var(--track-wide); text-transform: uppercase;
}
.ui-seal__sub {
  font-family: var(--font-ui); font-size: var(--type-1);
  letter-spacing: var(--track-meta); text-transform: uppercase; opacity: .8;
}`,
  stamp: `.ui-stamp {
  font-family: var(--font-stamp);
  border: var(--border-stamp);
  color: var(--text-danger);
  padding: var(--space-1) var(--space-5);
  font-weight: 700;
  letter-spacing: var(--track-stamp);
  text-transform: uppercase;
  font-size: var(--type-3);
}
.ui-stamp--ink { border-color: var(--rule-hard); color: var(--text-primary); }
.ui-stamp--eden { border-color: var(--rule-eden); color: var(--text-eden); }
.ui-stamp--echo { border-color: var(--rule-echo); color: var(--text-echo); }
.ui-stamp--sm { font-size: var(--type-1); padding: 2px var(--space-3); }`,
  tabs: `.ui-tabs { display: flex; flex-wrap: wrap; border-bottom: 1px solid var(--eid-ink); }
.ui-tabs__tab {
  font-family: var(--font-ui); font-size: var(--type-2);
  letter-spacing: var(--track-wide); text-transform: uppercase;
  background: var(--surface-inset); border: 1px solid var(--rule-soft);
  border-bottom: 0; margin-top: var(--space-3); margin-right: var(--space-2);
  padding: var(--space-3) var(--space-7) var(--space-2);
}
.ui-tabs__tab.is-active {
  position: relative; top: 1px; background: var(--surface-page);
  border-color: var(--eid-ink); font-weight: 700;
  box-shadow: inset 0 3px 0 var(--subject-accent);
}`,
}

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
        <p class="cookbook__eyebrow">Components - Core</p>
        <h1>Core - Identity &amp; Navigation</h1>
        <p class="cookbook__intro">
          The chrome that frames every dossier: the Directorate <b>Seal</b> (the brand's single mark),
          the classification <b>Stamp</b> (authority, not sticker), and record-divider <b>Tabs</b>.
          All three are one-color, square-cornered, and survive a photocopier.
        </p>
      </div>
    </header>

    <section class="cookbook__grid" aria-label="Component cookbook">
      <article class="core-sheet">
        <section class="core-entry">
          <header class="core-entry__head">
            <h2>Seal</h2>
            <span>components/core/Seal.vue</span>
          </header>
          <p class="core-entry__summary">
            A circular one-color sigil locked up with the wordmark. Never add glow or bevel.
            Drop the wordmark for compact headers and stamps.
          </p>
          <code class="core-entry__sig">Seal({ letter, name, sub, size, tone, showWordmark })</code>
          <div class="core-block">
            <div class="core-block__label"><span>Variations - Live</span><span>Variants</span></div>
            <div class="core-variants core-variants--seal">
              <figure class="core-variant">
                <div class="core-variant__stage core-variant__stage--left">
                  <UiSeal />
                </div>
                <figcaption>&lt;Seal /&gt;</figcaption>
              </figure>
              <figure class="core-variant">
                <div class="core-variant__stage core-variant__stage--left">
                  <UiSeal :size="56" />
                </div>
                <figcaption>size={56}</figcaption>
              </figure>
              <figure class="core-variant">
                <div class="core-variant__stage">
                  <UiSeal :show-wordmark="false" />
                </div>
                <figcaption>showWordmark={false}</figcaption>
              </figure>
              <figure class="core-variant">
                <div class="core-variant__stage">
                  <UiSeal tone="stamp" :show-wordmark="false" />
                </div>
                <figcaption>tone="stamp" showWordmark={false}</figcaption>
              </figure>
            </div>
          </div>
          <div class="core-cols">
            <section class="core-panel">
              <h3>Props - API</h3>
              <table class="core-props">
                <thead>
                  <tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr>
                </thead>
                <tbody>
                  <tr v-for="row in coreProps.seal" :key="row[0]">
                    <td class="k">{{ row[0] }}</td>
                    <td class="t">{{ row[1] }}</td>
                    <td class="d">{{ row[2] }}</td>
                    <td>{{ row[3] }}</td>
                  </tr>
                </tbody>
              </table>
            </section>
            <section class="core-panel">
              <h3>Applied Styles</h3>
              <pre class="core-css">{{ coreCss.seal }}</pre>
            </section>
          </div>
        </section>

        <section class="core-entry">
          <header class="core-entry__head">
            <h2>Stamp</h2>
            <span>components/core/Stamp.vue</span>
          </header>
          <p class="core-entry__summary">
            A rotated classification stamp - the record's authority mark. Use one main stamp per record;
            keep rotation between -4deg and +3deg.
          </p>
          <code class="core-entry__sig">Stamp({ children, tone, size, rotate })</code>
          <div class="core-block">
            <div class="core-block__label"><span>Variations - Live</span><span>Tones</span></div>
            <div class="core-variants">
              <figure class="core-variant">
                <div class="core-variant__stage">
                  <UiStamp>Restricted</UiStamp>
                </div>
                <figcaption>&lt;Stamp&gt;Restricted&lt;/Stamp&gt;</figcaption>
              </figure>
              <figure class="core-variant">
                <div class="core-variant__stage">
                  <UiStamp :rotate="2">Eyes Only</UiStamp>
                </div>
                <figcaption>rotate={2}</figcaption>
              </figure>
              <figure class="core-variant">
                <div class="core-variant__stage">
                  <UiStamp tone="ink" size="sm" :rotate="-1">Field Copy</UiStamp>
                </div>
                <figcaption>tone="ink" size="sm"</figcaption>
              </figure>
              <figure class="core-variant">
                <div class="core-variant__stage">
                  <UiStamp tone="eden" :rotate="1">Unreconciled</UiStamp>
                </div>
                <figcaption>tone="eden"</figcaption>
              </figure>
            </div>
          </div>
          <div class="core-cols">
            <section class="core-panel">
              <h3>Props - API</h3>
              <table class="core-props">
                <thead>
                  <tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr>
                </thead>
                <tbody>
                  <tr v-for="row in coreProps.stamp" :key="row[0]">
                    <td class="k">{{ row[0] }}</td>
                    <td class="t">{{ row[1] }}</td>
                    <td class="d">{{ row[2] }}</td>
                    <td>{{ row[3] }}</td>
                  </tr>
                </tbody>
              </table>
            </section>
            <section class="core-panel">
              <h3>Applied Styles</h3>
              <pre class="core-css">{{ coreCss.stamp }}</pre>
            </section>
          </div>
        </section>

        <section class="core-entry">
          <header class="core-entry__head">
            <h2>Tabs</h2>
            <span>components/core/Tabs.vue</span>
          </header>
          <p class="core-entry__summary">
            Record-divider tabs for the app shell. The active tab sits 1px lower so it joins the paper below,
            and takes a top stripe in the subject's file color. Wraps on mobile instead of collapsing.
          </p>
          <code class="core-entry__sig">Tabs({ items, value, onChange, tools })</code>
          <div class="core-block">
            <div class="core-block__label"><span>Live - Click to switch</span><span>1</span></div>
            <figure class="core-variant core-variant--wide">
              <div class="core-variant__stage core-variant__stage--wide">
                <UiTabs :items="tabs" :model-value="activeTab" @update:model-value="activeTab = $event" />
              </div>
              <figcaption>items={[...]} value={view} onChange={setView}</figcaption>
            </figure>
          </div>
          <div class="core-cols">
            <section class="core-panel">
              <h3>Props - API</h3>
              <table class="core-props">
                <thead>
                  <tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr>
                </thead>
                <tbody>
                  <tr v-for="row in coreProps.tabs" :key="row[0]">
                    <td class="k">{{ row[0] }}</td>
                    <td class="t">{{ row[1] }}</td>
                    <td class="d">{{ row[2] }}</td>
                    <td>{{ row[3] }}</td>
                  </tr>
                </tbody>
              </table>
            </section>
            <section class="core-panel">
              <h3>Applied Styles</h3>
              <pre class="core-css">{{ coreCss.tabs }}</pre>
            </section>
          </div>
          <p class="core-note">
            The active-tab stripe reads var(--subject-accent), so in a coded sheet the current tab picks up
            that character's file color automatically.
          </p>
        </section>
      </article>

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
  padding: 26px 28px 34px;
  background: var(--surface-page);
  color: var(--text-primary);
  font-family: var(--font-record);
  font-size: var(--type-3);

  h1,
  h2,
  h3 {
    line-height: var(--leading-tight);
  }

  h1 {
    margin-top: 5px;
    font-family: var(--font-ui);
    font-size: 24px;
    letter-spacing: var(--track-meta);
    text-transform: uppercase;
  }

  h2 {
    font-size: var(--type-4);
    letter-spacing: var(--track-wide);
    text-transform: uppercase;
  }
}

.cookbook__masthead {
  margin-bottom: 24px;
  padding-bottom: 14px;
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
  color: var(--text-danger);
  font-weight: 700;
}

.cookbook__intro {
  max-width: 78ch;
  margin-top: 8px;
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: var(--leading-reading);
  opacity: 0.82;
}

.cookbook__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.core-sheet {
  display: grid;
  grid-column: 1 / -1;
  gap: 24px;
}

.core-entry {
  border: var(--border-hard);
  background: var(--surface-panel);
}

.core-entry__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 14px;
  padding: 9px 13px;
  border-bottom: var(--border-hard);
  background: var(--surface-inset);

  h2 {
    font-family: var(--font-ui);
    font-size: var(--type-3);
    font-weight: 700;
    letter-spacing: var(--track-wide);
    text-transform: uppercase;
  }

  span {
    font-family: var(--font-mono);
    font-size: var(--type-0);
    letter-spacing: 0.04em;
    opacity: 0.6;
    white-space: nowrap;
  }
}

.core-entry__summary {
  padding: 10px 13px 0;
  font-family: var(--font-mono);
  font-size: 11.5px;
  line-height: 1.55;
  opacity: 0.85;
}

.core-entry__sig {
  display: block;
  margin: 10px 13px 0;
  padding: 7px 10px;
  border-left: 3px solid var(--eid-ink);
  background: var(--tint-ink);
  font-family: var(--font-mono);
  font-size: 11.5px;
  line-height: 1.4;
  white-space: pre-wrap;
  word-break: break-word;
}

.core-block {
  padding: 12px 13px 16px;
}

.core-block__label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 7px;
  margin-bottom: 12px;
  padding-bottom: 5px;
  border-bottom: 1px dotted var(--rule-soft);
  font-family: var(--font-ui);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: var(--track-wide);
  opacity: 0.55;
  text-transform: uppercase;
}

.core-variants {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 13px;
  align-items: start;
}

.core-variants--seal {
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
}

.core-variant {
  min-width: 0;
  margin: 0;
  border: 1px dotted var(--rule-soft);
  background: var(--surface-page);
}

.core-variant--wide {
  width: 100%;
}

.core-variant__stage {
  display: flex;
  min-height: 58px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  overflow: hidden;
  padding: 14px 13px;
}

.core-variant__stage--left {
  justify-content: flex-start;
}

.core-variant__stage--wide {
  display: block;
  width: 100%;
  padding: 20px 13px 14px;
}

.core-variant figcaption {
  padding: 6px 8px;
  border-top: 1px dotted var(--rule-soft);
  background: var(--surface-inset);
  font-family: var(--font-mono);
  font-size: var(--type-0);
  line-height: 1.45;
  opacity: 0.92;
  white-space: pre-wrap;
  word-break: break-word;
}

.core-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: var(--border-hard);
}

.core-panel {
  min-width: 0;
  padding: 12px 13px 16px;

  &:first-child {
    border-right: var(--border-hard);
  }

  h3 {
    margin-bottom: 12px;
    padding-bottom: 5px;
    border-bottom: 1px dotted var(--rule-soft);
    font-family: var(--font-ui);
    font-size: 9px;
    font-weight: 700;
    letter-spacing: var(--track-wide);
    opacity: 0.55;
    text-transform: uppercase;
  }
}

.core-props {
  width: 100%;
  border-collapse: collapse;

  th {
    padding: 3px 7px 5px;
    border-bottom: 1px solid var(--rule-hard);
    font-family: var(--font-ui);
    font-size: 8.5px;
    letter-spacing: var(--track-meta);
    opacity: 0.6;
    text-align: left;
    text-transform: uppercase;
  }

  td {
    padding: 5px 7px;
    border-bottom: 1px dotted var(--rule-soft);
    font-family: var(--font-mono);
    font-size: 11px;
    line-height: 1.4;
    vertical-align: top;
  }

  tr:last-child td {
    border-bottom: 0;
  }

  .k {
    font-weight: 700;
    white-space: nowrap;
  }

  .t {
    color: var(--text-eden);
    white-space: pre-wrap;
  }

  .d {
    opacity: 0.65;
    white-space: nowrap;
  }
}

.core-css {
  margin: 0;
  padding: 9px 11px;
  border-left: 3px solid var(--rule-soft);
  background: var(--surface-inset);
  font-family: var(--font-mono);
  font-size: 10.5px;
  line-height: 1.55;
  white-space: pre-wrap;
  word-break: break-word;
}

.core-note {
  margin: 0 13px 16px;
  padding-left: 10px;
  border-left: 1px dotted var(--rule-soft);
  font-family: var(--font-mono);
  font-size: 10.5px;
  line-height: 1.55;
  opacity: 0.7;
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

  .core-cols {
    grid-template-columns: 1fr;
  }

  .core-panel:first-child {
    border-right: 0;
    border-bottom: var(--border-hard);
  }
}

@media (max-width: 560px) {
  .cookbook {
    padding: var(--space-4);
  }

  .cookbook__masthead,
  .cookbook-card__header,
  .core-entry__head {
    flex-direction: column;
  }

  .cookbook h1 {
    font-size: var(--type-5);
  }
}
</style>
