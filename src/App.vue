<template>
  <div id="app">
    <el-container>
      <Header />
      <el-main>
        <router-view />
      </el-main>
      <Footer />
    </el-container>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>