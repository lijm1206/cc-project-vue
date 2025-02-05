<template>
  <app-def-main-layout :showTool="false" :usePadding="false">
    <div class="app-home-container">
      <a-row class="app-home-row">
        <a-col :xs="12" :sm="14" :md="14" :lg="16" :xl="18" class="app-home-col" v-app-scrollbar>
          <a-card :bordered="false" class="app-home-card app-home-left-card">
            <div>
              <app-line-title title="图表示例" />
              <v-chart ref="centerEchartRef" :option="centerEchartOption" class="app-home-chart" />
            </div>

            <div class="app-home-left-row">
              <app-task-card :taskObj="taskObj" @toTaskList="taskListView" @toTaskView="taskView" />
            </div>

            <div class="app-home-left-row">
              <app-notice-card
                :noticeList="noticeList"
                @toNoticeList="noticeListView"
                @toNoticeView="noticeView"
              />
            </div>
          </a-card>
        </a-col>
        <a-col :xs="12" :sm="10" :md="10" :lg="8" :xl="6" class="app-home-col" v-app-scrollbar>
          <a-card :bordered="false" class="app-home-card">
            <app-line-title title="图表示例" />

            <v-chart ref="rightEchartRef" :option="rightEchartOption" class="app-home-chart" />

            <div class="app-home-right-row">
              <div class="app-home-card-chart">
                <div class="app-chart-header">
                  <div class="app-chart-meta-wrap">
                    <app-line-title title="系统拦截指数" />
                    <div class="app-chart-total app-text-primary">
                      <app-dynamic-icon iconName="HeartOutlined" :iconProps="{ class: 'icon' }" />
                      <span>15875</span>
                    </div>
                  </div>
                </div>
                <div class="app-chart-content">系统拦截指数级别分为1-5级</div>
                <div class="app-chart-footer">今日拦截系数：S-100</div>
              </div>
            </div>

            <div class="app-home-right-row">
              <div class="app-home-card-chart">
                <div class="app-chart-header">
                  <div class="app-chart-meta-wrap">
                    <app-line-title title="系统安全指数" />
                    <div class="app-chart-total app-text-success">
                      <app-dynamic-icon iconName="TagOutlined" :iconProps="{ class: 'icon' }" />
                      <span>15875</span>
                    </div>
                  </div>
                </div>
                <div class="app-chart-content">系统安全指数级别分为1-5级</div>
                <div class="app-chart-footer">今日安全系数：S-100</div>
              </div>
            </div>

            <div class="app-home-right-row">
              <div class="app-home-card-chart">
                <div class="app-chart-header">
                  <div class="app-chart-meta-wrap">
                    <app-line-title title="系统警告指数" />
                    <div class="app-chart-total app-text-warning">
                      <app-dynamic-icon iconName="WarningOutlined" :iconProps="{ class: 'icon' }" />
                      <span>15875</span>
                    </div>
                  </div>
                </div>
                <div class="app-chart-content">系统警告指数级别分为1-5级</div>
                <div class="app-chart-footer">今日警告系数：S-100</div>
              </div>
            </div>

            <div class="app-home-right-row">
              <div class="app-home-card-chart">
                <div class="app-chart-header">
                  <div class="app-chart-meta-wrap">
                    <app-line-title title="系统错误指数" />
                    <div class="app-chart-total app-text-error">
                      <app-dynamic-icon
                        iconName="RadarChartOutlined"
                        :iconProps="{ class: 'icon' }"
                      />
                      <span>15875</span>
                    </div>
                  </div>
                </div>
                <div class="app-chart-content">系统错误指数级别分为1-5级</div>
                <div class="app-chart-footer">今日错误系数：S-100</div>
              </div>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </app-def-main-layout>

  <app-sys-notice-view v-model:visible="noticeViewVisible" :id="noticeId" />
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, shallowRef } from 'vue';
import TaskCard from '/@/platform/components/task/TaskCard.vue';
import NoticeCard from '/@/platform/components/notice/NoticeCard.vue';
import SysNoticeView from '../notice/SysNoticeView.vue';

import SysApi from '/@/platform/apis/sys-api';
import TaskObjType from '/@/platform/types/task-obj';
import HttpResultUtils from '/@/platform/commons/utils/http-result-utils';
import NoticeType from '/@/platform/types/notice-type';

import VChart from 'vue-echarts';
import { use } from 'echarts/core';

import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components';
import { BarChart, PieChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { useRouter } from 'vue-router';

use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  PieChart,
  CanvasRenderer,
]);

