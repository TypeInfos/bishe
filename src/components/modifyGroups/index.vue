<template src="./index.html">

</template>

<script>
export default {
  name: 'modifyGroups',
  data () {
    return {
      addWordSucceed: true,
      addGoodsFocuDialog: true,
      groupName: '',
      showErrorP: false,
    }
  },
  methods: {
    closeModal() {
      this.addGoodsFocuDialog = !this.addGoodsFocuDialog
    },
    nameRepeat() {
      // if(this.groupName){
      //   this.showErrorP = true ;
      // }
    },
  }
}
</script>

<style lang="less" src="./index.less">

</style>
