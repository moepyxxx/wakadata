import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    wakaList: null,
    bookList: null,
  },
  getters: {
    wakaList: state => state.wakaList,
    bookList: state => state.bookList
  },
  mutations: {
    getWakaList(state, wakaList) {
      state.wakaList = wakaList;
    },
    getBookList(state, bookList) {
      state.bookList = bookList;
    }
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
    }
  }
});
