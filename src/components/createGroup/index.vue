<template src="./index.html">

</template>

<style lang="less" src="./index.less">

</style>

<script>
export default {
  name: 'modifyGroups',
  props: ['createGroupDialog'],
  data() {
    return {
      addWordSucceed: true,
      groupName: '',
      showErrorCreateGroup: false,
      radio: '1',
      showMyDefinedGroup: '',
      // 标准群组的属性
      showStandardGroup: true,
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
      createGroups: '',
    };
  },
  methods: {
    radioChange() {
      if (this.radio == 1) {
        this.showStandardGroup = true;
        this.showMyDefinedGroup = false;
      }
      if (this.radio == 2) {
        this.showMyDefinedGroup = true;
        this.showStandardGroup = false;
      }
    },
    closeModal() {
      this.createGroupDialogFlag = false;
    },
  },
};
</script>

