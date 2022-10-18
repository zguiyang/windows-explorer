import { flatTreeArray } from 'quick-utils-js';

import { useExplorerStore } from '@/store/explorer';

export function useTopSearchData () {

  const store = useExplorerStore ();

  const parentFile = computed ( () => store.parentFile );

  const navigationHistoryList = ref<string[]> ( [] );

  const navigationInputVal = ref<string | null> ( null );

  const formatNavigationInputVal = () => {

    navigationInputVal.value = parentFile.value && parentFile.value.path;

  };

  watch ( () => store.parentFile, () => {

    formatNavigationInputVal ();

  } );

  const navigationInputChange = ( val: string | null ) => {

    console.log ( val );

    navigationHistoryList.value = store.navigationHistoryList.filter ( folder => folder.path.includes ( val ) ).map ( item => item.path );

  };

  const gotoTargetFolder = () => {

    const folderList = flatTreeArray ( store.folderMenuList || [] );

    const targetFolder = folderList.find ( folder => folder.path === navigationInputVal.value );

    if ( !targetFolder ) {

      console.error ( '不存在此目录' );

    } else {

      store.updateNavigationHistoryList ( targetFolder );

      store.updateParentFile ( targetFolder );

    }

  };

  onMounted ( () => {

    formatNavigationInputVal ();

  } );

  return {
    navigationInputVal,
    navigationHistoryList,
    navigationInputChange,
    gotoTargetFolder,
  };

}