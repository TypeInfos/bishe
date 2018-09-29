<template src="./index.html">

</template>

<style lang="less" src="./index.less">

</style>

<script>
import moment from 'moment'

moment.locale('zh-cn')
export default {
  data() {
    return {
      pid: 1,
    }
  },
  props: {
    orderBlockInfo: {
      type: Object,
    },
  },
  methods: {
    buyBtn() {
      // 页面间跳转 router携带参数
      this.$router.push({
        name: 'buy2',
        params: {
          orderBlockInfo: this.orderBlockInfo,
        },
      })
      // }
    },
    toRootRadar() {
      this.$router.push({
        name: 'rootRadar',
      })
    },
    // 用户还有使用的时间时候的界面显示，出现去使用按钮和到期时间
    checkUseDay() {
    },
  },
  mounted() {
  },
}
</script>

