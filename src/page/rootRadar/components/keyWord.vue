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
      .close-btn(@click="closeDialog")
        i.el-icon-close
  .body
    .operate-bar
      .btn-groups
        el-button(
          primary
          @click="addKeyWordVisible = true"
        ) +添加关键词
        //- 1为PC端
        el-button(
          primary
          @click="showEditPriceDialog(1)"
        ) 修改PC端出价
        //- 0为无线端
        el-button(
          primary
          @click="showEditPriceDialog(0)"
        ) 修改无线端出价
        el-button(
          primary
          @click="editMetaMethodsVisible = true"
        ) 更改匹配方式
        el-button(
          primary
          @click="deleteKeyWordVisible = true"
        ) 删除关键词
      .select-groups
        el-dropdown(@command='chooseEnd')
          span {{endChoose}}
            i(class="el-icon-arrow-down el-icon--right")
          el-dropdown-menu(slot="dropdown")
            el-dropdown-item(command="全部终端") 全部终端
            el-dropdown-item(command="PC端") PC端
            el-dropdown-item(command="移动端") 移动端
        el-dropdown(@command='chooseFrom')
          span {{fromChoose}}
            i(class="el-icon-arrow-down el-icon--right")
          el-dropdown-menu(slot="dropdown")
            el-dropdown-item(command="全部来源") 全部来源
            el-dropdown-item(command="站内") 站内
            el-dropdown-item(command="站外") 站外
        el-dropdown(@command='choosePosition')
          span {{positionChoose}}
            i(class="el-icon-arrow-down el-icon--right")
          el-dropdown-menu(slot="dropdown")
            el-dropdown-item(command="全部位置") 全部位置
            el-dropdown-item(command="计算机搜索左侧位置") 计算机搜索左侧位置
        //- el-dropdown()
        //-   span 展示指标
        //-     i(class="el-icon-arrow-down el-icon--right")
        el-popover(
          placement="bottom"
          trigger="click"
          :visible-arrow="false"
          width='540'
          popper-class="root-radar__key-word__select"
        )
          .select-container
            span.container-title 选择指标
            el-checkbox-group.select-check-group(
              v-model="allCheckTarget"
            )
              el-checkbox.check-box-cell(v-for="(target,index) in allTargets" :key="index" :label="target") {{target}}
            .show-check-group
              span.show-check-title 指标展现顺序
              draggable(v-model="allCheckTarget" :options="{group:'allCheckTargetList'}")
                span.show-check-cell(v-for="target in allCheckTarget" :key="target") {{target}}
            .btn-bottom
              el-button(type='primary' class='cancel' @click="") 取消
              el-button(type='primary' class='confirm' @click="") 确认
          span(style="cursor:pointer" slot="reference") 展示指标
              i(class="el-icon-arrow-down el-icon--right")
    .table
      el-table
        el-table-column(prop='' label='关键词')
        el-table-column(prop='' label='质量分')
          el-table-column(label='PC端')
          el-table-column(label='无线端')
        el-table-column(prop='' label='点击率')
        el-table-column(prop='' label='花费')
        el-table-column(prop='' label='投入产出比')
        el-table-column(prop='' label='平均点击花费')
        el-table-column(prop='' label='点击转化率')
        el-table-column(prop='' label='总成交笔数')
        el-table-column(prop='' label='总成交金额')
  el-dialog(
    width='640px'
    :show-close="false"
    custom-class='root-rader__innerDialog'
    :visible='addKeyWordVisible'
    append-to-body
  )
    template(slot="title")
      .title
        span.cnt 添加关键词
        .close-btn(@click="addKeyWordVisible = false")
          i.el-icon-close
    .add-key-content
      el-input(
        type='textarea'
        autofocus='true'
        placeholder='请在此输入关键词 输入多个以回车进行分隔'
        v-model="addKeyWordTextarea"
        class='content-textarea'
      )
      .add-key-right
        .meta-radio
          el-radio(v-model="addKeyWordMetaRadio" label="1") 广泛匹配
          el-radio(v-model="addKeyWordMetaRadio" label="2") 精确匹配
        .pc-price
          span(class='price-title') PC端出价：
          .price-radiao
            el-radio(v-model="addKeyWordPCEndRadio" label="1") 自定义出价：
              input(type="text" v-model="addKeyWordPCEndCustomInput" class='line-input')
              span 元
            el-radio(v-model="addKeyWordPCEndRadio" label="2" class='pad-20') 市场平均出价&nbsp;&nbsp;X
              input(type="text" v-model="addKeyWordPCEndMeanInput" class='line-input')
              span %
          span(class='price-title') 移动端出价：
          .price-radiao
            el-radio(v-model="addKeyWordMobileEndRadio" label="1") 自定义出价：
              input(type="text" class='line-input')
              span 元
            el-radio(v-model="addKeyWordMobileEndRadio" label="2" class='pad-20') 市场平均出价&nbsp;&nbsp;X
              input(type="text" class='line-input')
              span %
    .btn-bottom
      el-button(type='primary' class='cancel' @click="") 取消
      el-button(type='primary' class='confirm' @click="") 确认
  el-dialog(
    width='640px'
    :show-close="false"
    custom-class='root-rader__innerDialog'
    :visible='editPriceVisible'
    append-to-body
  )
    template(slot="title")
      .title
        span.cnt 修改{{ isPc ? 'PC' : '无线'}}端出价
        .close-btn(@click="editPriceVisible = false")
          i.el-icon-close
    .price-content
      el-radio(v-model="editPriceRadio" label="1" class='radio-cell') 自定义出价：
        input(type="text" class='line-input' v-model="editPriceCustomInput")
        span 元
      el-radio(v-model="editPriceRadio" label="2" class='radio-cell') 提高/降低出价幅度：
        el-dropdown(@command='chooseRange')
          span {{rangeChoose}}
            i(class="el-icon-arrow-down el-icon--right")
          el-dropdown-menu(slot="dropdown")
            el-dropdown-item(command="提高") 提高
            el-dropdown-item(command="降低") 降低
        input(type="text" class='line-input' v-model="editPriceRangeInput")
        span 元
      el-radio(v-model="editPriceRadio" label="3" class='radio-cell') 提高/降低出价百分比：
        el-dropdown(@command='choosePointer')
          span {{pointerChoose}}
            i(class="el-icon-arrow-down el-icon--right")
          el-dropdown-menu(slot="dropdown")
            el-dropdown-item(command="提高") 提高
            el-dropdown-item(command="降低") 降低
        input(type="text" class='line-input' v-model="editPricePointerInput")
        span %
    .btn-bottom
      el-button(type='primary' class='cancel' @click="") 取消
      el-button(type='primary' class='confirm' @click="") 确认
  el-dialog(
    width='640px'
    :show-close="false"
    custom-class='root-rader__innerDialog'
    :visible='editMetaMethodsVisible'
    append-to-body
  )
    template(slot="title")
      .title
        span.cnt 修改匹配方式
        .close-btn(@click="editMetaMethodsVisible = false")
          i.el-icon-close
    .meta-contain
      el-radio(v-model="editMetaMethodsRadio" label='1') 广泛匹配
      el-radio(v-model="editMetaMethodsRadio" label='2') 精确匹配
    .btn-bottom
      el-button(type='primary' class='cancel' @click="editMetaMethodsVisible = false") 取消
      el-button(type='primary' class='confirm' @click="") 确认
  el-dialog(
    width='640px'
    :show-close='false'
    custom-class='root-rader__innerDialog'
    :visible='deleteKeyWordVisible'
    append-to-body
  )
    template(slot="title")
      .title
        span.cnt 删除关键词
        .close-btn(@click="deleteKeyWordVisible = false")
          i.el-icon-close
    .delete-contain
      span 一旦删除，所有数据将无法恢复！确定要删除该关键词吗？
    .btn-bottom
      el-button(type='primary' class='cancel' @click="deleteKeyWordVisible = false") 取消
      el-button(type='primary' class='confirm' @click="") 确认
