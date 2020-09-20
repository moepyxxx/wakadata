<template>
  <div id="app">
    <SearchContents />
    <Register />
  </div>
</template>

<script>
import Register from './components/Register.vue'
import SearchContents from './components/SearchContents.vue'

export default {
  name: 'App',
  components: {
    SearchContents,
    Register
  }
}
</script>

<style>

</style>
