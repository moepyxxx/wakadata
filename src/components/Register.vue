<template>
  <div>
    <div class="c-register">
      <div class="c-register__ttl">
        <h1>日本の和歌を登録する</h1>
      </div>
      <div class="c-register__contents">
        <div class="c-register__contents_inner">
          <label for="waka">和歌</label>
          <input type="text" name="waka" id="waka" v-model="waka">
        </div>
        <div class="c-register__contents_inner">
          <label for="kana">和歌（ひらがな）</label>
          <input type="text" name="kana" id="kana" v-model="kana">
        </div>
        <div class="c-register__contents_inner">
          <div class="c-radio">
            <label for="万葉集">万葉集</label>
            <input type="radio" id="万葉集" name="book" value="万葉集" v-model="book">
          </div>
          <div class="c-radio">
            <label for="金槐和歌集">金槐和歌集</label>
            <input type="radio" id="金槐和歌集" name="book" value="金槐和歌集" v-model="book">
          </div>
          <div class="c-radio">
            <label for="山家集">山家集</label>
            <input type="radio" id="山家集" name="book" value="山家集" v-model="book">
          </div>
        </div>
        <div class="c-register__contents_button">
          <button @click="registerWaka">登録する</button>
        </div>
      </div>
    </div>
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
              <td>収録歌集</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="waka in wakaList" :key="`list-${waka.id}`">
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
      waka : "",
      kana : "",
      book : "",
      wakaList : {}
    }
  },
  methods: {
    registerWaka() {
      const database = firebase.database();
      const waka = "waka";

      database.ref(waka).push({
        waka: this.waka,
        kana: this.kana,
        book: this.book
      });
      this.waka = "";
      this.kana = "";
      this.book = "";
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
          console.log(this.wakaList);
        }
      });
    }
  },
  created() {
    this.showAllWakaData();
  }
}
</script>

<style>

</style>