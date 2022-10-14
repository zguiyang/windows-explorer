import { get } from 'lodash';

import { dateFormat, generateID } from 'quick-utils-js';

export type ExplorerFileType = 'TXT' | 'JPG' | 'PNG' | 'MP4';

export const enum CreateFileEnum {
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


export type ExplorerStorage = {
  explorerFileList: ExplorerFile[],
  folderMenuList: FolderMenuItem[],
  currentFiles: Array<ExplorerFile|FolderMenuItem>,
  parentFile: FolderMenuItem|null,
}


export function initExplorerStorage ( ) {

  const explorer = getExplorerStorage ();

  const defaultExplorer: ExplorerStorage = {
    explorerFileList: [ DEFAULT_ROOT_MENU_TREE ],
    folderMenuList: [ DEFAULT_ROOT_MENU_TREE ],
    currentFiles: [],
    parentFile: DEFAULT_ROOT_MENU_TREE,
  };

  if ( explorer ) {

    return false;

  } else {

    localStorage.setItem ( 'explorer', JSON.stringify ( defaultExplorer ) );

  }

}

export function getExplorerStorage ( key?: keyof ExplorerStorage ): ExplorerFile[] | FolderMenuItem[] | Array<ExplorerFile|FolderMenuItem> | FolderMenuItem | ExplorerStorage | null {

  const explorer = localStorage.getItem ( 'explorer' );

  if ( !explorer ) {

    return null;

  }

  return key ? get ( JSON.parse ( explorer ), key ) : JSON.parse ( explorer );

}


export function updateExplorerStorage ( data: ExplorerFile[] | FolderMenuItem[] | Array<ExplorerFile|FolderMenuItem> | FolderMenuItem, key: keyof ExplorerStorage ) {

  const explorer = getExplorerStorage ();

  if ( explorer ) {

    explorer[ key ] = data;

    localStorage.setItem ( 'explorer', JSON.stringify ( explorer ) );

  }

}

