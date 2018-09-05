<template src="./index.html">

</template>

<style lang="less" src="./index.less">

</style>

<script>
import moment from 'moment';
import orderBlock from '../../components/orderBlock';

moment.locale('zh-cn');
export default {
  components: {
    orderBlock,
  },
  data() {
    return {
      pid: 1,
      userType: '',
      loading: true,
      orderBlockInfos: [
        {
          pid: 2, // 传给后端的标识符产品pid   词根雷达为1 试用版暂定为2
          firstLine: '试用版',
          secondLine: '（可试用3天）',
          thirdLine: '',
          fourthLine: {
            price: '1',
            unit: '元/3天',
          },
          fifthLine: '',
          sixthLine: '可试用3天',
          seventhLine: '期间可试用全部功能',
          eighthLine: '试用版仅能订购一次',
          ninthLine: '',
          tenthLine: '',
          eleventhLine: '',
          twelfthLine: require('../../assets/buy1.png'), // 为什么用require呢？img引用的是静态文件下的资源，子组件即使用v-bind:src也不会被webpack编译
          origPrice: '¥1元/3天',
          buyTime: '3天',
          isBuy: false,
          isDisabled: false,
          btnText: '订购',
          endTime: '',
        },
        {
          pid: 1, // 传给后端的标识符产品pid   词根雷达为1
          firstLine: '基础版',
          secondLine: '', // （词根雷达+标签实验室）
          thirdLine: '原价¥3980元/年',
          fourthLine: {
            price: '2980',
            unit: '元/年',
          },
          fifthLine: '节省25%',
          sixthLine: '单品整体词根分析',
          seventhLine: '单品单个词根分析及操作',
          eighthLine: '单品整体标签分析',
          ninthLine: '单品群组分析及便捷管理 ',
          tenthLine: '单品标签数据排序',
          eleventhLine: '多维度交叉分析',
          twelfthLine: require('../../assets/buy1.png'), // 为什么用require呢？img引用的是静态文件下的资源，子组件即使用v-bind:src也不会被webpack编译
          origPrice: '¥3980元/年',
          buyTime: '12个月',
          isBuy: false,
          isDisabled: false,
          btnText: '订购',
          endTime: '',
        },
      ],
    }
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      this.$axios.get(this.$api.info).then((res) => {
        this.$store.dispatch('login');
        this.$store.dispatch('setTaobaoName', {
          name: res.data.name,
        })
        this.userBuyGoods();
      }).catch(error => {
        console.log(error)
      })
    },
    userBuyGoods() {
      this.$axios.get(this.$api.checkUserType).then((res) => {
        console.log('get time', res)
        // 有试用版记录
        this.loading = false;
        // res.data = null;
        // res.data.type = 0;
        // res.data.endTime = '2017-3-10';
        console.log(moment(res.data.endTime).format('YYYY-MM-DD'));
        //  啥都没订过
        if (res.data === null) {
          this.orderBlockInfos.forEach((i) => {
            i.isBuy = false;
          });
        } else // 正在试用中
        if (res.data.type === 0) {
          this.orderBlockInfos[0].isBuy = true;
          if (moment(res.data.endTime).isAfter(moment())) {
            this.orderBlockInfos[0].endTime = moment(res.data.endTime).format('YYYY-MM-DD')
          } else {
            this.orderBlockInfos[0].isDisabled = true;
          }
          this.orderBlockInfos[1].btnText = '升级到标准版'
        } else // 基础版使用中
        if (res.data.type === 1) {
          // 目前默认1就是已经订购过了，并且到期了
          this.orderBlockInfos[0].isBuy = true;
          this.orderBlockInfos[0].isDisabled = true;
          this.orderBlockInfos[0].btnText = '立即使用'
          if (moment(res.data.endTime).isAfter(moment())) {
            this.orderBlockInfos[1].isBuy = true;
            this.orderBlockInfos[1].endTime = moment(res.data.endTime).format('YYYY-MM-DD');
            this.orderBlockInfos[1].btnText = '继续订购';
          } else {
            this.orderBlockInfos[1].isDisabled = true;
            this.orderBlockInfos[1].btnText = '立即订购';
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
  },
  mounted() {
    this.getUserInfo();
  },
}
</script>
