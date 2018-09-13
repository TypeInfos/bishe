<template src="./index.html">

</template>

<style lang="less" src="./index.less">

</style>

<script>
export default {
  data() {
    return {
      goodsTotalPage: 6, // 用户下的订单商品总页数
      pageChange: 1, // 当前页的监听事件
      myOrderTableData: [],
      loading: true,
    }
  },
  created() {
    this.getOrderList();
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      this.$axios.get(this.$api.info).then((res) => {
        this.$store.dispatch('login');
        this.$store.dispatch('setTaobaoName', {
          name: res.data.name,
        })
      }).catch(error => {
        console.log(error)
      })
    },
    getOrderList() {
      this.$axios.get(this.$api.getOrderList).then((res) => {
        this.myOrderTableData = res.data;
        this.loading = false;
        this.myOrderTableData = this.myOrderTableData.sort((a, b) => +new Date(a.beginTime) - +new Date(b.beginTime))
        let timeMap = {}
        this.myOrderTableData.forEach(i => {
          if (timeMap[i.title]) {
            i.beginTime = timeMap[i.title]
            let dateArr = i.beginTime.split('-')
            dateArr[0] = parseInt(dateArr, 10) + 1;
            i.endTime = dateArr.join('-');
          }
          timeMap[i.title] = i.endTime
        })
        // this.myOrderTableData[0].productName = res.data.title;
        // this.myOrderTableData[0].orderBeginTime = res.data.payTime;
        // this.myOrderTableData[0].serviceBeginTime = res.data.beginTime;
        // this.myOrderTableData[0].serviceEndTime = res.data.endTime;
        // this.myOrderTableData[0].buyTime = res.data.payPrice;
        // this.myOrderTableData[0].cost = res.data.orderTime;
        // this.myOrderTableData[0].state = res.data.status;
      });
    },
    goBuy(index, rows) {
      this.$router.push('/buy1');
    },
    changeStatus(row, column, cellValue, index) {
      let current = +new Date()
      let start = +new Date(row.beginTime)
      let end = +new Date(row.endTime)
      if (current > end) {
        return '已过期'
      } else if (current < start) {
        return '未开始'
      }
      return '使用中'
    },
  },
  watch: {
    pageChange(val) {
      console.log(`第${val}页`);
    },
  },
}
</script>

