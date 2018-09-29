<template>
    <div class="m-table-data">
        <el-table :data="tableData"
        style="width: 100%;" v-loading="loading" show-summary :summary-method="getSummaries">
            <el-table-column
                prop="date"
                label="统计日期"
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
                prop="nUv"
                label="自然搜索访客数"
                sortable
                min-width="150">
            </el-table-column>
            <el-table-column
                prop="zConversion"
                label="直通车转化率"
                sortable
                width="130">
                <template slot-scope="scope">
                    {{scope.row.zTransform}}%
                </template>
            </el-table-column>
            <el-table-column
                prop="rConversion"
                label="自然搜索转化率"
                sortable
                min-width="150">
                <template slot-scope="scope">
                    {{scope.row.rTransform}}%
                </template>
            </el-table-column>
            <el-table-column
                prop="zpayCnt"
                label="直通车成交量"
                sortable
                width="130">
            </el-table-column>
            <el-table-column
                prop="nPay"
                label="自然搜索成交量"
                sortable
                min-width="150">
            </el-table-column>
             <el-table-column
                prop="allAddFav"
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
    }
  },
  mounted() {
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            }
            return prev
          }, 0)
          if (column.label === '直通车转化率' || column.label === '自然搜索转化率') {
            sums[index] += '%'
          }
        } else {
          sums[index] = 'N/A'
        }
      })
      return sums
    },
  }
}
</script>
