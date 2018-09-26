<template>
  <div class="m-table-data">
    <el-table :data="tableData" border height="620" style="width: 100%" show-summary :summary-method="getSummaries">
      <el-table-column prop="dataTime" label="统计日期" fixed width="110">
      </el-table-column>
      <el-table-column prop="zCost" label="直通车花费" sortable width="120">
      </el-table-column>
      <el-table-column prop="zUv" label="直通车访客数" sortable width="130">
      </el-table-column>
      <el-table-column prop="nUv" label="自然搜索访客数" sortable min-width="150">
      </el-table-column>
      <el-table-column prop="allUv" label="总访客数" sortable width="120">
      </el-table-column>
      <el-table-column prop="zConversion" label="直通车转化率" sortable width="130">
        <template slot-scope="scope">
                      {{scope.row.zConversion}}%
</template>
            </el-table-column>
            <el-table-column
                prop="nConversion"
                label="自然搜索转化率"
                sortable
                min-width="150">
<template slot-scope="scope">
   {{scope.row.nConversion}}%
</template>
            </el-table-column>
                        <el-table-column
                prop="allConversion"
                label="总转化率"
                sortable
                min-width="110">
<template slot-scope="scope">
   {{scope.row.allConversion}}%
</template>
            </el-table-column>
            <el-table-column
                prop="zPayCnt"
                label="直通车成交量"
                sortable
                width="130">
            </el-table-column>
            <el-table-column
                prop="nPayCnt"
                label="自然搜索成交量"
                sortable
                min-width="150">
            </el-table-column>
            <el-table-column
                prop="allPayCnt"
                label="总成交量"
                sortable
                min-width="110">
            </el-table-column>
            <el-table-column
                prop="zAddCart"
                label="直通车加购人数"
                sortable
                min-width="150">
            </el-table-column>
            <el-table-column
                prop="zAddFav"
                label="直通车收藏人数"
                sortable
                min-width="150">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
  props: ['tableData', 'totalData'],
  methods: {
    getSummaries(param) {
      const {
        columns,
      } = param
      const sums = []
      columns.forEach((column, index) => {
        // 将后端请求的数据放入合计
        sums[index] = this.totalData[column.property]
        if (column.property === 'zConversion' || column.property === 'nConversion' || column.property === 'allConversion') {
          sums[index] += '%'
        }
      })
      return sums
    },
  },
}
</script>

<style lang="less">

</style>
