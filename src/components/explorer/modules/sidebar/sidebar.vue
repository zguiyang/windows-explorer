<template>
<div class="explorer-left-sidebar-wrapper">
  <div class="sidebar-stick-wrapper">
<!--    <n-tree block-line expand-on-click selectable default-expand-all :data="menuTree2"></n-tree>-->
  </div>
  <div class="sidebar-menu-wrapper">
    <n-tree block-line expand-on-click selectable :data="menuTree"></n-tree>
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
        key: 'root-1',
        children: [
          {
            label: '一级目录',
            key: 'root-1-1',
            children: [
              {
                label: '一级子目录1',
                key: 'root-1-1-1',
              },
            ],
          },
          {
            label: '二级目录',
            key: 'root-1-2',
          },
          {
            label: '三级目录',
            key: 'root-1-3',
          },
          {
            label: '四级目录',
            key: 'root-1-4',
          },
        ],
      },
    ];

    // const menuTree2: TreeOption[] = [
    //   {
    //     label: '快速访问',
    //     key: 'root-1',
    //     children: [
    //       {
    //         label: '快速访问一',
    //         key: 'root-1-1',
    //       },
    //       {
    //         label: '快速访问二',
    //         key: 'root-1-2',
    //       },
    //       {
    //         label: '快速访问三',
    //         key: 'root-1-3',
    //       },
    //       {
    //         label: '快速访问四',
    //         key: 'root-1-4',
    //       },
    //     ],
    //   },
    // ];

    return {
      menuTree,
    };

  },
} );
</script>

<style scoped>

</style>