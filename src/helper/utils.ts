import { Component, h } from 'vue';

import { NIcon, IconProps } from 'naive-ui';

import { FileOutlined } from '@vicons/antd';

export function renderIcon ( icon?: Component, props?: Omit<IconProps, 'component'> ) {

  return h ( NIcon, props || {
    size: 28,
    color: '#b4b3b3',
  }, {
    default: () => h ( icon || FileOutlined ),
  } );

}

export function pathResolve ( parentPath: string, currentPath: string ): string {

  if ( parentPath === '/' ) {

    return parentPath + ( currentPath.includes ( '/' ) ? currentPath.slice ( 1 ) : currentPath );

  }

  return `${parentPath }/${ currentPath}`;

}