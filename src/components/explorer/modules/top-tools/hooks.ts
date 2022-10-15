import { DropdownOption } from 'naive-ui';

import { FolderOutline } from '@vicons/ionicons5';

import { FileAddOutlined } from '@vicons/antd';

import { CreateFileEnum } from '@/lib/explorer-type';

import { createFileOperationMap } from '@/lib/explorer-utils';

import { renderIcon } from '@/helper/utils';

export function useTopToolsHooks () {

  const createMenus: DropdownOption[] = [
    {
      label: '文件夹', key: CreateFileEnum.FOLDER, icon: renderIcon ( FolderOutline ),
    },
    {
      label: 'TXT文件', key: CreateFileEnum.TXT, icon: renderIcon ( FileAddOutlined ),
    },
  ];

  const createOperationMap = createFileOperationMap ();

  const handleCreateMenuSelect = ( key: CreateFileEnum ) => {

    const createFn = createOperationMap.get ( key );

    createFn && createFn ();

  };

  return {
    createMenus,
    handleCreateMenuSelect,
  };

}