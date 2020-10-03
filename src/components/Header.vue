<template>
  <el-header>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <template v-if="loginStatus">
        <el-menu-item index="1"><i class="el-icon-s-home"></i><router-link to="/">和歌を探す</router-link></el-menu-item>
        <el-menu-item index="2"><i class="el-icon-s-promotion"></i><router-link to="/list">和歌一覧</router-link></el-menu-item>
        <el-menu-item index="3"><i class="el-icon-s-tools"></i><router-link to="/register">和歌を登録</router-link></el-menu-item>
        <el-menu-item index="6"><i class="el-icon-s-tools"></i><router-link to="/login" @click.native="logout()">ログアウト</router-link></el-menu-item>
      </template>
      <template v-else>
        <el-menu-item index="4"><i class="el-icon-s-tools"></i><router-link to="/login">ログイン</router-link></el-menu-item>
        <el-menu-item index="5"><i class="el-icon-s-tools"></i><router-link to="/registeruser">会員登録</router-link></el-menu-item>
      </template>
    </el-menu>
  </el-header>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: ['activeIndex'],
  computed: {
    ...mapGetters(['loginStatus'])
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/style.scss";

a {
  text-decoration: none;
}

</style>