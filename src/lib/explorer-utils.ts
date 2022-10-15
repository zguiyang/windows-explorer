import { dateFormat, generateID } from 'quick-utils-js';

import { useExplorerStore } from '@/store/explorer';

import { CreateFileEnum, ExplorerFileItem, FolderMenuItem } from '@/lib/explorer-type';

import { NEW_FOLDER_DEFAULT_NAME, NEW_TXT_DEFAULT_NAME } from '@/lib/constant';

import { pathResolve } from '@/helper/utils';

/**
 * 创建各种文件的操作方法map
 * **/

export function createFileOperationMap () {

  const store = useExplorerStore ();

  const parentFile = computed ( () => store.parentFile );

  // const newFileItem: FolderMenuItem | ExplorerFileItem = {};


  /**创建文件夹**/

  const createFolder = () => {

    if ( !parentFile ) {

      return false;

    }

    const parentPath = parentFile.value.path;

    const newFolder:FolderMenuItem = {
      id: generateID (),
      name: NEW_FOLDER_DEFAULT_NAME,
      parentPath,
      path: '',
      isFolder: true,
      fileSize: 0,
      createTime: dateFormat ( new Date ().getTime () ),
      updateTime: dateFormat ( new Date ().getTime () ),
    };

    newFolder.path = pathResolve ( newFolder.parentPath, newFolder.name );

    store.updateExplorerFile ( newFolder );

  };

  /**创建TXT文件**/

  const createTXT = () => {

    if ( !parentFile ) {

      return false;

    }

    const parentPath = parentFile.value.path;

    const newTXT:ExplorerFileItem = {
      id: generateID (),
      name: NEW_TXT_DEFAULT_NAME,
      parentPath,
      path: '',
      fileType: 'TXT',
      isFolder: false,
      fileSize: 0,
      createTime: dateFormat ( new Date ().getTime () ),
      updateTime: dateFormat ( new Date ().getTime () ),
    };

    newTXT.path = pathResolve ( newTXT.parentPath, newTXT.name );

    store.updateExplorerFile ( newTXT );

  };

  return new Map ( [
    [ CreateFileEnum.FOLDER, createFolder ],
    [ CreateFileEnum.TXT, createTXT ],
  ] );

}