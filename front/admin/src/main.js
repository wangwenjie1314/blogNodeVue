import Vue from 'vue';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导航面包屑
import VueBreadcrumbs from 'vue-2-breadcrumbs';
Vue.use(VueBreadcrumbs);

// echarts图表
import ECharts from 'vue-echarts';
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/grid";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";
Vue.component('v-chart', ECharts);

// vuex
import store from '@/store';
// vue-router
import router from '@/router';
// axios
import axios from '@/commons/services/axios';
// 通用字典
import DICTS from '@/commons/configs/dicts';
// 通用文件上传
import { uploadFile } from '@/commons/services/upload';
// 通用树状tree
import { handleTreeV2 } from "@/commons/services/tree";
// 通用处理
import { itemChangeUpdate, textareaFilter, handleError, handlePageAndList } from "@/commons/services/index";
// filters
import filter from '@/commons/filters';
import App from '@/App';

Vue.config.productionTip = false;
// 将其放在Vue根属性下 方便直接调用
Vue.prototype.$dicts = DICTS;
Vue.prototype.$axios = axios;
Vue.prototype.$upload = uploadFile;
Vue.prototype.$tree = handleTreeV2;
Vue.prototype.$itemChangeUpdate = itemChangeUpdate;
Vue.prototype.textareaFilter = textareaFilter;
Vue.prototype.$handleError = handleError;
Vue.prototype.$handlePageAndList = handlePageAndList;

//filter
Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key]);
});

/* eslint-disable no-new */
new Vue({
  router,
  store,
  data: function () {
    // 定义$root下数据
    return {
      loginUser: {},
      commonSize: "medium",// 通用尺寸
      commonFontSize: "font-14",// 通用大小
    }
  },
  render: h => h(App)
}).$mount("#app");