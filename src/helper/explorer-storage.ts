import { get } from 'lodash';

import { ExplorerFile, FolderMenuItem } from '@/store/explorer';

export type ExplorerStorage = {
  explorerFileList: ExplorerFile[],
  folderMenuList: FolderMenuItem[],
  currentFiles: Array<ExplorerFile|FolderMenuItem>,
  parentFile: FolderMenuItem|null,
}


export function initExplorerStorage ( data:ExplorerStorage ) {

  const explorer = getExplorerStorage ();

  if ( explorer ) {

    return false;

  } else {

    localStorage.setItem ( 'explorer', JSON.stringify ( data ) );

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

