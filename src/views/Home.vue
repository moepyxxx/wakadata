<template>
  <div>
    <Header activeIndex="1" />
    <el-main>
      <SearchContents />
    </el-main>
  </div>
</template>

<script>
import SearchContents from '../components/SearchContents.vue'
import Header from '../components/Header.vue'

export default {
  components: {
    SearchContents,
    Header
  },
  data() {
    return {
      activeIndex: '1'
    };
  },
}
</script>

<style lang="scss">
@import "../assets/style.scss";
</style>