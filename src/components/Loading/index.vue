<template lang="pug">
  div
</template>

<script>
export default {
  name: '',
  data() {
    return {
      startLoading: null,
      startLoadingnumber: 0,
      startLoadingTimer: null,
    }
  },
  props: {
    startLoadingComplete: {
      type: Boolean,
      // default: false,
    }
  },
  methods: {
    showLoading() {
      this.init();
      this.startLoading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
        customClass: 'startLoading'
      })
      document.querySelector('.startLoading').innerHTML = `<div class="startLoadingContainer">
                                                                      <h2>温馨提示</h2>
                                                                      <div class="anim">
                                                                             <div class="spinner">
                                                                    <div class="spinner-container container1">
                                                                      <div class="circle1"></div>
                                                                      <div class="circle2"></div>
                                                                      <div class="circle3"></div>
                                                                      <div class="circle4"></div>
                                                                    </div>
                                                                    <div class="spinner-container container2">
                                                                      <div class="circle1"></div>
                                                                      <div class="circle2"></div>
                                                                      <div class="circle3"></div>
                                                                      <div class="circle4"></div>
                                                                    </div>
                                                                    <!-- container3为了让正方形的四个球效果更好点，相当于延长动画的效果0.1秒 -->
                                                                    <div class="spinner-container container3">
                                                                      <div class="circle1"></div>
                                                                      <div class="circle2"></div>
                                                                      <div class="circle3"></div>
                                                                      <div class="circle4"></div>
                                                                    </div>
                                                                  </div>
                                                                  <p>数据正在加载中</p>
                                                                      </div>
                                                                  <p class="bottomP">进度<span id="startLoadingNumber"></span>%</p>
                                                                  <p>请耐心等待~</p>
                                                                  </div>`
      let loadingDom = document.getElementById('startLoadingNumber');
      // this.startLoading.show();
      this.startLoadingTimer = setInterval(() => {
        // console.log('111111');
        loadingDom.innerText = this.startLoadingnumber;
        // console.log(this.startLoadingComplete);
        // console.log(this.startLoadingnumber);
        if (this.startLoadingComplete) {
          clearInterval(this.startLoadingTimer)
          // console.log('清除定时器');
          this.startLoadingnumber = 100;
          this.startLoading.close();
          // this.startLoading = null;
        }
        if (parseFloat(this.startLoadingnumber) < 90) {
          this.startLoadingnumber = parseFloat(parseFloat(this.startLoadingnumber) + (Math.random() * 1.5)).toFixed(2)
        } else {
          this.startLoadingnumber = parseFloat(parseFloat(this.startLoadingnumber) + (Math.random() * 0.4)).toFixed(2)
          if (this.startLoadingnumber >= 99.6) {
            clearInterval(this.startLoadingTimer)
          }
        }
      }, 500);
      // this.startLoadingTimer = setInterval(loadEvent, 500)
    },
    init() {
      this.startLoadingnumber = 0;
    },
    cancelLoading () {
      this.startLoading.close();
    }
  },
  mounted() {
    this.showLoading();
  },
  watch: {
    startLoadingComplete (value) {
      // console.log("------value-------",value)
      if (!value) {
        this.showLoading()
      }
      return
    },
    $route (to, from) {
      console.log('router changed')
      this.startLoading.close();
    }
  }
}
</script>

<style lang="less">
</style>
