<template>
  <a-drawer
    :title="null"
    :placement="'right'"
    :width="'670px'"
    :closable="false"
    :maskClosable="false"
    :keyboard="false"
    :destroyOnClose="true"
    :visible="visible"
    :after-visible-change="afterVisibleChange"
  >
    <app-def-drawer-layout :title="'分配角色'" @close="handleCancel">
      <template #headerBtnsTpl>
        <a-button type="primary" @click="save">
          <app-dynamic-icon iconName="SaveOutlined" />保存
        </a-button>
      </template>

      <a-transfer
        :data-source="dataSource"
        :show-search="true"
        :target-keys="targetKeys"
        :list-style="{
          width: '305px',
          height: '100%',
        }"
        :titles="['未分配角色', '已分配角色']"
        :render="(item) => `${item.title}`"
        @change="(keys) => (targetKeys = keys)"
      />
    </app-def-drawer-layout>
  </a-drawer>
</template>
<script lang="ts">
import { defineComponent, ref, shallowRef } from 'vue';
import CommonUtil from '/@/platform/commons/utils/common-util';
import DataDicApi from '/@/platform/apis/data-dic-api';
import HttpResultUtils from '/@/platform/commons/utils/http-result-utils';

export default defineComponent({
  name: 'DataDicItemRoleDistribute',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: '',
    },
  },
  emits: ['update:visible', 'update:id', 'reload'],
  setup(props, context) {
    const dataSource = shallowRef<any[]>([]);
    const targetKeys = ref<string[]>([]);

    /**
     * 初始化页面数据
     */
    const initPageData = () => {
      DataDicApi.queryDataDicItemRoleDistribute(props.id).then((res) => {
        if (HttpResultUtils.isSuccess(res)) {
          const selectKeys: string[] = [];
          for (const role of res.data.resultData.roleData) {
            role.key = role.roleId;
            role.direction = 'left';
            role.title = role.roleName;
            for (let i = 0; i < res.data.resultData.dataDicItemRoleData.length; i++) {
              const extendRole = res.data.resultData.dataDicItemRoleData[i];
              if (role.roleId === extendRole.roleId) {
                selectKeys.push(extendRole.roleId);
                break;
              }
            }
          }
          targetKeys.value = selectKeys;
          dataSource.value = res.data.resultData.roleData;
        } else {
          HttpResultUtils.failureTipMsg(res);
        }
      });
    };

    /**
     * 保存
     */
    const save = () => {
      const roleIds: string[] = targetKeys.value;
      const params = {
        roleIds: roleIds,
        dicItemId: props.id,
      };

      DataDicApi.saveDataDicItemRoleMapping(params).then((res) => {
        HttpResultUtils.successTipMsg(res, () => {
          CommonUtil.drawerClose(context, true);
        }) && HttpResultUtils.failureTipMsg(res);
      });
    };

    /**
     * 取消
     */
    const handleCancel = () => {
      CommonUtil.drawerClose(context);
    };

    /**
     * 打开
     */
    const afterVisibleChange = (visible) => {
      targetKeys.value = [];
      dataSource.value = [];
      CommonUtil.drawerAddOrViewInit(visible, initPageData);
    };

    return {
      dataSource,
      handleCancel,
      targetKeys,
      afterVisibleChange,
      save,
    };
  },
});
</script>

<style lang="less" scoped>
@import './DataDicItemRoleDistribute.less';
</style>
