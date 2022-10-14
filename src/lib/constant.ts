import { FolderFilled, FileTextTwotone } from '@vicons/antd';

import { renderIcon } from '@/helper/utils';

import { CreateFileEnum, ExplorerFileModel } from '@/lib/explorer-type';

export const ROOT_DIR_NAME = '根目录';

export const NEW_FOLDER_DEFAULT_NAME = '新建文件夹';

export const NEW_TXT_DEFAULT_NAME = '新建文本文件';

export const EXPLORER_FILE_MODEL_LIST:ExplorerFileModel[] = [
  {
    defaultName: NEW_FOLDER_DEFAULT_NAME,
    fileType: CreateFileEnum.FOLDER,
    fileIcon: renderIcon ( FolderFilled ),
  },
  {
    defaultName: NEW_TXT_DEFAULT_NAME,
    fileType: CreateFileEnum.TXT,
    fileIcon: renderIcon ( FileTextTwotone ),
  },
];