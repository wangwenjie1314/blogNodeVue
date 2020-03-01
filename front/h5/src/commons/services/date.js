import moment from 'moment';

/**
 * 获取当前日期 'YYYY-MM-DD HH:mm:ss'
 */
const getDateFormatStr = function (opts) {
  let { timestamp, format } = opts;
  let dateNew = new Date();
  if (timestamp) {
    let timestampStr = timestamp.toString();
    if (timestampStr.length === 10) {
      dateNew = new Date(timestamp * 1000);
    } else if (timestampStr.indexOf('-') > -1) {
      timestampStr = timestampStr.replace(/-/g, '/');
      dateNew = new Date(timestampStr);
    } else {
      dateNew = new Date(timestamp);
    }
  }
  return moment(dateNew).format(format || 'YYYY-MM-DD HH:mm:ss');
};

/**
 * 处理日期时间
 */
const handleStartEndTime = function (dateArr) {
  if (dateArr && dateArr.length) {
    return {
      c_starttime: getDateFormatStr({
        timestamp: dateArr[0],
        format: "YYYY-MM-DD"
      }),
      c_endtime: getDateFormatStr({
        timestamp: dateArr[1],
        format: "YYYY-MM-DD"
      })
    }
  } else {
    return {
      c_starttime: '',
      c_endtime: ''
    }
  }
}

/**
 * 处理年龄
 */
const handleBirthday = (birthday) => {
  if (!birthday) {
    return '-';
  }
  let intStuAge = 0;
  let Birth = moment(birthday);
  let now = moment();
  let nian = Birth.year();; //出生日期
  let ri = now.year();    //当前日期

  // 月日 大于 当前日期 年龄=测试年-出生年
  // 月日 小于等于 当前日期 年龄=测试年-出生年-1

  //1982-01-01 -- 33
  //2016-12-07

  //测试时已过当年生日者:年龄=测试年-出生年
  //测试时未过当年生日者：年龄＝测试年－出生年－1

  //出生日期月日 > 当前日期月日 = 未过生日
  if (Birth.format("MMDD") > now.format("MMDD")) {
    intStuAge = (ri - nian) - 1;
  }
  else {
    //已过生日
    intStuAge = (ri - nian);
  }
  return intStuAge;
};

export {
  getDateFormatStr,
  handleStartEndTime,
  handleBirthday
}
