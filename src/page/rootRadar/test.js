
const tempData = {

};
data = ['2018.01.12', '2018.02.12'];
yAxis = [
  {
    type: 'value',
    name: '直通车花费',
    // min: 0,
    // max: 250,
    position: 'left',
    axisLine: {
      lineStyle: {
        color: colors[0],
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
  },
  {
    type: 'value',
    name: '直通车访客数',
    // min: 0,
    // max: 250,
    position: 'right',
    // offset: 80,
    axisLine: {
      lineStyle: {
        color: colors[1],
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
  },
];


// {
//   keyWord:'', //varchar255
//   zCost:'',  //直通车花费
//   zUv:'', //
//   nUv:'', //
// }
