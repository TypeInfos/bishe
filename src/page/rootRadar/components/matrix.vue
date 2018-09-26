<template lang="pug">
el-card.matrix(element-loading-text="正在加载数据" v-loading="isLoading")
  .matrix-title(slot="header") 单品词根波士顿矩阵
  .matrix-body
    .mode-choose
      .mode-item(@click="changeMode(1)" :class="{active: mode === 1}") 模式一
      .mode-item(@click="changeMode(2)" :class="{active: mode === 2}") 模式二
      .add-root
        el-button(type="primary" plain @click="showAddRootDialog") +
        span.text 添加自定义词根
    .checkbox-container
      el-checkbox-group(v-model="checked" @change="renderData=formatData()")
        el-checkbox(
          v-for="(i, index) in dataCopy"
          :key="index"
          :label="i.name") {{ i.name }}
          i.el-icon-error(@click="handleDelete(i)")
    .chart(
      :data-x-title="mode === 1 ? '最近30天词根转化率' : '最近30天词根加购率'"
      :data-y-title="mode === 1 ? '最近30天词根成交量' : '最近30天词根加购量'")
      .lt-area
        el-tooltip(effect="dark" placement="bottom")
          div(slot="content") 针对性优化页面、主图、文案等信息<br>提高该词根搜索用户的转化率
          span.tag 问题词根?
      .rt-area
        el-tooltip(effect="dark" placement="top-start")
          div(slot="content") 直通车添加相关关键词<br>搜索标题匹配相关关键词
          span.tag 明星词根?
      .lb-area
        el-tooltip(effect="dark" placement="top-start")
          div(slot="content") 做词根减法，去除拉低整体转化的词根<br>提高“商品原始排名”
          span.tag 瘦狗词根?
      .rb-area
        el-tooltip(effect="dark" placement="left")
          div(slot="content") 宝贝前中期重点突破词根<br>观察竞品词根成交量制定超越计划
          span.tag 金牛词根?
      el-popover(
          v-for="(item, index) in renderData.matrix"
          :key="item.name"
          trigger="hover")
        .label
          .label-title 词根：{{ item.labelName }}
          .info(v-if="mode === 2") 最近30天词根加购量：{{ item.buyNumber }}
          .info(v-if="mode === 2") 最近30天词根加购率：{{ item.buyRatio < 0.01 ? '<0.01' : item.buyRatio.toFixed(2) }}%
          .info 最近30天词根成交量：{{ item.dealNumber }}
          .info 最近30天词根转化率：{{ item.convertRatio < 0.01 ? '<0.01' : item.convertRatio.toFixed(2) }}%
          .info(v-if="mode === 1") 最近30天词根加购量：{{ item.buyNumber }}
          .info(v-if="mode === 1") 最近30天词根加购率：{{ item.buyRatio < 0.01 ? '<0.01' : item.buyRatio.toFixed(2) }}%
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
import { Message } from 'element-ui'

