<template>
<div class="files-container-table-list">
<n-data-table :columns="tableColumns" :data="tableData">
  <template #empty>
    <n-space vertical :size="12">
      <n-p style="text-align: center;">
        <n-icon :size="32">
          <archive16-regular></archive16-regular>
        </n-icon>
      </n-p>
      <n-p>暂无数据，你可以点击左上角的新建按钮创建资源</n-p>
    </n-space>
  </template>
</n-data-table>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { Archive16Regular } from '@vicons/fluent';

import { useTableListData } from './hooks';

export default defineComponent ( {
  name: 'table-list',
  components: { Archive16Regular },
  setup () {

    const { tableColumns, tableData } = useTableListData ();


    return {
      tableData,
      tableColumns,
    };

  },
} );
</script>

<style scoped>

</style>