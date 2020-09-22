<template>
  <div>
    <Header activeIndex="2" />
    <el-main>
      <AllList />
    </el-main>
  </div>
</template>

<script>
import AllList from '../components/AllList.vue'
import Header from '../components/Header.vue'

export default {
  components: {
    AllList,
    Header
  },
  data() {
    return {
      activeIndex: '2'
    };
  },
}
</script>

<style lang="scss">
@import "../assets/style.scss";
</style>