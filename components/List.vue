<template lang="pug">
  // Component template
  .list(v-if="items && items.length")
    .list__grid
      CardHorizontal.list__item(
        v-for="article in items",
        :key="article.id",
        :data="article")
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue';
  import CardHorizontal from '@/components/CardHorizontal.vue';
  import type { ArticleInterface } from '@/interface/ArticleInterface';

  // Component definition
  export default Vue.extend({
    // Name of the component
    name: 'List',
    // Deps of the component
    components: {
      CardHorizontal,
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

  .list {
    &__grid {
      padding: $list-grid__padding;
      @include flex(column flex-start flex-start);
    }

    &__item {
      padding: $list-item__padding;
    }
  }
</style>
