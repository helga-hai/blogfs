<template lang="pug">
  // Component template
  .catalogue
    .catalogue__grid(v-if="view === 'grid'")
      Card.catalogue__item(
        v-for="article in items",
        :key="article.id",
        :data="article")
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue';
  import Card from '@/components/Card.vue';
  import type { ArticleInterface } from '@/interface/ArticleInterface';

  // Component definition
  export default Vue.extend({
    // Name of the component
    name: 'Catalogue',
    // Deps of the component
    components: {
      Card,
    },
    // Props of the component
    props: {
      view: {
        type: String as PropType<string>,
        default: 'grid',
      },
      items: {
        type: Array as PropType<ArticleInterface[]>,
        default: (): ArticleInterface[] => [],
      },
    },
  });
</script>

<style lang="scss" scoped>
  @use '~@stylize/sass-mixin' as *;

  .catalogue {
    &__grid {
      width: 100%;
      flex-wrap: wrap;
      @include flex(row stretch flex-start);
    }

    &__item {
      flex-basis: 100%;
      max-width: 100%;
      padding: $catalog-item__padding;

      @include media('>=xs') {
        flex: 1 0 50%;
        max-width: 50%;
      }

      @include media('>=sm') {
        flex-basis: 33%;
        max-width: 33%;
      }
    }
  }
</style>
