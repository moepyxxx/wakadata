<template>
  <SearchContents />
</template>

<script>
import SearchContents from '../components/SearchContents.vue'

export default {
  components: {
    SearchContents
  }
}
</script>

<style lang="scss">
@import "../assets/style.scss";

.el-container {
  max-width: 1000px;
  padding: 50px;
  margin: 0 auto;
  display: block;
}

</style>