<template lang="pug">
.component-expired
  span.detail 剩余{{ day }}天
</template>
<script>
export default {
  props: {
    day: {
      type: Number,
      default: 7,
    },
  },
}
</script>
<style lang="less">
.component-expired {
  width: 200px;
  height: 200px;
  position: relative;
  background: linear-gradient(135deg, transparent 0, transparent 10%, red 0, red 20%, transparent 0, transparent 100%);
  .detail {
    position: absolute;
    top: 22%;
    font-size: 16px;
    color: #fff;
    transform: rotate(-45deg);
    transform-origin: left top;
  }
}
</style>