</template>

<script>
import draggable from 'vuedraggable';

export default {
  components: {
    draggable
  },
  data () {
    return {
      endChoose: '全部终端',
      fromChoose: '全部来源',
      positionChoose: '全部位置',
      addKeyWordVisible: false, // 是否显示添加关键词dialog
      editPriceVisible: false, // 是否显示修改PC端或无线端出价dialog
      editMetaMethodsVisible: false, // 是否显示修改匹配方式dialog
      deleteKeyWordVisible: false, // 是否显示删除关键词dialog
      isPc: 1, // 1为PC端,0为无线端
      // 以下是添加关键词dialog里的数据
      addKeyWordTextarea: '', // 添加关键词的文本域的值
      addKeyWordMetaRadio: '1', // 添加关键词的广泛匹配和精确匹配radio
      addKeyWordPCEndRadio: '1', //  添加关键词的PC端出价radio
      addKeyWordMobileEndRadio: '1', // 添加关键词的移动端出价的radio
      addKeyWordPCEndCustomInput: '', // PC端出价自定义输入
      addKeyWordPCEndMeanInput: '', // PC端出价市场平均值输入
      // 以下是修改PC端或无线端dialog里的数据
      rangeChoose: '提高',
      pointerChoose: '提高',
      editPriceRadio: '1', // 修改PC端或无线端出价的radio
      editPriceCustomInput: '', // 修改PC端或无线端出价的自定义出价
      editPriceRangeInput: '', // 修改PC端或无线端出价的出价幅度
      editPricePointerInput: '', // 修改PC端或无线端出价的出价幅度
      // 以下是修改匹配方式dialog里的数据
      editMetaMethodsRadio: '1', // 修改匹配方式的radio

      allCheckTarget: [],
      allTargets: [
        '质量分',
        '今天平均排名',
        '出价',
        '展现量',
        '点击量',
        '花费',
        '点击率',
        '平均点击花费',
        '千次展现花费',
        '直接成交金额',
        '直接成交笔数',
        '间接成交笔数',
        '质量分',
        '今天平均排名',
        '出价',
        '展现量',
        '点击量',
        '花费',
        '点击率',
        '平均点击花费',
        '千次展现花费',
        '直接成交金额',
        '直接成交笔数',
        '间接成交笔数',
        '质量分',
        '今天平均排名',
        '出价',
        '展现量',
        '点击量',
        '花费',
        '点击率',
        '平均点击花费',
        '千次展现花费',
        '直接成交金额',
        '直接成交笔数',
        '间接成交笔数'
      ]
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    closeDialog() {
      // this.$emit('update:dialogVisible', false);
      this.dialogVis.ible = false
      // console.log(this.dialogVisible);
    },
    chooseEnd(val) {
      this.endChoose = val
    },
    chooseFrom(val) {
      this.fromChoose = val
    },
    choosePosition(val) {
      this.positionChoose = val
    },
    chooseRange(val) {
      this.rangeChoose = val
    },
    choosePointer(val) {
      this.pointerChoose = val
    },
    showEditPriceDialog(val) {
      this.isPc = val
      this.editPriceVisible = true
    },
    resetAddKeyWord() {
      this.addKeyWordTextarea = ''
      this.addKeyWordMetaRadio = '1'
      this.addKeyWordPCEndRadio = '1'
      this.addKeyWordMobileEndRadio = '1'
      this.addKeyWordPCEndCustomInput = ''
      this.addKeyWordPCEndMeanInput = ''
    }
  },
  watch: {

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
        .select-groups {
          text-align: center;
          font-size: 12px;
          .el-dropdown {
            padding-right: 20px;
            line-height: 24px;
            cursor: pointer;
          }
        }
      }
      .table {
        padding-top: 10px;
      }
    }
  }
}
.el-dropdown-menu__item {
  font-size: 12px;
}

