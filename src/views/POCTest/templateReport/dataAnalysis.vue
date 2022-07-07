<template>
  <div class="dataAnalysis-wrap">
    <div @click="toBack">返回</div>
    <el-card class="box-card" style="margin-top: 20px">
      <div id="maychar"></div>
    </el-card>
    <el-card class="main-card" style="margin-top: 20px">
      <div id="main"></div>
    </el-card>
  </div>
</template>

<script lang="js">
import { defineComponent, onMounted, inject,reactive } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    onMounted(() => {
      change();
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
    let echarts = inject("echarts");
    const toBack = () => {
      router.go(-1)
    }
    // 基本柱形图
    const change = () => {
      const chartBox = echarts.init(document.getElementById("main"));
      const option = {
        xAxis: {
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {},
        series: [
          {
            type: "bar",
            data: [23, 24, 18, 25, 27, 28, 25],
          },
        ],
      };
      chartBox.setOption(option);
      // 根据页面大小自动响应图表大小
      window.addEventListener("resize", function () {
        chartBox.resize();
      });
    };
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
        grid: { top: 70, right: 20, bottom: 30, left: 30 },
        tooltip: { trigger: 'axis' },
        xAxis: {
					data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
				},
        yAxis: [
					{
						type: 'value',
						name: '价格',
						splitLine: { show: true, lineStyle: { type: 'dashed', color: '#f5f5f5' } },
					},
				],
        legend: { data: ['预购队列', '最新成交价'], right: 0 },
        series: [
					{
						name: '预购队列',
						type: 'line',
						symbolSize: 6,
						symbol: 'circle',
						smooth: true,
						data: [0, 41.1, 30.4, 65.1, 53.3, 53.3, 53.3, 41.1, 30.4, 65.1, 53.3, 10],
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
						name: '最新成交价',
						type: 'line',
						symbolSize: 6,
						symbol: 'circle',
						smooth: true,
						data: [0, 24.1, 7.2, 15.5, 42.4, 42.4, 42.4, 24.1, 7.2, 15.5, 42.4, 0],
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
      router,
      state,
      changetype,
      toBack
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
</style>
