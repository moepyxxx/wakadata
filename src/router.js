import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

const Home = () => import(/* webpackChunkName; "home" */ './views/Home.vue');
const Register = () => import(/* webpackChunkName; "register" */ './views/Register.vue');
const List = () => import(/* webpackChunkName; "list" */ './views/List.vue');
const Login = () => import(/* webpackChunkName; "Login" */ './views/Login.vue');
const RegisterUser = () => import(/* webpackChunkName; "RegisterUser" */ './views/RegisterUser.vue');

Vue.use(Router);

export default new Router ({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Home,
      beforeEnter(to, from, next) {
        if (store.getters.loginStatus) {
          next();
        } else {
          next('/login');
        }
      }
    },
    {
      path: "/register",
      components: {
        default: Register
      },
      beforeEnter(to, from, next) {
        if (store.getters.loginStatus) {
          next();
        } else {
          next('/login');
        }
      }
    },
    {
      path: "/list",
      components: {
        default: List
      },
      beforeEnter(to, from, next) {
        if (store.getters.loginStatus) {
          next();
        } else {
          next('/login');
        }
      }
    },
    {
      path: "/login",
      component: Login,
      beforeEnter(to, from, next) {
        if (store.getters.loginStatus) {
          next('/');
        } else {
          next();
        }
      }
    },
    {
      path: "/registeruser",
      component:  RegisterUser,
      beforeEnter(to, from, next) {
        if (store.getters.loginStatus) {
          next('/');
        } else {
          next();
        }
      }
    },
    {
      path: '*',
      redirect: "/"
    }
  ]
});