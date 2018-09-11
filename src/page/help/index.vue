<template lang="pug">
.help-g
  .help-banner
    .notice-warpper
      .banner-notice
        h4.notice-title 抖数公告
        ul.notice-list
          li(v-for="notice in notices")
            div(v-if="notice.type === 0")
              span(@click="showDialog(notice.content)") {{notice.title}}
              i {{notice.date}}
            div(v-if="notice.type === 1")
              a(:href="notice.content" target="_target") {{notice.title}}
              i {{notice.date}}
    el-carousel.banner-container(:interval='3000' arrow='never' height='360px')
      el-carousel-item(v-for='(img,index) in bannerImgs' :key="index")
        img(:src="img.img")

  .help-course
    el-card
      div(slot="header")
        span(style="font-size: 16px;") 视频教程
        //- el-button(style="float: right; padding: 3px 0" type="text") 更多
      .course-container
        div.course-cell(v-for="(course,index) in courses" :key="index")
          a.course-img(:href="course.videoUrl" target="_blank")
            img(:src="course.imgUrl")
          a.course-title(:href="course.videoUrl" target="_blank") {{ course.name }}
          p.course-descrip {{ course.descrip }}

  el-dialog(:title="title" :visible.sync='isShowDialog' width='30%')
    span {{content}}
    img(v-if="!img" :src="img")
    span(slot="footer")
      el-button(@click="isShowDialog = false") 确定
</template>

<script>
export default {
  name: '',
  data() {
    return {
      bannerImgs: [
        {
          img: require('../../assets/help/hlep.jpg'),
        },
        {
          img: require('../../assets/help/hlep.jpg'),
        },
        {
          img: require('../../assets/help/hlep.jpg'),
        },

      ],
      notices: [],
      courses: [],
      title: '',
      content: '',
      img: null,
      isShowDialog: false,
    }
  },
  methods: {
    changeElMainClass() {
      document.querySelector('.el-main').style.padding = '0px';
    },
    restoreElMainClass() {
      document.querySelector('.el-main').style.padding = '10px 100px';
    },
    getInfo() {
      this.$axios.get(this.$api.getHelp)
        .then(res => {
          console.log(res.data.notices);
          this.notices = res.data.notices;
          this.courses = res.data.courses;
        }).catch(err => {
          console.log(err);
        })
    },
    showDialog(info) {
      this.isShowDialog = true;
      const jsonInfo = JSON.parse(info);
      console.log(jsonInfo);
      this.title = jsonInfo.title;
      this.content = jsonInfo.content;
      this.img = jsonInfo.img_url;
    },
    closeDialog(done) {
      this.title = '';
      this.content = '';
      this.img = null;
      done();
    }
  },
  mounted() {
    this.changeElMainClass();
    this.getInfo();
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
    width: 600px;
}

.help-g{
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .help-banner{
    width: 80%;
    // min-width: 1430px;
    max-width: 1430px;
    // display: flex;
    .banner-container{
      // float: left;
      // min-width: 1430px;
      max-width: 1430px;
    }
    .banner-notice{
      float:right;
      position: absolute;
      width: 303px;
      height: 230px;
      background: #fff;
      right: 0;
      margin-top:65px;
      // margin-right:65px;
      box-sizing: border-box;
      padding: 30px 20px;
      z-index: 900;
      box-shadow: 0 1px 4px rgba(0,0,0,.1);
    }
  }
  .notice-title{
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    margin: 0 0 14px;
    font-weight: 400;
  }
  .notice-list{
    font-size: 12px;
    li{
      height: 28px;
      line-height: 28px;
    }
    span{
      cursor: pointer;
      width: 176px;
      &:before{
        content: "\B7";
        font-weight: bolder;
        padding-right: 8px;
      }
    }
    a{
      cursor: pointer;
      width: 176px;
      &:before{
        content: "\B7";
        font-weight: bolder;
        padding-right: 8px;
      }
    }
    i{
      float: right;
      // display: inline-block;
      text-align: right;
      font-style: normal;
    }
  }
  .help-course{
    padding-top: 40px;
    width: 80%;
    max-width: 1430px;
    padding-bottom: 40px;
  }

  .notice-warpper{
    height: 0;
    margin: 0 auto;
    position: relative;
    transition: width .5s;
  }

  .course-container{
    position: relative;
    width: 100%;
    box-sizing: border-box;
  }

  .course-cell{
    width:calc(25% - 20px);
    margin-left: 10px;
    margin-right: 10px;
    float: left;
    padding-bottom: 10px;
  }

  .course-img{
    width:100%;
    height:245px;
    min-width:272px;
    // display:block;
    img{
      width: 100%;
      min-height: 95px;
    }
  }
  .course-descrip{
    font-size: 12px;
    color: #999;
    display: block;
    display: -webkit-box;
    max-height: 33px;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .course-title{
    display: inline-block;
    width: 100%;
    height: 30px;
    line-height: 42px;
    color: #333;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .el-button.el-button--default{
    color: rgba(28, 202, 218, 1);
    background: #ffffff;
    &:hover{
      color: #ffffff;
      background: rgba(28, 202, 218, 1);
    }
  }
}
</style>
