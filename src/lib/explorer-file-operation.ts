import { useExplorerStore } from '@/store/explorer';

import { ExplorerOperationEnums } from '@/lib/explorer-type';

/**
 * 校验权限code
 * **/

export function checkOperationCode ( operationKey: ExplorerOperationEnums ): boolean {

  const store = useExplorerStore ();

  if ( !store.operationFileId ) {

    return false;

  }

  const selectedFile = store.explorerFileList.find ( file => file.id === store.operationFileId );

  const operationCodes = store.explorerOperationRoles.get ( selectedFile.fileType );

  if ( !operationCodes ) {

    console.error ( '角色异常' );

    return false;

  }

  return operationCodes.includes ( operationKey );


}


// 文件删除

export function explorerFileDelete () {

  const store = useExplorerStore ();

  if ( !store.operationFileId ) {

    console.error ( '请选中一个文件进行操作' );

    return false;

  }

  store.deleteExplorerFile ();

}

// 文件重命名

export function explorerFileReName () {

  const store = useExplorerStore ();

  const targetFile = store.explorerFileList.find ( file => file.id === store.operationFileId );

  if ( targetFile ) {

    targetFile.isEdit = true;

    store.updateOperationFileId ( targetFile.id );

    store.updateOneFile ( targetFile );

  } else {

    console.error ( '未找到您要操作的文件id' );

  }

}
