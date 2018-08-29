<template src="./index.html">

</template>

<style lang="less" src="./index.less">

</style>

<script>
import echarts from 'echarts';

export default {
  props: ['chartData', 'chartId'],
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
      const colors = ['#00A7EE', '#FFBD35', '#7DC2FD'];
      const tempData = this.chartData;
      const option = {
        color: colors,
        tooltip: {
          // 坐标轴触发
          trigger: 'axis',
          // 坐标轴指示器配置项
          axisPointer: {
            type: 'cross',
          },
          confine: true,
          // tooltip的样式指定
          foarmatter: (params) => {
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
                <div style="box-sizing:border-box;padding:10px 0 10px 25px;  width:auto;height:auto;background-color:rgba(253,253,253,0.8);position:absolute;top:0;left:0;z-index:9999999;box-shadow:0.5px 0.5px 2px rgb(150,150,150);">
                <p style="color:rgb(110,110,110);width:200px;">${params[0].axisValue}</p>
                <br/>
                <p style="margin:5px 0;color:rgb(150,150,150);">${params[0].seriesName}<span style="margin-left:10px;color:${params[0].color}">${percent0}</span></p>
                <p style="margin:5px 0;color:rgb(150,150,150);">${params[1].seriesName}<span style="margin-left:10px;color:${params[1].color}">${percent1}</span>
                </div>
              `;
            } else {
              let percent0 = params[0].value;
              if (params[0].seriesName === '直通车转化率' || params[0].seriesName === '自然搜索转化率') {
                percent0 = `${params[0].value}%`;
              }
              str = `
                <div style="box-sizing:border-box;padding:10px 0 10px 25px;  width:auto;height:auto;background-color:rgba(253,253,253,0.8);position:absolute;top:0;left:0;z-index:9999999;box-shadow:0.5px 0.5px 2px rgb(150,150,150);">
                <p style="color:rgb(110,110,110);width:200px;">${params[0].axisValue}</p>
                <br/>
                <p style="margin:5px 0;color:rgb(150,150,150);">${params[0].seriesName}<span style="margin-left:10px;color:${params[0].color}">${percent0}</span></p>
                </div>
              `;
            }
            return str;
          },
        },
        grid: {
          // grid 组件离容器左侧的距离。
          left: '50',
          // grid 组件离容器右侧的距离。
          right: '50',
        },
        legend: {
          selectedMode: true,
          left: tempData.series[0].data.length > 1 ? 100 : 'center',
          // (function(){
          //   if(tempData.length > 1){
          //     return 'center'
          //   }else{
          //     return 100;
          //   }
          // })(),
          top: tempData.series[0].data.length > 1 ? 'top' : 'middle',
          padding: [
            5,
            20,
            5,
            5,
          ],
          itemWidth: 30,
          // 图例的参数 {name}累计：数值
          formatter(name) {
            if (name.toString().indexOf('率') != -1) {
              return `${name }累计:${tempData.total[name.toString()] }%`;
            }
            return `${name }累计:${tempData.total[name.toString()]}`;
          },
          data: this.chartData.checkList,
        },
        xAxis: [{
          type: 'category',
          axisTick: {
            // 可以保证刻度线和标签对齐
            alignWithLabel: true,
            // 是否显示坐标轴刻度
            show: false,
          },
          axisLine: {
            lineStyle: {
              // 坐标轴线线的颜色
              color: '#ccc',
            },
          },
          data: this.chartData.xAxisData,
        }],
        yAxis: this.chartData.yAxis,
        series: this.chartData.series,
      };
      this.chart.clear(); // 清空画布，防止缓存
      try {
        this.chart.setOption(option);
      } catch (error) {
        console.log(error);
      }
      window.addEventListener('resize', () => {
        setTimeout(() => {
          this.chart.resize();
        }, 100);
      });
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
