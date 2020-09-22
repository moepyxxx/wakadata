<template>
  <div>
    <el-form ref="form" label-width="120px">
      <el-form-item label="和歌【必須】">
        <el-input v-model="waka.main"></el-input>
      </el-form-item>
      <el-form-item label="かな【必須】">
        <el-input v-model="waka.kana"></el-input>
      </el-form-item>
      <el-form-item label="枕詞">
        <el-input v-model="waka.makura"></el-input>
      </el-form-item>
      <el-form-item label="作者【必須】">
        <span class="annotation">※不明の場合、詠み人知らずで統一すること。</span>
        <el-input v-model="waka.author"></el-input>
      </el-form-item>
      <el-form-item label="作者キーワード">
        <span class="annotation">※キーワードをカンマ区切りで入力。 例）宮廷歌人,天皇,貴族,防人 等</span>
        <el-input v-model="waka.authorKeyword"></el-input>
      </el-form-item>
      <el-form-item label="歌集【必須】">
        <el-radio-group v-model="waka.book">
          <el-radio
            v-for="book in bookList"
            :key="`search-${book.identifykey}`"
            :label="book.name"
            :value="book.identifykey">
          </el-radio>
        </el-radio-group>
        <el-row class="register-book">
          <p class="register-book_annotation">見当たらない場合は、新しい和歌集を追加しましょう →</p>
          <el-button type="primary" icon="el-icon-edit" circle @click="showBookRegisterMenu = true"></el-button>
        </el-row>
      </el-form-item>
      <el-form-item label="部立【必須】">
        <el-radio-group v-model="waka.type">
          <el-radio label="雑歌" value="雑歌">雑歌</el-radio>
          <el-radio label="相聞歌" value="相聞歌">相聞歌</el-radio>
          <el-radio label="挽歌" value="挽歌">挽歌</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="季節【必須】">
        <el-radio-group v-model="waka.season">
          <el-radio label="春"></el-radio>
          <el-radio label="夏"></el-radio>
          <el-radio label="秋"></el-radio>
          <el-radio label="冬"></el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="center register-submit">
        <p>必須項目はすべて入力されていないと登録されないので、気をつけて。</p>
        <el-button @click="showConfirmRemoveDraft = true">一度クリアする</el-button>
        <el-button type="primary" @click="registerWaka">和歌を登録する</el-button>
      </div>
    </el-form>
    <el-dialog
      title="新しい和歌集の登録"
      :visible.sync="showBookRegisterMenu"
      width="50%">
      <el-form ref="form" label-width="120px">
        <el-form-item label="和歌集の名前">
          <el-input v-model="bookToRegister.name"></el-input>
        </el-form-item>
        <el-form-item label="識別キー">
          <el-input v-model="bookToRegister.identifykey"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showBookRegisterMenu = false">やめる</el-button>
        <el-button type="primary" @click="registerBook">登録する</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="書きかけの内容をクリアして良いですか？"
      :visible.sync="showConfirmRemoveDraft"
      width="50%">
      <p>もう戻せないので、必ず確認してください。</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showConfirmRemoveDraft = false">やっぱやめる</el-button>
        <el-button type="warning" @click="removeDraft">クリアする</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      waka: {
        main : "",
        kana : "",
        author : "",
        authorKeyword : "",
        book : "",
        type : "",
        season : "",
        makura : ""
      },
      showBookRegisterMenu : false,
      showConfirmRemoveDraft : false,
      bookToRegister: {
        name : "",
        identifykey : ""
      },
      wakaList : {},
      bookList : {},
    }
  },
  methods: {
    registerWaka() {
      const database = firebase.database();
      const waka = "waka";

      let successFlug = false;

      if (
        this.waka.main &&
        this.waka.kana &&
        this.waka.author &&
        this.waka.book &&
        this.waka.type &&
        this.waka.season
      ) {

        database.ref(waka).push({
          main: this.waka.main,
          kana: this.waka.kana,
          author: this.waka.author,
          authorKeyword: this.waka.authorKeyword.split(','),
          book: this.waka.book,
          type: this.waka.type,
          season: this.waka.season,
          makura: this.waka.makura.split(','),
        });
        this.waka.main = "";
        this.waka.kana = "";
        this.waka.author = "";
        this.waka.authorKeyword = "";
        this.waka.book = "";
        this.waka.type = "";
        this.waka.season = "";
        this.waka.makura = "";

        successFlug = true;

      }

      if (successFlug) {
        this.showSuccessMessage('和歌の登録');
      } else {
        this.showErrorMessage('和歌の登録');
      }
    },
    removeDraft() {
      this.waka.main = "";
      this.waka.kana = "";
      this.waka.author = "";
      this.waka.authorKeyword = "";
      this.waka.book = "";
      this.waka.type = "";
      this.waka.season = "";
      this.waka.makura = "";

      this.showConfirmRemoveDraft = false;

      this.showWarningMessage('すべての下書きをクリアしました。');
    },
    getAllBookData() {
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
    registerBook() {
      let successFlug = false;
      if (this.bookToRegister.name && this.bookToRegister.identifykey) {
        const database = firebase.database();
        const book = "book";
        database.ref(book).push({
          name: this.bookToRegister.name,
          identifykey: this.bookToRegister.identifykey
        });
        successFlug = true;
      }
      this.bookToRegister.name = "";
      this.bookToRegister.identifykey = "";
      this.showBookRegisterMenu = false;

      if (successFlug) {
        this.showSuccessMessage('本の登録');
      } else {
        this.showErrorMessage('本の登録');
      }
    },
    showSuccessMessage(message) {
      this.$message({
        message: message + 'に成功しました。よかったね！',
        type: 'success'
      });
    },
    showErrorMessage(message) {
      this.$message({
        message: message + 'に失敗しました。残念、必須は入力してね！',
        type: 'error'
      });
    },
    showWarningMessage(message) {
      this.$message({
        message: message,
        type: 'warning'
      });
    },
  },
  created() {
    this.getAllBookData();
  }
}
</script>

<style>

</style>