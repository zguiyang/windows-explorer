<template>
<div class="explorer-left-sidebar-wrapper">
  <div class="sidebar-stick-wrapper">
<!--    <n-tree block-line expand-on-click selectable default-expand-all :data="menuTree2"></n-tree>-->
  </div>
  <div class="sidebar-menu-wrapper">
    <n-tree block-line :data="menuTreeList" :render-switcher-icon="renderSwitcherIcon"
     :node-props="treeNodeProps" :default-expanded-keys="defaultExpandedKeys" :default-selected-keys="defaultSelectedKeys"></n-tree>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useSideBarHooks } from './hooks';

export default defineComponent ( {
  name: 'explorer-sidebar',
  setup () {

    const { menuTreeList, defaultExpandedKeys, defaultSelectedKeys, treeNodeProps,
      renderSwitcherIcon } = useSideBarHooks ();

    return {
      menuTreeList,
      defaultExpandedKeys,
      defaultSelectedKeys,
      treeNodeProps,
      renderSwitcherIcon,
    };

  },
} );
</script>

<style scoped>

</style>
