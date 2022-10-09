<template>
<div class="explorer-right-files-container-wrapper">
  <table-list></table-list>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import TableList from './table-list.vue';

export default defineComponent ( {
  name: 'explorer-container',
  components: { TableList },
  setup () {

    // do nothing

  },
} );
</script>


<style scoped>

</style>