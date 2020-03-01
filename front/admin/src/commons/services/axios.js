import Vue from 'vue';
import axios from 'axios';
import router from '@/router/index';
import store from '@/store/index';
import DICTS from '@/commons/configs/dicts';
import { handleError } from "@/commons/services/index";
import { localStorage, sessionStorage } from "@/commons/services/cache";

// 全局是否正在提醒用户退出登录
let isAskUserGoLogin = false;

//axios config
axios.defaults.baseURL = window.blogConfig.api;
axios.defaults.timeout = 25000;
axios.defaults.headers.post['Content-Type'] = 'application/json';
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  let params = config.data || config.params || {};
  // skipLoading 跳过loading状态
  if (!params.skipLoading) {
    store.commit('setLoading', true);
  } else {
    Reflect.deleteProperty(params, 'skipLoading');
  }
  config.cancelToken = store.state.source.token;
  if (!params.skipAuth) {
    const { userInfo } = store.getters;
    if (userInfo) {
      // 多用户相同浏览器登录
      let sessionUserId = sessionStorage.get("cmsBlogUid");
      let localUserId = localStorage.get("cmsBlogUid");
      if (localUserId != sessionUserId) {
        let { $confirm } = Vue.prototype;
        $confirm('系统检测到已登录其他账户，请刷新当前页面', '系统提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          showClose: false,
        }).then(function () {
          window.location.reload();
        });
        return Promise.reject();
      }
      const { token } = userInfo;
      if (token) {
        // 配置允许headers token
        config.headers.token = token;
        if (config.data) {
          config.data.token = token;
        } else if (config.params) {
          config.params.token = token;
        }
      }
    }
    return config;
  } else {
    Reflect.deleteProperty(params, 'skipAuth');
    return config;
  }
}, function (error) {
  //loading
  store.dispatch('setLoading', false);
  console.error(error);
  return Promise.reject('请求错误');
});
// Add a response interceptor
axios.interceptors.response.use(function (response) {
  //loading
  store.dispatch('setLoading', false);
  let { responseType } = response.request;
  if (responseType === 'arraybuffer') { // 导出文件流
    return Promise.resolve(response.data);
  }
  let res = response.data;
  if (typeof (res) === "string" && res.indexOf('code') > -1 && res.indexOf('result') > -1) {
    res = JSON.parse(res);
  }
  if (res.code === 200) {
    if (res.page) {
      return Promise.resolve({
        result: res.result,
        page: res.page,
      });
    } else {
      return Promise.resolve(res.result);
    }
  } else if (res.code === 1001) {// 1001 用户token过期需要重新登录
    if (!isAskUserGoLogin) {
      isAskUserGoLogin = true;
      let { $confirm } = Vue.prototype;
      $confirm('登录信息已过期,请您重新登录', '系统提示', {
        confirmButtonText: '确定',
        showCancelButton: false,
        showClose: false,
      }).then(function () {
        //清除用户信息
        store.dispatch('removeUser').then(function () {
          isAskUserGoLogin = false;
          router.push({
            name: "Login"
          });
        });
      });
      return Promise.reject(res);
    }
  } else {
    // 错误提醒
    handleError(res.msg || DICTS.code[res.code] || DICTS.msg.error.api);
    return Promise.reject(res);
  }
}, function (error) {
  //loading
  store.dispatch('setLoading', false);
  return Promise.reject(error);
});

//导出
export default axios;
