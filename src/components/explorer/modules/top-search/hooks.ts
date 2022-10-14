import { useExplorerStore } from '@/store/explorer';

export function useTopSearchData () {

  const store = useExplorerStore ();

  const parentFile = computed ( () => store.parentFile );

  const navigationInputVal = ref<string| undefined> ( undefined );

  const updateNavigationInputVal = () => {

    if ( parentFile.value ) {

      navigationInputVal.value = parentFile.value.path === '/' ? parentFile.value.name : parentFile.value.path;

    }

  };

  watch ( () => store.parentFile, () => {

    updateNavigationInputVal ();

  } );

  onMounted ( () => {

    updateNavigationInputVal ();

  } );

  return {
    navigationInputVal,
  };

}