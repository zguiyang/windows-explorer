<template>
  <div class="explorer-top-search-wrapper">
    <n-space align="center" :size="10">
      <div class="operation-buttons search-operation-buttons">
        <n-popover trigger="hover">
          <template #trigger>
              <span class="operation-button">
                <n-icon>
                  <arrow-left-outlined></arrow-left-outlined>
                </n-icon>
              </span>
          </template>
          <span>后退</span>
        </n-popover>
        <n-popover trigger="hover">
          <template #trigger>
              <span class="operation-button">
                <n-icon>
                  <arrow-right-outlined></arrow-right-outlined>
                </n-icon>
              </span>
          </template>
          <span>前进</span>
        </n-popover>
        <n-popover trigger="hover">
          <template #trigger>
              <span class="operation-button">
                <n-icon>
                  <arrow-up-outlined></arrow-up-outlined>
                </n-icon>
              </span>
          </template>
          <span>上一级</span>
        </n-popover>
      </div>
      <div class="navigation-wrap">
        <div class="navigation-input">
          <n-input style="width:600px" v-model:value="navigationInputVal">
            <template #prefix>
              <n-icon :size="26" color="#ffd767">
                <folder-filled></folder-filled>
              </n-icon>
<!--              <n-icon :size="26" color="#0d7dd1">-->
<!--                <computer-filled></computer-filled>-->
<!--              </n-icon>-->
            </template>
          </n-input>
        </div>
        <div class="navigation-input-action">
          <n-button quaternary>
            <template #icon>
              <n-icon :size="18">
                <refresh></refresh>
              </n-icon>
            </template>
          </n-button>
        </div>
      </div>
      <div class="search-input-wrap">
        <n-input style="width: 380px;" placeholder="在此目录中进行搜索">
          <template #suffix>
            <n-button secondary type="primary">
              <n-icon :size="22">
                <arrow-right-outlined></arrow-right-outlined>
              </n-icon>
            </n-button>
          </template>
        </n-input>
      </div>
    </n-space>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { ArrowLeftOutlined, ArrowRightOutlined, ArrowUpOutlined, FolderFilled } from '@vicons/antd';

import { Refresh } from '@vicons/ionicons5';

import { ComputerFilled } from '@vicons/material';

import { useTopSearchData } from './hooks';

export default defineComponent ( {
  name: 'explorer-top-search',
  components: { ArrowLeftOutlined, ArrowRightOutlined, ArrowUpOutlined, Refresh, FolderFilled, ComputerFilled },
  setup () {

    const { navigationInputVal } = useTopSearchData ();

    return {
      navigationInputVal,
    };

  },
} );
</script>


<style scoped>

</style>