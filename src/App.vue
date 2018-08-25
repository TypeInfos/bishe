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
  </div>
</template>

<script>
import headerWrap from './components/headerWrap';
import newHeader from './components/newHeader'
import newFooter from './components/finalFooter';

export default {
  name: 'App',
  components: {
    newHeader,
    newFooter,
    headerWrap,
  },
};
</script>

<style lang="less" src="./assets/common.less"></style>
<style lang="less" src="./assets/fontcss/iconfont.less"></style>
