<template lang="pug">
</template>
<script>
export default {
  data () {
    return {
      groupErr: {
        show: false,
        content: '请先选中人群，再进行操作'
      }
    }
  },
  methods: {
    showGroupErr (cnt) {
      this.groupErr.show = true
      this.groupErr.content = cnt
      setTimeout(() => {
        this.groupErr.show = false
        this.groupErr.content = ''
      }, 2000)
    }
  }
};
</script>
<style lang="less">
</style>
