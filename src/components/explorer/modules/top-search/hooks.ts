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

    const targetFile = store.explorerFileList.find ( folder => folder.path === navigationInputVal.value );

    if ( !targetFile ) {

      window.$message.error ( '目标文件或目录不存在' );

    } else {

      if ( targetFile.isFolder ) {

        store.updateNavigationHistoryList ( targetFile );

        store.updateParentFile ( targetFile );

      } else {

        const parentFileFolder = store.explorerFileList.find ( folder => folder.path === targetFile.parentPath && folder.isFolder );

        store.updateNavigationHistoryList ( parentFileFolder );

        store.updateParentFile ( parentFileFolder );

      }

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
