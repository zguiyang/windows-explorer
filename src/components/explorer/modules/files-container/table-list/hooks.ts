import { NSpace, DataTableColumn } from 'naive-ui';

import { renderIcon } from '@/helper/utils';

import { useExplorerStore } from '@/store/explorer';

import { ExplorerFileItem } from '@/lib/explorer-type';

import { EXPLORER_FILE_MODEL_MAP } from '@/lib/constant';

export function useTableListData () {

  const store = useExplorerStore ();

  const renderFolderName = ( row:ExplorerFileItem ) => {

    const createFileModal = EXPLORER_FILE_MODEL_MAP[ row.fileType ];

    return h ( NSpace, {
      size: 8,
      align: 'center',
    }, {
      default: () => [

        createFileModal ? renderIcon ( createFileModal.fileIcon, createFileModal.fileIconProps ) : renderIcon (),
        row.name,
      ] } );

  };

  const tableColumns: DataTableColumn<ExplorerFileItem>[] = [
    {
      title: '名称',
      key: 'name',
      render: renderFolderName,
    },
    {
      title: '修改日期',
      key: 'updateTime',
      width: 180,
    },
    {
      title: '类型',
      key: 'fileType',
      width: 120,
      render: ( row ) => row.fileTypeText || '--',
    },
    {
      title: '大小',
      key: 'fileSize',
      width: 120,
    },
  ];

  const tableData = computed ( () => store.currentFiles );

  return {
    tableColumns,
    tableData,
  };

}

