import { defineStore } from 'pinia';

import { initExplorerStorage, getExplorerFileList, getFolderMenuList, getCurrentFiles, getParentFile,
  updateExplorerFileListStorage, updateFolderMenuListStorage, updateParentFileStorage, updateCurrentFilesStorage } from '@/lib/explorer-storage';

import { ExplorerFileItem, FolderMenuItem } from '@/lib/explorer-type';

// 生成文件目录tree

function createFolderMenuList ( files: ExplorerFileItem[] ):FolderMenuItem[] | null {

  const res: FolderMenuItem[] = [];

  // const hashTable = {};
  //

  const data = files.filter ( file => file.isFolder );

  const getChildren = ( res, parentPath ) => {

    data.forEach ( ( item, index ) => {

      if ( item.path === parentPath ) {

        const newItem = { ...item, children: [] };

        res.push ( newItem );

        if ( data.splice ( index, 1 ).length ) {

          getChildren ( newItem.children, newItem.path );

        }

      } else {

        if ( !res.find ( it => it.path === item.path ) ) {

          res.push ( item );

        }

      }

    } );

  };

  getChildren ( res, '/' );

  return res;

}

export const useExplorerStore = defineStore ( 'explorer', () => {

  const explorerFileList = ref<Array<ExplorerFileItem|FolderMenuItem>> ( getExplorerFileList () );

  const folderMenuList = ref<FolderMenuItem[]> ( getFolderMenuList () );

  const currentFiles = ref<Array<ExplorerFileItem|FolderMenuItem>> ( getCurrentFiles () );

  const parentFile = ref<FolderMenuItem|null> ( getParentFile () );

  function updateExplorerFile ( payload: ExplorerFileItem | FolderMenuItem ) {

    if ( explorerFileList.value.find ( it => it.path === payload.path ) ) {

      return false;

    }

    explorerFileList.value.push ( payload );

    updateExplorerFileListStorage ( explorerFileList.value );

    updateCurrentFileList ();

    updateFolderMenuList ();

  }

  function updateCurrentFileList ( ) {

    explorerFileList.value.forEach ( item => {

      if ( item.parentPath === parentFile.value.path ) {

        if ( !currentFiles.value.find ( file => file.path === item.path ) ) {

          currentFiles.value.push ( item );

        }

      }

    } );

    updateCurrentFilesStorage ( currentFiles.value );

  }

  function updateFolderMenuList () {

    folderMenuList.value = createFolderMenuList ( explorerFileList.value );

    updateFolderMenuListStorage ( folderMenuList.value );

  }

  function updateParentFile ( data: FolderMenuItem ) {

    parentFile.value = data;

    currentFiles.value = parentFile.value.children ?? [];

    updateParentFileStorage ( data );

  }

  /**初始化结构数据**/

  function initExplorerData ( ) {

    initExplorerStorage ();

  }

  return {
    explorerFileList,
    folderMenuList,
    parentFile,
    currentFiles,
    initExplorerData,
    updateExplorerFile,
    updateParentFile,
  };

} );