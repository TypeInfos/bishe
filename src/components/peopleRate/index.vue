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
      options: [{
        value: '选项1',
        label: '优质人群'
      }, {
        value: '选项2',
        label: '一般人群'
      }, {
        value: '选项3',
        label: '劣质人群'
      }],
      rate: ''
    }
  },
  methods: {
    closeModal() {
      this.addGoodsFocuDialog = !this.addGoodsFocuDialog
    },
  }
}
</script>

<style lang="less" src="./index.less">

</style>
