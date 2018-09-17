<template lang="pug">
</template>
<script>
function getElementTop(element) {
  let actualTop = element.offsetTop;
  let current = element.offsetParent;
  while (current !== null) {
    actualTop += (current.offsetTop + current.clientTop);
    current = current.offsetParent;
  }
  return actualTop;
}
// 绑定页面滚动事件
const windowScrollEve = () => {
  // 表头元素
  const header = document.querySelector('.allTableHeaderContainer');
  // 第一个群组
  const g1 = document.querySelector('.groups');
  if (!g1) return;
  header.style.width = `${g1.clientWidth}px`;
  const bdTop = document.documentElement.scrollTop || document.body.scrollTop;
  const absoluteTop = getElementTop(g1) - header.clientHeight;
  let isFixed = [...header.classList].includes('fixed');
  if (!isFixed && bdTop >= absoluteTop) {
    header.classList.add('fixed');
  } else if (isFixed && bdTop < absoluteTop) {
    header.classList.remove('fixed');
  }
};
// 绑定表格滚动事件
const groupScrollEve = e => {
  scrollGroups(e.target.scrollLeft, e.target.parentNode.classList);
  const header = document.querySelector('.allTableHeaderContainer .el-table__header-wrapper');
  header.scrollLeft = e.target.scrollLeft;
};
const scrollGroups = (scrollLeft, classes) => {
  const groups = document.querySelectorAll('.scroll-groups');
  groups.forEach(i => {
    if (i.classList !== classes) {
      let currentGroup = i.querySelector('.el-table__body-wrapper');
      currentGroup.scrollLeft = scrollLeft;
    }
  });
};
export default {
  methods: {
    // 绑定群组滑动事件
    initTableScroll() {
      this.$nextTick(() => {
        console.log('触发了 initTableScroll');
        window.removeEventListener('scroll', windowScrollEve);
        window.addEventListener('scroll', windowScrollEve);
        const groups = document.querySelectorAll('.scroll-groups');
        groups.forEach(i => {
          let currentGroup = i.querySelector('.el-table__body-wrapper');
          console.log(currentGroup)
          currentGroup.removeEventListener('scroll', groupScrollEve);
          currentGroup.addEventListener('scroll', groupScrollEve);
        });
      });
    },
    getGroupSummary(param) {
      const { columns, data } = param;
      const sums = [];
      let group = this.groupList.find(g => g.list.some(l => data[0] && l.crowdId === data[0].crowdId))
      if (group) {
        columns.forEach((c, i) => {
          if (i === 0) {
            sums.push('');
          } else if (i === 1) {
            sums.push('整体');
          } else {
            let p = group.total[0][c.property]
            p = p || p === 0 ? p : '-'
            if (c.property === 'discount') {
              p = '-'
            }
            sums.push(p)
          }
        });
      }
      return sums;
    },
  },
};
</script>
<style lang="less">

</style>
