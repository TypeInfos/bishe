<template>
    <el-table :data="wordData" style="width: 100%" v-loading="loading">
        <el-table-column
            prop="bidwordstr"
            label="关键词"
            min-width="100">
        </el-table-column>
        <el-table-column
            prop="impression"
            label="展现指数"
            sortable
            min-width="100">
        </el-table-column>
        <el-table-column
            prop="click"
            label="点击指数"
            sortable
            min-width="100">
        </el-table-column>
        <el-table-column
            prop="clickRate"
            label="点击率"
            sortable
            min-width="90">
            <template slot-scope="scope">
                {{scope.row.clickRate}}%
            </template>
        </el-table-column>
        <el-table-column
            prop="clickChangeRate"
            label="点击转换率"
            sortable
            min-width="120">
            <template slot-scope="scope">
                {{scope.row.clickChangeRate}}%
            </template>
        </el-table-column>
        <el-table-column
            prop="avgPrice"
            label="市场均价"
            sortable
            min-width="130">
        </el-table-column>
        <el-table-column
            prop="competition"
            label="竞争度"
            sortable
            min-width="100">
        </el-table-column>
    </el-table>
</template>
<script>
export default {
  props: ['wordData', 'loading'],
  data() {
    return {
      // 搜索词分析数据
      wordAnalysisData: [
        {
          bidwordstr: '淘宝搜索', // 搜索词
          click: 1234, // 搜索指数
          impression: 2334, // 展现指数
          avgPrice: 343434, // 市场平均出价
          competition: 1223, // 竞争指数
          clickRate: 2.1, // 点击率
          clickChangeRate: 3.2, // 点击转化率
        },
      ],
    }
  },
  mounted() {
  },
  methods: {
  },
}
</script>
