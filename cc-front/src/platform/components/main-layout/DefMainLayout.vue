<template>
  <div :class="containerClass">
    <div class="app-def-main-layout-header" v-show="showTool">
      <div class="app-def-main-layout-header-title">
        <app-dynamic-icon iconName="FileOutlined" :iconProps="{ class: 'icon' }" />{{ title && title.length ? title : routerTitle }}
      </div>
      <div class="app-def-main-layout-header-btns">
        <slot name="headerBtnsTpl"></slot>
      </div>
    </div>
    <div
      :class="{
        'app-def-main-layout-content': showTool,
        'app-def-main-layout-content-full': !showTool,
        'app-def-main-layout-content-pd': usePadding,
      }"
      :style="contentBodyStyle"
      v-app-scrollbar="scrollOptions"
    >
      <div class="app-def-main-layout-inner-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DefMainLayout',
  props: {
    containerClass: {
      type: String,
      default: 'app-main-default-container',
    },
    showTool: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '',
    },
    contentBodyStyle: {
      type: Object,
      default: () => {},
    },
    usePadding: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const routerTitle = useRoute().meta.title;
    const scrollOptions = {
      overflowBehavior: {
        y: 'scroll',
        x: 'scroll',
      },
      scrollbars: {
        autoHide: 'leave',
        autoHideDelay: 200,
      },
    };

    return {
      scrollOptions,
      routerTitle,
    };
  },
});
</script>

<style lang="less" scoped>
@import './DefMainLayout.less';
</style>