export default {
  props: {
    itemId: {
      type: [Number, String],
      default: ''
    },
    shopId: {
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
      dataCopy: [],
      resizeTimer: null,
      mode: 1,
      checked: []
    }
  },
  mounted () {
    this.initResizeEvent()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.reszieHandler)
  },
  methods: {
    changeMode (val) {
      if (this.mode === val) return
      if (val === 2 && !this.data.buyFlow) {
        Message({
          message: '请先购买流量纵横',
          title: 'warning',
          showClose: true,
          type: 'warning',
          duration: 4000, // 显示时长  单位s
          customClass: 'message-g-zindex'
        })
        return
      }
      this.mode = val
      this.data.matrix = JSON.parse(JSON.stringify(this.dataCopy))
      this.renderData = this.formatData()
    },
    reszieHandler() {
      if (this.resizeTimer) {
        clearTimeout(this.resizeTimer)
      }
      this.resizeTimer = setTimeout(() => {
        this.renderData = this.formatData()
      }, 300)
    },
    handleDelete (word) {
      console.log(word)
      this.$emit('del', word)
    },
    // 监听窗口大小改变时间
    initResizeEvent () {
      window.addEventListener('resize', () => {
        this.reszieHandler()
      })
    },
    async getMatrixData () {
      this.data = {}
      if (!this.itemId || !this.shopId) return
      this.isLoading = true
      let res = await getMatrixDataAPI({ itemId: this.itemId, shopId: this.shopId, terminal: 1 })
      this.data = res.data
      this.dataCopy = JSON.parse(JSON.stringify(res.data.matrix))
      this.dataCopy.forEach(i => {
        this.checked.push(i.name)
      })
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
    convertPosition () {
      const maxName = this.data.matrix.sort((a, b) => b.name.length - a.name.length)[0].name.length
      let maxXValue = this.data.matrix.sort((a, b) => (this.mode === 1 ? b.convertRatio - a.convertRatio : b.buyRatio - a.buyRatio))[0]
      let maxYValue = this.data.matrix.sort((a, b) => (this.mode === 1 ? b.dealNumber - a.dealNumber : b.buyNumber - a.buyNumber))[0]
      maxXValue = this.mode === 1 ? maxXValue.convertRatio : maxXValue.buyRatio
      maxYValue = this.mode === 1 ? maxYValue.dealNumber : maxYValue.buyNumber
      this.data.radius = (Math.ceil(Math.sqrt(maxName)) + 3) * 14
      this.data.matrix.forEach(i => {
        let x = this.mode === 1 ? i.convertRatio : i.buyRatio
        let y = this.mode === 1 ? i.dealNumber : i.buyNumber
        i.xValue = maxXValue ? x / maxXValue : 0
        i.yValue = maxYValue ? y / maxYValue : 0
      })
      let tempArr = JSON.parse(JSON.stringify(this.data.matrix)).sort((a, b) => a.xValue - b.xValue)
      let res = []
      tempArr.forEach(i => {
        if (!res.length) {
          res.push([i])
        } else {
          let pre = res.pop()
          let el = pre.pop()
          if (el.xValue === i.xValue && el.yValue === i.yValue) {
            pre.push(el, i)
            res.push(pre)
          } else {
            pre.push(el)
            res.push(pre, [i])
          }
        }
      })
      this.data.matrix = res
    },
    formatData () {
      this.data.matrix = this.dataCopy.filter(i => this.checked.indexOf(i.name) > -1)
      if (isEmpty(this.data)) return {}
      if (isEmpty(this.data.matrix)) return {}
      this.convertPosition()
      let data = this.data.matrix.reduce((all, item) => {
        let i = item[0]
        i.labelName = ''
        i.bottom = this.getBottom(parseFloat(i.yValue), parseFloat(this.data.radius))
        i.left = this.getLeft(parseFloat(i.xValue), parseFloat(this.data.radius))
        i.labelName += item.reduce((plus, name) => {
          plus += `${name.name}、`
          return plus
        }, '')
        i.labelName = i.labelName.slice(0, i.labelName.length - 1)
        all.push(i)
        return all
      }, [])
      return {
        radius: this.data.radius,
        matrix: data
      }
    },
    showAddRootDialog() {
      this.$emit('showAddRootDialog')
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
  .add-root {
    display: flex;
    align-items: center;
    margin-left: 30px;
    .text {
      margin-left: 5px;
    }
    button {
      border-radius: 8px;
      height: 24px;
      width: 34px;
      padding: 0;
      // position: relative;
      // line-height: 40px;
      span {
        font-size: 25px;
        font-weight: 400;
        text-align: center;
        width:34px;
      }
    }
  }
  .mode-choose {
    // border: 1px solid #1CCADA;
    // display: inline-block;
    display: flex;
    margin-bottom: 10px;
    .mode-item {
      font-size: 12px;
      color: #333;
      background: #EAFCF8;
      padding: 5px 30px;
      display: inline-block;
      cursor: pointer;
      border: 1px solid #1CCADA;
      &.active {
        background: #1CCADA;
      }
    }
  }
  .checkbox-container {
    margin-bottom: 10px;
    .el-checkbox {
      margin-right: 10px;
      position: relative;
      &.is-checked .el-checkbox__label {
        color: #606266;
      }
      &__label {
        font-size: 12px;
        padding-right: 15px;
        .el-icon-error {
          position: absolute;
          right: 0;
          top: 0;
          display: none;
        }
        &:hover .el-icon-error {
          display: block;
        }
      }
    }
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
      content: attr(data-y-title);
      width: 20px;
      height: 200px;
      top: 120px;
      left: -10px;
    }
    &::after {
      content: attr(data-x-title);
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
      padding: 0 15px;
      height: 18px;
      text-align: center;
      line-height: 18px;
      position: absolute;
      border-radius: 4px;
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
