import { FolderFilled, FileTextTwotone } from '@vicons/antd';

import { renderIcon } from '@/helper/utils';

import { CreateFileEnum, ExplorerFileType, ExplorerFileModel } from '@/lib/explorer-type';

export const LOCAL_STORAGE_EXPLORER_NAME = 'explorer';

export const ROOT_DIR_NAME = '根目录';

export const NEW_FOLDER_DEFAULT_NAME = '新建文件夹';

export const NEW_TXT_DEFAULT_NAME = '新建文本文件';

export const EXPLORER_FILE_MODEL_MAP:Partial<Record<ExplorerFileType, ExplorerFileModel>> = {
  TXT: {
    defaultName: NEW_FOLDER_DEFAULT_NAME,
    fileType: CreateFileEnum.FOLDER,
    fileIcon: renderIcon ( FolderFilled ),
  },
  FOLDER: {
    defaultName: NEW_TXT_DEFAULT_NAME,
    fileType: CreateFileEnum.TXT,
    fileIcon: renderIcon ( FileTextTwotone ),
  },
};