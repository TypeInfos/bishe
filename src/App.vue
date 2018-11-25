<template>
  <div id="app">
    <el-container>
      <el-header style="height:50px;">
        <headerWrap></headerWrap>
      </el-header>
      <el-main>
        <router-view @versionErr="versionErr"/>
      </el-main>
      <el-footer height="80" style="padding:0;">
        <newFooter></newFooter>
      </el-footer>
    </el-container>
    <backToTop></backToTop>
    <user-tip :userTipShow="userTipShow" @close="userTipShow = false"></user-tip>
  </div>
</template>

<script>
import headerWrap from './components/headerWrap'
import newFooter from './components/finalFooter'
import backToTop from './components/backToTop'
import userTip from './components/userTips'

export default {
  name: 'App',
  components: {
    newFooter,
    headerWrap,
    backToTop,
    userTip
  },
  mounted () {
    if (navigator.userAgent.indexOf('Chrome') == -1 || navigator.userAgent.indexOf('Edge') > -1) {
      alert('该产品目前只支持谷歌和360浏览器！')
    }
    // console.log(navigator.plugins)
  },
  data () {
    return {
      userTipShow: false
    }
  },
  methods: {
    versionErr () {
      console.log('versionErr')
      this.userTipShow = true
    }
  }
}
</script>

<style lang="less" src="./assets/common.less"></style>
<style lang="less" src="./assets/fontcss/iconfont.less"></style>
<style lang="less" src="./assets/less/dsStyle.less"></style>
