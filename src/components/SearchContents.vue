<template>
  <div>
    <div class="c-search">
      <div class="c-search__ttl">
        <h1>日本の和歌検索データベース</h1>
      </div>
      <div class="c-search__contents">
        <div class="c-search__contents_word">
          <div class="c-search__contents_word_main">
            <p>語句を検索</p>
            <input type="text" v-model="keyword">
          </div>
          <div class="search__contents_word_sub_range">
            <p>（検索について）</p>
            <div class="search__contents_word_sub_range_inner">
              <label for="and">and検索</label>
              <input type="radio" id="and" v-model="checkKeywordMethod" value="and" checked>
            </div>
            <div class="search__contents_word_sub_range_inner">
              <label for="or">or検索</label>
              <input type="radio" id="or" v-model="checkKeywordMethod" value="or">
            </div>
          </div>
          <div class="c-search__contents_word_sub">
            <p>チェックしてください</p>
            <div class="c-search__contents_word_sub_inner">
              <label for="wordoption1">先頭</label>
              <input type="checkbox" name="wordoption" id="wordoption1">
            </div>
            <div class="c-search__contents_word_sub_inner">
              <label for="wordoption2">初句</label>
              <input type="checkbox" name="wordoption" id="wordoption2">
            </div>
            <div class="c-search__contents_word_sub_inner">
              <label for="wordoption3">二句</label>
              <input type="checkbox" name="wordoption" id="wordoption3">
            </div>
          </div>
          <div class="c-search__contents_word_sub">
            <p>和歌集から探す</p>
            <div class="c-search__contents_word_sub_inner">
              <label for="万葉集">万葉集</label>
              <input type="checkbox" id="万葉集" v-model="checkBooks" value="万葉集">
            </div>
            <div class="c-search__contents_word_sub_inner">
              <label for="金槐和歌集">金槐和歌集</label>
              <input type="checkbox" id="金槐和歌集" v-model="checkBooks" value="金槐和歌集">
            </div>
            <div class="c-search__contents_word_sub_inner">
              <label for="山家集">山家集</label>
              <input type="checkbox" id="山家集" v-model="checkBooks" value="山家集">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="c-result">
      <div class="c-result__ttl">
        <h1>検索結果一覧</h1>
      </div>
      <div class="c-result__contents">
        <table>
          <thead>
            <tr>
              <th>和歌</th>
              <td>和歌（かな）</td>
              <td>収録歌集</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="waka in filterWakaList" :key="`result-${waka.id}`">
              <th>{{ waka.waka }}</th>
              <td>{{ waka.kana }}</td>
              <td>{{ waka.book }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  data() {
    return {
      checkBooks: [],
      keyword: "",
      checkKeywordMethod: "and",
      wakaList: []
    }
  },
  computed: {
    filterWakaList() {

      // すべてのデータを取得
      this.showAllWakaData();
      const wakaList = [];
      let searchKeyword = [];

      // キーワードを配列にする
      if (this.keyword) {
        if (this.keyword.replaceAll("　", " ").match(/ /)) {
          searchKeyword = this.keyword.replaceAll("　", " ").split(' ');
        } else {
          searchKeyword = this.keyword.split();
        }
      }

      // 検索開始
      for(const i in this.wakaList) {

        // 検索の結果フラグ
        let hitFlug = true;

        // 検索する和歌を取得（順番に取得している）
        const waka = this.wakaList[i];

        // 歌集チェック
        if (hitFlug) {
          if (this.checkBooks.length !== 0) {
            this.checkBooks.forEach((value) => {
              if(waka.book.indexOf(value) == -1) {
                hitFlug = false;
              }
            });
          }
        }

        // キーワードチェック
        if (this.keyword && hitFlug) {

          // and検索の場合
          if (this.checkKeywordMethod === "and") {
            searchKeyword.forEach((value) => {
              if (waka.waka.indexOf(value) == -1 && waka.kana.indexOf(value) == -1) {
                hitFlug = false;
              }
            });

          // or検索の場合
          } else {
            let isAnyMatch = false;
            searchKeyword.forEach((value) => {
              if(waka.waka.indexOf(value) !== -1 || waka.kana.indexOf(value) !== -1) {
                isAnyMatch = true;
              }
            });
            if (!isAnyMatch) {
              hitFlug = false;
            }
          }
        }

        // 最終結果
        if (hitFlug) {

          // 配列の重複チェックを行って格納
          let addFlug = this.checkDuplicate(wakaList, waka);
          if (addFlug) {
            wakaList.push(waka);
          }
        }
      }
      return wakaList;
    }
  },
  methods: {
    checkDuplicate(list, waka) {
      let addFlug = true;
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === waka.id) {
          addFlug = false;
        }
      }
      return addFlug;
    },
    showAllWakaData() {
      const database = firebase.database();
      const waka = "waka";
      database.ref(waka).on('value', (data) => {
        if (data) {
          const wakaList = data.val();
          let list = [];
          if(wakaList != null) {
            Object.keys(wakaList).forEach((val) => {
              wakaList[val].id = val;
              list.push(wakaList[val]);
            })
          }
          this.wakaList = wakaList;
        }
      });
    }
  }
}
</script>

<style>

</style>