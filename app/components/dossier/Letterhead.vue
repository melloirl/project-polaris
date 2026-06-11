<template>
  <header class="eid-letterhead">
    <div class="eid-org">
      <div class="eid-org__sigil" aria-hidden="true">E</div>
      <div>
        <h1>Eidolon</h1>
        <div class="eid-org__sub">Advanced Research Directorate - Personnel Dossier System</div>
      </div>
    </div>
    <div class="eid-stamp">{{ stamp }}</div>
    <div class="eid-fileline">
      File Ref. <b>{{ fileRef }}</b><br>
      Era: <b>1970s - Welderhide Operations</b><br>
      Form Rev. <b>S2 / v0.1</b>
    </div>
  </header>
</template>

<script setup lang="ts">
const { fileRef, stamp } = useCampaignDossier()
</script>
