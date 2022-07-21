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
      <el-table :data="tableData" border stripe style="width: 100%;margin-top: 30px;">
        <el-table-column prop="cc" label="cc" align="center" />
        <el-table-column prop="cps" label="cps" align="center" />
        <el-table-column prop="cpu" label="cpu" align="center" />
        <el-table-column prop="dut_cc" label="dut_cc" align="center" />
        <el-table-column prop="dut_rps" label="dut_rps" align="center" />
        <el-table-column prop="response" label="response" align="center" />
        <el-table-column prop="ssl_ae" label="ssl_ae" align="center" />
        <el-table-column prop="ssl_se" label="ssl_se" align="center" />
        <el-table-column prop="throughput" label="throughput" align="center" />
        <el-table-column prop="tps" label="tps" align="center" />
        <el-table-column prop="unsuccessful" label="unsuccessful" align="center" />
      </el-table>
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
import { getDataApi } from "@/utils/getApi.js"
export default defineComponent({
  components: {
    ArrowLeftBold, DataTemplateDialog
  },
  setup() {
    const isShowDialog = ref(false)
    const tableData = ref([]) // 详情数据
    const itemList: any = ref([])
    const route = useRoute();
    const router = useRouter()
    let echarts: any = inject("echarts");
    const dataX: any = ref([])
    const dialogData = ref([])
    // 获取数据
    const getDatas = () => {
      getDataApi(route.query.resultid).then(res => {
        tableData.value = res;
        handleData(tableData.value)
      }).then(() => {
        changetype()
      })
    };
    // 折线图
    const changetype = () => {
      // 获取组件实例
      const machart = echarts.init(document.getElementById("detail"));
      // 设置配置项
      const option = {
        backgroundColor: "rgba(5,39,58,1)", //背景色
        tooltip: {
          trigger: "axis",
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "4%",
          right: "4%",
          bottom: "6%",
          top: "15%",
          containLabel: true
        },
        xAxis: {
          data: ['cc', 'cps', 'cpu', 'dut_cc', 'dut_cps', 'dut_rps', 'response', 'ssl_ae', 'ssl_se', 'throughput', 'tps', 'unsuccessful'],
          triggerEvent: true,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: true,
            rotate: 0,
            interval: 0,
            textStyle: {
              padding: [14, 0, 0, 0],
              fontSize: 14,
              color: "rgba(255,255,255,1)"
            }
          }
        },
        yAxis: {
          type: "log",
          min: 1,
          // name: "单位：个数",
          triggerEvent: true,
          nameTextStyle: {
            color: "rgba(255,255,255,1)",
            fontSize: 16,
            padding: [0, 0, 10, -20]
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,.1)'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,.1)'
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "rgb(148,159,167)",
              fontSize: 16
            }
          }
        },
        // color: ["#e54035"],
        series: [
          {
            name: "值",
            barMinHeight: 10,
            type: "pictorialBar",
            barCategoryGap: "60%",
            // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
            symbol: "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
            itemStyle: {
              normal: {
                //barBorderRadius: 5,
                //渐变色
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: "#01EAED"
                },
                {
                  offset: 0.5,
                  color: "#02C4DD"
                },
                {
                  offset: 1,
                  color: "#029ED9"
                }
                ])
              }
            },
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: "#fff",
                  fontSize: 20
                }
              }
            },
            data: dataX.value,
            z: 10
          },
        ]
      }
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
  margin-bottom: 15px;
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
