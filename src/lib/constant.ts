import { FileTextTwotone, FolderFilled, FileImageOutlined } from '@vicons/antd';

import { VideoFileFilled, MusicVideoOutlined } from '@vicons/material';

import { ExplorerFileModel, ExplorerFileTypeEnum, ExplorerOperationEnums } from '@/lib/explorer-type';

export const LOCAL_STORAGE_EXPLORER_NAME = 'explorer';

export const ROOT_DIR_NAME = '根目录';

export const NEW_FOLDER_DEFAULT_NAME = '新建文件夹';

export const NEW_TXT_DEFAULT_NAME = '新建文本文件';

export const NEW_VIDEO_DEFAULT_NAME = '新建视频文件';

export const NEW_AUDIO_DEFAULT_NAME = '新建音频文件';

export const NEW_JPG_DEFAULT_NAME = '新建JPG图片';

export const NEW_PNG_DEFAULT_NAME = '新建PNG图片';

export const NEW_UNKNOWN_DEFAULT_NAME = '未知类型文件';

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
    fileTypeText: 'TXT文本',
    fileIcon: FileTextTwotone,
    fileIconProps: {
      size: 28,
      color: '#b4b3b3',
    },
  },
  MP4: {
    defaultName: NEW_VIDEO_DEFAULT_NAME,
    fileType: ExplorerFileTypeEnum.MP4,
    fileTypeText: 'MP4',
    fileIcon: VideoFileFilled,
    fileIconProps: {
      size: 28,
      color: '#0d7dd1',
    },
  },
  MP3: {
    defaultName: NEW_AUDIO_DEFAULT_NAME,
    fileType: ExplorerFileTypeEnum.MP3,
    fileTypeText: 'MP3',
    fileIcon: MusicVideoOutlined,
    fileIconProps: {
      size: 28,
      color: '#0d7dd1',
    },
  },
  JPG: {
    defaultName: NEW_JPG_DEFAULT_NAME,
    fileType: ExplorerFileTypeEnum.JPG,
    fileTypeText: 'JPG',
    fileIcon: FileImageOutlined,
    fileIconProps: {
      size: 28,
      color: '#0d7dd1',
    },
  },
  PNG: {
    defaultName: NEW_PNG_DEFAULT_NAME,
    fileType: ExplorerFileTypeEnum.PNG,
    fileTypeText: 'PNG',
    fileIcon: FileImageOutlined,
    fileIconProps: {
      size: 28,
      color: '#0d7dd1',
    },
  },
};

export const EXPLORER_OPERATION_PERMISSION_CODES = [ ExplorerOperationEnums.RE_NAME, ExplorerOperationEnums.DELETE, ExplorerOperationEnums.IMAGE_PREVIEW ];

// 所有文件可执行操作code

const EXPLORER_PUBLIC_OPERATIONS = [ ExplorerOperationEnums.RE_NAME, ExplorerOperationEnums.DELETE ];

// 图片类型文件可执行操作

const EXPLORER_IMAGE_OPERATIONS = [ ...EXPLORER_PUBLIC_OPERATIONS, ExplorerOperationEnums.IMAGE_PREVIEW ];

// 文件类型操作关系映射

export const EXPLORER_OPERATION_ROLES_MAP = new Map ( [
  [ ExplorerFileTypeEnum.UNKNOWN, [ ...EXPLORER_PUBLIC_OPERATIONS ] ],
  [ ExplorerFileTypeEnum.FOLDER, [ ...EXPLORER_PUBLIC_OPERATIONS ] ],
  [ ExplorerFileTypeEnum.JPG, [ ...EXPLORER_IMAGE_OPERATIONS ] ],
  [ ExplorerFileTypeEnum.PNG, [ ...EXPLORER_IMAGE_OPERATIONS ] ],
  [ ExplorerFileTypeEnum.TXT, [ ...EXPLORER_PUBLIC_OPERATIONS ] ],
  [ ExplorerFileTypeEnum.MP4, [ ...EXPLORER_PUBLIC_OPERATIONS, ExplorerOperationEnums.VIDEO_PLAY ] ],
  [ ExplorerFileTypeEnum.MP3, [ ...EXPLORER_PUBLIC_OPERATIONS, ExplorerOperationEnums.AUDIO_PLAY, ExplorerOperationEnums.AUDIO_DOWNLOAD ] ],
] );
