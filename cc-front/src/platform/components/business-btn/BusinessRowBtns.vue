<template>
  <div class="app-business-row-btn-container">
    <template v-for="(btn, index) in btnList" :key="btn.buttonId">
      <a-divider type="vertical" v-if="index != 0" />
      <a @click="btnHandler(btn.functionName)" v-if="btn.layoutMark === layoutMark">
        <app-dynamic-icon :iconName="btn.iconCls" />
        {{ btn.buttonName }}
      </a>
    </template>
    <template v-if="moreBtnList && moreBtnList.length">
      <a-divider type="vertical" />
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          <app-dynamic-icon iconName="SvgIconMore" /> 更多
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item
              v-for="btn in moreBtnList"
              :key="btn.buttonId"
              @click="btnHandler(btn.functionName)"
            >
              <a href="javascript:;">
                <app-dynamic-icon :iconName="btn.iconCls" />
                {{ btn.buttonName }}
              </a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import BusinessBtnType from '/@/platform/types/business-btn-type';
import { layoutMarks } from '/@/platform/commons/consts/business-tool-btn-cont';
import CommonUtil from '/@/platform/commons/utils/common-util';

export default defineComponent({
  name: 'BusinessRowBtns',
  props: {
    layoutMark: {
      type: String,
      default: layoutMarks.rowBtn,
    },
    buttonList: {
      type: Array as PropType<BusinessBtnType[]>,
      default: () => {
        return [];
      },
    },
    data: {
      type: Object,
      default: undefined,
    },
    showBtnFunction: {
      type: Function,
      default: undefined,
    },
  },
  emits: ['btnClick'],
  setup(props, context) {
    const btnHandler = (functionName: string | undefined) => {
      context.emit('btnClick', functionName);
    };

    const computedBtnList = CommonUtil.computedBtns(props);

    const btnList = computed(() => {
      if (computedBtnList.length - 2 >= 2) {
        return computedBtnList.slice(0, 2);
      } else {
        return computedBtnList;
      }
    });

    const moreBtnList = computed(() => {
      if (computedBtnList.length - 2 >= 2) {
        return computedBtnList.slice(2, computedBtnList.length);
      } else {
        return [];
      }
    });

    return {
      btnList,
      moreBtnList,
      btnHandler,
    };
  },
});
</script>

<style lang="less" scoped>
@import './BusinessRowBtns.less';
</style>
