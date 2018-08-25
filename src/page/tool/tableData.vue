<template>
    <div class="m-table-data">
        <el-table :data="tableData.detailDtoList"
        style="width: 100%" v-loading="loading" show-summary :summary-method="getSummaries">
            <el-table-column
                prop="date"
                label="统计日期"
                width="100">
            </el-table-column>
            <el-table-column
                prop="efficiency"
                label="效率分"
                sortable
                width="100">
            </el-table-column>
            <el-table-column
                prop="zCost"
                label="直通车花费"
                sortable
                width="120">
            </el-table-column>
            <el-table-column
                prop="zVisit"
                label="直通车访客数"
                sortable
                width="130">
            </el-table-column>
            <el-table-column
                prop="rVisit"
                label="自然搜索访客数"
                sortable
                min-width="150">
            </el-table-column>
            <el-table-column
                prop="zTransform"
                label="直通车转化率"
                sortable
                width="130">
                <template slot-scope="scope">
                    {{scope.row.zTransform}}%
                </template>
            </el-table-column>
            <el-table-column
                prop="rTransform"
                label="自然搜索转化率"
                sortable
                min-width="150">
                <template slot-scope="scope">
                    {{scope.row.rTransform}}%
                </template>
            </el-table-column>
            <el-table-column
                prop="zDeal"
                label="直通车成交量"
                sortable
                width="130">
            </el-table-column>
            <el-table-column
                prop="rDeal"
                label="自然搜索成交量"
                sortable
                min-width="150">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
  props: ['tableData', 'loading'],
  data() {
    return {
      // 查看表格数据mock,实际数据由父组件传过来
      tableDatas: [
        {
          date: '2016-05-02', // 统计日期
          efficiency: '1', // 效率分
          zCost: '2', // 直通车花费
          zVisit: '3', // 直通车访客数
          rVisit: '4', // 自然搜索访客数
          zTransform: '0.22', // 直通车转换率
          rTransform: '2.1', // 自然搜索转换率
          zDeal: '1', // 直通车成交量
          rDeal: '1', // 自然搜索成交量
        },
        {
          date: '2016-05-03', // 统计日期
          efficiency: '2', // 效率分
          zCost: '3', // 直通车花费
          zVisit: '4', // 直通车访客数
          rVisit: '4', // 自然搜索访客数
          zTransform: '0.21', // 直通车转换率
          rTransform: '2.5', // 自然搜索转换率
          zDeal: '5', // 直通车成交量
          rDeal: '1', // 自然搜索成交量
        },
      ],
    };
  },
  mounted() {
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param;
      console.log(columns);
      console.log(data);
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            }
            return prev;
          }, 0);
          if (column.label === '直通车转化率' || column.label === '自然搜索转化率') {
            sums[index] += '%';
          }
        } else {
          sums[index] = 'N/A';
        }
      });
      return sums;
    },
  },
};
</script>
<style lang="less">
</style>
