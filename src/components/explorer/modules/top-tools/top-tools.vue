<template>
  <div class="explorer-top-tools-wrapper">
    <div class="tools-title">
      <div class="tools-title-left">
        <n-icon :size="26" color="#ffd767">
          <folder-filled></folder-filled>
        </n-icon>
        <span class="folder-name">此电脑</span>
      </div>
    </div>
    <div class="tools-operation-wrap">
      <n-space :size="10" align="center">
        <n-dropdown placement="bottom-start"
          trigger="click"
          size="medium"
          :options="createMenus"
          @select="handleCreateMenuSelect">
          <div class="dropdown-menu-button">
            <n-icon :size="20">
              <add-circle-outline color="#0d7dd1"></add-circle-outline>
            </n-icon>
            <span class="button-name">新建</span>
            <n-icon :size="16" :style="{marginLeft: '4px'}">
              <down-outlined></down-outlined>
            </n-icon>
          </div>
        </n-dropdown>
        <div class="operation-buttons">
          <n-popover trigger="hover">
            <template #trigger>
              <n-button class="operation-button">
                 <n-icon :size="20" color="#0d7dd1">
                  <file-image-outlined></file-image-outlined>
                 </n-icon>
              </n-button>
            </template>
            <span>图片预览</span>
          </n-popover>
          <n-popover trigger="hover">
            <template #trigger>
              <n-button class="operation-button">
                <n-icon :size="20" color="#0d7dd1">
                 <play-circle-outlined></play-circle-outlined>
                </n-icon>
              </n-button>
            </template>
            <span>视频播放</span>
          </n-popover>
          <n-popover trigger="hover">
            <template #trigger>
              <n-button class="operation-button">
                <n-icon :size="20" color="#0d7dd1">
                  <audiotrack-outlined></audiotrack-outlined>
                </n-icon>
              </n-button>
            </template>
            <span>音乐播放</span>
          </n-popover>
          <n-popover trigger="hover">
            <template #trigger>
              <n-button class="operation-button">
                <n-icon :size="20" color="#0d7dd1">
                  <sim-card-download-outlined></sim-card-download-outlined>
                </n-icon>
              </n-button>
            </template>
            <span>音乐下载</span>
          </n-popover>
          <n-popover trigger="hover">
            <template #trigger>
              <n-button class="operation-button" :disabled="reNameButtonDisabled"
                @click.stop="reNameOperation">
                <n-icon :size="20" color="#0d7dd1">
                  <rename24-regular></rename24-regular>
                </n-icon>
              </n-button>
            </template>
            <span>重命名</span>
          </n-popover>
          <n-popover trigger="hover">
            <template #trigger>
               <n-button class="operation-button" :disabled="deleteButtonDisabled"
                  @click.stop="deleteFileOperation">
                  <n-icon :size="20" color="#0d7dd1">
                    <delete-outlined></delete-outlined>
                  </n-icon>
               </n-button>
            </template>
            <span>删除</span>
          </n-popover>
        </div>
<!--        <n-dropdown placement="bottom-start"-->
<!--          trigger="click"-->
<!--          size="medium"-->
<!--          :options="createMenus"-->
<!--          @select="handleCreateMenuSelect">-->
<!--          <div class="dropdown-menu-button">-->
<!--            <n-icon :size="20">-->
<!--              <arrow-sort28-regular color="#0d7dd1"></arrow-sort28-regular>-->
<!--            </n-icon>-->
<!--            <span class="button-name">排序</span>-->
<!--            <n-icon :size="16" :style="{marginLeft: '4px'}">-->
<!--              <down-outlined></down-outlined>-->
<!--            </n-icon>-->
<!--          </div>-->
<!--        </n-dropdown>-->
      </n-space>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { FolderFilled, PlayCircleOutlined, FileImageOutlined, DownOutlined, DeleteOutlined } from '@vicons/antd';

import { AddCircleOutline } from '@vicons/ionicons5';

import { AudiotrackOutlined, SimCardDownloadOutlined } from '@vicons/material';

import { Rename24Regular } from '@vicons/fluent';

import { useTopToolsHooks, useButtonOperationHooks } from './hooks';

export default defineComponent ( {
  name: 'explorer-top-tools',
  components: {
    FolderFilled, DownOutlined, AddCircleOutline, Rename24Regular, DeleteOutlined,
    PlayCircleOutlined, FileImageOutlined, AudiotrackOutlined, SimCardDownloadOutlined,
  },
  setup () {

    const { createMenus, handleCreateMenuSelect } = useTopToolsHooks ();

    const { reNameButtonDisabled, deleteButtonDisabled, reNameOperation,
      deleteFileOperation } = useButtonOperationHooks ();

    return {
      createMenus,
      reNameButtonDisabled,
      deleteButtonDisabled,
      reNameOperation,
      deleteFileOperation,
      handleCreateMenuSelect,
    };

  },
} );
</script>


<style scoped>

</style>
