import Vue from 'vue';
import Router from 'vue-router';

const Home = () => import(/* webpackChunkName; "home" */ './views/Home.vue');
const Register = () => import(/* webpackChunkName; "register" */ './views/Register.vue');
const List = () => import(/* webpackChunkName; "list" */ './views/List.vue');

Vue.use(Router);

export default new Router ({
  mode: "history",
  routes: [
    {
      path: "/",
      components: {
        default: Home
      }
    },
    {
      path: "/register",
      components: {
        default: Register
      }
    },
    {
      path: "/list",
      components: {
        default: List
      },
    },
    // {
    //   path: "/vegetable/:name",
    //   component: VegetableDetail 
    // },
    {
      path: '*',
      redirect: "/"
    }
  ]
});