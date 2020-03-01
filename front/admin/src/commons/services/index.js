import Vue from "vue";

/**
 * 工作项删除
 */
export const itemChangeUpdate = async function(params) {
  let { $message, $confirm, $axios } = Vue.prototype;
  let {
    item,
    key,
    isVerifyState,
    isSkipConfirm,
    isSkipMessage,
    reloadFn,
    api,
    ctrlStr,
    ajaxData
  } = params || {};
  if (!api) {
    console.error("请传入api");
    return;
  }
  if (!ctrlStr) {
    ctrlStr = api.indexOf("/delete") > -1 ? "删除" : "操作";
  }
  if (isVerifyState && item.c_state === "1") {
    $message.warning("当前用户已启用,不可" + ctrlStr);
    return;
  }
  if (!isSkipConfirm) {
    let itemVal = item && item[key || "c_name"];
    await $confirm(
      "您确定要" + ctrlStr + (itemVal ? "：" + itemVal : "") + "？",
      "提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      }
    );
  }
  if (!ajaxData) {
    ajaxData = {
      c_id: item.c_id
    };
  }
  // ajax
  await $axios.post(api, ajaxData);
  // msg
  if (!isSkipMessage) {
    $message({
      message: "操作成功",
      type: "success"
    });
  }
  //reload
  reloadFn && reloadFn();
};

/**
 * textareaFilter
 */
export const textareaFilter = function(val) {
  if (!val) {
    return "";
  }
  if (typeof val === "string") {
    var s = "";
    s = val.replace(/&amp;/g, "&");
    s = s.replace(/<(?=[^o][^)])/g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/\"/g, "&quot;");
    s = s.replace(/\n/g, "<br>");
    return s;
  }
  return val;
};

/**
 * handleError
 */
export const handleError = function(error) {
  if (typeof error === "object" && error && error.message === undefined) {
    return;
  }
  if (typeof error !== "string") {
    error = "系统异常";
  }
  Vue.prototype.$notify.error({
    title: "错误",
    message: error
  });
};

/**
 * 统一处理分页问题
 */
export const handlePageAndList = (vm, result, page) => {
  // 检测是否当前页删除的没数据了
  if (
    !(result && result.length) &&
    page.curPage != 1 &&
    page.curPage > page.totalPage
  ) {
    vm.page.currPage = page.curPage - 1;
    vm.getListByPage();
  } else {
    //有数据正常渲染
    vm.list = result;
    vm.page.totalRow = page.totalRow;
    return Promise.resolve(result);
  }
};
