import { getDateFormatStr } from "./date";

/**
 * 检查手机号码
 */
const checkPhone = (rule, value, callback) => {
  const reg = /^((1[3|4|6|5|7|8|9][0-9]{1})+\d{8})$/;
  if (value && !reg.test(value)) {
    callback(new Error("请填写正确的手机号"));
  } else {
    callback();
  }
};

/**
 * 检查ip地址
 */
const checkIp = (rule, value, callback) => {
  const reg = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/g;
  if (value && !reg.test(value)) {
    callback(new Error("请填写正确的ip"));
  } else {
    callback();
  }
};

/**
 * 检查身份证号
 */
const checkIdCard = (rule, value, callback) => {
  const reg = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
  if (value && !reg.test(value)) {
    callback(new Error("请填写正确的身份证号"));
  } else {
    callback();
  }
};

/**
 * 检查邮箱
 */
const checkEmail = (rule, value, callback) => {
  const reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  if (value && !reg.test(value)) {
    callback(new Error("请填写正确的邮箱"));
  } else {
    callback();
  }
};

/**
 * 清洗列表数据
 */
export const getArrFromListOfKey = (list, key) => {
  let arr = [];
  list.map(v => {
    let val = v[key || 'c_id'];
    if (val) {
      arr.push(val);
    }
  });
  return arr;//arr.join(',')
}

/**
 * 处理form数据转换
 * @param {*} tpls  模板工作项s
 * @param {*} records  实例数据
 * @param {*} formType info
 */
export const handleFormData = (tpls, records, formType) => {
  let addEditForm = {},
    addEditRules = {},
    dicts = {};
  tpls.map(v => {
    //处理字典
    if (v.dict) {
      dicts[v.dict + "List"] = window.dictList[v.dict] || [];
    }
    //新增编辑时不显示和处理isInfoShow
    if (formType != 'info' && v.isInfoShow) {
      return;
    }
    let key = formType == 'info' ? (v.keyinfo || v.key) : v.key;
    if (v.isMultiple && v.type === "select" && records[key] && typeof (records[key]) === "string") {//select 多选下值为string时需要转为Array
      addEditForm[key] = records[key].split(',');
    } else if ((v.type === "date" || v.type === "datetime") && typeof (records[key]) === "number") {//日期类型转换为String
      addEditForm[key] = getDateFormatStr({
        timestamp: records[key],
        format: v.type === "datetime" ? "YYYY-MM-DD HH:mm:ss" : 'YYYY-MM-DD'
      }) || "";
    } else {
      addEditForm[key] = records[key] || "";
    }
    //处理rule
    let rules = [];
    if (v.isRequired) {
      let ctrl = v.type === "select" ? "选择" : "输入";
      rules.push({
        required: true,
        message: `请${ctrl}${v.title}`,
        trigger: "change"
      });
    }
    if (v.rule === "phone") {
      rules.push({ validator: checkPhone, trigger: "blur" });
    } else if (v.rule === "idcard") {
      rules.push({ validator: checkIdCard, trigger: "blur" });
    } else if (v.rule === "email") {
      rules.push({ validator: checkEmail, trigger: "blur" });
    } else if (v.rule === "ip") {
      rules.push({ validator: checkIp, trigger: "blur" });
    }
    if (rules && rules.length) {
      addEditRules[key] = rules;
    }
  });
  return {
    addEditForm,
    addEditRules,
    dicts
  }
};
