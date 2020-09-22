<template>
  <el-header>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1"><i class="el-icon-s-home"></i><a href="#">自由に和歌を探す</a></el-menu-item>
      <el-menu-item index="2"><i class="el-icon-s-promotion"></i><a href="#">すべての和歌を見る</a></el-menu-item>
      <el-menu-item index="3"><i class="el-icon-s-tools"></i><a href="#">新しい和歌を登録する</a></el-menu-item>
    </el-menu>
  </el-header>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1'
    };
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/style.scss";

a {
  text-decoration: none;
}

</style>