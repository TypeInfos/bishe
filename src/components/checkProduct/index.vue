<template src="./index.html">

</template>
<style lang="less" src="./index.less">

</style>
<script>
export default {
  name: 'checkProduct',
  props: ['day'],
  data () {
    return {
      addWordSucceed: true,
      addGoodsFocuDialog: true,
    }
  },
  methods: {
    closeModal() {
      this.addGoodsFocuDialog = false
      this.$emit('cjy', this.addGoodsFocuDialog)
    },
    goBuy() {
      this.$router.push('/buy1')
    }
  }
}
</script>

