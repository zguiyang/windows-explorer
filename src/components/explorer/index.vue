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
        <n-scrollbar style="max-height: 500px" x-scrollable>
          <e-sidebar></e-sidebar>
        </n-scrollbar>
      </div>
      <div class="explorer-container-wrapper">
        <e-container></e-container>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useMessage } from 'naive-ui';


import { ETopTools } from './modules/top-tools';

import { ETopSearch } from './modules/top-search';

import { ESidebar } from './modules/sidebar';

import { EContainer } from './modules/files-container';

import { defineComponent } from 'vue';

export default defineComponent ( {
  name: 'Explorer',
  components: { ETopTools, ETopSearch, ESidebar, EContainer },
  setup () {

    window.$message = useMessage ();

  },
} );
</script>

<style scoped>

</style>
