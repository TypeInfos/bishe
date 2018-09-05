<template src="./index.html">

</template>

<style lang="less" src="./index.less">

</style>

<script>
import moment from 'moment';

moment.locale('zh-cn');
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
      // if(this.isLogin.set){
      // 页面间跳转 router携带参数
      this.$router.push({
        name: 'buy2',
        params: {
          orderBlockInfo: this.orderBlockInfo,
        },
      });
      // }
    },
    toRootRadar() {
      this.$router.push({
        name: 'rootRadar',
      })
    },
    // 用户还有使用的时间时候的界面显示，出现去使用按钮和到期时间
    checkUseDay() {
      // this.$axios.post(this.$api.checkOrder, {
      //   pid: this.pid,
      // }).then((res) => {
      //   // 对于基础版的逻辑
      //   if (res.data === -1 || res.data === -2) {
      //     this.isBuy = false;
      //     document.querySelector('.half').classList.remove('half');
      //   } else if (res.data > 0) {
      //     this.isBuy = true;
      //     const time = new Date();
      //     const timeFormatter = time.getTime() + (res.data * 3600 * 24 * 1000);
      //     this.endTime = moment(timeFormatter).format('YYYY-MM-DD');
      //   }

      //   // 对于试用版的逻辑
      // })
    },
  },
  mounted() {
  },
}
</script>

