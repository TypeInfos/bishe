<template lang="pug">
.g-download
  //- .title-download
  .download-info
    .info-img
        img(src="../../assets/download/download_mac.png")
    .info-content
      .info-text
        span.info-text-title 抖数精灵
        span.info-text-depict 使用抖数产品前，需要先下载此插件，帮您高效整理数据
        span.info-text-main 大小：{{this.size}}&nbsp;&nbsp;&nbsp版本：{{this.version}}
        span.info-text-main 适用浏览器： {{this.explore}}
        span.info-text-main 更新时间：{{this.updateTime}}
      .info-opration
        el-button(@click="startDownload")
         div.text-center
          img(src="../../assets/download/Chrome.png" width="30px" height="30px;")
          span.btn-text 立即下载
  .download-use-course
    .course-content
      span.course-center Chrome浏览器插件-安装教程
      .course-block
        div.course-text
          span(style="font-size:14px;color:red;padding-bottom:5px;line-height:19px;") (如果您是升级插件，请先将旧版本的插件先删除，再按照如下步骤进行重新安装，即可完成升级)
          br
          span(style="font-weight:bolder;") 第一步
          span ：按照图示1、2、3的步骤进行操作，打开chrome浏览器扩展程序
        img(src="../../assets/download/download_step_1.jpg" width="100%" height="60%")
      .course-block
        div.course-text
          span(style="font-weight:bolder;") 第二步：
          span 按照图示4、5步骤进行操作，在扩展程序页面
          p(style="text-indent:4.2em;text-align:left;") 首先打开开发者模式
          p(style="text-indent:4.2em;text-align:left;") 其次将下载好的插件鼠标拖动到扩展程序页面
          p(style="text-indent:4.2em;text-align:left;") 到此，即可完成插件安装操作
        img(src="../../assets/download/download_step_2.jpg" width="100%" height="60%")
</template>

<script>
export default {
  data() {
    return {
      size: '237KB',
      version: '0.2.5',
      explore: 'Chrome 65及以上',
      updateTime: '2018-09-05',
      downloadLink: 'https://static.doushudata.com/doushu.zip',
      mvLink: 'https://v.doushudata.com/video.html',
    };
  },
  methods: {
    startDownload() {
      let iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = this.downloadLink;
      iframe.onload = function() {
        document.body.removeChild(iframe);
      };
      document.body.appendChild(iframe);
      // window.open(this.downloadLink);
    },
    toMv() {
      window.open(this.mvLink, '_blank');
    },
    getInfo() {
      this.$axios.post(this.$api.getDownloadInfo).then((res) => {
        this.size = res.data.size;
        this.version = res.data.version;
        this.explore = res.data.explore;
        this.updateTime = res.data.updatetime;
        this.downloadLink = res.data.downloadLink;
        this.mvLink = res.data.mvLink;
      }).catch((err) => {
        console.log(err);
      })
    },
    // 动态修改全局el-main的padding
    // 销毁之前进行还原
    changeElMainClass() {
      document.querySelector('.el-main').style.padding = '0px';
    },
    restoreElMainClass() {
      document.querySelector('.el-main').style.padding = '10px 100px';
    }
  },
  mounted() {
    this.getInfo();
    this.changeElMainClass();
  },
  beforeDestroy() {
    this.restoreElMainClass();
  }
}
</script>
<style lang="less">
// .el-main{
//   padding: 0px;
// }
.g-download{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .title-download{
    width: 100vw;
    height: 150px;
    background-color: #4AA7F3;
  }

  .download-info{
    width: 100vw;
    height: 480px;
    display: flex;
    justify-content:center;
    align-items: center;
    background: linear-gradient(#0F7DD8, #5DBEFB);
  }

  .info-text{
    display: flex;
    flex-wrap: wrap;
    width: 300px;
    color: #ffffff;
  }

  .info-opration{
    display: flex;
    padding-top: 20px;
    align-items: center;
  }

  .info-text-title{
    font-size: 30px;
    width: 100%;
  }
  .info-text-depict{
    padding: 20px 0 20px 0;
    font-size: 18px;
    width: 100%;
  }
  span.info-text-main{
    font-size: 14px;
    padding-bottom: 5px;
  }
  .text-center{
    display: flex;
    align-items:center;
  }
  .btn-text{
    padding-left: 15px;
    font-size: 18px;
    font-weight: bold;
  }
  .opration-text{
    font-size: 18px;
    font-weight: bold;
    color: #ffffff;
    padding-left: 30px;
    cursor: pointer;
  }
  .download-use-course{
    width: 80%;
  }
  .course-center{
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    padding: 40px 0 20px 0;
    letter-spacing: 2px;
  }
  .course-text{
    width: 100%;
    font-size: 16px;
    padding: 20px 0 20px 0;
    letter-spacing: 1px;
  }
  .course-footer{
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    padding: 40px 0 40px 0;
    letter-spacing: 2px;
  }
}
</style>
