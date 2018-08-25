<template src="./index.html">

</template>

<script>
export default {
  name: 'modifyGroups',
  data() {
    return {
      addWordSucceed: true,
      addGoodsFocuDialog: true,
      groupName: '',
      showErrorP: false,
      options: [{
        value: '选项1',
        label: '关系群组',
      }, {
        value: '选项2',
        label: '比单价性别优群组',
      }, {
        value: '选项3',
        label: '性别年龄优群组',
      }, {
        value: '选项4',
        label: '屏蔽流量群组',
      }, {
        value: '选项5',
        label: '未标签化群组',
      }],
      rate: '',
    };
  },
  methods: {
    closeModal() {
      this.addGoodsFocuDialog = !this.addGoodsFocuDialog;
    },
  },
};
</script>

<style lang="less" src="./index.less">

</style>
