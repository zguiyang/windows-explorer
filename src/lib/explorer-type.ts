import { VNodeChild } from 'vue';

export type ExplorerFileType = 'TXT' | 'JPG' | 'PNG' | 'MP4' | 'FOLDER';

export const enum CreateFileEnum {
  FOLDER = 'FOLDER',
  TXT = 'TXT',
}

// 文件模型，用于创建、展示、菜单

export type ExplorerFileModel = {
  defaultName: string;
  fileType: ExplorerFileType | null;
  fileIcon: VNodeChild | ( () => VNodeChild ),
};

export type ExplorerFileItem = {
  id: string, // 文件或目录唯一标识
  name: string, // 文件名称
  parentPath: string | null, // 父级目录
  path:string, // 文件本身全路径
  fileType?: ExplorerFileType, //文件本身类型
  isFolder: boolean, // 是否是文件夹
  fileSize: number | string, // 文件大小， 字节
  children?: ExplorerFileItem[], // 如果是文件夹，则存放其目录下的文件，无限级
  updateTime: string | null, // 文件修改的时间
  createTime: string | null, // 文件的创建时间
}

export type FolderMenuItem = Omit<ExplorerFileItem, 'fileType'>;

export type ExplorerStorage = {
  explorerFileList: Array<ExplorerFileItem|FolderMenuItem>,
  folderMenuList: FolderMenuItem[],
  currentFiles: Array<ExplorerFileItem|FolderMenuItem>,
  parentFile: FolderMenuItem|null,
}