import { dateFormat, generateID } from 'quick-utils-js';

import { useExplorerStore } from '@/store/explorer';

import { ExplorerFileItem, ExplorerFileTypeEnum, FolderMenuItem } from '@/lib/explorer-type';

import { EXPLORER_FILE_MODEL_MAP, NEW_UNKNOWN_DEFAULT_NAME } from '@/lib/constant';

import { pathResolve } from '@/helper/utils';

/**
 * 检查当前目录下是否已存在相同的文件名
 * @param { string } name 需要检查的文件名
 * @param { ExplorerFileItem[] } list 当前目录文件列表
 * @return { ExplorerFileItem | null }
 * **/

export function checkExistingFileName ( name: string, list: ExplorerFileItem[] ) {

  return list.find ( ( item ) => item.name === name );

}

/**
 * 创建各种文件的操作方法
 * @param { ExplorerFileTypeEnum } key 创建文件的类型
 * **/

export function createFileOperation ( key: ExplorerFileTypeEnum ) {

  const store = useExplorerStore ();

  const createFileModel = EXPLORER_FILE_MODEL_MAP[ key ];

  const parentFile = computed ( () => store.parentFile );

  const currentFiles = computed ( () => store.currentFiles );

  if ( !parentFile ) {

    return false;

  }


  /**
   * 创建文件名称
   * **/

  const createFileName = ( name?: string ): string => {

    const str = name || NEW_UNKNOWN_DEFAULT_NAME;

    // @ts-ignore

    const haveItems = currentFiles.value.filter ( file => file.name.includes ( str ) );

    if ( haveItems.length ) {

      const lastItem = haveItems[ haveItems.length - 1 ];

      const matchIndex = Number ( lastItem.name.replace ( /\D/gi, '' ) );

      return matchIndex <= 0 ? `${ str }（${ 2 }）` : `${ str }（${ matchIndex + 1 }）`;

    }

    return str;

  };

  /**
   * 创建新增的文件项
   * **/

  const createNewFileItem = () => {

    const fileItem: FolderMenuItem | ExplorerFileItem = {
      id: generateID (),
      name: '',
      parentPath: parentFile.value.path,
      path: '',
      isFolder: false,
      isEdit: true,
      fileType: key,
      fileTypeText: createFileModel?.fileTypeText,
      fileSize: 0,
      createTime: dateFormat ( new Date ().getTime () ),
      updateTime: dateFormat ( new Date ().getTime () ),
    };

    if ( key === ExplorerFileTypeEnum.FOLDER ) {

      fileItem.isFolder = true;

    }

    fileItem.name = createFileName ( createFileModel.defaultName );

    fileItem.path = pathResolve ( parentFile.value.path, fileItem.name );

    return fileItem;

  };

  const newFileItem = createNewFileItem ();

  if ( newFileItem.name && newFileItem.path.includes ( newFileItem.name ) ) {

    store.updateExplorerFile ( newFileItem );

  }

}

// 生成文件目录tree

export function createFolderMenuList ( files: ExplorerFileItem[] ):FolderMenuItem[] | null {

  const res: FolderMenuItem[] = [];

  const hashTable:Record<string, Partial<ExplorerFileItem>> = {};

  const folderList = files.filter ( item => item.isFolder );

  for ( const item of folderList ) {

    hashTable[ item.path ] = {
      ...item,
      children: hashTable[ item.path ] ? hashTable[ item.path ].children : null,
    };

    const temp = hashTable[ item.path ] as ExplorerFileItem;

    if ( !item.parentPath ) {

      res.push ( temp );

    } else {

      if ( !hashTable[ item.parentPath ] ) {

        hashTable[ item.parentPath ] = {
          children: [],
        };

      }

      if ( hashTable[ item.parentPath ].children ) {

        hashTable[ item.parentPath ].children.push ( temp );

      } else {

        hashTable[ item.parentPath ].children = [ temp ];

      }

    }

  }

  return res;

}
