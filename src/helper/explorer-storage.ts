import { get } from 'lodash';

import { dateFormat, generateID } from 'quick-utils-js';

import { useExplorerStore } from '@/store/explorer';

import { ExplorerFileType } from './constant';

export type ExplorerFileItem = {
  id: string, // 文件或目录唯一标识
  name: string, // 文件名称
  parentPath: string | null, // 父级目录
  path:string, // 文件本身全路径
  fileType?: ExplorerFileType, //文件本身类型
  isFolder: boolean, // 是否是文件夹
  fileSize: number | string, // 文件大小， 字节
  children?: ExplorerFileItem[], // 如果是文件夹，则存放其目录下的文件，无限级
  updateTime: string | null, // 文件修改的时间
  createTime: string | null, // 文件的创建时间
}

export type FolderMenuItem = Omit<ExplorerFileItem, 'fileType'>;

// 存放文件的根目录，不可变

export const DEFAULT_ROOT_EXPLORER_DATA:ExplorerFileItem = {
  id: generateID (),
  name: '根目录',
  parentPath: null,
  path: '/',
  fileSize: 0,
  isFolder: true,
  createTime: dateFormat ( new Date ().getTime () ),
  updateTime: null,
};


export type ExplorerStorage = {
  explorerFileList: Array<ExplorerFileItem|FolderMenuItem>,
  folderMenuList: FolderMenuItem[],
  currentFiles: Array<ExplorerFileItem|FolderMenuItem>,
  parentFile: FolderMenuItem|null,
}

// 初始化

export function initExplorerStorage ( ) {

  const store = useExplorerStore ();

  const explorer = getExplorerStorage ();

  const defaultExplorer: ExplorerStorage = {
    explorerFileList: [ DEFAULT_ROOT_EXPLORER_DATA ],
    folderMenuList: [ DEFAULT_ROOT_EXPLORER_DATA ],
    currentFiles: [],
    parentFile: DEFAULT_ROOT_EXPLORER_DATA,
  };

  if ( explorer ) {

    return false;

  } else {

    localStorage.setItem ( 'explorer', JSON.stringify ( defaultExplorer ) );

    store.updateExplorerFile ( DEFAULT_ROOT_EXPLORER_DATA );

    store.updateParentFile ( defaultExplorer.parentFile );

  }

}

// 获取本地存储数据

export function getExplorerStorage ( key?: keyof ExplorerStorage ): any {

  const explorer = localStorage.getItem ( 'explorer' );

  if ( !explorer ) {

    return null;

  }

  return key ? get ( JSON.parse ( explorer ), key ) : JSON.parse ( explorer );

}

// 更新本地数据

export function updateExplorerStorage ( key: keyof ExplorerStorage, data: ExplorerFileItem[] | FolderMenuItem[] | Array<ExplorerFileItem|FolderMenuItem> | FolderMenuItem ) {

  const explorer = getExplorerStorage ();

  if ( explorer ) {

    explorer[ key ] = data;

    localStorage.setItem ( 'explorer', JSON.stringify ( explorer ) );

  }

}

export function getExplorerFileList (): ExplorerFileItem[] {

  return getExplorerStorage ( 'explorerFileList' ) || [];

}

export function getFolderMenuList (): FolderMenuItem[] {

  return getExplorerStorage ( 'folderMenuList' ) || [];

}

export function getCurrentFiles (): Array<ExplorerFileItem|FolderMenuItem> {

  return getExplorerStorage ( 'currentFiles' ) || [];

}

export function getParentFile (): FolderMenuItem | null {

  return getExplorerStorage ( 'parentFile' );

}

export function updateExplorerFileListStorage ( data: ExplorerFileItem[] ) {

  updateExplorerStorage ( 'explorerFileList', data );

}

export function updateFolderMenuListStorage ( data: FolderMenuItem[] ) {

  updateExplorerStorage ( 'folderMenuList', data );

}

export function updateCurrentFilesStorage ( data: Array<ExplorerFileItem|FolderMenuItem> ) {

  updateExplorerStorage ( 'currentFiles', data );

}

export function updateParentFileStorage ( data: FolderMenuItem ) {

  updateExplorerStorage ( 'parentFile', data );

}