.root-rader__innerDialog {
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
  .el-dialog__body{
    min-height: 270px;
  }
  .add-key-content {
    font-size: 12px;
    display: flex;
    padding-bottom: 50px;
    .content-textarea {
      font-size: 12px;
      width: 240px;
      textarea{
        height: 290px;
      }
    }
    .add-key-right {
      padding-top: 30px;
      padding-left: 50px;
      color: #4A4A4A;
      .el-radio__input.is-checked+.el-radio__label {
        color: #4A4A4A;
      }
      .el-radio__label {
        color: #4A4A4A;
        font-size: 12px;
      }
      .el-radio__input.is-checked .el-radio__inner {
        background: #0088FE;
        background-color: #0088FE;
      }
      .pc-price {
        .price-title {
          padding-top: 20px;
          padding-bottom: 20px;
          font-weight: bold;
        }
      }
      .price-radiao {
        display: flex;
        flex-direction: column;
        .pad-20 {
          padding-top: 20px;
        }
        .el-radio+.el-radio {
            margin-left: 0px;
        }
        .line-input{
          border-top: 0px;
          border-left: 0px;
          border-right: 0px;
          border-bottom: 1px solid #9B9B9B;
          outline: none;
          width: 45px;
          margin-left: 5px;
          margin-right: 5px;
        }
      }
    }
  }
  .price-content {
    display: flex;
    flex-direction: column;

    .el-radio__input.is-checked+.el-radio__label {
      color: #4A4A4A;
    }
    .el-radio__label {
      color: #4A4A4A;
      font-size: 12px;
    }
    .el-radio__input.is-checked .el-radio__inner {
      background: #0088FE;
      background-color: #0088FE;
    }
    .el-radio+.el-radio {
      margin-left: 0px;
    }
    .line-input {
      border-top: 0px;
      border-left: 0px;
      border-right: 0px;
      border-bottom: 1px solid #9B9B9B;
      outline: none;
      width: 45px;
      margin-left: 5px;
      margin-right: 5px;
    }
    .radio-cell{
      padding-top:20px;
      padding-bottom: 10px;
      padding-left: 180px;
    }
  }
  .meta-contain {
    text-align: center;
    line-height: 210px;
    .el-radio__input.is-checked+.el-radio__label {
      color: #4A4A4A;
    }
    .el-radio__label {
      color: #4A4A4A;
      font-size: 12px;
    }
    .el-radio__input.is-checked .el-radio__inner {
      background: #0088FE;
      background-color: #0088FE;
    }
  }
  .delete-contain{
    font-size: 16px;
  }
  .btn-bottom {
    position: absolute;
    bottom: 0;
    right: 0;
    padding-right: 45px;
    padding-bottom: 30px;
    .cancel{
      background: #fff;
      color: #1CCADA;
      width: 60px;
      height: 36px;
      padding: 0;
      font-size: 12px;
      &:hover{
        color: #fff;
        background: #1CCADA;
      }
    }
    .confirm{
      background: #1CCADA;
      color: #fff;
      width: 60px;
      height: 36px;
      padding: 0;
      margin-left: 20px;
      font-size: 12px;
      &:hover{
        color: #1CCADA;
        background: #fff;
      }
    }
  }
}

