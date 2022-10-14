import { defineStore } from 'pinia';

import { ExplorerFile, FolderMenuItem, initExplorerStorage, getExplorerStorage, updateExplorerStorage } from '@/helper/explorer-storage';

// 生成文件目录tree

function createFolderMenuList ( files: ExplorerFile[] ):FolderMenuItem[] | null {

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

  const explorerFileList = ref<ExplorerFile[]> ( getExplorerStorage ( 'explorerFileList' ) as ExplorerFile[] || [] );

  const folderMenuList = ref<FolderMenuItem[]> ( getExplorerStorage ( 'folderMenuList' ) as FolderMenuItem[] || [] );

  const currentFiles = ref<Array<ExplorerFile|FolderMenuItem>> ( getExplorerStorage ( 'currentFiles' ) as Array<ExplorerFile|FolderMenuItem> || [] );

  const parentFile = ref<FolderMenuItem|null> ( getExplorerStorage ( 'parentFile' ) as FolderMenuItem | null );

  function updateExplorerFile ( payload: ExplorerFile | FolderMenuItem ) {

    if ( explorerFileList.value.find ( it => it.path === payload.path ) ) {

      return false;

    }

    explorerFileList.value.push ( payload );

    updateExplorerStorage ( explorerFileList.value, 'explorerFileList' );

    updateCurrentFiles ();

    updateFolderMenuList ();

  }

  function updateCurrentFiles ( ) {

    explorerFileList.value.forEach ( item => {

      if ( item.parentPath === parentFile.value.path ) {

        if ( !currentFiles.value.find ( file => file.path === item.path ) ) {

          currentFiles.value.push ( item );

        }

      }

    } );

    updateExplorerStorage ( currentFiles.value, 'currentFiles' );

  }

  function updateFolderMenuList () {

    folderMenuList.value = createFolderMenuList ( explorerFileList.value );

    updateExplorerStorage ( folderMenuList.value, 'folderMenuList' );

  }

  /**初始化结构数据**/

  function initExplorerData ( ) {

    initExplorerStorage ();

  }

  return { explorerFileList, folderMenuList, parentFile, currentFiles, initExplorerData, updateExplorerFile, updateCurrentFiles };

} );