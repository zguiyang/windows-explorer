import { DropdownOption } from 'naive-ui';

import { FolderOutline } from '@vicons/ionicons5';

import { FileAddOutlined } from '@vicons/antd';

import { generateID, dateFormat } from 'quick-utils-js';

import { renderIcon, pathResolve } from '@/helper/utils';

import { useExplorerStore, CreateFileEnum, FolderMenuItem } from '@/store/explorer';

/**
 * 创建各种文件操作
 * **/

function createFileDataOperation () {

  const store = useExplorerStore ();

  const parentFile = computed ( () => store.parentFile );

  /**创建文件夹**/

  const createFolder = () => {

    if ( !parentFile ) {

      return false;

    }

    const parentPath = parentFile.value.path;

    const newFolder:FolderMenuItem = {
      id: generateID (),
      name: '新建文件夹',
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

    // do nothing

  };

  return new Map ( [
    [ CreateFileEnum.FOLDER, createFolder ],
    [ CreateFileEnum.TXT, createTXT ],
  ] );

}


export function useTopToolsHooks () {

  const createMenus: DropdownOption[] = [
    {
      label: '文件夹', key: CreateFileEnum.FOLDER, icon: renderIcon ( FolderOutline ),
    },
    {
      label: 'TXT文件', key: CreateFileEnum.TXT, icon: renderIcon ( FileAddOutlined ),
    },
  ];

  const createOperationMap = createFileDataOperation ();

  const handleCreateMenuSelect = ( key: CreateFileEnum ) => {

    const createFn = createOperationMap.get ( key );

    createFn && createFn ();

  };

  return {
    createMenus,
    handleCreateMenuSelect,
  };

}