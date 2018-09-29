<template lang="pug">
//- 插件更新引导
.g-usertip
  el-dialog.user-tip(
    :visible.sync="userTipShow"
    :show-close="false"
    :modal="false"
    :closeOnClickModal="false")
    .user-tip-title(slot="title")
      span.title 插件升级提示
      el-button(icon="el-icon-close" @click="closeModal")
    .user-tip-cnt
      .cnt-title 尊敬的抖数用户:
      .cnt-detail
        span.placeholder 占位
        span 抖数即将上线标签实验室、词根波士顿矩阵等重要功能，同时也修复了部分插件已知Bug，为了您能正常使用这些功能，
        span.important 请务必将插件版本更新到最新版，否则可能导致您无法正常使用抖数产品，
        span 如有任何问题请扫如下二维码联系抖数客服小抖:
        .info
          img(src="@/assets/xd.jpg" width="200" height="200")
          .operate
            .download(@click="startDownload") 下载新插件
            .link(@click="toMv") 安装教程>>
</template>

<script>
export default {
  props: {
    userTipShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      downloadLink: 'https://static.doushudata.com/doushu.zip',
    }
  },
  methods: {
    closeModal () {
      this.$emit('close')
    },
    startDownload() {
      let iframe = document.createElement('iframe')
      iframe.style.display = 'none'
      iframe.src = this.downloadLink
      iframe.onload = function() {
        document.body.removeChild(iframe)
      }
      document.body.appendChild(iframe)
      // window.open(this.downloadLink);
    },
    toMv() {
      this.$emit('close')
      this.$router.push('/download')
    },
  }
}
</script>

<style lang="less">
.g-usertip {
  .el-dialog {
    width: 700px;
    &__header  {
      height: 50px;
      padding: 0 !important;
      border-bottom: 1px solid #ccc;
      .user-tip-title {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .el-button {
          border-radius: 0;
          border-top: none;
          border-right: none;
          border-bottom: none;
          height: 100%;
          font-size: 20px;
        }
        .title {
          font-size: 16px;
          padding-left: 10px;
        }
      }
    }
    .user-tip-cnt {
      padding: 0 100px;
      .cnt-title {
        line-height: 30px;
        font-size: 16px;
      }
      .cnt-detail {
        span {
          display: inline;
          line-height: 30px;
          font-size: 16px;
          &.important {
            color: red;
          }
        }
        .placeholder {
          color: transparent;
        }
        .info {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
        }
        .operate {
          margin-left: 15px;
          .download {
            padding: 5px 10px;
            color: #fff;
            background: #1CCADA;
            border-radius: 4px;
            cursor: pointer;
          }
          .link {
            color: #6FA7E8;
            cursor: pointer;
            margin-top: 15px;
          }
        }
      }
    }
  }
}
</style>
