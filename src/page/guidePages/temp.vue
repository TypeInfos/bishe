<template lang="pug">
.g-guide
  p.guide-title {{ guideTitle }}&nbsp;
  span.guide-link(@click="goBuy") 订购
</template>

<script>
export default {
  computed: {
    guideTitle () {
      let str = ''
      let type = parseInt(this.$route.query.type, 10)
      switch (type) {
        case -1:
          str = '您尚未订购该产品或订购的产品已到期，请先前往'
          break
        case -2:
          str = '您尚未订购该产品或订购的产品已到期，请先前往'
          break
        default:
          str = ''
      }
      return str
    },
    buyName () {
      const mapName = {
        rootRadar: 'buy1',
        labelLab: 'buy1',
      }
      return mapName[this.$route.query.name] || 'buy1'
    },
  },
  methods: {
    goBuy () {
      this.$router.push({ name: this.buyName })
    },
  },
}
</script>

<style lang="less">
.g-guide {
  height: calc(100vh - 150px);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  .guide-link {
    color: #409EFF;
    cursor: pointer;
  }
}
</style>

