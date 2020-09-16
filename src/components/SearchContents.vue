<template>
  <div class="c-search">
    <div class="c-search__ttl">
      <h1>日本の和歌検索データベース</h1>
    </div>
    <div class="c-search__contents">
      <div class="c-search__contents_word">
        <div class="c-search__contents_word_main">
          <p>語句を検索</p>
          <input type="text">
        </div>
        <div class="c-search__contents_word_sub">
          <p>チェックしてください</p>
          <div class="c-search__contents_word_sub_inner">
            <label for="wordoption1">先頭</label>
            <input type="checkbox" name="wordoption" id="wordoption1">
          </div>
          <div class="c-search__contents_word_sub_inner">
            <label for="wordoption2">初句</label>
            <input type="checkbox" name="wordoption" id="wordoption2">
          </div>
          <div class="c-search__contents_word_sub_inner">
            <label for="wordoption3">二句</label>
            <input type="checkbox" name="wordoption" id="wordoption3">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>