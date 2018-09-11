<template lang="pug">
el-card.matrix
  .matrix-title(slot="header") 单品词根波士顿矩阵
  .matrix-body
    .chart
</template>

<script>
export default {
}
</script>

<style lang="less">
.matrix {
  margin-top: 20px;
  &-title {
    font-size: 16px;
    color: #333;
    font-weight: 500;
  }
  .chart {
    width: 1400px;
    height: 440px;
    margin: 0 auto;
    border: 1px solid #ADADAD;
  }
}
</style>
