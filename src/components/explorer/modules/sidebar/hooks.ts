import { TreeOption } from 'naive-ui';

import { arrayRecursionMap } from 'quick-utils-js';

import { FileMenuTree, useExplorerStore } from '@/store/explorer';

export function useSideBarData () {

  const store = useExplorerStore ();

  const menuTreeList = computed<TreeOption[]> ( () => {

    return arrayRecursionMap<FileMenuTree, TreeOption> ( store.fileMenuTreeList, ( item ) => {

      return {
        key: item.id,
        label: item.name,
        children: item.children,
      };

    }, 'children' );

  } );

  return {
    menuTreeList,
  };

}