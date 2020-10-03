<template>
  <div>
    <Header activeIndex="4" />
    <el-main>
      <el-row>
        <el-col :span="12" style="margin: 50px auto; float: none;">
          <p style="text-align: center;">ログイン</p>
          <el-form ref="form" label-width="120px">
            <el-form-item label="メールアドレス">
              <el-input v-model="email" type="text"></el-input>
            </el-form-item>
            <el-form-item label="パスワード">
              <el-input v-model="password" type="password"></el-input>
            </el-form-item>
            <el-button type="success" @click="loginUser">ログイン</el-button>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
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
    loginUser() {
      // let successFlug = false;
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
        returnSecureToken: true
      });
        // successFlug = true;
      // }
      // if (successFlug) {
      //   this.showSuccessMessage('ログイン');
      // } else {
      //   this.showErrorMessage('ログイン');
      // }
      this.email = "";
      this.password = "";
    },
    // showSuccessMessage(message) {
    //   this.$message({
    //     message: message + 'に成功しました。よかったね！',
    //     type: 'success'
    //   });
    // },
    // showErrorMessage(message) {
    //   this.$message({
    //     message: message + 'に失敗しました。残念、IDかパスワードが違ってなんかだめみたい！',
    //     type: 'error'
    //   });
    // },
  },
}
</script>