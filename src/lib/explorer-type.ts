import { Component } from 'vue';

import { IconProps } from 'naive-ui';

export const enum ExplorerFileTypeEnum {
  FOLDER = 'FOLDER',
  TXT = 'TXT',
  JPG='JPG',
  PNG = 'PNG',
  MP4 = 'MP4',
}

// 文件模型，用于创建、展示、菜单

export type ExplorerFileModel = {
  defaultName: string,
  fileType: ExplorerFileTypeEnum | null,
  fileTypeText?: string,
  fileIcon?: Component,
  fileIconProps?: IconProps,
};

// 文件项

export type ExplorerFileItem = {
  id: string, // 文件或目录唯一标识
  name: string, // 文件名称
  parentPath: string | null, // 父级目录
  path:string, // 文件本身全路径
  isEdit?: boolean, // 是否处于编辑中
  fileType: ExplorerFileTypeEnum | null, //文件本身类型
  fileTypeText?: string; // 文件类型名称
  isFolder: boolean, // 是否是文件夹
  fileSize: number | string, // 文件大小， 字节
  children?: ExplorerFileItem[], // 如果是文件夹，则存放其目录下的文件，无限级
  updateTime: string | null, // 文件修改的时间
  createTime: string | null, // 文件的创建时间
}

// 文件目录菜单项

export type FolderMenuItem = ExplorerFileItem;

// 持久化文件管理器数据结构

export type ExplorerStorage = {
  explorerFileList: Array<ExplorerFileItem | FolderMenuItem>,
  folderMenuList: FolderMenuItem[],
  currentFiles: Array<ExplorerFileItem | FolderMenuItem>,
  parentFile: FolderMenuItem | null,
  operationFileId: string | null,
  navigationHistoryList: FolderMenuItem[],
}

// 文件类型所有操作方法枚举

export enum ExplorerOperationEnums {
  MOVE= 'move',
  DELETE= 'delete',
  RE_NAME= 'reName',
  COPY= 'copy',
  IMAGE_PREVIEW= 'imagePreview',
  VIDEO_PLAY= 'videoPlay',
  AUDIO_PLAY='AudioPlay',
  AUDIO_DOWNLOAD='audioDownload'
}
