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
            <tr v-for="waka in filterWakaList" :key="waka.id">
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
      wakaList: ""
    }
  },
  computed: {
    filterWakaList() {
      this.showAllWakaData();
      const wakaList = [];
      for(const i in this.wakaList) {
        const waka = this.wakaList[i];
        if (this.checkBooks) {
          this.checkBooks.forEach((value) => {
            if(waka.book.indexOf(value) !== -1) {
              wakaList.push(waka);
            }
          });
        }
        if (this.keyword) {
          if(waka.waka.indexOf(this.keyword) !== -1 || waka.kana.indexOf(this.keyword) !== -1) {
            wakaList.push(waka);
          }
        }
      }
      return wakaList;
    }
  },
  methods: {
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