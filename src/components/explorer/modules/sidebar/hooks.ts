import { TreeOption } from 'naive-ui';

import { ChevronForward } from '@vicons/ionicons5';

import { arrayRecursionMap } from 'quick-utils-js';

import { renderIcon } from '@/helper/utils';

import { useExplorerStore } from '@/store/explorer';

import { FolderMenuItem } from '@/lib/explorer-type';

import { EXPLORER_FILE_MODEL_MAP } from '@/lib/constant';


export function useSideBarHooks () {

  const store = useExplorerStore ();

  const menuTreeList = computed<TreeOption[]> ( () => {

    return arrayRecursionMap<FolderMenuItem, TreeOption> ( store.folderMenuList, ( item ) => {

      return {
        key: item.id,
        label: item.name,
        children: item.children,
        prefix: () => renderIcon ( EXPLORER_FILE_MODEL_MAP[ 'FOLDER' ].fileIcon, { ...EXPLORER_FILE_MODEL_MAP[ 'FOLDER' ].fileIconProps, size: 24 } ),
      } as any;

    }, 'children' );

  } );

  const treeNodeProps = ( { option }: { option: TreeOption } ) => {

    return {
      onclick () {

        const targetFolder = store.explorerFileList.find ( folder => folder.id === option.key );

        if ( !targetFolder ) {

          console.error ( '不存在此目录' );

        } else {

          store.updateParentFile ( targetFolder );

        }

      },
    };

  };

  return {
    menuTreeList,
    treeNodeProps,
    renderSwitcherIcon: () => renderIcon ( ChevronForward, { } ),
  };

}