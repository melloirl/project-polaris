<template>
  <div v-if="character">
    <div class="eid-character-picker eid-no-print">
      <span class="eid-character-picker__label">Subject:</span>
      <select :value="character.id" @change="selectCharacter(($event.target as HTMLSelectElement).value)">
        <option v-for="record in db.characters" :key="record.id" :value="record.id">
          {{ record.identity.name || '(unnamed asset)' }} - {{ record.fileNo }}
        </option>
      </select>
      <button class="eid-button" type="button" @click="newCharacter">+ New Dossier</button>
      <button class="eid-button" type="button" @click="duplicateCharacter">Duplicate</button>
      <button class="eid-button eid-button--danger" type="button" @click="destroyCharacter">Destroy File</button>
    </div>

    <div class="eid-layout eid-layout--dossier">
      <div>
        <DossierFormSection
          v-for="section in SECTIONS"
          :key="section.code"
          :title="section.title"
          :code="`${section.code} / S2/v0.1`"
          :note="section.note"
          :collapsed="ui.collapsed[section.code]"
          @toggle="toggleSection(section.code)"
        >
          <div v-if="section.kind === 'fields'" class="eid-field-grid">
            <DossierField
              v-for="field in section.fields"
              :key="field.p"
              :label="field.l"
              :value="fieldValue(field.p)"
              :wide="field.wide"
              @commit="commitCharacterPath(field.p, $event)"
            />
          </div>

          <template v-else-if="section.render === 'attributes'">
            <DossierStatTable type="attributes" />
          </template>

          <template v-else-if="section.render === 'domains'">
            <DossierStatTable type="domains" />
          </template>

          <template v-else-if="section.render === 'access'">
            <div class="eid-field-grid">
              <div class="eid-field">
                <label>Access State</label>
                <select class="eid-select" :value="character.access.state" @change="setSelect('access.state', ($event.target as HTMLSelectElement).value)">
                  <option v-for="state in REF.accessStates" :key="state">{{ state }}</option>
                </select>
              </div>
              <DossierField label="Access Scope" :value="character.access.scope" @commit="commitCharacterPath('access.scope', $event)" />
              <DossierField label="Handler / Supervisor" :value="character.access.handler" @commit="commitCharacterPath('access.handler', $event)" />
              <DossierField label="Gear Support" :value="character.access.gearSupport" @commit="commitCharacterPath('access.gearSupport', $event)" />
              <DossierField label="Permitted Areas" :value="character.access.permitted" wide @commit="commitCharacterPath('access.permitted', $event)" />
              <DossierField label="Restricted Areas" :value="character.access.restricted" wide @commit="commitCharacterPath('access.restricted', $event)" />
              <DossierField label="Current Access Damage" :value="character.access.damage" wide @commit="commitCharacterPath('access.damage', $event)" />
            </div>
          </template>

          <DossierCardSection v-else :kind="section.render || ''" />
        </DossierFormSection>

        <DossierFormSection
          title="GM Classified Dossier"
          code="EYES ONLY"
          :collapsed="ui.collapsed.GM"
          gm
          @toggle="toggleSection('GM')"
        >
          <div class="eid-field-grid" :class="{ 'eid-redacted-grid': !ui.gm }">
            <DossierField
              v-for="field in GM_FIELDS"
              :key="field.p"
              :label="field.l"
              :value="fieldValue(field.p)"
              @commit="commitCharacterPath(field.p, $event)"
            />
          </div>
          <p v-if="!ui.gm" class="eid-gmnotice">CONTENTS REDACTED - enable GM Mode to read or edit. Hidden information creates context and consequence; it never contradicts the visible sheet.</p>
        </DossierFormSection>
      </div>

      <DossierStatusSidebar :character="character" />
    </div>
  </div>

  <p v-else class="eid-note">No personnel on file. Create one to begin.</p>
</template>

<script setup lang="ts">
import { GM_FIELDS, REF, SECTIONS } from '~/data/dossier'
import { getPath } from '~/utils/dossier'

const {
  db,
  ui,
  activeChar: character,
  selectCharacter,
  addCharacter,
  duplicateCharacter,
  removeCharacter,
  toggleSection,
  commitCharacterPath,
  setSelect,
} = useCampaignDossier()

function fieldValue(path: string) {
  return getPath(character.value, path) as string | number | null | undefined
}

function newCharacter() {
  const name = prompt('Subject name (leave blank to assign later):') || ''
  addCharacter(name)
}

function destroyCharacter() {
  if (db.value.characters.length <= 1) {
    alert('At least one dossier must remain on file.')
    return
  }

  if (confirm('Destroy this personnel file? Export first if you want a copy.')) {
    removeCharacter()
  }
}

</script>
