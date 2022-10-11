<template>
<div class="explorer-left-sidebar-wrapper">
  <div class="sidebar-stick-wrapper">
<!--    <n-tree block-line expand-on-click selectable default-expand-all :data="menuTree2"></n-tree>-->
  </div>
  <div class="sidebar-menu-wrapper">
    <n-tree block-line expand-on-click selectable :data="menuTreeList"></n-tree>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useSideBarData } from './hooks';

export default defineComponent ( {
  name: 'explorer-sidebar',
  setup () {

    const { menuTreeList } = useSideBarData ();

    return {
      menuTreeList,
    };

  },
} );
</script>

<style scoped>

</style>