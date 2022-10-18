import { defineStore } from 'pinia';

import { concat, findIndex } from 'lodash';

import { initExplorerStorage, getExplorerFileList, getFolderMenuList, getCurrentFiles, getParentFile,
  updateExplorerFileListStorage, updateFolderMenuListStorage, updateParentFileStorage, updateCurrentFilesStorage, getNavigationHistoryStorage,
  updateNavigationHistoryStorage } from '@/lib/explorer-storage';

import { createFolderMenuList } from '@/lib/explorer-utils';

import { ExplorerFileItem, FolderMenuItem } from '@/lib/explorer-type';


export const useExplorerStore = defineStore ( 'explorer', () => {

  const explorerFileList = ref<Array<ExplorerFileItem|FolderMenuItem>> ( getExplorerFileList () );

  const folderMenuList = ref<FolderMenuItem[]> ( getFolderMenuList () );

  const currentFiles = ref<Array<ExplorerFileItem|FolderMenuItem>> ( getCurrentFiles () );

  const navigationHistoryList = ref<FolderMenuItem[]> ( getNavigationHistoryStorage () );

  const searchHistoryList = ref<Array<ExplorerFileItem|FolderMenuItem>> ( [] );

  const editFileId = ref<string|null> ( null );

  const parentFile = ref<FolderMenuItem|null> ( getParentFile () );

  function updateExplorerFile ( payload: ExplorerFileItem | FolderMenuItem ) {

    if ( explorerFileList.value.find ( it => it.path === payload.path ) ) {

      return false;

    }

    explorerFileList.value.push ( payload );

    updateExplorerFileListStorage ( explorerFileList.value );

    updateCurrentFileList ();

    updateFolderMenuList ();

    updateEditFileId ( payload.id );

  }

  function updateEditFileId ( id: string | null ) {

    editFileId.value = id;

  }

  function updateOneFile ( payload: ExplorerFileItem ) {

    const replaceIndex = findIndex ( explorerFileList.value, file => file.id === editFileId.value );

    if ( replaceIndex > -1 ) {

      explorerFileList.value.splice ( replaceIndex, 1, payload );

      updateExplorerFileListStorage ( explorerFileList.value );

      updateCurrentFileList ();

      updateFolderMenuList ();

      updateEditFileId ( null );

    }


  }

  function updateCurrentFileList ( ) {

    const folderItems: ExplorerFileItem[] = [];

    const fileItems:ExplorerFileItem[] = [];

    if ( !parentFile.value ) {

      return false;

    }

    explorerFileList.value.forEach ( item => {

      if ( item.parentPath === parentFile.value.path ) {

        item.isFolder ? folderItems.push ( item ) : fileItems.push ( item );

      }

    } );

    currentFiles.value = concat ( folderItems, fileItems );

    updateCurrentFilesStorage ( currentFiles.value.sort ( ( a:any, b:any ) => b - a ) );

  }

  function updateFolderMenuList () {

    folderMenuList.value = createFolderMenuList ( explorerFileList.value );

    updateFolderMenuListStorage ( folderMenuList.value );

  }

  function updateParentFile ( data: FolderMenuItem ) {

    parentFile.value = data;

    currentFiles.value = parentFile.value.children ?? [];

    updateParentFileStorage ( data );

    updateCurrentFileList ();

  }

  function updateNavigationHistoryList ( data: FolderMenuItem ) {

    if ( !navigationHistoryList.value.find ( folder => folder.path === data.path ) ) {

      navigationHistoryList.value.push ( data );

      updateNavigationHistoryStorage ( navigationHistoryList.value );

    }

  }

  /**初始化结构数据**/

  function initExplorerData ( ) {

    initExplorerStorage ();

  }

  return {
    explorerFileList,
    folderMenuList,
    parentFile,
    editFileId,
    currentFiles,
    navigationHistoryList,
    searchHistoryList,
    initExplorerData,
    updateExplorerFile,
    updateParentFile,
    updateEditFileId,
    updateOneFile,
    updateNavigationHistoryList,
  };

} );