.root-radar__key-word__select{
  height: 460px;
  .select-container{
    display: flex;
    flex-wrap: wrap;
    .container-title{
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 10px;
      font-size: 14px;
      color: #4A4A4A;
      width: 100%;
    }
    .select-check-group{
      &::-webkit-scrollbar {
        width: 10px;
        height: 20px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 2px;
        background: #b4c8d8;
        width: 600px;
      }
      font-size: 12px;
      width: 50%;
      display: flex;
      flex-wrap: wrap;
      padding-left: 10px;
      overflow-y: auto;
      height: 350px;
      justify-content: space-between;
      .el-checkbox + .el-checkbox {
          margin-left: 0px !important;
      }
    }
    .check-box-cell{
      width: 120px;
      // padding-top: 10px;
      height: 25px;

    }
    .show-check-group{
      &::-webkit-scrollbar {
        width: 10px;
        height: 20px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 2px;
        background: #b4c8d8;
      }
      padding-right:10px;
      padding-left: 20px;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      width: 30%;
      height: 350px;
      .show-check-title{
        font-size:14px;
        padding-bottom:10px;
      }
      .show-check-cell{
        cursor: move;
        width: 110px;
        border: 1px dotted #979797;
        margin-bottom: 5px;
        padding: 0 15px;
        height: 25px;
        line-height: 25px;
      }
    }
    .btn-bottom {
      position: absolute;
      bottom: 0;
      right: 0;
      padding-right: 45px;
      padding-bottom: 30px;
      .cancel{
        background: #fff;
        color: #1CCADA;
        width: 60px;
        height: 36px;
        padding: 0;
        font-size: 12px;
        &:hover{
          color: #fff;
          background: #1CCADA;
        }
      }
      .confirm{
        background: #1CCADA;
        color: #fff;
        width: 60px;
        height: 36px;
        padding: 0;
        margin-left: 20px;
        font-size: 12px;
        &:hover{
          color: #1CCADA;
          background: #fff;
        }
      }
    }
  }
}
</style>
