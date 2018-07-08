<template src="./index.html"></template>
<style lang="less" src="./index.less"></style>
<script>
import echarts from 'echarts';

export default {
  props: ['chartData', 'chartId', 'height'],
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$nextTick(() => {
        this.chart = echarts.init(document.getElementById(this.chartId));
        this.initEchart();
      });
    },
    initEchart() {
      const colors = ['#FFBC2F', '#7DC92B', '#7DC2FD'];
      const option = {
        color: colors,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
          formatter: (params) => {
            let str = '';
            if (params.length === 2) {
              let percent0 = params[0].value;
              if (params[0].seriesName === '直通车转化率' || params[0].seriesName === '自然搜索转化率') {
                percent0 = `${params[0].value}%`;
              }
              let percent1 = params[1].value;
              if (params[1].seriesName === '直通车转化率' || params[1].seriesName === '自然搜索转化率') {
                percent1 = `${params[1].value}%`;
              }
              str = `
              ${params[0].axisValue}<br/>
              <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${params[0].color}"></span>
              ${params[0].seriesName}：${percent0}<br/>
              <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${params[1].color}"></span>
              ${params[1].seriesName}：${percent1}
            `;
            } else {
              let percent0 = params[0].value;
              if (params[0].seriesName === '直通车转化率' || params[0].seriesName === '自然搜索转化率') {
                percent0 = `${params[0].value}%`;
              }
              str = `
              ${params[0].axisValue}<br/>
              <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${params[0].color}"></span>
              ${params[0].seriesName}：${percent0}
            `;
            }
            return str;
          },
        },
        grid: {
          left: '50',
          right: '50',
        },
        legend: {
          selectedMode: false,
          data: this.chartData.checkList,
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true,
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: '#ccc',
              },
            },
            // data: ['2018.01.12', '2018.02.12', '2018.03.12', '2018.04.12', '2018.05.12', '2018.06.12', '2018.07.12', '2018.08.12', '2018.09.12', '2018.10.12', '2018.11.12', '2018.12.12'],
            data: this.chartData.xAxisData,
          },
        ],
        yAxis: this.chartData.yAxis,
        // yAxis: [
        //   {
        //     type: 'value',
        //     name: '直通车花费',
        //     // min: 0,
        //     // max: 250,
        //     position: 'left',
        //     axisLine: {
        //       lineStyle: {
        //         color: colors[0],
        //       },
        //     },
        //     axisLabel: {
        //       formatter: '{value}',
        //     },
        //     splitLine: {
        //       show: false,
        //     },
        //     axisTick: {
        //       show: false,
        //     },
        //   },
        //   {
        //     type: 'value',
        //     name: '直通车访客数',
        //     // min: 0,
        //     // max: 250,
        //     position: 'right',
        //     // offset: 80,
        //     axisLine: {
        //       lineStyle: {
        //         color: colors[1],
        //       },
        //     },
        //     axisLabel: {
        //       formatter: '{value}',
        //     },
        //     splitLine: {
        //       show: false,
        //     },
        //     axisTick: {
        //       show: false,
        //     },
        //   },
        // ],
        series: this.chartData.series,
        // series: [
        //   {
        //     name: '直通车花费',
        //     smooth: true,
        //     type: 'line',
        //     data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
        //   },
        //   {
        //     name: '直通车访客数',
        //     smooth: true,
        //     type: 'line',
        //     yAxisIndex: 1,
        //     data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
        //   },
        // ],
      };
      this.chart.clear(); // 清空画布，防止缓存
      this.chart.setOption(option);
      window.onresize = () => {
        this.chart.resize();
        // myChart1.resize();若有多个图表变动，可多写
      };
    },
  },
  watch: {
    chartData: {
      handler() {
        this.$nextTick(() => {
          this.initEchart();
        });
      },
      deep: true,
    },
  },
};
</script>
