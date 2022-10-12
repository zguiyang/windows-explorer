import { defineStore } from 'pinia';

import { generateID, dateFormat } from 'quick-utils-js';

export type ExplorerFileType = 'TXT' | 'JPG' | 'PNG' | 'MP4';

export enum CreateFileEnum {
  FOLDER= 'FOLDER',
  TXT='TXT',
}

export type ExplorerFile = {
  id: string, // 文件或目录唯一标识
  name: string, // 文件名称
  parentPath: string | null, // 父级目录
  path:string, // 文件本身全路径
  fileType?: ExplorerFileType, //文件本身类型
  isFolder: boolean, // 是否是文件夹
  fileSize: number | string, // 文件大小， 字节
  children?: ExplorerFile[], // 如果是文件夹，则存放其目录下的文件，无限级
  updateTime: string | null, // 文件修改的时间
  createTime: string | null, // 文件的创建时间
}

export type FolderMenuItem = Omit<ExplorerFile, 'fileType'>;

// 存放文件的根目录，不可变

export const DEFAULT_ROOT_MENU_TREE:ExplorerFile = {
  id: generateID (),
  name: '根目录',
  parentPath: null,
  path: '/',
  fileSize: 0,
  isFolder: true,
  createTime: dateFormat ( new Date ().getTime () ),
  updateTime: null,
};

// 生成文件目录tree

function createFolderMenuList ( files: ExplorerFile[] ):FolderMenuItem[] | null {

  const res: FolderMenuItem[] = [];

  // const hashTable = {};
  //

  const data = files.filter ( file => file.isFolder );

  //
  // data.forEach ( item => {
  //
  //   const parentItem = hashTable[ parentPath ];
  //
  //   if ( !parentItem ) {
  //
  //     hashTable[ item.path ] = { children: [] };
  //
  //   }
  //
  // } );

  const getChildren = ( res, parentPath ) => {

    data.forEach ( ( item, index ) => {

      if ( item.path === parentPath ) {

        const newItem = { ...item, children: [] };

        res.push ( newItem );

        console.log ( index, data );

        if ( data.splice ( index, 1 ).length ) {

          getChildren ( newItem.children, newItem.path );

        }

      } else {

        res.push ( item );

      }

    } );

  };

  getChildren ( res, '/' );

  return res;

}

export const useExplorerStore = defineStore ( 'explorer', () => {

  const explorerFileList = ref<ExplorerFile[]> ( [] );

  const folderMenuList = ref<FolderMenuItem[]> ( [ ] );

  const currentFiles = ref<ExplorerFile[]> ( [ ] );

  const parentFile = ref<FolderMenuItem|null> ( null );

  function updateExplorerFile ( payload: ExplorerFile | FolderMenuItem ) {

    if ( explorerFileList.value.find ( it => it.path === payload.path ) ) {

      return false;

    }

    explorerFileList.value.push ( payload );

    updateFolderMenuList ();

  }

  function updateCurrentFiles ( payload: ExplorerFile[] ) {

    currentFiles.value = payload;

  }

  function updateFolderMenuList () {

    folderMenuList.value = createFolderMenuList ( explorerFileList.value );

  }

  /**初始化结构数据**/

  function initExplorerData ( ) {

    explorerFileList.value.push ( DEFAULT_ROOT_MENU_TREE );

    parentFile.value = DEFAULT_ROOT_MENU_TREE;

    updateFolderMenuList ();

  }

  return { explorerFileList, folderMenuList, parentFile, currentFiles, initExplorerData, updateExplorerFile, updateCurrentFiles };

} );