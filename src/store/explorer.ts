import { defineStore } from 'pinia';

import { generateID, dateFormat } from 'quick-utils-js';

import { cloneDeep, omit } from 'lodash';

export type ExplorerFile = {
  id: string, // 文件或目录唯一标识
  name: string, // 文件名称
  parentPath: string | null, // 父级目录
  path:string, // 文件本身全路径
  fileType?: 'txt' | 'jpg' | 'png' | 'mp4', //文件本身类型
  isFolder: boolean, // 是否是文件夹
  fileSize: number | string, // 文件大小， 字节
  children?: ExplorerFile[], // 如果是文件夹，则存放其目录下的文件，无限级
  updateTime: string | null, // 文件修改的时间
  createTime: string | null, // 文件的创建时间
}

export type FileMenuTree = Omit<ExplorerFile, 'fileType'>;

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

function createFileMenuTreeList ( files: ExplorerFile[], parentPath: string ):FileMenuTree[] {

  const result:FileMenuTree[] = [];

  files.forEach ( item => {

    if ( !item.isFolder ) {

      return false;

    }

    if ( item.parentPath === parentPath ) {

      const temp = cloneDeep<FileMenuTree> ( omit ( item, [ 'fileType' ] ) );

      temp.children = createFileMenuTreeList ( files, temp.path );

      result.push ( temp );

    } else {

      if ( !result.find ( res => res.id === item.id ) ) {

        result.push ( item );

      }

    }

  } );


  return result;

}

export const useExplorerStore = defineStore ( 'explorer', () => {

  const fileList = ref<ExplorerFile[]> ( [] );

  const fileMenuTreeList = ref<FileMenuTree[]> ( [ ] );

  const currentFiles = ref<ExplorerFile[]> ( [ ] );

  const currentFile = ref<FileMenuTree|null> ( null );

  function addFile ( file: ExplorerFile ) {

    fileList.value.push ( file );

  }

  function setCurrentFiles ( list: ExplorerFile[] ) {

    currentFiles.value = list;

  }

  function setFileMenuTreeList () {

    fileMenuTreeList.value = createFileMenuTreeList ( fileList.value, '/' );

  }

  /**初始化结构数据**/

  function initExplorerData ( ) {

    fileList.value.push ( DEFAULT_ROOT_MENU_TREE );

    currentFile.value = DEFAULT_ROOT_MENU_TREE;

    setFileMenuTreeList ();

  }

  return { fileList, fileMenuTreeList, currentFile, currentFiles, initExplorerData, addFile, setCurrentFiles };

} );