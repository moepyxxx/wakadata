import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    wakaList: null,
    bookList: null,
    loginStatus: false,
    idToken: null,
  },
  getters: {
    wakaList: state => state.wakaList,
    bookList: state => state.bookList,
    loginStatus: state => state.loginStatus,
    idToken: state => state.idToken,
  },
  mutations: {
    getWakaList(state, wakaList) {
      state.wakaList = wakaList;
    },
    getBookList(state, bookList) {
      state.bookList = bookList;
    },
    loginStatus(state, loginStatus) {
      state.loginStatus = loginStatus;
    },
    idToken(state, idToken) {
      state.idToken = idToken;
    },
  },
  actions: {
    fetchWakaList() {
      return new Promise((resolve) => {
        const database = firebase.database();
        const waka = "waka";
        let wakaList;
        database.ref(waka).on('value', (data) => {
          if (data) {
            wakaList = data.val();
            let list = [];
            if (wakaList !== null) {
              Object.keys(wakaList).forEach((val) => {
                wakaList[val].id = val;
                list.push(wakaList[val]);
              })
            }
            resolve(wakaList);
          }
        });
      });
    },
    fetchBookList() {
      return new Promise((resolve) => {
        const database = firebase.database();
        const book = "book";
        database.ref(book).on('value', (data) => {
          if (data) {
            const bookList = data.val();
            let list = [];
            if (bookList != null) {
              Object.keys(bookList).forEach((val) => {
                bookList[val].id = val;
                list.push(bookList[val]);
              })
            }
            resolve(bookList);
          }
        });
      });
    },
    async getWakaList({ dispatch, commit }) {
      commit("getWakaList", await dispatch("fetchWakaList"));
    },
    async getBookList({ dispatch, commit }) {
      commit("getBookList", await dispatch("fetchBookList"));
    },
    getIdToken({ commit }) {
      firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
        commit('idToken', idToken);
        localStorage.setItem('idToken', idToken);
      });
    },
    autoLogin({ commit, dispatch }) {
      const idToken = localStorage.getItem('idToken');
      if (!idToken) return;
      const now = new Date();
      const expiryTimeMs = localStorage.getItem('expiryTimeMs');
      const isExpired = now.getTime() >= expiryTimeMs;
      if (isExpired) {
        dispatch('logout');
      } else {
        commit('idToken', idToken);
        commit('loginStatus', true);
      }
    },
    register({ dispatch }, authData) {
      firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password).
      then(() => {
        dispatch('processLoginState');
      }).
      then(() => {
        router.push('/');
      });
    },
    login({ dispatch }, authData) {
      firebase.auth().signInWithEmailAndPassword(authData.email, authData.password).
      then(() => {
        dispatch('processLoginState');
      }).
      then(() => {
        router.push('/');
      });
    },
    processLoginState({ commit, dispatch} ) {
      dispatch('getIdToken');
      commit('loginStatus', true);

      const now = new Date();
      const expiryTimeMs = now.getTime() + 3600 * 1000;
      localStorage.setItem('expiryTimeMs', expiryTimeMs);
    },
    async setLocalStorageToIdToken({ dispatch, commit }) {
      commit("setLocalStorageToIdToken", await dispatch('login'));
    },
    logout({ commit }) {
      firebase.auth().onAuthStateChanged( () => {
        firebase.auth().signOut().then(() => {
          commit('loginStatus', false);
          commit('idToken', null);
          localStorage.removeItem("idToken");
          localStorage.removeItem("expiryTimeMs");
          router.replace('/login');
        });
      });
    }
  }
});
