<template lang="pug">
  // Component template
  .post
    .post__content
      h1.post__title
        | {{ $route.params.slug }}
</template>

<script lang="ts">
  import Vue from 'vue';

  // Component definition
  export default Vue.extend({
    // Name of the component
    name: 'slug',
    //Computed hook of the component
    computed: {
      slug(): string {
        return this.$route.params.slug;
      },
    },
  });
</script>

<style lang="scss" scoped>
  .post {
    color: #ffffff;

    &__title {
      text-align: center;
      text-transform: uppercase;
    }
  }
</style>
