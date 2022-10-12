import { Component, h } from 'vue';

import { NIcon } from 'naive-ui';

export function renderIcon ( icon: Component ) {

  return () => {

    return h ( NIcon, null, {
      default: () => h ( icon ),
    } );

  };

}

export function pathResolve ( parentPath: string, currentPath: string ): string {

  if ( parentPath === '/' ) {

    return parentPath + ( currentPath.includes ( '/' ) ? currentPath.slice ( 1 ) : currentPath );

  }

  return `${parentPath }/${ currentPath}`;

}