<template>
  <div>
    <Header activeIndex="5" />
    <el-main>
      <el-row>
        <el-col :span="12" style="margin: 50px auto; float: none;">
          <p style="text-align: center;">登録</p>
          <el-form ref="form" label-width="120px">
            <el-form-item label="メールアドレス">
              <el-input v-model="email" type="text"></el-input>
            </el-form-item>
            <el-form-item label="パスワード">
              <el-input v-model="password" type="password"></el-input>
            </el-form-item>
            <el-button type="warning" @click="registerUser">登録する</el-button>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
// import axios from 'axios'
import Header from '../components/Header.vue'

export default {
  data() {
    return {
      email: "",
      password: ""
    }
  },
  components: {
    Header
  },
  methods: {
    registerUser() {
      // let successFlug = false;
      // if (this.email && this.password) {
      //   axios.post(
      //     '/accounts:signUp?key=AIzaSyD6zvmsQ9hyXcyqip6HT7WMCSSFJ8Xkjkw',
      //     {
      //       email: this.email,
      //       password: this.password,
      //       returnSecureToken: true
      //     }
      //   );
      //   successFlug = true;
      // }
      // if (successFlug) {
      //   this.showSuccessMessage('ユーザー登録');
      // } else {
      //   this.showErrorMessage('ユーザー登録');
      // }
      this.$store.dispatch('register', {
        email: this.email,
        password: this.password,
        returnSecureToken: true
      });
      this.email = "";
      this.password = "";
    },
    showSuccessMessage(message) {
      this.$message({
        message: message + 'に成功しました。登録出来てよかったね！',
        type: 'success'
      });
    },
    showErrorMessage(message) {
      this.$message({
        message: message + 'に失敗しました。残念、なんかだめみたい！',
        type: 'error'
      });
    },
  },
}
</script>