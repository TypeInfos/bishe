<template src="./index.html">

</template>

<style lang="less" src="./index.less">

</style>

<script>
import moment from 'moment';

export default {
  name: 'myDatePicker',
  data() {
    return {
      myDatePopStatus: false,
      myDateTime: '', // v-model
      finalContent: '', // 最终选择的时间
      startTime: '', // 开始时间
      endTime: '', // 结束时间
      dateModel: '今天',
      pickerOptions: {
        shortcuts: [{
          text: '最近三十天',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            end.setTime(end.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', [start, end]);
          },
        }],
        disabledDate(time) {
          let curDate = (new Date()).getTime();
          let one = 30 * 24 * 3600 * 1000;
          let oneMonths = curDate - one;
          return time.getTime() > Date.now() || time.getTime() < oneMonths;
        },
      },
    };
  },
  mounted() {
    this.changeDate('今天');
  },
  methods: {
    changeDate(val) {
      switch (val) {
        case '今天':
          this.startTime = moment().subtract(0, 'days').format('YYYY-MM-DD');
          this.endTime = moment().subtract(0, 'days').format('YYYY-MM-DD');
          this.myDateTime = [this.startTime, this.endTime];
          this.finalContent = '今天';
          this.$emit('refreshDate', this.startTime, this.endTime);
          break;
        case '昨天':
          this.startTime = moment().subtract(1, 'days').format('YYYY-MM-DD');
          this.endTime = moment().subtract(1, 'days').format('YYYY-MM-DD');
          this.finalContent = '昨天';
          this.myDateTime = [this.startTime, this.endTime];
          this.$emit('refreshDate', this.startTime, this.endTime);
          break;
        case '过去7天':
          this.startTime = moment().subtract(7, 'days').format('YYYY-MM-DD');
          this.endTime = moment().subtract(1, 'days').format('YYYY-MM-DD');
          this.myDateTime = [this.startTime, this.endTime];
          this.finalContent = '过去7天';
          this.$emit('refreshDate', this.startTime, this.endTime);
          break;
        case '过去14天':
          this.startTime = moment().subtract(14, 'days').format('YYYY-MM-DD');
          this.endTime = moment().subtract(1, 'days').format('YYYY-MM-DD');
          this.myDateTime = [this.startTime, this.endTime];
          this.finalContent = '过去14天';
          this.$emit('refreshDate', this.startTime, this.endTime);
          break;
        case '过去30天':
          this.startTime = moment().subtract(30, 'days').format('YYYY-MM-DD');
          this.endTime = moment().subtract(1, 'days').format('YYYY-MM-DD');
          console.log(this.startTime);
          this.finalContent = '过去30天';
          this.myDateTime = [this.startTime, this.endTime];
          this.$emit('refreshDate', this.startTime, this.endTime);
          break;
      }
      this.myDatePopStatus = false;
    },
    // 取消按钮
    cancel() {
      this.myDatePopStatus = false;
    },
    hide() {
      this.myDatePopStatus = false;
    },
    show() {
      this.myDatePopStatus = true;
    },
    // 确认时间
    confirmDate() {
      this.finalContent = `${this.myDateTime[0]}至${this.myDateTime[1]}`;
      // 标签实验室刷新数据
      this.startTime = this.myDateTime[0];
      this.endTime = this.myDateTime[1];
      if (this.startTime > this.endTime) {
        alert('开始日期大于结束日期，请重新选择!');
      } else {
        this.$emit('refreshDate', this.startTime, this.endTime);
      }
      this.myDatePopStatus = false;
    },
  },
  watch: {
    myDatePopStatus(val) {
      this.myDateTime = [this.startTime, this.endTime];
    },
  },
};
</script>
