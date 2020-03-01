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
};

export default filter;
