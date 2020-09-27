<template>
  <div>
    <el-form ref="form" label-width="120px">
      <el-tabs type="card">
        <el-tab-pane label="キーワードから自由に探す">
          <el-form-item label="キーワード">
            <el-input v-model="keyword"></el-input>
          </el-form-item>
          <el-form-item label="検索方法">
            <el-select v-model="checkKeywordMethod" placeholder="選択する">
              <el-option label="and検索" value="and"></el-option>
              <el-option label="or検索" value="or"></el-option>
              <el-option label="先頭一致" value="start"></el-option>
              <el-option label="後方一致" value="end"></el-option>
            </el-select>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="作者から探す">
          <el-form-item label="作者">
            <el-input v-model="checkAuthor"></el-input>
          </el-form-item>
          <el-form-item label="作者キーワード">
            <el-checkbox-group v-model="checkAuthorKeyword">
              <el-checkbox
                v-for="(authorKeyword, index) in authorKeywordList"
                :key="`author-${index}`"
                :label="authorKeyword"
                :value="authorKeyword"
                name="authorKeyword">
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="その他から探す">
          <el-form-item label="収録歌集">
            <el-checkbox-group v-model="checkBooks">
              <el-checkbox
                v-for="book in bookList"
                :key="`search-${book.identifykey}`"
                :label="book.name"
                :value="book.identifykey">
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="枕詞から探す">
            <el-checkbox-group v-model="checkMakura">
              <el-checkbox-button
                v-for="(makura, index) in makuraList"
                :key="`makura-${index}`"
                :id="`checkMakura-${index}`"
                :label="makura"
                :value="makura">
              </el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="部立から探す">
            <el-checkbox-group v-model="checkType">
              <el-checkbox-button label="雑歌" value="雑歌">雑歌</el-checkbox-button>
              <el-checkbox-button label="相聞歌" value="相聞歌">相聞歌</el-checkbox-button>
              <el-checkbox-button label="挽歌" value="挽歌">挽歌</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="季節から探す">
            <el-checkbox-group v-model="checkSeason">
              <el-checkbox-button label="春"></el-checkbox-button>
              <el-checkbox-button label="夏"></el-checkbox-button>
              <el-checkbox-button label="秋"></el-checkbox-button>
              <el-checkbox-button label="冬"></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <el-table
      :data="filterWakaList"
      stripe
      style="width: 100%">
      <el-table-column
        fixed
        prop="main"
        label="和歌"
        width="300">
      </el-table-column>
      <el-table-column
        prop="kana"
        label="和歌（かな）"
        width="200">
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者"
        width="100">
      </el-table-column>
      <el-table-column
        prop="authorKeyword"
        label="作者キーワード"
        width="130">
      </el-table-column>
      <el-table-column
        prop="book"
        label="収録歌集"
        width="100">
      </el-table-column>
      <el-table-column
        prop="type"
        label="部立"
        width="50">
      </el-table-column>
      <el-table-column
        prop="season"
        label="季節"
        width="50">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      checkBooks: [],
      checkSeason: [],
      checkType: [],
      keyword: "",
      checkAuthor: "",
      checkKeywordMethod: "and",
      checkAuthorKeyword: [],
      checkMakura: [],
    }
  },
  computed: {
    ...mapGetters(["wakaList", "bookList"]),
    correctArrayToList() {
      return function (array) {
        if (array.length > 0 && array[0] !== "") {
          let str = "";
          for (let i = 0; i < array.length; i++) {
            str = str + array[i];
            if (i !== array.length - 1) {
              str = str + '、';
            }
          }
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
        if (this.checkType.length && hitFlug) {
          hitFlug = this.checkInOrSearchMethod(this.checkType, waka.type);
        }

        // 季節チェック
        if (this.checkSeason.length && hitFlug) {
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
        if (this.checkMakura.length && hitFlug) {
          this.checkMakura.forEach((value) => {
            let isAnyMatch = false;
            for(const i in waka.makura) {
              if (waka.makura[i] === value) {
                isAnyMatch = true;
              }
            }
            if (!isAnyMatch) {
              hitFlug = false;
            }
          });
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

            // [todo] authorKeywordList との衝突避けたい
            // waka.authorKeyword = this.correctArrayToList(waka.authorKeyword);

            wakaList.push(waka);
          }
        }
      }
      return wakaList;
    }
  },
  methods: {
    ...mapActions(["getWakaList", "getBookList"]),
    correctArrayDelimiterBlank(keyword) {
      if (keyword.replaceAll("　", " ").match(/ /)) {
        return keyword.replaceAll("　", " ").split(' ');
      } else {
        return keyword.split();
      }
    },
    checkInOrSearchMethod(checkList, checkKey) {
      if (!Array.isArray(checkList)) {
        if(checkList === checkKey) {
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
  },
  created() {
    this.getWakaList();
    this.getBookList();
  }
}
</script>