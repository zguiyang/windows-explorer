import { DropdownOption } from 'naive-ui';

import { FolderOutline, ImageOutline, VideocamOutline } from '@vicons/ionicons5';

import { MusicVideoOutlined } from '@vicons/material';

import { FileAddOutlined, FileJpgOutlined } from '@vicons/antd';

import { ExplorerFileTypeEnum, ExplorerOperationEnums } from '@/lib/explorer-type';

import { createFileOperation } from '@/lib/explorer-utils';

import { checkOperationCode, explorerFileReName, explorerFileDelete } from '@/lib/explorer-file-operation';

import { renderIcon } from '@/helper/utils';

export function useTopToolsHooks () {

  const createMenus: DropdownOption[] = [
    {
      label: '文件夹', key: ExplorerFileTypeEnum.FOLDER, icon: () => renderIcon ( FolderOutline, { color: '#0d7dd1', size: 20 } ),
    },
    {
      label: '视频文件', key: ExplorerFileTypeEnum.MP4, icon: () => renderIcon ( VideocamOutline, { color: '#0d7dd1', size: 20 } ),
    },
    {
      label: '音乐文件', key: ExplorerFileTypeEnum.MP3, icon: () => renderIcon ( MusicVideoOutlined, { color: '#0d7dd1', size: 20 } ),
    },
    {
      label: 'JPG图片', key: ExplorerFileTypeEnum.JPG, icon: () => renderIcon ( FileJpgOutlined, { color: '#0d7dd1', size: 20 } ),
    },
    {
      label: 'PNG图片', key: ExplorerFileTypeEnum.PNG, icon: () => renderIcon ( ImageOutline, { color: '#0d7dd1', size: 20 } ),
    },
    {
      label: 'TXT文件', key: ExplorerFileTypeEnum.TXT, icon: () => renderIcon ( FileAddOutlined, { color: '#0d7dd1', size: 20 } ),
    },
  ];

  // 新建下拉菜单选择操作监听

  const handleCreateMenuSelect = ( key: ExplorerFileTypeEnum ) => {

    createFileOperation ( key );

  };

  return {
    createMenus,
    handleCreateMenuSelect,
  };

}

export function useButtonOperationHooks () {


  const reNameButtonDisabled = computed<boolean> ( () => !checkOperationCode ( ExplorerOperationEnums.RE_NAME ) );

  const deleteButtonDisabled = computed<boolean> ( () => !checkOperationCode ( ExplorerOperationEnums.DELETE ) );

  const reNameOperation = () => {

    explorerFileReName ();

  };

  const deleteFileOperation = () => {

    explorerFileDelete ();

  };

  return {
    reNameButtonDisabled,
    deleteButtonDisabled,
    reNameOperation,
    deleteFileOperation,
  };

}
