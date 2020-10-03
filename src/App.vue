<template>
  <div id="app">
    <el-container>
      <router-view />
      <Footer />
    </el-container>
  </div>
</template>

<script>
import Footer from './components/Footer.vue'
// import axios from './axios-auth';

export default {
  name: 'App',
  components: {
    Footer
  }
}
</script>

<style lang="scss">
@import "assets/style.scss";
</style>