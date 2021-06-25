<template lang="pug">
  // Component template.
  LazyHydrate(when-visible)
    .search(
      data-search,
      v-click-outside="hideResults",
      :class="{ 'search--active': term && active && !initLoading }")
      SearchField.search__field(
        :term="term",
        :close="active",
        @input="loadByTerm",
        @openField="$emit('openField', $event)",
        @showResults="showResults",
        @hideResults="hideResults")

      transition(name="fade")
        SearchResult.search__result(
          v-if="term && active && !initLoading",
          :total="count",
          :result="result")
          template(#infinite)
            InfiniteLoading(
              @infinite="getMoreArticles",
              :identifier="infiniteId",
              v-if="hasMore")
              span(slot="no-more")
</template>

<script lang="ts">
  import debounce from 'lodash/debounce';
  import { Vue, Component, Watch } from 'nuxt-property-decorator';
  import InfiniteLoading, { StateChanger } from 'vue-infinite-loading';
  import SearchResult from '@/components/search/SearchResult.vue';
  import SearchField from '@/components/search/SearchField.vue';
  import ArticleInterface from '@/interface/ArticleInterface.vue';

  @Component({
    // Name of the component
    name: 'Search',
    // Deps of the component
    components: { InfiniteLoading, SearchField, SearchResult },
    // Data of the component.
    data() {
      return {
        active: false,
        count: 0,
        infiniteId: +new Date(),
        initLoading: false,
        limit: 7,
        offset: 7,
        recommend: [],
        result: [],
        start: 0,
        term: '',
      };
    },
  })
  export default class SearchComponent extends Vue {
    active!: boolean;
    count!: number;
    infiniteId!: string;
    initLoading!: boolean;
    limit!: number;
    offset!: number;
    result!: ArticleInterface[];
    start!: number;
    term!: string;
    $route!: any;

    get hasMore() {
      return this.count > this.limit && this.result?.length < this.count;
    }

    showResults(): void {
      this.active = true;
      this.$emit('showResults');
    }

    hideResults(): void {
      this.active = false;
      this.$emit('hideResults');
    }

    loadByTerm(term: string): void {
      if (term) {
        this.searchArticles(term);

        if (!this.term) {
          this.initLoading = true;
        }
      } else this.emptyGames();

      this.term = term;
    }

    emptyGames(): void {
      this.count = 0;
      this.result = [];
      this.start = 0;
    }

    async getMoreArticles($state: StateChanger): Promise<any> {
      this.start += this.offset;

      const tmpArticles = await this.$strapi.find('articles', {
        _locale: this.$store.getters['configs/activeLang'],
        _sort: 'published_at:DESC',
        _start: this.start,
        _limit: this.offset,
        _q: this.term,
      });

      this.result = [...this.result, ...tmpArticles];
      this.count && this.count !== this.result?.length ? $state.loaded() : $state.complete();
    }

    get searchArticles() {
      return debounce(this.searchArticlesDelay, 300);
    }

    async searchArticlesDelay(term: string): Promise<any> {
      this.count = await this.$strapi.find('articles/count', {
        _locale: this.$store.getters['configs/activeLang'],
        _sort: 'published_at:DESC',
        _q: term,
        _start: this.start,
        _limit: this.offset,
      });
      this.result = await this.$strapi.find('articles', {
        _locale: this.$store.getters['configs/activeLang'],
        _sort: 'published_at:DESC',
        _q: term,
        _start: this.start,
        _limit: this.offset,
      });
      this.initLoading = false;
    }

    @Watch('term')
    private termFunc(val: string, oldVal: string): void {
      this.start = 0;
    }

    @Watch('$route')
    private routeFunc(val: any, oldVal: any) {
      this.active = false;
    }
  }
</script>

<style lang="scss" scoped>
  @use '~@stylize/sass-mixin' as *;

  .search {
    position: relative;
    transition: all 0.2s 0.2s;
    width: $search__width;

    &--active {
      transition: 0.2s;
      width: $search__width--active;
    }

    &__result {
      width: $search-result__width;
      margin: $search-result__margin;
      z-index: $search-result__z-index;
      @include absolute(100%, 0, null, 0);
    }
  }
</style>