export default defineComponent({
  name: 'Home',
  components: {
    AppTaskCard: TaskCard,
    AppNoticeCard: NoticeCard,
    AppSysNoticeView: SysNoticeView,
    VChart,
  },
  setup() {
    const router = useRouter();

    // 以下这部分可删除
    const centerEchartRef = ref<any>(null);
    const rightEchartRef = ref<any>(null);

    let centerEchartOption = ref<any>({});
    let rightEchartOption = ref<any>({});

    const centerEchartOptionInit = () => {
      const data1 = [20, 30, 20, 30, 20, 30, 20, 30, 20, 30];
      const data2 = [9, 30, 9, 60, 70, 20, 59, 20, 49, 20];
      const data3 = [20, 30, 20, 30, 20, 30, 20, 30, 20, 30];
      const datacity = [
        '济北市',
        '青山市',
        '文博市',
        '红枣县',
        '东胜县',
        '烟花市',
        '莱平市',
        '济东市',
        '山海市',
        '贵泉市',
      ];

      centerEchartOption.value = {
        color: ['#388BFF', '#05C3FA', '#2eca94', '#18e09b'],
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          top: '8%',
          data: ['存量', '新增', '拆除', '整改'],
        },
        grid: {
          //图表的位置
          top: '20%',
          left: '3%',
          right: '4%',
          bottom: '5%',
          containLabel: true,
        },
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              show: true,
              interval: 'auto',
              formatter: '{value} ',
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
              },
            },
            show: true,
          },
        ],
        xAxis: [
          {
            type: 'category',
            axisLabel: {
              interval: 0,
              show: true,
              splitNumber: 15,
            },
            data: datacity,
          },
        ],
        series: [
          {
            name: '存量',
            type: 'bar',
            stack: 'sum',
            barWidth: '20px',
            data: data1,
          },
          {
            name: '新增',
            type: 'bar',
            barWidth: '20px',
            stack: 'sum',
            data: data2,
          },
          {
            name: '拆除',
            type: 'bar',
            color: '#2eca94',
            stack: 'sum1',
            barWidth: '20px',
            data: data3,
          },
          {
            name: '整改',
            type: 'bar',
            color: '#18e09b',
            stack: 'sum1',
            barWidth: '20px',
            data: data3,
          },
        ],
      };
    };

    const rightEchartOptionInit = () => {
      rightEchartOption.value = {
        color: [
          '#388bff',
          '#2eca94',
          '#fbc448',
          '#f54949',
          '#09c8ff',
          '#23f4ac',
          '#f96f36',
          '#ae5ed2',
        ],
        legend: {
          show: false,
        },
        toolbox: {
          show: false,
        },
        series: [
          {
            name: '面积模式',
            type: 'pie',
            radius: ['35%', '80%'],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8,
            },
            data: [
              { value: 40, name: '存量' },
              { value: 38, name: '新增' },
              { value: 32, name: '拆除' },
              { value: 30, name: '整改' },
              { value: 28, name: '迁移' },
              { value: 26, name: '固定' },
              { value: 22, name: '置换' },
              { value: 18, name: '其它' },
            ],
          },
        ],
      };
    };

    // 以下的不可以删除
    const taskObj = shallowRef<TaskObjType>({
      count: 0,
      tasks: [],
    });

    const noticeList = shallowRef<NoticeType[]>([]);

    const noticeViewVisible = ref(false);
    const noticeId = ref('');

    /**
     * 初始化主页数据
     */
    const initHomeData = () => {
      SysApi.initHomeData().then((res) => {
        if (HttpResultUtils.isSuccess(res)) {
          taskObj.value = res.data.resultData.task;
          noticeList.value = res.data.resultData.notices;
        } else {
          HttpResultUtils.failureTipMsg(res);
        }
      });
    };

    /**
     * 公告查看
     */
    const noticeView = (record) => {
      noticeId.value = record.noticeId;
      noticeViewVisible.value = true;
    };

    const noticeListView = () => {
      router.push('/app/myNoticeList');
    };

    /**
     * 待办查看
     */
    const taskView = (record) => {
      router.push({ path: record.taskUrl, query: JSON.parse(record.taskParameter) });
    };

    const taskListView = () => {
      router.push('/app/myTaskList');
    };

    /**
     * resize
     */
    const resize = () => {
      centerEchartRef.value.resize();
      rightEchartRef.value.resize();
    };

    onMounted(() => {
      centerEchartOptionInit();
      rightEchartOptionInit();

      window.addEventListener('resize', resize);

      initHomeData();
    });

    onUnmounted(() => {
      window.removeEventListener('resize', resize);
    });

    return {
      centerEchartOption,
      rightEchartOption,
      taskObj,
      noticeList,
      noticeViewVisible,
      noticeId,
      noticeView,
      taskView,
      taskListView,
      noticeListView,
      centerEchartRef,
      rightEchartRef,
    };
  },
});
</script>

<style lang="less" scoped>
@import './Home.less';
</style>
