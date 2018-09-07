<template lang="pug">
.help-g
  .help-banner
    el-carousel.banner-container(:interval='3000' arrow='never' height='360px')
      el-carousel-item(v-for='(img,index) in bannerImgs' :key="index")
        img(:src="img")
      .banner-notice
        h4 抖数公告
        ul
          li
            i 2018-8-8
</template>

<script>
export default {
  name: '',
  data() {
    return {
      bannerImgs: [
        'https://img.alicdn.com/tfs/TB14T8bQXXXXXb1XpXXXXXXXXXX-1430-360.jpg',
        'https://img.alicdn.com/tfs/TB14T8bQXXXXXb1XpXXXXXXXXXX-1430-360.jpg',
        'https://img.alicdn.com/tfs/TB14T8bQXXXXXb1XpXXXXXXXXXX-1430-360.jpg'
      ]
    }
  },
  methods: {
    changeElMainClass() {
      document.querySelector('.el-main').style.padding = '0px';
    },
    restoreElMainClass() {
      document.querySelector('.el-main').style.padding = '10px 100px';
    }
  },
  mounted() {
    this.changeElMainClass();
  },
  beforeDestroy() {
    this.restoreElMainClass();
  }
}
</script>

<style lang="less">
::-webkit-scrollbar {
    width: 4px;
    height: 4px;
}
::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #b4c8d8;
}
.help-g{

  width: 100%;
  display: flex;
  justify-content: center;
  .help-banner{
    width: 80%;
    min-width: 1430px;
    max-width: 1430px;
    // display: flex;
    .banner-container{
      min-width: 1430px;
      max-width: 1430px;
    }
    .banner-notice{
      position: absolute;
      width: 303px;
      height: 230px;
      background: #fff;
      right: 0;
      margin-top:65px;
      // margin-right:65px;
      z-index: 100;
      box-shadow: 0 1px 4px rgba(0,0,0,.1);
    }
  }
}
</style>
