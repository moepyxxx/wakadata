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
            <div class="search__contents_word_sub_range_inner">
              <label for="start">最初</label>
              <input type="radio" id="start" v-model="checkKeywordMethod" value="start">
            </div>
            <div class="search__contents_word_sub_range_inner">
              <label for="end">最後</label>
              <input type="radio" id="end" v-model="checkKeywordMethod" value="end">
            </div>
          </div>
          <div class="c-search__contents_word_main">
            <p>作者から検索</p>
            <input type="text" v-model="checkAuthor">
          </div>
          <p>和歌集から探す</p>
          <div class="c-search__contents_word_sub" v-for="book in bookList" :key="`search-${book.id}`">
            <div class="c-search__contents_word_sub_inner">
              <label :for="book.identifykey">{{ book.name }}</label>
              <input type="checkbox" :id="book.identifykey" v-model="checkBooks" :value="book.name">
            </div>
          </div>
          <p>作者キーワードから探す</p>
          <div class="c-search__contents_word_sub" v-for="(authorKeyword, index) in authorKeywordList" :key="`author-${index}`">
            <div class="c-radio">
              <label :for="`checkAuthorKeyword-${index}`">{{ authorKeyword }}</label>
              <input type="checkbox" :id="`checkAuthorKeyword-${index}`" :value="authorKeyword" v-model="checkAuthorKeyword">
            </div>
          </div>
          <p>枕詞から探す</p>
          <div class="c-search__contents_word_sub" v-for="(makura, index) in makuraList" :key="`makura-${index}`">
            <div class="c-radio">
              <label :for="`checkMakura-${index}`">{{ makura }}</label>
              <input type="radio" :id="`checkMakura-${index}`" :value="makura" v-model="checkMakura">
            </div>
          </div>
          <p>部立から探す</p>
          <div class="c-search__contents_word_sub">
            <div class="c-radio">
              <label for="zouka">雑歌</label>
              <input type="radio" id="zouka" value="雑歌" v-model="checkType">
            </div>
            <div class="c-radio">
              <label for="soumonka">相聞歌</label>
              <input type="radio" id="soumonka" value="相聞歌" v-model="checkType">
            </div>
            <div class="c-radio">
              <label for="banka">挽歌</label>
              <input type="radio" id="banka" value="挽歌" v-model="checkType">
            </div>
          </div>
          <p>季節から探す</p>
          <div class="c-search__contents_word_sub">
            <div class="c-radio">
              <label for="spring">春</label>
              <input type="radio" id="spring" value="春" v-model="checkSeason">
            </div>
            <div class="c-radio">
              <label for="summer">夏</label>
              <input type="radio" id="summer" value="夏" v-model="checkSeason">
            </div>
            <div class="c-radio">
              <label for="authmn">秋</label>
              <input type="radio" id="authmn" value="秋" v-model="checkSeason">
            </div>
            <div class="c-radio">
              <label for="winter">冬</label>
              <input type="radio" id="winter" value="冬" v-model="checkSeason">
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr>
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
              <td>作者</td>
              <td>作者キーワード</td>
              <td>収録歌集</td>
              <td>部立</td>
              <td>季節</td>
              <td>枕詞</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="waka in filterWakaList" :key="`result-${waka.id}`">
              <th>{{ waka.main }}</th>
              <td>{{ waka.kana }}</td>
              <td>{{ waka.author }}</td>
              <td>{{ correctArrayToList(waka.authorKeyword) }}</td>
              <td>{{ waka.book }}</td>
              <td>{{ waka.type }}</td>
              <td>{{ waka.season }}</td>
              <td>{{ correctArrayToList(waka.makura) }}</td>
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
      checkSeason: "",
      checkType: "",
      keyword: "",
      checkAuthor: "",
      checkKeywordMethod: "and",
      checkAuthorKeyword: [],
      checkMakura: "",
      wakaList: [],
      bookList: {},
    }
  },
  computed: {
    correctArrayToList() {
      return function (array) {
        if (array.length > 0 && array[0] !== "") {
          let str = "";
          array.forEach((value) => {
            str = str + value + '、';
          });
          return str;
        } else {
          return '';
        }
      }
    },
    authorKeywordList() {
      let authorKeywordList = [];
      for (const i in this.wakaList) {
        if (this.wakaList[i].authorKeyword.length > 0 && this.wakaList[i].authorKeyword[0] !== "") {
          for (const j in this.wakaList[i].authorKeyword) {
            authorKeywordList.push(this.wakaList[i].authorKeyword[j]);
          }
        }
      }
      // 重複削除
      authorKeywordList = authorKeywordList.filter((val, index, self) => {
        return self.indexOf(val) === index;
      });
      return authorKeywordList;
    },
    makuraList() {
      let makurakotobaList = [];
      for (const i in this.wakaList) {
        if (this.wakaList[i].makura.length > 0 && this.wakaList[i].makura[0] !== "") {
          for (const j in this.wakaList[i].makura) {
            makurakotobaList.push(this.wakaList[i].makura[j]);
          }
        }
      }
      // 重複削除
      makurakotobaList = makurakotobaList.filter((val, index, self) => {
        return self.indexOf(val) === index;
      });
      return makurakotobaList;
    },
    filterWakaList() {

      // すべてのデータを取得
      this.showAllWakaData();
      const wakaList = [];

      // 検索開始
      for (const i in this.wakaList) {

        // 検索の結果フラグ
        let hitFlug = true;

        // 検索する和歌を取得（順番に取得している）
        const waka = this.wakaList[i];

        // 歌集チェック
        if (this.checkBooks.length && hitFlug) {
          hitFlug = this.checkInOrSearchMethod(this.checkBooks, waka.book);
        }

        // 部立チェック
        if (this.checkType && hitFlug) {
          hitFlug = this.checkInOrSearchMethod(this.checkType, waka.type);
        }

        // 季節チェック
        if (this.checkSeason && hitFlug) {
          hitFlug = this.checkInOrSearchMethod(this.checkSeason, waka.season);
        }

        // 作者チェック
        if (this.checkAuthor && hitFlug) {
          if (waka.author.indexOf(this.checkAuthor) == -1) {
            hitFlug = false;
          }
        }

        // 作者キーワードチェック
        if (this.checkAuthorKeyword && hitFlug) {
          this.checkAuthorKeyword.forEach((value) => {
            let isAnyMatch = false;
            for(const i in waka.authorKeyword) {
              if (waka.authorKeyword[i] === value) {
                isAnyMatch = true;
              }
            }
            if (!isAnyMatch) {
              hitFlug = false;
            }
          });
        }

        // 枕詞チェック
        if (this.checkMakura && hitFlug) {
          let isAnyMatch = false;
          for(const i in waka.makura) {
            if (waka.makura[i] === this.checkMakura) {
              isAnyMatch = true;
            }
          }
          if (!isAnyMatch) {
            hitFlug = false;
          }
        }

        // キーワードチェック
        if (this.keyword && hitFlug) {

          // and検索の場合
          if (this.checkKeywordMethod === "and") {

            let searchKeyword = this.correctArrayDelimiterBlank(this.keyword);
            
            searchKeyword.forEach((value) => {
              if (waka.main.indexOf(value) == -1 && waka.kana.indexOf(value) == -1) {
                hitFlug = false;
              }
            });

          // or検索の場合
          } else if (this.checkKeywordMethod === "or") {

            let searchKeyword = this.correctArrayDelimiterBlank(this.keyword);

            let isAnyMatch = false;
            searchKeyword.forEach((value) => {
              if(waka.main.indexOf(value) !== -1 || waka.kana.indexOf(value) !== -1) {
                isAnyMatch = true;
              }
            });
            if (!isAnyMatch) {
              hitFlug = false;
            }

          // 先頭一致検索の場合
          } else if (this.checkKeywordMethod === "start") {
            let searchKeyword = this.keyword;
            if (!waka.main.startsWith(searchKeyword) && !waka.kana.startsWith(searchKeyword)) {
              hitFlug = false;
            }

          // 後方一致検索の場合
          } else if (this.checkKeywordMethod === "end") {
            let searchKeyword = this.keyword;
            if (!waka.main.endsWith(searchKeyword) && !waka.kana.endsWith(searchKeyword)) {
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
    correctArrayDelimiterBlank(keyword) {
      if (keyword.replaceAll("　", " ").match(/ /)) {
        return keyword.replaceAll("　", " ").split(' ');
      } else {
        return keyword.split();
      }
    },
    checkInOrSearchMethod(checkList, checkKey) {
      if (!Array.isArray(checkList)) {
        if(checkList.indexOf(checkKey) !== -1) {
          return true;
        } else {
          return false;
        }
      } else if (checkList.length !== 0) {
        let isAnyMatch = false;
        checkList.forEach((value) => {
          if(checkKey.indexOf(value) !== -1) {
            isAnyMatch = true;
          }
        });
        if (!isAnyMatch) {
          return false;
        } else {
          return true;
        }
      }
    },
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
    },
    showAllBookData() {
      const database = firebase.database();
      const book = "book";
      database.ref(book).on('value', (data) => {
        if (data) {
          const bookList = data.val();
          let list = [];
          if(bookList != null) {
            Object.keys(bookList).forEach((val) => {
              bookList[val].id = val;
              list.push(bookList[val]);
            })
          }
          this.bookList = bookList;
        }
      });
    },
  },
  created() {
    this.showAllBookData();
  }
}
</script>

<style>

</style>