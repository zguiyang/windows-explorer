<script setup lang="ts">
import { useExplorerStore } from '@/store/explorer';

import Explorer from './components/explorer/index.vue';

const store = useExplorerStore ();

onMounted ( () => {

  store.initExplorerData ();

} );
</script>

<template>
<explorer></explorer>
</template>