import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'

Vue.use(ElementUI);
Vue.config.productionTip = false

// const firebaseConfig = {
//   apiKey: process.env.VUE_APP_API_KEY,
//   authDomain: process.env.VUE_APP_AUTH_DOMAIN,
//   databaseURL: process.env.VUE_APP_DATABASE_URL,
//   projectId: process.env.VUE_APP_PROJECT_ID,
//   storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
//   appId: process.env.VUE_APP_APP_ID
// };
// firebase.initializeApp(firebaseConfig);

var firebaseConfig = {
  apiKey: "AIzaSyD6zvmsQ9hyXcyqip6HT7WMCSSFJ8Xkjkw",
  authDomain: "wakadata-bbca9.firebaseapp.com",
  databaseURL: "https://wakadata-bbca9.firebaseio.com",
  projectId: "wakadata-bbca9",
  storageBucket: "wakadata-bbca9.appspot.com",
  messagingSenderId: "850442454120",
  appId: "1:850442454120:web:75bb2db9a825858889a7dd"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  render: h => h(App),
}).$mount('#app')
