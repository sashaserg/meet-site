import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from "./views/Login/Login.vue";
import Registration from "./views/Registration.vue";
import testRegisterLogin from "./views/testRegisterLogin.vue";
import Users from "./views/Users.vue";
import UserProfile from "./views/UserProfile.vue";
import store from './store/index';
import {CURRENT_USER, GET_CURRENT_USER} from "./constants";
import Photo from "./views/Photo.vue";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Registration
    },
    {
      path: '/test',
      name: 'test',
      component: testRegisterLogin
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
      meta: { requiresAuth: true }
    },
    {
      path: '/user/:id',
      name: 'userProfile',
      component: UserProfile,
      meta: { requiresAuth: true }
    },
    {
      path: '/photo/:id',
      name: 'photo',
      component: Photo,
      meta: { requiresAuth: true }
    }
  ]
});

const authCurrentUserWatcher = new Promise( (resolve, reject) => {
  store.watch(() => store.getters[GET_CURRENT_USER], newState => {
    newState.currentUser ? resolve(newState.currentUser) : reject(store.state.error)
  })
});

router.beforeEach((to, from, next) => {
  if ( to.matched.some( record => record.meta.requiresAuth ) ) {
    if(!store.state.auth.user) {
      authCurrentUserWatcher
        .then(currentUser => {
          next();
        })
        .catch(() => {
          next({
            path: '/',
            query: {
              redirect: to.fullPath
            }
          })
        });
      store.dispatch(CURRENT_USER);
    } else
    next();
  } else
  next();
});

export default router;
