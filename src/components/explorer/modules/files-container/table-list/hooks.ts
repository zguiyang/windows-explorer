import { NIcon, NSpace, DataTableColumn } from 'naive-ui';

import { FolderFilled } from '@vicons/antd';

import { ExplorerFile, useExplorerStore } from '@/store/explorer';

export function useTableListData () {

  const store = useExplorerStore ();

  const renderFolderName = ( row ) => {

    return h ( NSpace, {
      size: 8,
      align: 'center',
    }, {
      default: () => [
        h ( NIcon, {
          size: 28,
          color: '#ffd767',
        },
        { default: () => h ( FolderFilled ),
        } ),
        row.name,
      ] } );

  };

  const tableColumns: DataTableColumn[] = [
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
    },
    {
      title: '大小',
      key: 'fileSize',
      width: 120,
    },
  ];

  const tableData = computed<ExplorerFile[]> ( () => store.currentFiles );

  return {
    tableColumns,
    tableData,
  };

}

