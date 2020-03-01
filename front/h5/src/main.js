import Vue from 'vue';
import { Cell, CellGroup, Field, Uploader, Icon, NoticeBar, Col, Row, Button, Dialog, Toast, Lazyload, Loading, RadioGroup, Radio, Tag } from 'vant';
import 'vant/lib/index.css';
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Field);
Vue.use(Uploader);
Vue.use(Icon);
Vue.use(NoticeBar);
Vue.use(Col);
Vue.use(Row);
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Toast);
Vue.use(Lazyload, {
  lazyComponent: true
});
Vue.use(Loading);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Tag);

import store from '@/store';
import router from '@/router';
import VARS from '@/configs/vars';
import axios from '@/commons/services/axios';
import filter from '@/commons/filters';
import { uploadFile } from '@/commons/services/upload';
import App from '@/App';

Vue.config.productionTip = false;
Vue.prototype.$vars = VARS;
Vue.prototype.$axios = axios;
Vue.prototype.$upload = uploadFile;

//filter
Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key]);
});

/* eslint-disable no-new */
new Vue({
  router,
  store,
  data: function () {
    return {
      loginUser: {},
      dicts: window.blogConfig.dicts,
      commonSize: "large",//通用尺寸
      commonFontSize: "font-16",//通用大小
    }
  },
  render: h => h(App)
}).$mount("#app");
