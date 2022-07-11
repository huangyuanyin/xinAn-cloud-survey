<template>
  <div class="dataAnalysis-wrap">
    <el-card class="top">
      <div class="left" @click="toBack">
        <el-icon>
          <ArrowLeftBold />
        </el-icon>
        <span>返回</span>
      </div>
    </el-card>
    <el-card class="box-card" style="margin-top: 20px">
      <div id="maychar"></div>
    </el-card>
  </div>
</template>

<script lang="js">
import { defineComponent, onMounted, inject, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ArrowLeftBold } from "@element-plus/icons-vue";
export default defineComponent({
  components: {
    ArrowLeftBold,
  },
  setup() {
    onMounted(() => {
      dataList.value = JSON.parse(sessionStorage.getItem("dataList"))
      handleData(dataList.value)
      changetype();
    });
    const router = useRouter()
    const state = reactive({
      charts: {
        theme: '',
        bgColor: '',
        color: '#303133',
      },
    })
    const form = reactive({
      name: "",
      region: "",
      date1: "",
      date2: "",
      delivery: false,
      type: [],
      resource: "",
      desc: "",
    }); const formLabelWidth = "140px";
    const isShowDialog = ref(false)
    const dataList = ref([]) // 对比数据
    const dataID = ref([]) // 对比数据的ID
    const dataQuery = ref([]) // 对比数据的参数
    const dataAfter = ref([]) // 折线图数据处理后
    let echarts = inject("echarts");
    // 处理数据
    const handleData = () => {
      // dataQuery.value = Object.keys(data[0]).filter(item => item == 'tps' || item == 'cps' || item == 'throughput' || item == 'cc' || item == 'dut_rps' || item == 'dut_cps' || item == 'dut_cc' || item == 'ssl_ae' || item =='ssl_se' )
      dataAfter.value = dataList.value.map((item, index) => {
        dataID.value.push("任务" + item.id)
        return Object.assign({}, { 'unsuccessful': item.unsuccessful, 'tps': item.tps, 'cps': item.cps, 'throughput': item.throughput, 'cc': item.cc, 'response': item.response, 'dut_rps': item.dut_rps, 'dut_cps': item.dut_cps, 'dut_cc': item.dut_cc, 'ssl_ae': item.ssl_ae, 'ssl_se': item.ssl_se })
      })
      dataQuery.value = Object.keys(dataAfter.value[0])
      console.log(dataAfter.value);
    }
    const toBack = () => {
      router.go(-1)
    }
    // // 基本柱形图
    // const change = () => {
    //   const chartBox = echarts.init(document.getElementById("main"));
    //   const option = {
    //     xAxis: {
    //       data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    //     },
    //     yAxis: {},
    //     series: [
    //       {
    //         type: "bar",
    //         data: [23, 24, 18, 25, 27, 28, 25],
    //       },
    //     ],
    //   };
    //   chartBox.setOption(option);
    //   // 根据页面大小自动响应图表大小
    //   window.addEventListener("resize", function () {
    //     chartBox.resize();
    //   });
    // };
    // 折线图
    const changetype = () => {
      // 获取组件实例
      const machart = echarts.init(document.getElementById("maychar"));
      // 设置配置项
      const option = {
        backgroundColor: state.charts.bgColor,
        title: {
          text: '数据分析',
          x: 'left',
          textStyle: { fontSize: '15', color: state.charts.color },
        },
        grid: { top: 70, right: 20, bottom: 30, left: 90 },
        tooltip: { trigger: 'axis' },
        xAxis: {
          data: dataQuery.value,
        },
        yAxis: [
          {
            type: 'value',
            // name: '价格',
            splitLine: { show: true, lineStyle: { type: 'dashed', color: '#f5f5f5' } },
          },
        ],
        legend: { data: dataID.value, right: 0 },
        series: [
          {
            name: dataID.value[0],
            type: 'line',
            symbolSize: 6,
            symbol: 'circle',
            smooth: true,
            data: Object.values(dataAfter.value[0]).map(Number),
            lineStyle: { color: '#fe9a8b' },
            itemStyle: { color: '#fe9a8b', borderColor: '#fe9a8b' },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#fe9a8bb3' },
                { offset: 1, color: '#fe9a8b03' },
              ]),
            },
          },
          {
            name: dataID.value[1],
            type: 'line',
            symbolSize: 6,
            symbol: 'circle',
            smooth: true,
            data: Object.values(dataAfter.value[1]).map(Number),
            lineStyle: { color: '#9E87FF' },
            itemStyle: { color: '#9E87FF', borderColor: '#9E87FF' },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#9E87FFb3' },
                { offset: 1, color: '#9E87FF03' },
              ]),
            },
            emphasis: {
              itemStyle: {
                color: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.5,
                  colorStops: [
                    { offset: 0, color: '#9E87FF' },
                    { offset: 0.4, color: '#9E87FF' },
                    { offset: 0.5, color: '#fff' },
                    { offset: 0.7, color: '#fff' },
                    { offset: 0.8, color: '#fff' },
                    { offset: 1, color: '#fff' },
                  ],
                },
                borderColor: '#9E87FF',
                borderWidth: 2,
              },
            },
          },
        ],
      };
      // 复制
      machart.setOption(option);
      // 根据页面大小自动响应图表大小
      window.addEventListener("resize", function () {
        machart.resize();
      });
    };
    return {
      isShowDialog, form, formLabelWidth,
      ArrowLeftBold,
      dataList,
      dataID,
      dataQuery,
      dataAfter,
      router,
      state,
      changetype,
      toBack,
      handleData
    };
  },
});
</script>

<style lang="scss" scoped>
#main {
  min-width: 31.25rem;
  min-height: 31.25rem;
  // max-height: 500px;
}

#maychar {
  max-height: 500px;
  // max-height: 400px;
  height: 500px;
}

.top {
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
