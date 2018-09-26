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
    <customerService></customerService>
    <backToTop></backToTop>
    <user-tip :userTipShow="userTipShow" @close="userTipShow = false"></user-tip>
  </div>
</template>

<script>
import headerWrap from './components/headerWrap';
import newFooter from './components/finalFooter';
import customerService from './components/customerService';
import backToTop from './components/backToTop';
import userTip from './components/userTips'

export default {
  name: 'App',
  components: {
    newFooter,
    headerWrap,
    customerService,
    backToTop,
    userTip
  },
  mounted () {
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
      this.userTipShow = true;
    }
  }
};
</script>

<style lang="less" src="./assets/common.less"></style>
<style lang="less" src="./assets/fontcss/iconfont.less"></style>
<style lang="less" src="./assets/less/dsStyle.less"></style>
