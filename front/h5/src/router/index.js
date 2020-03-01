import Vue from 'vue'
import Router from 'vue-router';
Vue.use(Router);

const router = new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: () => import('@/modules/index')
  }]
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
