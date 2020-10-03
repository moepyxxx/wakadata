import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import router from './router'
import store from "./store"
import axios from 'axios'

Vue.use(ElementUI);
Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyD6zvmsQ9hyXcyqip6HT7WMCSSFJ8Xkjkw",
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: "https://wakadata-bbca9.firebaseio.com",
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID
};
firebase.initializeApp(firebaseConfig);

axios.defaults.baseURL =
  'https://identitytoolkit.googleapis.com/v1';

store.dispatch('autoLogin');

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
