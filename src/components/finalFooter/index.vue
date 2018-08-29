<template src="./index.html"></template>
<style lang="less" src="./index.less"></style>
<script>
export default {
  name: 'footers',
  methods: {
    open1() {
      this.$alert('<img class="footerImg1" src="https://www.doushudata.com/img/gzh.62936fd.jpg"></img>', '扫描二维码，关注 ‘老草来了’ 公众号', {
        dangerouslyUseHTMLString: true,
        center: true,
        showConfirmButton: false,
        closeOnClickModal: true,
        closeOnPressEscape: true,
      }).catch((res) => {

      });
    },
    open2() {
      this.$alert('<img class="footerImg2" src="https://www.doushudata.com/img/dsgzh.d5dd62f.jpg"></img>', '扫描二维码，关注 ‘抖数’ 公众号', {
        dangerouslyUseHTMLString: true,
        closeOnClickModal: true,
        closeOnPressEscape: true,
        center: true,
        showConfirmButton: false,
      }).catch((res) => {

      });
    },
  },
};
</script>
