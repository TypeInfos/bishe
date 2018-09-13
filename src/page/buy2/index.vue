<template src="./index.html">

</template>

<style lang="less" src="./index.less">

</style>

<script>
import promotionCode from '../../components/addPromotionCode';

export default {
  name: 'buy2',
  components: {
    promotionCode,
  },
  data() {
    return {
      p: '', // 保存后端返回的form表单html代码
      agreeChecked: true,
      payLoading: false, // 支付的加载框
      shouldPay: '¥2980', // 应付金额
      orderId: '', // 订单编号
      payWay: '', // 支付方式
      showTick: true, // 显示支付宝的icon打勾
      spinner: 'el-icon-loading', // 支付中的icon类名
      payingText: '支付中', // 支付中的文本
      showCloseLoading: false, // 显示支付中加载框 右上角的关闭icon
      showPromotionCode: false, // 显示添加优惠码的弹框
      orderBlockInfo: '', // 订购方块内的内容 从组件 路由传过来的
      routeName: '', // 定义当前页面的路由名
      orderInfoTableData: [{
        buyProject: '基础版（词根雷达+标签实验室）',
        count: '1',
        buyTime: '12个月',
        yuanJia: '¥3980元/年',
        xianJia: '¥2980元/年',
      }],
    }
  },
  computed: {
    isLogin: {
      get() {
        return this.$store.getters.login;
      },
      set() {
        return false;
      },
    },
  },
  methods: {
    selectPayWay() {
      this.showTick = !this.showTick;
      this.payWay = '支付宝';
    },
    addPromotionCode() {
      this.showPromotionCode = !this.showPromotionCode;
    },
    returnBuy1() {
      this.$router.push('/buy1');
    },
    submit() {
      if (!this.agreeChecked) {
        this.$message({
          message: '您未同意《付款协议》',
          type: 'warning',
        });
      } else if (!this.showTick) {
        this.$message({
          message: '您未选择支付方式',
          type: 'warning',
        });
      } else {
        // 提交订单 去支付
        this.$axios.post(this.$api.getPay, {
          pid: this.orderBlockInfo.pid,
        }).then((res) => {
          this.orderId = res.data.orderId // 订单号用来检测支付是否成功
          this.p = res.data.payUrl; // 保存后端返回的form表单html代码
          // 此行本应有 let w = window.open('about:blank'); 先打开一个空白页，但是由于window.open和ajax异步请求的冲突，导致浏览器会拦截新窗口，所以该行代码放在该请求外。
          w.document.write(this.p); // 在本方法同步执行完 即先打开了空白页，才异步请求写入。
          this.payLoading = true; // 开启支付中加载框
          this.showCloseLoading = true; // 开启支付中加载框右上角的 X icon
          // 轮询请求 获取该订单的支付状态
          let timer = setInterval(() => {
            // 获取订单列表
            this.$axios.post(this.$api.getOrderStatus, {
              orderId: this.orderId,
            }).then((res) => {
              if (res.data.status === 0) {
                this.payLoading = true;
                this.payingText = '支付中';
              }
              if (res.data.status === 1) {
                // nextTick 获取更新后的DOM
                this.$nextTick(() => {
                  // 只能用传统方法才改得掉icon
                  document.querySelector('.el-loading-spinner').children[0].classList.remove('el-icon-loading');
                  document.querySelector('.el-loading-spinner').children[0].classList.add('el-icon-circle-check');
                  // this.spinner = 'el-icon-circle-check';
                  let dTime = 5;
                  let daojishi = setInterval(() => {
                    this.payingText = `${'支付成功! '}${dTime}秒之后跳转...`;
                    dTime -= 1;
                    if (dTime < 0) {
                      this.$router.push('/rootRadar');
                      window.clearInterval(daojishi);
                    }
                  }, 1000);
                });
                window.clearInterval(timer);
              }
              if (res.data.status === 2) {
                this.$nextTick(() => {
                  // 只能用传统方法才改得掉icon
                  document.querySelector('.el-loading-spinner').children[0].classList.remove('el-icon-loading')
                  document.querySelector('.el-loading-spinner').children[0].classList.add('el-icon-circle-close')
                  // this.spinner = 'el-icon-circle-close';
                  this.payingText = '订单超时';
                });
                window.clearInterval(timer);
              }
            });
          }, 2000);
        }).catch(() => {

        });
        // 先同步打开空白页，再异步请求写入html
        let w = window.open('about:blank');
      }
    },
    closeLoading() {
      this.payLoading = false; // 关闭支付的加载框
      this.showCloseLoading = false; // 关闭支付的加载框右上角的icon
      window.clearInterval(timer); // 关闭支付 也得关闭轮训 否则加载框还会出现
    },
  },
  watch: {
    // 如果路由有变化，会执行该方法
    routeName() {
      // 接收这一条路由传过来得参数 orderBlockInfo 订购方块内的内容
      this.orderBlockInfo = this.$route.params.orderBlockInfo;
      // 获取到之后，给当前页面的元素赋值
      this.orderInfoTableData[0].buyProject = this.orderBlockInfo.firstLine + this.orderBlockInfo.secondLine;
      this.orderInfoTableData[0].count = '1';
      this.orderInfoTableData[0].buyTime = this.orderBlockInfo.buyTime;
      this.orderInfoTableData[0].yuanJia = this.orderBlockInfo.origPrice;
      this.orderInfoTableData[0].xianJia = `¥${this.orderBlockInfo.fourthLine.price + this.orderBlockInfo.fourthLine.unit}`;
      this.shouldPay = `¥${this.orderBlockInfo.fourthLine.price}`;
    },
  },
  created() {
    // 页面加载的时候先获取当前页面的路由名，方便对他做监听
    this.routeName = this.$route.name;
  },
}
</script>
