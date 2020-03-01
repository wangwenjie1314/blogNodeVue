/**
 * 通用过滤器
 */
import { handleBirthday, getDateFormatStr } from '../services/date';

const filter = {
  dateFilter(date, format) {
    return getDateFormatStr({
      timestamp: date,
      format: format || 'YYYY-MM-DD HH:mm'//'YYYY-MM-DD'
    }) || '-';
  },
  booleanFilter(val) {
    if (val === '1') {
      return '是';
    } else if (val === '0') {
      return '否';
    } else {
      return val;
    }
  },
  ageFilter(date) {
    return handleBirthday(date);
  },
  imgFilter(src) {
    return src || "static/img/icon-placeholder.png";
  },
  dictsFilter(val, dict) {
    return window.dicts && window.dicts[dict] && window.dicts[dict][val] ? window.dicts[dict][val] : '-'
  },
  dictsManyFilter(val, dict) {
    if (val && typeof val === 'string') {
      let arr = val.split(',');
      let strArr = [];
      arr.map(v => {
        if (window.dicts && window.dicts[dict] && window.dicts[dict][v]) {
          strArr.push(window.dicts[dict][v])
        }
      });
      return strArr.join(',') || '-';
    }
    return '-'
  },
  /**
   * TQ状态
   * @param {*} val
   */
  specialStateFilter(val) {
    //0：暂存，1：审核中，2:审核已通过（通过传这个），3:审核未通过（未通过传这个）
    if (val == "2") {
      return "审核已通过"
    } else if (val == "1") {
      return "审核中";
    } else if (val == "3") {
      return "审核未通过"
    } else {
      return "暂存"
    }
  },
  /**
   * 奖励状态
   * @param {*} val
   */
  awardStateFilter(val) {
    //0：审核中 1：审核通过 2：审核未通过
    if (val == "2") {
      return "审核未通过"
    } else if (val == "1") {
      return "审核通过";
    } else {
      return "审核中"
    }
  },
  /**
   * 任务状态
   * @param {*} val
   */
  taskStateFilter(val) {
    //0未开始，1进行中，2已结束
    if (val == "2") {
      return "已结束"
    } else if (val == "1") {
      return "进行中";
    } else {
      return "未开始"
    }
  },
};

export default filter;
