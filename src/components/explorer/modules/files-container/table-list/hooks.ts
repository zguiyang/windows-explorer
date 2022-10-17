import { h } from 'vue';

import { NSpace, NInput, DataTableColumn } from 'naive-ui';

import { renderIcon, pathResolve } from '@/helper/utils';

import { useExplorerStore } from '@/store/explorer';

import { ExplorerFileItem } from '@/lib/explorer-type';

import { EXPLORER_FILE_MODEL_MAP } from '@/lib/constant';

export function useTableListData () {

  const store = useExplorerStore ();

  const tableData = computed<ExplorerFileItem[]> ( () => store.currentFiles );

  const editFileId = computed ( () => store.editFileId );

  const nameInputRef = ref<typeof NInput | null> ( null );

  const nameInputValue = ref ( '' );

  const inputStatus = ref<'success' | 'warning' | 'error'| undefined> ( 'success' );

  // 渲染文件名称编辑输入框

  const renderEditNameInput = ( row: ExplorerFileItem ) => {

    const updateFileItemName = () => {

      if ( !nameInputValue.value ) {

        nameInputValue.value = row.name;

        store.updateEditFileId ( null );

        inputStatus.value = 'success';

      } else if ( !tableData.value.find ( item => item.name === nameInputValue.value && item.fileType === row.fileType ) ) {

        inputStatus.value = 'success';

        row.name = nameInputValue.value;

        row.path = pathResolve ( row.parentPath, nameInputValue.value );

        store.updateOneFile ( row );

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
        editFileId.value === row.id ? renderEditNameInput ( row ) : row.name,
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

