<template>
  <div>
    <hr>
    <div class="c-register">
      <div class="c-register__ttl">
        <h1>日本の和歌を登録する</h1>
      </div>
      <div class="c-register__contents">
        <div class="c-register__contents_inner">
          <label for="main">和歌</label>
          <input type="text" name="main" id="main" v-model="waka.main">
        </div>
        <div class="c-register__contents_inner">
          <label for="kana">和歌（ひらがな）</label>
          <input type="text" name="kana" id="kana" v-model="waka.kana">
        </div>
        <div class="c-register__contents_inner">
          <label for="author">作者</label>
          <input type="text" name="author" id="author" v-model="waka.author">
        </div>
        <div class="c-register__contents_inner">
          <label for="authorKeyword">作者キーワード ※カンマ区切りで入力。</label>
          <textarea name="authorKeyword" id="authorKeyword" cols="30" rows="10" v-model="waka.authorKeyword"></textarea>
        </div>
        <div class="c-register__contents_inner">
          <label for="makura">含まれる枕詞 ※カンマ区切りで入力。</label>
          <textarea name="makura" id="makura" cols="30" rows="10" v-model="waka.makura"></textarea>
        </div>
        <p>収録されている歌集</p>
        <div class="c-register__contents_inner" v-for="book in bookList" :key="book.id">
          <div class="c-radio">
            <label :for="book.identifykey">{{ book.name }}</label>
            <input type="radio" :id="book.identifykey" :name="book.name" :value="book.name" v-model="waka.book">
          </div>
        </div>
        <div class="c-register__contents_inner">
          <p>部立</p>
          <div class="c-radio">
            <label for="zouka">雑歌</label>
            <input type="radio" id="zouka" value="雑歌" v-model="waka.type">
          </div>
          <div class="c-radio">
            <label for="soumonka">相聞歌</label>
            <input type="radio" id="soumonka" value="相聞歌" v-model="waka.type">
          </div>
          <div class="c-radio">
            <label for="banka">挽歌</label>
            <input type="radio" id="banka" value="挽歌" v-model="waka.type">
          </div>
        </div>
        <div class="c-register__contents_inner">
          <p>季節</p>
          <div class="c-radio">
            <label for="spring">春</label>
            <input type="radio" id="spring" value="春" v-model="waka.season">
          </div>
          <div class="c-radio">
            <label for="summer">夏</label>
            <input type="radio" id="summer" value="夏" v-model="waka.season">
          </div>
          <div class="c-radio">
            <label for="authmn">秋</label>
            <input type="radio" id="authmn" value="秋" v-model="waka.season">
          </div>
          <div class="c-radio">
            <label for="winter">冬</label>
            <input type="radio" id="winter" value="冬" v-model="waka.season">
          </div>
        </div>
        <div class="c-register__contents_button">
          <button @click="registerWaka">登録する</button>
        </div>
      </div>
    </div>
    <hr>
    <div class="c-registerbook">
      <div class="c-registerbook__ttl">
        <h1>歌集を登録する</h1>
      </div>
      <div class="c-registerbook__contents">
        <div class="c-registerbook__contents_inner">
          <label for="registerBookName">歌集の名前を入力してください</label>
          <input type="text" name="registerBookName" id="registerBookName" v-model="bookToRegister.name">
        </div>
        <div class="c-registerbook__contents_inner">
          <label for="registerBookKey">歌集の名前（英語：クラス・id識別のため）を入力してください</label>
          <input type="text" name="registerBookKey" id="registerBookKey" v-model="bookToRegister.identifykey">
        </div>
        <div class="c-registerbook__contents_button">
          <button @click="registerBook">登録する</button>
        </div>
      </div>
    </div>
    <hr>
    <div class="c-wakalist">
      <div class="c-wakalist__ttl">
        <h1>すべての登録された和歌</h1>
      </div>
      <div class="c-wakalist__contents">
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
            <tr v-for="waka in wakaList" :key="`list-${waka.id}`">
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
      waka: {
        main : "",
        kana : "",
        author : "",
        authorKeyword : [],
        book : "",
        type : "",
        season : "",
        makura : ""
      },
      bookToRegister: {
        name : "",
        identifykey : ""
      },
      bookList : {},
      wakaList : {}
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
    }
  },
  methods: {
    registerWaka() {
      const database = firebase.database();
      const waka = "waka";

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
    registerBook() {
      const database = firebase.database();
      const book = "book";
      database.ref(book).push({
        name: this.bookToRegister.name,
        identifykey: this.bookToRegister.identifykey
      });
      this.bookToRegister.name = "";
      this.bookToRegister.identifykey = "";
    }
  },
  created() {
    this.showAllWakaData();
    this.showAllBookData();
  }
}
</script>

<style>

</style>