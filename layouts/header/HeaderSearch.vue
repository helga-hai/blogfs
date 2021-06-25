<template lang="pug">
  // Component template
  Search.header-search(
    replace,
    @openField="openField",
    :class="cssClasses",
    data-header-search)
</template>

<script lang="ts">
  import Vue from 'vue';
  // import Search from '@/components/search/Search.vue';

  interface Data {
    isActive: boolean;
  }

  // Component definition
  export default Vue.extend({
    // Name of the component
    name: 'HeaderSearch',
    // Deps of the component
    components: {
      Search: () => import('@/components/search/Search.vue')
    },
    // Data of the component
    data: (): Data => ({
      isActive: false,
    }),
    // Computed of the component
    computed: {
      cssClasses(): string {
        return this.isActive ? `header-search--active` : '';
      },
    },
    // Methods of the component
    methods: {
      openField(): void {
        this.isActive = !this.isActive;
      },
    },
  });
</script>

<style lang="scss" scoped>
  @import '~@stylize/sass-mixin';

  .header-search {
    width: $view-header-search__width;
    align-self: center;

    &--active {
      width: $view-header-search__width--r10;
    }

    @include media('>=md') {
      width: $view-header-search__width--r10;
    }

    ::v-deep .search__result {
      max-width: 100vw;
      width: $view-header-search-result__width;
    }
  }
</style>
