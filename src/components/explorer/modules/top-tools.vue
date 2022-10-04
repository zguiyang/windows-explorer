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
      <n-space :size="20" align="center">
        <n-dropdown placement="bottom-start"
                    trigger="click"
                    size="medium"
                    :options="createMenus"
                    @select="handleCreateMenuSelect">
          <div class="add-dropdown-menu-button">
            <n-icon :size="20">
              <add-circle-outline></add-circle-outline>
            </n-icon>
            <span class="button-name">新建</span>
            <n-icon :size="16" :style="{marginLeft: '4px'}">
              <down-outlined></down-outlined>
            </n-icon>
          </div>
        </n-dropdown>
        <div class="operation-buttons">
          <span class="operation-button">
           <n-icon :size="18">
            <content-cut-outlined></content-cut-outlined>
           </n-icon>
          </span>
          <span class="operation-button">
            <n-icon :size="18">
              <copy-outline></copy-outline>
            </n-icon>
          </span>
          <span class="operation-button">
            <n-icon :size="18">
              <content-paste-filled></content-paste-filled>
            </n-icon>
          </span>
          <span class="operation-button">
            <n-icon :size="20">
              <rename24-regular></rename24-regular>
            </n-icon>
          </span>
          <span class="operation-button">
            <n-icon :size="20">
              <delete-outlined></delete-outlined>
            </n-icon>
          </span>
        </div>
        <n-dropdown placement="bottom-start"
        trigger="click"
        size="medium"
        :options="createMenus"
        @select="handleCreateMenuSelect">
          <div class="add-dropdown-menu-button">
            <n-icon :size="20">
              <add-circle-outline></add-circle-outline>
            </n-icon>
            <span class="button-name">排序</span>
            <n-icon :size="16" :style="{marginLeft: '4px'}">
              <down-outlined></down-outlined>
            </n-icon>
          </div>
        </n-dropdown>
      </n-space>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Component, h } from 'vue';

import { DropdownOption, NIcon } from 'naive-ui';

import { FolderFilled, DownOutlined, FileAddOutlined, DeleteOutlined } from '@vicons/antd';

import { AddCircleOutline, FolderOutline, ShareOutline, CopyOutline } from '@vicons/ionicons5';

import { ContentCutOutlined, ContentPasteFilled } from '@vicons/material';

import { Rename24Regular } from '@vicons/fluent';

export default defineComponent ( {
  name: 'explorer-top-tools', components: {
    FolderFilled, DownOutlined, AddCircleOutline, ContentCutOutlined, CopyOutline, ContentPasteFilled, Rename24Regular,
    DeleteOutlined,
  }, setup () {

    const renderIcon = ( icon: Component ) => {

      return () => {

        return h ( NIcon, null, {
          default: () => h ( icon ),
        } );

      };

    };

    const createMenus: DropdownOption[] = [ {
      label: '文件夹', key: 'folder', icon: renderIcon ( FolderOutline ),
    }, {
      label: '快捷方式', key: 'shortcut', icon: renderIcon ( ShareOutline ),
    }, {
      label: 'TXT文件', key: 'txt', icon: renderIcon ( FileAddOutlined ),
    } ];

    const handleCreateMenuSelect = ( key: string | number ) => {

      console.log ( key );

    };

    return {
      createMenus, handleCreateMenuSelect,
    };

  },
} );
</script>


<style scoped>

</style>