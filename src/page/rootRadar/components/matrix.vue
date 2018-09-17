<template lang="pug">
el-card.matrix(element-loading-text="正在加载数据" v-loading="isLoading")
  .matrix-title(slot="header") 单品词根波士顿矩阵
  .matrix-body
    .chart
      .lt-area
        span.tag ?
      .rt-area
        span.tag ?
      .lb-area
        span.tag ?
      .rb-area
        span.tag ?
      el-popover(
          v-for="(item, index) in renderData.matrix"
          :key="item.name"
          trigger="hover")
        .label
          .label-title 词根：{{ item.labelName }}
          .info 最近30天词根成交量：{{ item.dealNumber }}
          .info 最近30天词根转化率：{{ item.convertRatio }}%
        .root-data(
          slot="reference"
          :style=`{ width: renderData.radius + 'px',
                    height: renderData.radius + 'px',
                    bottom: item.bottom,
                    left: item.left,
                    background: bgColors[index % 14]}`) {{ item.name }}
</template>

<script>
import { getMatrixDataAPI } from '@/assets/api/rootRadar'
import { isEmpty } from '@/utils/helper'


export default {
  props: {
    itemId: {
      type: [Number, String],
      default: ''
    }
  },
  data () {
    return {
      data: {},
      isLoading: false,
      // bgColors: ['#0088FE', '#00C49F', '#33A0FE', '#FFBB28', '#0081F1', '#FF8441', '#DADADA', '#EE3B61', '#3A5CD3', '#FF6590', '#0075D2', '#9575DE', '#0052A3', '#889BBE']
      bgColors: ['#0088FE', '#00C49F', '#33A0FE', '#FFBB28', '#0081F1', '#FF8441', '#DADADA', '#EE3B61', '#FF6590', '#9575DE', '#889BBE'],
      renderData: {},
      resizeTimer: null
    }
  },
  mounted () {
    this.initResizeEvent()
  },
  beforeDestroy () {
    window.removeEventListener('resize', reszieHandler)
  },
  methods: {
    // 监听窗口大小改变时间
    initResizeEvent () {
      const reszieHandler = () => {
        if (this.resizeTimer) {
          clearTimeout(this.resizeTimer)
        }
        this.resizeTimer = setTimeout(() => {
          console.log('resize event')
          this.renderData = this.formatData()
        }, 300)
      }
      window.addEventListener('resize', () => {
        reszieHandler()
      })
    },
    async getMatrixData () {
      this.data = {}
      if (!this.itemId) return
      this.isLoading = true
      let res = await getMatrixDataAPI({ itemId: this.itemId })
      this.data = res.data
      this.isLoading = false
      this.renderData = this.formatData()
    },
    getWidth () {
      return parseInt(document.querySelector('.matrix-body .chart').getBoundingClientRect().width, 10) - 2
    },
    getLeft (xValue, radius) {
      const width = this.getWidth()
      return `${(width - radius - 30) * xValue + 15}px`
    },
    getBottom (yValue, radius) {
      return `${(440 - radius - 30) * yValue + 15}px`
    },
    formatData () {
      if (isEmpty(this.data)) return {}
      let data = this.data.matrix.reduce((all, item) => {
        let i = item[0]
        i.labelName = i.name
        i.bottom = this.getBottom(parseFloat(i.yValue), parseFloat(this.data.radius))
        i.left = this.getLeft(parseFloat(i.xValue), parseFloat(this.data.radius))
        i.labelName += item.reduce((plus, name) => {
          plus += `、${name.name}`
          return plus
        }, '')
        all.push(i)
        return all
      }, [])
      return {
        radius: this.data.radius,
        matrix: data
      }
    }
  },
  watch: {
    itemId () {
      this.data = {}
      this.renderData = {}
      this.isLoading = true
    }
  }
}
</script>

<style lang="less">
.matrix {
  margin-top: 20px;
  overflow: visible;
  &-title {
    font-size: 16px;
    color: #333;
    font-weight: 500;
  }
  .chart {
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
      position: absolute;
      height: 20px;
      width: 200px;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
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
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      position: absolute;
      border-radius: 50%;
      cursor: pointer;
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