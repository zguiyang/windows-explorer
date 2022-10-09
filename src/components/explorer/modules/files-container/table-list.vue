<template>
<div class="files-container-table-list">
<n-data-table :columns="tableColumn" :data="tableData" :border="false"></n-data-table>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { DataTableColumn } from 'naive-ui';

export default defineComponent ( {
  name: 'table-list',
  setup () {

    const tableColumn: DataTableColumn[] = [
      {
        title: '名称',
        key: 'name',
      },
      {
        title: '修改日期',
        key: 'updateTime',
        width: 180,
      },
      {
        title: '类型',
        key: 'fileType',
        width: 120,
      },
      {
        title: '大小',
        key: 'fileSize',
        width: 120,
      },
    ];

    const tableData = [
      {
        name: '文件夹一',
        updateTime: '2022-10-9 10:22:00',
        fileType: 'folder',
        fileSize: '1M',
      },
    ];

    return {
      tableColumn,
      tableData,
    };

  },
} );
</script>

<style scoped>

</style>