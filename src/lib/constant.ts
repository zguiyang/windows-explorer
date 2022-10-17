import { FolderFilled, FileTextTwotone } from '@vicons/antd';

import { ExplorerFileTypeEnum, ExplorerFileModel } from '@/lib/explorer-type';

export const LOCAL_STORAGE_EXPLORER_NAME = 'explorer';

export const ROOT_DIR_NAME = '根目录';

export const NEW_FOLDER_DEFAULT_NAME = '新建文件夹';

export const NEW_TXT_DEFAULT_NAME = '新建文本文件';

/**
 * 定义通用的文件类型
 * **/

export const EXPLORER_FILE_MODEL_MAP:Partial<Record<ExplorerFileTypeEnum, ExplorerFileModel>> = {
  FOLDER: {
    defaultName: NEW_FOLDER_DEFAULT_NAME,
    fileType: ExplorerFileTypeEnum.FOLDER,
    fileIcon: FolderFilled,
    fileTypeText: '文件夹',
    fileIconProps: {
      size: 28,
      color: '#ffd767',
    },
  },
  TXT: {
    defaultName: NEW_TXT_DEFAULT_NAME,
    fileType: ExplorerFileTypeEnum.TXT,
    fileTypeText: 'TXT文件',
    fileIcon: FileTextTwotone,
    fileIconProps: {
      size: 28,
      color: '#b4b3b3',
    },
  },
};