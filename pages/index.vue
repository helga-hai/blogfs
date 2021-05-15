<template lang="pug">
  // Component template
  .main
    .main__content
      h1.title BLOG
      .main__links
        NuxtLink(to="/post1") post1
        NuxtLink(to="/post2") post2
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({});
</script>

<style lang="scss" scoped>
  .main {
    color: #FFFFFF;
    text-align: center;
  }
</style>
