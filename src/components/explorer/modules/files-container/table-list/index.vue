<template>
<div class="files-container-table-list">
<n-data-table :columns="tableColumns" :data="tableData"></n-data-table>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useTableListData } from './hooks';

export default defineComponent ( {
  name: 'table-list',
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