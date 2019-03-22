import Vue from 'vue';
import Router from 'vue-router';
import routeRole from '../configs/route-role';
import authRoute from '../libs/auth-route';
import utils from '../utils';
import {LoadingBar, Notice} from 'iview';
import Login from '../views/login';

Vue.use(Router);

// login
const login = {
  name: 'login',
  path: '/login',
  alias: '',
  component: Login,
  meta: {notLayout: true}
};

// home
const home = {
  name: 'home',
  path: '/home',
  component: () => import(/* webpackChunkName: "home" */'../views/home'),
  meta: {notLayout: true}
};

// create an instance of vue-router
const router = new Router({
  mode: 'hash',
  routes: [
    login,
    home
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || {x: 0, y: 0};
  }
});

// before each
router.beforeEach((to, from, next) => {
  LoadingBar.start();

  // all routes
  const allRoutes = routeRole['whole'].routes;

  if (!allRoutes.includes(to.name)) {
    Notice.error({
      title: '网址错误',
      desc: '网址错误，请查证后重试'
    });

    LoadingBar.error();

    return;
  }

  // profile
  const profile = utils.sessionStorage.get('profile');
  // has permission of specified route name
  const hasPermission = authRoute(profile ? profile.role : '', to.name);

  if (!hasPermission) {
    Notice.error({
      title: '没有权限',
      desc: '没有权限，请登录后访问'
    });

    LoadingBar.error();

    return;
  }

  next();

});

// after each
router.afterEach((to, from) => {
  LoadingBar.finish();

});

export default router;

