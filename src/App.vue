<script setup lang="ts">
import type { GlobalTheme } from 'naive-ui';

import { useExplorerStore } from '@/store/explorer';

import Explorer from './components/explorer/index.vue';

const store = useExplorerStore ();

const theme = ref<GlobalTheme | null> ( null );

onMounted ( () => {

  store.initExplorerData ();

} );
</script>

<template>
  <n-config-provider :theme="theme">
    <n-message-provider>
      <explorer></explorer>
    </n-message-provider>
  </n-config-provider>
</template>
