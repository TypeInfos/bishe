<template>
    <div class="m-pagination">
        <el-pagination
            :page-size="pageSize"
            :current-page="currentPage"
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :total="totalRecords">
        </el-pagination>
    </div>
</template>
<script>
export default {
  props: ['pageSize', 'currentPage', 'totalRecords', 'index'],
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
    handleCurrentChange(val) {
      const data = {
        currentPage: val,
        index: this.index,
      };
      this.$emit('currentChange', data);
    },
  },
};
</script>
<style lang="less">
  .m-pagination{
    margin: 10px 0;
    text-align: right;
    .el-pagination{
      display: inline-block;
    }
    .el-pagination .btn-next, .el-pagination .btn-prev, .el-pager li{
      background: transparent;
    }
  }
</style>
