<template>
  <div id="app">
    <el-container>
      <el-header style="height:50px;">
        <headerWrap></headerWrap>
        </el-header>
      <el-main>
        <router-view/></el-main>
      <el-footer height="80" style="padding:0;">
        <newFooter></newFooter></el-footer>
    </el-container>
  <customerService></customerService>
  <backToTop></backToTop>
  </div>
</template>

<script>
import headerWrap from './components/headerWrap';
import newFooter from './components/finalFooter';
import customerService from './components/customerService';
import backToTop from './components/backToTop';

export default {
  name: 'App',
  components: {
    newFooter,
    headerWrap,
    customerService,
    backToTop,
  },
};
</script>

<style lang="less" src="./assets/common.less"></style>
<style lang="less" src="./assets/fontcss/iconfont.less"></style>
