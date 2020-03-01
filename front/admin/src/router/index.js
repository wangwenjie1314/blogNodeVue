import Vue from 'vue'
import Router from 'vue-router';
import axios from 'axios';
import store from '@/store';
import { cookies } from "@/commons/services/cache";

Vue.use(Router);

const router = new Router({
  routes: [{
    path: '/',
    name: 'Login',
    component: () => import('@/modules/uc/login'),
    meta: {
      breadcrumb: "登录",
      title: "登录",
    },
  }, {
    path: '/dash',
    name: 'Dash',
    component: () => import('@/modules/dash/views/index'),
    meta: {
      breadcrumb: "首页",
    }
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/modules/404'),
    meta: {
      breadcrumb: '404',
    },
  }]
});

/**
 * 全局钩子
 */
router.beforeEach((to, from, next) => {
  //切换路由取消ajax请求
  const CancelToken = axios.CancelToken;
  store.state.source.cancel && store.state.source.cancel();
  store.state.source = CancelToken.source();
  const userId = cookies.get("cmsBlogUid");
  let { userInfo: loginUser } = store.getters;
  if ((!userId || !loginUser) && to.name != 'Login' && to.name != 'NotFound') {
    Vue.prototype.$confirm('系统检测到账户已退出，即将跳转到登录页', '系统提示', {
      confirmButtonText: '确定',
      showCancelButton: false,
      showClose: false,
    }).then(function () {
      next({
        name: 'Login',
        query: {
          redirect: to.fullPath,
        },
      });
    });
  } else if (userId && loginUser && to.name == 'Login') {
    next({
      name: 'Dash'
    });
  } else if (to.meta && to.meta.hide) {
    Vue.prototype.$notify.error({
      title: '系统提示',
      message: '无权访问'
    });
    next(false);
  } else {
    next();
  }
});

/**
 * 全局后置钩子
 */
router.afterEach(() => {
  setTimeout(function () {
    window.scrollTo(0, 0);
  }, 100);
});

export default router;
