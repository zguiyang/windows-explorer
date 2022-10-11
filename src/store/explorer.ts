import { defineStore } from 'pinia';

export type ExplorerFile = {
  id: string, // 文件或目录唯一标识
  name: string, // 文件名称
  parentPath: string, // 父级目录
  path:string, // 文件本身全路径
  fileType: 'txt' | 'jpg' | 'png' | 'mp4', //文件本身类型
  isFolder: boolean, // 是否是文件夹
  fileSize: string, // 文件大小， 字节
  children?: ExplorerFile[], // 如果是文件夹，则存放其目录下的文件，无限级
  updateTime: string, // 文件修改的时间
  createTime: string, // 文件的创建时间
}

// type State = {
//   fileList: ExplorerFile[],
//   currentFiles: ExplorerFile | null,
// }

export const useExplorerStore = defineStore ( 'explorer', () => {

  const fileList = ref<ExplorerFile[]> ( [] );

  const currentFiles = ref<ExplorerFile[]> ( [] );

  function addFile ( file: ExplorerFile ) {

    fileList.value.push ( file );

  }

  function setCurrentFiles ( list: ExplorerFile[] ) {

    currentFiles.value = list;

  }

  return { fileList, currentFiles, addFile, setCurrentFiles };

} );