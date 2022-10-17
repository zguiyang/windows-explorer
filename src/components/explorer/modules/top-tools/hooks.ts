import { DropdownOption } from 'naive-ui';

import { FolderOutline } from '@vicons/ionicons5';

import { FileAddOutlined } from '@vicons/antd';

import { ExplorerFileTypeEnum } from '@/lib/explorer-type';

import { createFileOperation } from '@/lib/explorer-utils';

import { renderIcon } from '@/helper/utils';

export function useTopToolsHooks () {

  const createMenus: DropdownOption[] = [
    {
      label: '文件夹', key: ExplorerFileTypeEnum.FOLDER, icon: () => renderIcon ( FolderOutline, { color: '#0d7dd1', size: 20 } ),
    },
    {
      label: 'TXT文件', key: ExplorerFileTypeEnum.TXT, icon: () => renderIcon ( FileAddOutlined, { color: '#0d7dd1', size: 20 } ),
    },
  ];

  const handleCreateMenuSelect = ( key: ExplorerFileTypeEnum ) => {

    createFileOperation ( key );

  };

  return {
    createMenus,
    handleCreateMenuSelect,
  };

}