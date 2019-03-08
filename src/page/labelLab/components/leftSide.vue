<template lang="pug">
.label-left(v-loading="groupListLoading" :class="{'isFixed':asideFixed}")
  .goods-info
    .img-show
      img(:src="'https://'+imgUrl")
    .name-price
      p {{ planName }}
      p.priceP 价格：{{ goodsPrice }}
  a.goods-name(:href="goodsUrl" target="_blank") {{ goodsName }}
  transition(name="el-fade-in-linear")
    .select-plan(v-if="selectPlanFlag" v-loading="loadingPlans")
      el-input.filter-plans(
        clearable
        v-model="filterPlansInput"
        placeholder="搜索计划"
        suffix-icon="icon-icon-search")
      el-select.plan-select(
        v-model="selectPlanStatus"
        placeholder="全部计划"
        @change="changeSelect")
        el-option(
          v-for="item in allPlanStatus"
          :key="item.value"
          :label="item.label"
          :value="item.value")
      el-menu.plan-nav(default-active=1 :unique-opene=true)
        el-submenu(index="1")
          template(slot="title")
            i.el-icon-view
            span 全部计划
        el-menu-item.content-plan(
          v-for((item, index) in resultPlans)
          :key="index"
          :index="index"
          @click="selectPlan(index)")
  .select-goods(v-if="!selectPlanFlag")
    el-button.back-plan(
      plain
      clearable
      @click="backPlan") 返回计划列表
    el-input.filter-plans(
      clearable
      v-model="filterGoodsInput"
      placeholder="请输入商品关键字"
      suffix-icon="el-icon-search")
    .good-list
      div(v-for="(item, index) in resultGoods" :key="index")
        el-popover(
          placement="bottom"
          trigger="hover"
          visible-arrow="false"
          width="150"
          value-key="title"
          :content="item.title")
          span.u-pic(slot="reference" @click="searchGoods(index)")
          img(:src="item.imgUrl")
</template>

<script>
import { getAllPlans } from '@/assets/api/labelLab';
import { getUserInfoAPI } from '@/assets/api/common';

export default {
  data() {
    return {
      groupListLoading: false,
      loadingPlans: false,
      asideFixed: false,
      imgUrl: '',
      goodsName: '', // 商品名字
      goodsPrice: '', // 商品价格
      filterPlansInput: '',
      filterGoodsInput: '',
      selectPlanStatus: '',
      allPlanStatus: [
        {
          value: -1,
          label: '全部计划'
        },
        {
          value: 1,
          label: '推广中'
        },
        {
          value: 0,
          label: '暂停'
        }
      ],
      resultPlans: [],
      resultGoods: [],
      allPlans: [],
      filterInputPlans: [],
      loginName: ''
    };
  },
  mounted() {
    this.getPlans();
    this.getUserInfo();
  },
  methods: {
    selectPlan(index) {
      // 此处传回currentCampaignId
      this.currentCampaignId = this.resultPlans[index].campaignId;
      this.loadingPlans = true;
      this.$axios
        .post(this.$api.getCampItems, {
          campaignId: this.currentCampaignId
        })
        .then(res => {
          this.planName = this.resultPlans[index].title;
          this.selectPlanFlag = false;
          this.planOfGoodsList = res.data;
          this.resultGoods = res.data;
          this.loadingPlans = false;
        });
    },
    async getPlans() {
      this.loadingPlans = true;
      const plans = await getAllPlans();
      this.loadingPlans = false;
      if (!plans) return;
      this.allPlans = plans.data;
      this.resultPlans = this.allPlans;
      this.filterInputPlans = this.allPlans;
    },
    async getUserInfo() {
      let info = await getUserInfoAPI();
      if (!info) return;
      this.$store.dispatch('login');
      this.$store.dispatch('setTaobaoName', {
        name: res.data.name
      });
      // 此处应该提供父组件token和loginName
      const isCookie = this.$cookies.isKey(`${info.loginName}Item`);
      if (!isCookie) return;
      const result = JSON.parse(this.$cookies.get(`${info.loginName}Item`));
      this.imgUrl = result.imgUrl;
      // 此处传回currentFirstCat、linkUrl、currentProductId、currentCampaignId、currentAdGroupId
      this.goodsPrice = result.price;
      this.goodsName = result.title;
      this.planName = result.planName;
      // 补丁：需要传给父组件的数据
      const backData = {
        currentToken: info.data.token,
        loginName: info.data.loginName,
        currentFirstCat: result.firstCat,
        linkUrl: result.linkUrl,
        currentProductId: rusult.productId,
        currentCampaignId: result.campaignId,
        currentAdGroupId: result.adGroupId,
        methods: ['getCrowdInfo']
      };
      this.$emit('packData', backData);
    }
  }
};
</script>

<style lang="less">
</style>
