<template>
  <div class="explorer-wrapper">
    <div class="explorer-tools-wrapper">
      <e-top-tools></e-top-tools>
    </div>
    <div class="explorer-search-wrapper">
      <e-top-search></e-top-search>
    </div>
    <div class="explorer-main-wrapper">
      <div class="explorer-sidebar-wrapper">
        <e-sidebar></e-sidebar>
      </div>
      <div class="explorer-container-wrapper">
        <e-container></e-container>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ETopTools from './modules/top-tools.vue';

import ETopSearch from './modules/top-search.vue';

import ESidebar from './modules/sidebar.vue';

import EContainer from './modules/container.vue';

import { defineComponent } from 'vue';

export default defineComponent ( {
  name: 'Explorer',
  components: { ETopTools, ETopSearch, ESidebar, EContainer },
} );
</script>

<style scoped>

</style>