import { dateFormat, generateID } from 'quick-utils-js';

import { useExplorerStore } from '@/store/explorer';

import { CreateFileEnum, ExplorerFileItem, FolderMenuItem } from '@/lib/explorer-type';

import { NEW_FOLDER_DEFAULT_NAME, NEW_TXT_DEFAULT_NAME } from '@/lib/constant';

import { pathResolve } from '@/helper/utils';

/**
 * 检查当前目录下是否已存在相同的文件名
 * @param { string } name 需要检查的文件名
 * @param { ExplorerFileItem[] } list 当前目录文件列表
 * @return { ExplorerFileItem | null }
 * **/

export function checkExistingFileName ( name: string, list: ExplorerFileItem [] ):ExplorerFileItem | null {

  return list.find ( it => it.name === name );

}

/**
 * 创建各种文件的操作方法
 * @param { CreateFileEnum } key 创建文件的类型
 * **/

export function createFileOperation ( key: CreateFileEnum ) {

  const store = useExplorerStore ();

  const parentFile = computed ( () => store.parentFile );

  if ( !parentFile ) {

    return false;

  }

  const newFileItem: FolderMenuItem | ExplorerFileItem = {
    id: generateID (),
    name: '',
    parentPath: parentFile.value.path,
    path: '',
    isFolder: true,
    fileType: null,
    fileSize: 0,
    createTime: dateFormat ( new Date ().getTime () ),
    updateTime: dateFormat ( new Date ().getTime () ),
  };

  /**
   * 创建文件名称
   * **/

  const createFileName = ( str: string ): string => {

    const haveItem = checkExistingFileName ( str, store.currentFiles );

    console.log ( store.currentFiles );

    if ( haveItem ) {

      console.log ( str, haveItem.name, store.currentFiles );

      const matchArr = str.match ( /（\d）/gi );

      const matchIndex = matchArr ? Number ( matchArr[ 0 ].replace ( /（|）/, '' ) ) : -1;

      console.log ( matchIndex );

      return matchIndex > -1 ? `${ str }（${ matchIndex + 1 }）` : `${ str }（${matchIndex + 3}）`;

    }

    return str;

  };

  /*各种文件的具体执行的逻辑*/

  switch ( key ) {

    case CreateFileEnum.FOLDER:

      console.log ( createFileName ( NEW_FOLDER_DEFAULT_NAME ), parentFile.value.path );

      newFileItem.name = createFileName ( NEW_FOLDER_DEFAULT_NAME );

      newFileItem.path = pathResolve ( parentFile.value.path, newFileItem.name );

      break;

    case CreateFileEnum.TXT:

      newFileItem.isFolder = false;

      newFileItem.name = createFileName ( NEW_TXT_DEFAULT_NAME );

      newFileItem.fileType = CreateFileEnum.TXT;

      newFileItem.path = pathResolve ( parentFile.value.path, newFileItem.name );

      break;

    default:

      console.error ( '未知的创建操作' );

      break;

  }

  console.log ( '新增：', newFileItem );

  store.updateExplorerFile ( newFileItem );

}