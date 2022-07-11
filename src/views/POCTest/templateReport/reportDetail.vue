<template>
  <el-card class="top">
    <div class="left" @click="toBack">
      <el-icon>
        <ArrowLeftBold />
      </el-icon>
      <span>返回</span>
    </div>
  </el-card>
  <el-card class="detail-card">
    <template #header>
      <div class="card-header">
        <span>报告详情</span>
        <el-button class="button" link type="primary" @click="openDialog">生成报告</el-button>
      </div>
    </template>
    <div class="card-detail">
      <div class="item" v-for="(item, index) in itemList" :key="'itemList' + index">
        <span>{{ item.label }}</span>
        <span class="right">{{ item.value }}</span>
      </div>
    </div>
    <div id="detail"></div>
  </el-card>
  <DataTemplateDialog :dialogData="dialogData" :isShowDialog="isShowDialog" @closeDialog="closeDialog" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive, inject, nextTick } from 'vue'
import { datas } from "@/api/POC/index.js";
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeftBold } from "@element-plus/icons-vue";
import DataTemplateDialog from './components/dataTemplateDialog.vue';
export default defineComponent({
  components: {
    ArrowLeftBold, DataTemplateDialog
  },
  setup() {
    const isShowDialog = ref(false)
    const tableData = ref({})
    const itemList: any = ref([])
    const route = useRoute();
    const router = useRouter()
    let echarts: any = inject("echarts");
    const dataX: any = ref([])
    const dialogData = ref([])
    // 获取数据
    const getDatas = async () => {
      const params = {
        resultid: route.query.resultid
      }
      const res = await datas(params);
      if (res.code == 1000) {
        tableData.value = res.data;
        handleData(res.data) // 处理数据
      };
    };
    // 折线图
    const changetype = () => {
      // 获取组件实例
      const machart = echarts.init(document.getElementById("detail"));
      // 设置配置项
      const option = {
        title: {
          text: '数据详情',
          x: 'left',
          textStyle: { fontSize: '15', color: '#999999' },
        },
        grid: { top: 70, right: 20, bottom: 30, left: 90 },
        tooltip: { trigger: 'axis' },
        xAxis: {
          type: 'category',
          data: ['cc', 'cps', 'cpu', 'dut_cc', 'dut_cps', 'dut_rps', 'response', 'ssl_ae', 'ssl_se', 'throughput', 'tps', 'unsuccessful']
        },
        yAxis: {
          type: 'value',
          splitLine: { show: true, lineStyle: { type: 'dashed', color: '#f5f5f5' } },
        },
        series: [
          {
            data: dataX.value,
            type: 'line',
            smooth: true,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#fe9a8bb3' },
                { offset: 1, color: '#fe9a8b03' },
              ]),
            },
          }
        ]
      };
      // 复制
      machart.setOption(option);
      // 根据页面大小自动响应图表大小
      window.addEventListener("resize", function () {
        machart.resize();
      });
    };
    // 处理数据
    const handleData = (tableData) => {
      itemList.value = [
        { label: '任务ID:', value: tableData[0]?.id },
        { label: "测试时间:", value: tableData[0].time },
        { label: "测试结果状态:", value: tableData[0].status },
        { label: "设备型号:", value: tableData[0].apv_model },
        { label: "版本:", value: tableData[0].build },
        { label: "ipversion:", value: tableData[0].ipversion },
      ]
      let { apv_model, build, dut_throughput, id, ipversion, protocol, test_case, status, time, ...params } = tableData[0]
      dataX.value = Object.values(params)
    }
    const toBack = () => {
      router.go(-1)
    }
    // 生成报告 弹窗
    const openDialog = () => {
      isShowDialog.value = true
      dialogData.value = tableData.value[0]
      console.log("测试数据...", dialogData.value)
    }
    // 关闭弹窗
    const closeDialog = (value) => {
      isShowDialog.value = value
    }
    onMounted(async () => {
      await getDatas();
      changetype()
    });
    return {
      dialogData,
      isShowDialog,
      openDialog,
      closeDialog,
      dataX,
      changetype,
      echarts,
      route,
      router,
      tableData,
      itemList,
      getDatas,
      handleData,
      toBack
    }
  },
})
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-weight: 600;
  }
}

.card-detail {
  display: flex;
  flex-flow: wrap;

  .item {
    display: flex;
    flex: 33%;
    margin-top: 10px;

    span {
      font-size: 18px;
      color: #555;
      min-width: 80px;
      display: inline-block;
    }

    .right {
      margin-left: 15px;
      max-width: 400px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}

#detail {
  max-height: 500px;
  height: 500px;
  margin-top: 30px;
}

.top {
  margin-bottom: 10px;

  .left {
    display: flex;
  }

  :deep(.el-card__body) {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      font-size: 16px;
      display: inline-block;
      height: 16px;
      line-height: 16px;
      margin-left: 5px;
    }
  }
}
</style>
