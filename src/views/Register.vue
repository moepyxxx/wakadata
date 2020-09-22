<template>
  <div>
    <Header activeIndex="3" />
    <el-main>
      <Register />
    </el-main>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Register from '../components/Register.vue'

export default {
  components: {
    Register,
    Header
  },
  data() {
    return {
      activeIndex: '3'
    };
  },
}
</script>

<style lang="scss">
@import "../assets/style.scss";
</style>