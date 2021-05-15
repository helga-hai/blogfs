<template lang='pug'>
  // Component template
  .post
    .post__content
      .post__title
        | {{ $route.params.slug }}
</template>

<script lang="ts">

  // interface Data {
  //   sidebar: boolean;
  //   classes: string[];
  // }

  export default {
    name: '_slug',

    // data: (): Data => ({
    //   slug: this.$route.params.slug,
    // }),
    computed: {
      slug(): string {
        console.log(his.$route)
        return this.$route.params.slug
      }
    }
  };
</script>

<style lang='scss' scoped>
  .post {
    color: #FFFFFF;

    &__title {
      text-align: center;
      text-transform: uppercase;
    }
  }
</style>
