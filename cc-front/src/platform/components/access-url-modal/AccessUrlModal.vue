<template>
  <a-modal
    :width="'850px'"
    :visible="visible"
    :destroyOnClose="true"
    :forceRender="false"
    :maskClosable="false"
    :keyboard="false"
    :zIndex="1001"
    title="访问地址"
    :footer="null"
    @cancel="handleCancel"
  >
    <a-form layout="inline" class="app-query-form">
      <a-form-item label="地址名称">
        <a-input v-model:value="queryParams.accessUrlName" placeholder="请输入..." />
      </a-form-item>
      <a-form-item label="业务标识">
        <a-select
          v-model:value="queryParams.busniessMark"
          :allowClear="true"
          :showSearch="true"
          :optionFilterProp="'title'"
          placeholder="请选择..."
        >
          <a-select-option
            :value="mark.dicItemValue"
            :key="index"
            :title="mark.dicItemName"
            v-for="(mark, index) in busniessMarkOptionList"
          >
            {{ mark.dicItemName }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="query(true)">
          <app-dynamic-icon iconName="SearchOutlined" /> 查询
        </a-button>
      </a-form-item>
    </a-form>
    <a-table
      :size="'middle'"
      :dataSource="dataSource"
      :columns="columns"
      :pagination="pagination"
      :bordered="true"
      :row-key="'accessUrlId'"
      @change="handleTableChange"
      class="app-data-table-container"
    >
      <template #indexRender="{ index }">
        {{ index + 1 }}
      </template>

      <template #busniessMarkRender="{ record }">
        {{ dataDicPipe(busniessMarkOptionList, 'dicItemValue', record.busniessMark) }}
      </template>

      <template #actionRender="{ record }">
        <a-button type="primary" size="small" @click="selected(record)">{{ btnTxt }}</a-button>
      </template>
    </a-table>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { dataDicTransformPipe } from '/@/platform/pipes/data-dic-pipe';
import AccessUrlApi from '/@/platform/apis/access-url-api';
import CommonUtil from '/@/platform/commons/utils/common-util';
import HttpResultUtils from '/@/platform/commons/utils/http-result-utils';

export default defineComponent({
  name: 'AccessUrlModal',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    btnTxt: {
      type: String,
      default: '选择',
    },
  },
  emits: ['update:visible', 'selectItem'],
  setup(props, context) {
    const busniessMarkOptionList = ref<any[]>([]);
    const dataSource = ref<any>([]);

    let queryParams = CommonUtil.queryParamsInit(
      {
        busniessMark: null,
        accessUrlName: '',
        status: '-1',
      },
      {
        showSizeChanger: false,
      }
    );

    const columns = [
      {
        title: '序号',
        key: 'index',
        dataIndex: 'index',
        width: '80px',
        slots: { customRender: 'indexRender' },
      },
      {
        title: '业务标识',
        dataIndex: 'busniessMark',
        key: 'busniessMark',
        slots: { customRender: 'busniessMarkRender' },
      },
      {
        title: '地址名称',
        dataIndex: 'accessUrlName',
        key: 'accessUrlName',
      },
      {
        title: '地址',
        dataIndex: 'accessUrl',
        key: 'accessUrl',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        slots: { customRender: 'actionRender' },
      },
    ];

    /**
     * 初始化页面数据
     */
    const initPageData = () => {
      AccessUrlApi.initAccessUrlManageData({}).then((res) => {
        if (HttpResultUtils.isSuccess(res)) {
          busniessMarkOptionList.value = res.data.resultData.BUSNIESS_MARK_TYPE;
        } else {
          HttpResultUtils.failureTipMsg(res);
        }
      });
    };

    /**
     * 数据转换管道
     */
    const dataDicPipe = (list, key: string, value: any) => {
      const data = dataDicTransformPipe(list, key, value);
      return data ? data.dicItemName : '无';
    };

    /**
     * 查询数据
     */
    const query = (btnQuery = false) => {
      CommonUtil.queryDataByConditionPaging(
        btnQuery,
        queryParams,
        AccessUrlApi.queryAccessUrlByConditionPaging,
        dataSource
      );
    };

    /**
     *分页计算
     */
    const pagination = CommonUtil.paginationComputed(queryParams);

    //分页参数改变处理
    const handleTableChange = (pag: any) => CommonUtil.paginationChange(queryParams, pag, query);

    /**
     * 取消
     */
    const handleCancel = () => {
      context.emit('update:visible', false);
    };

    const selected = (item: any) => {
      context.emit('selectItem', item);
      handleCancel();
    };

    onMounted(() => {
      initPageData();
      query();
    });

    return {
      handleCancel,
      busniessMarkOptionList,
      queryParams,
      columns,
      pagination,
      dataSource,
      dataDicPipe,
      query,
      handleTableChange,
      selected,
    };
  },
});
</script>

<style lang="less" scoped>
@import './AccessUrlModal.less';
</style>
