<template src="./index.html">

</template>

<style lang="less" src="./index.less">

</style>

<script>
export default {
  name: 'showGoodsList',
  props: {
    // 关注商品列表
    focusOn: Array,
    // 未关注商品列表
    unFocus: Array,
    //
    unFocusLoading: Boolean,
    // 加loading
    goodsInfoLoading: Boolean,
  },
  data() {
    return {
      // 过滤后的商品列表
      filterFocusOn: [],
      // goodsPrice:商品价格
      goodsPrice: '',
      // 商品上架日期
      putawayDate: '',
      putawayDetailDate: '',
      // 商品名称
      goodsTitle: '',
      // 商品链接
      goodsUrl: '',
      // 图片地址
      imgUrl: '',
      // 订购剩余额度
      surplus: '',
      // 初始化加载第一个 关注列表的第一个商品
      firstComplete: true,
      // 添加成功 弹窗
      addWordSucceed: false,
      // 取消关注 弹窗
      cancelFocus: false,
      // 取消关注 商品名字
      cancelFocusWordName: '',
      deleteItemId: '',
      searchState: '',
      asideFixed: false, // 左侧商品固定
      addFocusLoading: false, // 添加监控商品 loading
      currentGoodsItem: '',
      currentStatus: '',
    }
  },
  methods: {
    refreshGoodsData() {
      if (this.$refs.myRefresh.style.animation == '') {
        this.$refs.myRefresh.style.animation = 'refreshRotate 1s infinite linear';
        setTimeout(() => {
          this.$refs.myRefresh.style.animation = '';
        }, 2000);
        this.refreshFun();
      }
    },
    refreshFun() {
      this.$emit('updateFocusData');
      this.firstComplete = false;
    },
    // 函数节流
    throttle(fn, context, delay, args) {
      // 判断是否是第一次执行，第一次执行给fn添加属性canRun:true
      if (!fn.hasOwnProperty('canRun')) {
        Object.assign(fn, { canRun: true });
      }
      if (!fn.canRun) {
        return;
      }
      // 执通过关卡if(!canRun)，等于就拿到了通行证。然后下一步的操作就是立马将关卡关上canRun=false。
      // 这样，其他请求执行滚动事件的方法，就被挡回去了
      fn.canRun = false;
      setTimeout(() => {
        fn.call(context, args);
        // 执行完一次后delay秒后才能再执行一次
        fn.canRun = true;
      }, delay)
    },
    turnMyDate(str) {
      str = parseInt(str);
      if (str != '' || str != null) {
        let oDate = new Date(str);
        let oYear = oDate.getFullYear();
        let oMonth = oDate.getMonth() + 1;
        oMonth = oMonth >= 10 ? oMonth : `0${  oMonth}`;
        let oDay = oDate.getDate();
        oDay = oDay >= 10 ? oDay : `0${  oDay}`;
        var theDate = `${oYear  }-${  oMonth  }-${  oDay}`;
      } else {
        theDate = '';
      }
      return theDate;
    },
    //  取消关注
    cancelFocusWord() {
      this.$axios.post(this.$api.unFocus, {
        itemId: this.deleteItemId
      }).then(res => {
        this.cancelFocus = false;
        this.$notify('取消关注成功', 'success', 'success');
        this.firstComplete = true;
        this.$emit('updateFocusData');
      })
    },
    searchGoods(index) {
      this.goodsPrice = this.filterFocusOn[index].price;
      this.putawayDate = this.turnMyDate(this.filterFocusOn[index].create_Time);
      this.imgUrl = this.filterFocusOn[index].imgUrl;
      this.goodsUrl = this.filterFocusOn[index].itemDetailUrl;
      this.goodsTitle = this.filterFocusOn[index].title;
      this.currentGoodsItem = this.filterFocusOn[index].itemId;
      this.currentStatus = this.filterFocusOn[index].status;
      this.$cookies.set('finalItemId', this.filterFocusOn[index].itemId, Infinity);
      this.$emit('showDataForEchart', this.filterFocusOn[index].itemId, this.filterFocusOn[index].title);
      // 下面是显示图表数据
    },
    enter(index) {
      this.filterFocusOn[index].deleteFlag = true;
    },
    leave(index) {
      this.filterFocusOn[index].deleteFlag = false;
    },
    closeModal() {
      this.$emit('updateUnFocusData');
    },
    addGoodsFocus() {
      this.$emit('focusDialogToTrue');
    },
    // 取消关注
    deleteFocusGoods(index) {
      this.cancelFocus = true;
      this.cancelFocusWordName = this.filterFocusOn[index].title;
      this.deleteItemId = this.filterFocusOn[index].itemId;
    },
    handleScroll() {
      let ele = document.querySelector('.aside');
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
      let offsetTop = ele.offsetTop;
      let offsetLeft = ele.offsetLeft;
      if (this.asideFixed == false) {
        if (scrollTop > offsetTop) {
          this.asideFixed = true
        }
      } else {
        if (getComputedStyle(ele, null).position == 'fixed') {
          ele.style.left = `${100 - scrollLeft  }px`;
        }
        if (scrollTop < 50) {
          this.asideFixed = false;
        }
      }
    },
    // 父组件的focuson 刷新调用该方法
    focusListFresh() {
      if (this.searchState.trim() == '') {
        this.filterFocusOn = this.focusOn;
      } else{
        let arr = [];
        for (let v of this.focusOn) {
          if (v.title.includes(this.searchState.trim())) {
            arr.push(v);
          }
        }
        this.filterFocusOn = arr;
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    // 一定要在Destroy时或者之前，移除scroll的监听
    window.removeEventListener('scroll', this.handleScroll)
  },
  watch: {
    focusOn(val) {
      if (this.searchState.trim() == '') {
        this.filterFocusOn = this.focusOn;
      } else{
        let arr = [];
        for (let v of this.focusOn) {
          if (v.title.includes(this.searchState.trim())) {
            arr.push(v);
          }
        }
        this.filterFocusOn = arr;
      }
      if (val.length > 0 && this.firstComplete) {
        this.filterFocusOn = this.focusOn;
        this.firstComplete = false;
        let haveCookie = this.$cookies.isKey('finalItemId');
        if (haveCookie) {
          let finalItemId = this.$cookies.get('finalItemId');
          for (let i = 0; i < this.filterFocusOn.length; i++) {
            if (this.filterFocusOn[i].itemId == finalItemId) {
              this.searchGoods(i);
              break;
            }
          }
        }else {
          this.searchGoods(0)
        }
      }
    },
    searchState(val) {
      if (val.trim() == '') {
        this.filterFocusOn = this.focusOn;
      }else {
        let arr = [];
        for (let v of this.focusOn) {
          if (v.title.includes(val)) {
            arr.push(v);
          }
        }
        this.filterFocusOn = arr;
      }
    },
  }
}
</script>

