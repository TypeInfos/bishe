<template lang="pug">
el-dialog(
  width="1080px"
  custom-class="root-radar__key-word"
  :show-close="false"
  :visible.sync="dialogVisible"
)
  template(slot="title")
    .title
      span.cnt 关键词操作
      .close-btn
        i.el-icon-close
  .body
    .operate-bar
      .btn-groups
        el-button(primary) +添加关键词
        el-button(primary) 修改PC端溢出价
        el-button(primary) 修改无线端溢出价
        el-button(primary) 更改匹配方式
        el-button(primary) 删除关键词
      .select-groups
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: true
    }
  }
}
</script>

<style lang="less">
.root-radar__key-word {
  .el-dialog__header {
    height: 50px;
    padding-left: 30px;
    .title {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .cnt {
        color: #333;
        font-size: 16px;
        font-weight: 400;
      }
      .close-btn {
        height: 100%;
        width: 50px;
        font-size: 20px;
        color: #999;
        border-left: 1px solid #f0f0f0;
        text-align: center;
        line-height: 50px;
        cursor: pointer;
        &:hover {
          background: #1CCADA;
          color: #fff;
        }
      }
    }
  }
  .el-dialog__body {
    padding: 17px 30px;
    .body {
      .operate-bar {
        display: flex;
        justify-content: space-between;
        .btn-groups {
          .el-button {
            background: #1CCADA;
            color: #fff;
            padding: 5px 14px;
            font-size: 12px;
            & + .el-button {
              margin-left: 13px;
            }
            &:hover {
              background: #1CCADA;
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
