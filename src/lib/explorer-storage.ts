import { get } from 'lodash';

import { dateFormat, generateID } from 'quick-utils-js';

import { useExplorerStore } from '@/store/explorer';

import { ROOT_DIR_NAME, LOCAL_STORAGE_EXPLORER_NAME } from '@/lib/constant';

import { ExplorerFileItem, FolderMenuItem, ExplorerStorage } from './explorer-type';

// 存放文件的根目录，不可变

export const DEFAULT_ROOT_EXPLORER_DATA:ExplorerFileItem = {
  id: generateID (),
  name: ROOT_DIR_NAME,
  parentPath: null,
  path: '/',
  fileSize: 0,
  isFolder: true,
  createTime: dateFormat ( new Date ().getTime () ),
  updateTime: null,
};

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

    localStorage.setItem ( LOCAL_STORAGE_EXPLORER_NAME, JSON.stringify ( defaultExplorer ) );

    store.updateExplorerFile ( DEFAULT_ROOT_EXPLORER_DATA );

    store.updateParentFile ( defaultExplorer.parentFile );

  }

}

// 获取本地存储数据

export function getExplorerStorage ( key?: keyof ExplorerStorage ): any {

  const explorer = localStorage.getItem ( LOCAL_STORAGE_EXPLORER_NAME );

  if ( !explorer ) {

    return null;

  }

  return key ? get ( JSON.parse ( explorer ), key ) : JSON.parse ( explorer );

}

// 更新本地数据

export function updateExplorerStorage ( key: keyof ExplorerStorage, data: ExplorerStorage[ keyof ExplorerStorage ] ) {

  const explorer = getExplorerStorage ();

  if ( explorer ) {

    explorer[ key ] = data;

    localStorage.setItem ( LOCAL_STORAGE_EXPLORER_NAME, JSON.stringify ( explorer ) );

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