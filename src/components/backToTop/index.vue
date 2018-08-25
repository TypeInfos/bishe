<template>
    <div :class="isShow ? 'm-backtop opacity1' : 'm-backtop'" @click="backToTop">
        <span>^</span><br/>
        返回顶部
    </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false,
      interval: null,
      visibilityHeight: 400,
      backPosition: 0,
    };
  },
  mounted() {
    window.addEventListener('scroll',this.handleScroll)
    // window.onscroll = () => {
    //   // 变量t是滚动条滚动时，距离顶部的距离
    //   const t = document.documentElement.scrollTop || document.body.scrollTop;
    //   // 当滚动到距离顶部200px时，返回顶部的锚点显示
    //   if (t >= 300) {
    //     // console.log('底部');
    //     this.isShow = true;
    //   } else { // 恢复正常
    //     // console.log('没底部');
    //     this.isShow = false;
    //   }
    // };
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
    if (this.interval) {
      clearInterval(this.interval);
    }
  },
  methods: {
    handleScroll() {
      this.isShow = window.pageYOffset > this.visibilityHeight
    },
    backToTop() {
      const start = window.pageYOffset
      let i = 0
      this.interval = setInterval(() => {
        const next = Math.floor(this.easeInOutQuad(10 * i, start, -start, 500))
        if (next <= this.backPosition) {
          window.scrollTo(0, this.backPosition)
          clearInterval(this.interval)
        } else {
          window.scrollTo(0, next)
        }
        i++
      }, 16.7)
    },
    easeInOutQuad(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b
      return -c / 2 * (--t * (t - 2) - 1) + b
    }
  },
};
</script>
<style lang="less">
  .m-backtop{
    position: fixed;
    right: 10px;
    bottom: 30px;
    z-index: 99;
    cursor: pointer;
    opacity: 0;
    transition: all 0.5s;
    span{
        display: inline-block;
        width: 50px;
        height: 50px;
        background: #1CCADA;
        border-radius:50%;
        font-size: 28px;
        text-align: center;
        line-height: 54px;
        color: #fff;
        margin-bottom:5px;
        opacity: 0.8;
        &:hover{
            background: #1CCADA;
        }
    }
  }
  .opacity1{
      opacity: 1;
  }
</style>
