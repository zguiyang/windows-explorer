import { h } from 'vue';

import { NSpace, NInput, NCheckbox, DataTableColumn } from 'naive-ui';

import { cloneDeep } from 'lodash';

import { renderIcon, pathResolve } from '@/helper/utils';

import { useExplorerStore } from '@/store/explorer';

import { ExplorerFileItem, ExplorerFileTypeEnum } from '@/lib/explorer-type';

import { EXPLORER_FILE_MODEL_MAP } from '@/lib/constant';

export function useTableListData () {

  const store = useExplorerStore ();

  const tableData = computed ( () => store.currentFiles );

  const tableCheckedRowKeys = ref<string[]> ( store.operationFileId ? [ store.operationFileId ] : [] );

  const nameInputRef = ref<typeof NInput | null> ( null );

  const nameInputValue = ref ( '' );

  const inputStatus = ref<'success' | 'warning' | 'error'| undefined> ( 'success' );

  // 渲染文件名称编辑输入框

  const renderEditNameInput = ( row: ExplorerFileItem ) => {

    const updateFileItemName = () => {

      if ( !nameInputValue.value ) {

        nameInputValue.value = row.name;

      }

      if ( !store.currentFiles.find ( ( item: ExplorerFileItem ) => item.id !== row.id && item.name === nameInputValue.value && item.fileType === row.fileType ) ) {

        inputStatus.value = 'success';

        row.name = nameInputValue.value;

        row.path = pathResolve ( row.parentPath, nameInputValue.value );

        row.isEdit = false;

        store.updateOneFile ( row );

        store.updateOperationFileId ( null );

      } else {

        inputStatus.value = 'error';

      }

    };

    return h ( NInput, {
      value: nameInputValue.value,
      status: inputStatus.value,
      ref: nameInputRef,
      onVnodeMounted () {

        nameInputRef.value && nameInputRef.value.focus ();

      },
      onUpdateValue ( val:string ) {

        nameInputValue.value = val;

      },
      onFocus () {

        nameInputRef.value && nameInputRef.value.select ();

      },
      onBlur () {

        updateFileItemName ();

      },
      onKeydown ( e:KeyboardEvent ) {

        if ( e.key === 'Enter' ) {

          updateFileItemName ();

        }

      },
    } );

  };

  // 渲染文件名称组件

  const renderFolderName = ( row:ExplorerFileItem ) => {

    const createFileModal = EXPLORER_FILE_MODEL_MAP[ row.fileType ];

    nameInputValue.value = row.name;

    return h ( NSpace, {
      size: 8,
      align: 'center',
    }, {
      default: () => [

        createFileModal ? renderIcon ( createFileModal.fileIcon, createFileModal.fileIconProps ) : renderIcon (),
        row.isEdit ? renderEditNameInput ( cloneDeep ( row ) ) : row.name,
      ] } );

  };

  const renderSelectColumn = ( row: ExplorerFileItem ) => {

    return h ( NCheckbox, {
      checked: row.id === store.operationFileId,
      onUpdateChecked: ( checked ) => {

        checked ? store.updateOperationFileId ( row.id ) : store.updateOperationFileId ( null );

      },
    } );

  };

  const tableColumns: DataTableColumn<ExplorerFileItem>[] = [

    {
      title: '选中',
      key: 'selected',
      width: 80,
      render: renderSelectColumn,
    },
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


  // 表格行选中监听

  const tableCheckedRowKeysChange = ( keys: Array<string> ) => {

    store.updateOperationFileId ( keys[ 0 ] );

    tableCheckedRowKeys.value = keys;

  };

  const tableRowProps = ( row: ExplorerFileItem ) => {

    return {
      style: 'cursor: pointer;',
      onDblclick: () => {

        // 当前行正在编辑

        if ( row.isEdit ) {

          return false;

        }

        if ( row.fileType !== ExplorerFileTypeEnum.FOLDER ) {

          console.error ( '暂不支持预览文件哦' );

        } else {

          store.updateParentFile ( row );

        }

      },
    };

  };

  return {
    tableData,
    tableCheckedRowKeys,
    tableRowProps,
    tableColumns,
    tableCheckedRowKeysChange,
  };

}

