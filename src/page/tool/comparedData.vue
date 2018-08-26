<template>
    <div v-loading="loading">
        <div class="compare-title">词根：{{root}}<span>大盘展现指数：{{grailRevel}}</span></div>
        <div v-if="checkboxListFlag" class="m-checkbox-tip">最多选择2项</div>
        <el-checkbox-group v-model="checkList" :min="1" :max="2" @change="changeCheck">
            <el-checkbox label="直通车花费" @click.native="checkCheckbox"></el-checkbox>
            <el-checkbox label="直通车访客数" @click.native="checkCheckbox"></el-checkbox>
            <el-checkbox label="自然搜索访客数" @click.native="checkCheckbox"></el-checkbox>
            <el-checkbox label="直通车转化率" @click.native="checkCheckbox"></el-checkbox>
            <el-checkbox label="自然搜索转化率" @click.native="checkCheckbox"></el-checkbox>
            <el-checkbox label="直通车成交量" @click.native="checkCheckbox"></el-checkbox>
            <el-checkbox label="自然搜索成交量" @click.native="checkCheckbox"></el-checkbox>
        </el-checkbox-group>
        <div class="m-box2 clearfix" v-for="(item, index2) in turnWrapData" :key="index2">
            <div class="left">
                <img class="img" :src="item.imgurl" />
                <span class="s1">
                    {{item.title}}<br/>
                    <span class="s2">效率分：{{item.efficiency}}</span>
                </span>
            </div>
            <div class="right">
                <div class="right-in">
                    <lineChart :chart-data="item.wrapChartData"
                               :chart-id="`lineChart-${index}-${index2}`" height="200">
                    </lineChart>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import lineChart from '../../components/lineChart';

export default {
  props: ['index', 'comparedData', 'loading', 'grailRevel', 'root', 'checkList2'],
  components: {
    lineChart,
  },
  data() {
    return {
      checkList: ['直通车花费', '直通车访客数'],
      checkListGroup: [
        {
          label: '直通车花费',
          disabled: false,
          isActive: false,
          name: 'zCostList',
        },
        {
          label: '直通车访客数',
          disabled: false,
          isActive: false,
          name: 'zVisitList',
        },
        {
          label: '自然搜索访客数',
          disabled: false,
          isActive: false,
          name: 'rVisitList',
        },
        {
          label: '直通车转化率',
          disabled: false,
          isActive: false,
          name: 'zTransformList',
        },
        {
          label: '自然搜索转化率',
          disabled: false,
          isActive: false,
          name: 'rTransformList',
        },
        {
          label: '直通车成交量',
          disabled: false,
          isActive: false,
          name: 'zDealList',
        },
        {
          label: '自然搜索成交量',
          disabled: false,
          isActive: false,
          name: 'rDealList',
        },
      ],
      wrapData: [
        {
          efficiency: '', // 宝贝效率分
          imgurl: '', // 宝贝展示图
          title: '', // 宝贝名
          rDealList: '', // 自然搜索成交量
          rTransformList: '', // 自然搜索转化率
          rVisitList: '', // 自然搜索访客数
          zCostList: '', // 直通车花费
          zDealList: '', // 直通车成交量
          zTransformList: '', // 直通车转化率
          zVisitList: '', // 直通车访客数
        },
      ],
      turnWrapData: [],
      checkboxListFlag: false,
    };
  },
  mounted() {
    this.checkList = this.checkList2;
    // this.init();
  },
  methods: {
    init() {
      // 拷贝一份 数据
      const comparedData = Object.assign([], this.comparedData);
      comparedData.forEach((item) => {
        this.checkListGroup.forEach((item1) => {
          item1.isActive = false;
        });
        this.checkList.forEach((item2) => {
          this.checkListGroup.forEach((subItem) => {
            if (item2 === subItem.label) {
              subItem.isActive = true;
            }
          });
        });
        item.wrapChartData = this.turnData(this.checkList, item, this.checkListGroup);
      });
      this.turnWrapData = comparedData;
    },
    // 转换数据
    turnData(checkList, data, checkListGroup) {
      const arr = [];
      checkListGroup.forEach((item) => {
        if (item.isActive) {
          arr.push({
            name: item.label,
            box: data[item.name],
          });
        }
      });
      // xAxisData
      const xAxisData = [];
      arr[0].box.forEach((item) => {
        xAxisData.push(item.date);
      });
      // yAxis
      const yAxis = [];
      const colors = ['#FFBC2F', '#7DC92B', '#7DC2FD'];
      checkList.forEach((item, index) => {
        let position = 'left';
        if (index === 1) {
          position = 'right';
        }
        yAxis.push({
          type: 'value',
          name: item,
          position,
          axisLine: {
            lineStyle: {
              color: colors[index],
            },
          },
          axisLabel: {
            formatter: '{value}',
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        });
      });
      // series
      const series = [];
      arr.forEach((item, index) => {
        let yAxisIndex = 0;
        if (index === 1) {
          yAxisIndex = 1;
        }
        const seriesData = [];
        item.box.forEach((subItem) => {
          seriesData.push(subItem.value);
        });
        series.push({
          name: item.name,
          smooth: true,
          type: 'line',
          yAxisIndex,
          data: seriesData,
        });
      });
      const wrap = {
        checkList,
        xAxisData,
        yAxis,
        series,
      };
      return wrap;
    },
    changeCheck() {
      this.init();
    },
    // checkCheckbox
    checkCheckbox(val) {
      const name = val.toElement.defaultValue || val.toElement.innerText;
      if (this.checkList.length === 2) {
        let flag = false;
        this.checkList.forEach((item) => {
          if (item === name) {
            flag = true;
          }
        });
        if (!flag) {
          console.log('最多选择两项');
          this.checkboxListFlag = true;
        } else {
          this.checkboxListFlag = false;
        }
      }
    },
  },
  watch: {
    comparedData(val) {
      if (val.length > 0) {
        this.init();
      }
    },
  },
};
</script>
