import { flatTreeArray } from 'quick-utils-js';

import { useExplorerStore } from '@/store/explorer';

export function useTopSearchData () {

  const store = useExplorerStore ();

  const parentFile = computed ( () => store.parentFile );

  const isHaveParentFolder = computed ( () => parentFile.value?.path === '/' );

  const navigationHistoryList = ref<string[]> ( [] );

  const navigationInputVal = ref<string | null> ( null );

  const formatNavigationInputVal = () => {

    navigationInputVal.value = parentFile.value && parentFile.value.path;

  };

  watch ( () => store.parentFile, () => {

    formatNavigationInputVal ();

  } );

  const navigationInputChange = ( val: string | null ) => {

    if ( val !== '/' ) {

      navigationHistoryList.value = store.navigationHistoryList.filter ( folder => folder.path.includes ( val ) ).map ( item => item.path );

    }

  };

  const gotoTargetFolder = () => {

    const targetFolder = store.explorerFileList.find ( folder => folder.path === navigationInputVal.value && folder.isFolder );

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
    isHaveParentFolder,
    navigationInputChange,
    gotoTargetFolder,
  };

}

// 导航操作

export function useNavigationOperation () {

  const store = useExplorerStore ();

  const parentFile = computed ( () => store.parentFile );

  const goToSuperiorFolder = () => {

    if ( parentFile.value?.parentPath ) {

      const targetFolder = store.explorerFileList.find ( folder => folder.path === parentFile.value.parentPath && folder.isFolder );

      if ( !targetFolder ) {

        console.error ( '不存在此目录' );

      } else {

        store.updateParentFile ( targetFolder );

      }

    }

  };

  return {
    goToSuperiorFolder,
  };

}