<template lang="pug">
  // Component template
  aside.bar(data-sidebar)
    .bar__content
      img.bar__image(
        src="https://www.next-t.co.kr/public/uploads/7b7f7e2138e29e598cd0cdf2c85ea08d.jpg",
        draggable="false",
        data-preview-image)
      .bar__news(v-if="news")
        .bar__news-title
          | {{ $t('bar.news.title') }}
        BaseBlock.bar__news-content(
          cutSize="medium",
          variant="primary",
          :cutSide="['top-right', 'bottom-left']")
          List(:items="news")
</template>

<script lang="ts">
  import { Vue, Component } from 'nuxt-property-decorator';
  import BaseBlock from '@/components/base/BaseBlock.vue';
  import List from '@/components/List.vue';

  @Component({
    // Name of the component
    name: 'TheBar',
    // Deps of the component
    components: { BaseBlock, List },
  })
  export default class TheBarClass extends Vue {
    $store!: any;
    $route!: any;

    get news() {
      //const isAuthor = this.$route.path.includes('/author/');
      return this.$store.state.content.isCategory
        ? this.$store.state.content.news[this.$route.params.slug]
        : this.$store.state.content.news.all;
    }
    mounted(){
      console.log(this.news)
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@stylize/sass-mixin';

  .bar {
    width: $bar__width;

    &__content {
      padding: $bar__padding;
    }

    &__image {
      width: 100%;
    }

    &__news {
      margin: $bar-news__margin;

      &-title {
        text-transform: uppercase;
        margin: $bar-title__margin;
      }
    }
  }
</style>
