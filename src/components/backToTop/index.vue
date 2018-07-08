<template>
    <div :class="isShow ? 'm-backtop opacity1' : 'm-backtop'" @click="backTop">
        <span>^</span><br/>
        返回顶部
    </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false,
    };
  },
  mounted() {
    window.onscroll = () => {
      // 变量t是滚动条滚动时，距离顶部的距离
      const t = document.documentElement.scrollTop || document.body.scrollTop;
      // 当滚动到距离顶部200px时，返回顶部的锚点显示
      if (t >= 300) {
        console.log('底部');
        this.isShow = true;
      } else { // 恢复正常
        console.log('没底部');
        this.isShow = false;
      }
    };
  },
  methods: {
    backTop() {
    //   const t = document.documentElement.scrollTop || document.body.scrollTop;
      const timer = setInterval(() => {
        const aa = document.documentElement.scrollTop - 300;
        document.documentElement.scrollTop = aa;
        if (document.documentElement.scrollTop <= 0) {
          clearInterval(timer);
        }
      }, 30);
    },
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
        background: rgb(247, 184, 79);
        border-radius:50%;
        font-size: 28px;
        text-align: center;
        line-height: 54px;
        color: #fff;
        margin-bottom:5px;
        opacity: 0.8;
        &:hover{
            background: rgb(238, 170, 53);
        }
    }
  }
  .opacity1{
      opacity: 1;
  }
</style>
