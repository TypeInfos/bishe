<template lang="pug">
el-card.matrix
  .matrix-title(slot="header") 单品词根波士顿矩阵
  .matrix-body
    .chart
      .lt-area
        span.tag 问题词根
      .rt-area
        span.tag 明星词根
      .lb-area
        span.tag 瘦狗词根
      .rb-area
        span.tag 金牛词根
      .root-data(
        v-for="item in renderData.matrix"
        :key="item.name"
        :style=`{ width: renderData.radius + 'px',
                  height: renderData.radius + 'px',
                  top: item.yValue + 'px',
                  left: item.xValue + 'px'}`) {{ item.name }}
        .label(:style=`{top: renderData.radius + 'px', left: renderData.radius + 'px'}`)
          .label-title 词根：{{ item.name }}
          .info 最近30天词根成交量：{{ item.dealNumber }}
          .info 最近30天词根转化率：{{ item.convertRatio }}%
</template>

<script>
export default {
  data () {
    return {
      renderData: {
        radius: 50,
        matrix: [
          {
            name: '女',
            dealNumber: 123,
            convertRatio: 2.3,
            xValue: 102,
            yValue: 91
          }
        ]
      }
    }
  }
}
</script>

<style lang="less">
.matrix {
  margin-top: 20px;
  &-title {
    font-size: 16px;
    color: #333;
    font-weight: 500;
  }
  .chart {
    width: 1400px;
    height: 440px;
    margin: 0 auto;
    border: 1px solid #ADADAD;
    background: #fff;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    &::before,
    &::after {
      position: absolute;
      display: flex;
      text-align: center;
      justify-content: center;
      align-items: center;
      border: 1px solid #ADADAD;
      border-radius: 10px;
      background: #fff;
      z-index: 12;
    }
    &::before {
      content: "近30天词根成交量";
      width: 20px;
      height: 200px;
      top: 120px;
      left: -10px;
    }
    &::after {
      content: "近30天词根转化率";
      height: 20px;
      width: 200px;
      bottom: -10px;
      left: 600px;
    }
    .lt-area,
    .lb-area,
    .rt-area,
    .rb-area {
      width: 50%;
      height: 50%;
      box-sizing: border-box;
      position: relative;
    }
    .rt-area,
    .rb-area {
      border-left: 1px solid #E9E9E9;
    }
    .lt-area,
    .rt-area {
      border-bottom: 1px solid #E9E9E9;
    }
    .rt-area,
    .lb-area {
      background: #F8F9FD;
    }
    .tag {
      color: #69676A;
      background: #F1EBF9;
      padding: 5px 10px;
      position: absolute;
    }
    .rt-area .tag,
    .rb-area .tag {
      right: 0;
    }
    .lb-area .tag,
    .rb-area .tag {
      bottom: 0;
    }
    .lt-area::after,
    .rb-area::after {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
    }
    .lt-area::after {
      top: 0;
      left: -5px;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 15px solid #ADADAD;
    }
    .rb-area::after {
      right: 0;
      bottom: -5px;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-left: 15px solid #ADADAD;
    }
    .root-data {
      position: absolute;
      border-radius: 50%;
      background: #F5A623;
      color: #5F5545;
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      z-index: 13;
      .label {
        position: absolute;
        width: 180px;
        padding: 15px 15px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 0 8px 3px rgba(0,0,0,.1);
        z-index: 14;
        display: none;
      }
      &:hover {
        z-index: 14;
        .label {
          display: block;
        }
      }
    }
  }
}
</style>
