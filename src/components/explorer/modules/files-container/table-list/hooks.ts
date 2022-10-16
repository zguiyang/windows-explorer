import { h } from 'vue';

import { NSpace, NInput, DataTableColumn } from 'naive-ui';

import { renderIcon, pathResolve } from '@/helper/utils';

import { useExplorerStore } from '@/store/explorer';

import { checkExistingFileName } from '@/lib/explorer-utils';

import { ExplorerFileItem } from '@/lib/explorer-type';

import { EXPLORER_FILE_MODEL_MAP } from '@/lib/constant';

import { cloneDeep } from 'lodash';

export function useTableListData () {

  const store = useExplorerStore ();

  const tableData = computed ( () => store.currentFiles );

  const originalTableData = cloneDeep ( store.currentFiles );

  const editFileId = computed ( () => store.editFileId );

  const inputRef = ref<typeof NInput | null> ( null );

  const inputStatus = ref<'success' | 'warning' | 'error'| undefined> ( undefined );

  const renderEditNameInput = ( row: ExplorerFileItem, index: number ) => {

    return h ( NInput, {
      value: row.name,
      status: inputStatus.value,
      ref: inputRef,
      onVnodeMounted () {

        inputRef.value && inputRef.value.focus ();

      },
      onUpdateValue ( v ) {

        tableData.value[ index ].name = v;

      },
      onFocus () {

        inputRef.value && inputRef.value.select ();

      },
      onBlur () {

        if ( !checkExistingFileName ( row.name, originalTableData ) ) {

          inputStatus.value = 'success';

          row.path = pathResolve ( row.parentPath, row.name );

          store.updateOneFile ( row );

          inputRef.value = null;

        } else {

          inputStatus.value = 'error';

        }

      },
      onKeydown ( e:KeyboardEvent ) {

        if ( e.key === 'Enter' ) {

          if ( !checkExistingFileName ( row.name, originalTableData ) ) {

            inputStatus.value = 'success';

            row.path = pathResolve ( row.parentPath, row.name );

            store.updateOneFile ( row );

            inputRef.value = null;

          } else {

            inputStatus.value = 'error';

            console.log ( inputStatus.value );

          }

        }

      },
    } );

  };


  const renderFolderName = ( row:ExplorerFileItem, index ) => {

    const createFileModal = EXPLORER_FILE_MODEL_MAP[ row.fileType ];

    return h ( NSpace, {
      size: 8,
      align: 'center',
    }, {
      default: () => [

        createFileModal ? renderIcon ( createFileModal.fileIcon, createFileModal.fileIconProps ) : renderIcon (),
        editFileId.value === row.id ? renderEditNameInput ( row, index ) : row.name,
      ] } );

  };

  const tableColumns: DataTableColumn<ExplorerFileItem>[] = [

    // {
    //   type: 'selection',
    //   width: 40,
    // },

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

  return {
    tableData,
    tableColumns,
  };

}

