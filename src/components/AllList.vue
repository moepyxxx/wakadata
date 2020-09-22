<template>
  <div>
    <el-table
      :data="allWakaList"
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
import firebase from 'firebase'

export default {
  data() {
    return {
      wakaList: [],
    }
  },
  computed: {
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
    allWakaList() {

      const wakaList = [];

      for (const i in this.wakaList) {
        const waka = this.wakaList[i];
        waka.authorKeyword = this.correctArrayToList(waka.authorKeyword);
        wakaList.push(waka);
      }
      return wakaList;
    },
  },
  methods: {
    async getAllWakaData() {
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
  },
  created() {
    this.getAllWakaData();
  }
}
</script>

<style>

</style>