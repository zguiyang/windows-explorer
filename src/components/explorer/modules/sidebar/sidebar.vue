<template>
<div class="explorer-left-sidebar-wrapper">
  <div class="sidebar-stick-wrapper">
    置顶区域
  </div>
  <div class="sidebar-menu-wrapper">
    <n-tree block-line expand-on-click default-expand-all	 :data="menuTree"></n-tree>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { TreeOption } from 'naive-ui';

export default defineComponent ( {
  name: 'explorer-sidebar',
  setup () {

    const menuTree: TreeOption[] = [
      {
        label: '根目录',
        children: [
          {
            label: '一级目录',
          },
        ],
      },
    ];

    return {
      menuTree,
    };

  },
} );
</script>

<style scoped>

</style>