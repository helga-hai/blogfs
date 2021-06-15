<template lang="pug">
  //- Template for Vue component.
  .search-result(data-search-result)
    .search-result__total(
      v-if="total > 0",
      data-search-result-total)
      | {{ $t('search.found', [total]) }}

    .search-result__empty(
      v-if="total === 0",
      data-search-result-empty)
      .search-result__empty-title
        | {{ $t('search.empty.title') }}
      .search-result__empty-note
        | {{ $t('search.empty.note') }}

    .search-result__found(
      v-if="total > 0",
      data-search-result-found)
      BaseScroll.search-result__list(data-search-result-list)
        CardHorizontal.search-result__item(
          v-for="item in result",
          :key="item.id",
          :data="item",
          data-search-result-item)
        slot(name="infinite")
</template>

<script lang="ts">
  import { PropType } from 'vue';
  import BaseScroll from '@/components/base/BaseScroll.vue';
  import CardHorizontal from '@/components/CardHorizontal.vue';

  // Single File Component.
  export default {
    // Name of the component.
    name: 'SearchResult',
    // Deps of the component.
    components: {
      BaseScroll,
      CardHorizontal,
    },
    // Props of the component.
    props: {
      total: Number,
      result: Array as PropType<any[]>,
      recommend: Array as PropType<any[]>,
      replace: {
        type: Boolean as PropType<boolean>,
      },
    },
  };
</script>

<style lang="scss" scoped>
  @use '~@stylize/sass-mixin' as *;

  .search-result {
    padding: $search-result__padding;
    background: $search-result__background;
    box-shadow: $search-result__box-shadow;
    border-radius: $search-result__border-radius;

    &__total {
      font: $search-result-total__font;
      color: $search-result-total__color;
      padding: $search-result-total__padding;
    }

    &__list {
      max-height: $search-result-list__max-height;

      @include media('landscape') {
        @include media('h<sm') {
          max-height: $search-result-list__max-height--r10;
        }
      }
    }

    &__empty {
      font: $search-result-empty__font;
      color: $search-result-empty__color;
      padding: $search-result-empty__padding;

      &-title {
        text-transform: uppercase;
        font: $search-result-empty-title__font;
        color: $search-result-empty-title__color;
      }
    }

    &__found {
      overflow: hidden;
      position: relative;

      &:after {
        content: '';
        box-shadow: $search-result-shadow__box-shadow;
        @include absolute($search-result-shadow__position...);
      }
    }
  }
</style>
