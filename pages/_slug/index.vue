<template lang="pug">
  // Component template
  .post
    .post__content
      template(v-if="article")
        Crumbs(:crumb="{ title: article.title, path: article.slug }")
        Article(
          :article="article",
          :category="category")

      template(v-if="category")
        Crumbs(:crumb="{ title: category.title, path: category.slug }")
        Category(
          :articles="articles",
          :category="category")

        InfiniteLoading(
          v-if="isInfinite",
          @infinite="getMoreArticles",
          :identifier="infiniteId")
          span(slot="no-more")
          span(slot="no-results")
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapGetters } from 'vuex';
  import InfiniteLoading, { StateChanger } from 'vue-infinite-loading';
  import type { Context } from '@nuxt/types';
  import Crumbs from '~/components/Crumbs.vue';
  import Article from '~/components/Article.vue';
  import Category from '~/components/Category.vue';
  import BaseTitle from '~/components/base/BaseTitle.vue';

  // Component data
  interface Data {
    articles: any;
    start: number;
    offset: number;
    isInfinite: boolean;
    infiniteId: number;
    count?: number;
  }

  // Component definition
  export default Vue.extend({
    // Name of the component
    name: 'Slug',
    // Deps of the component
    components: { Article, Category, BaseTitle, InfiniteLoading, Crumbs },
    // Async Data hook of the component
    async asyncData({ $strapi, $axios, params, store, error, res, app }: Context) {
      const matchingArticles = await $strapi.find('articles', {
        _locale: store.getters['configs/activeLang'],
        slug: params.slug,
      });

      const matchingCategories = await $strapi.find('categories', {
        _locale: store.getters['configs/activeLang'],
        slug: params.slug,
      });

      if (!matchingArticles[0] && !matchingCategories[0]) {
        error({ statusCode: 404, message: 'Post not found' });
      }

      const articles = await $strapi.find('articles', {
        _locale: store.getters['configs/activeLang'],
        _sort: 'published_at:DESC',
        _start: 0,
        _limit: 9,
        'categories.slug': params.slug,
      });

      if (matchingCategories[0]) {
        store.commit('content/isCategory', true);
        if (articles[0]) app.$setdata({ type: params.slug, content: articles });
      } else if (matchingArticles[0]) {
        store.commit('content/isCategory', false);
        if (!store.state.content.news.all) {
          const news = await $strapi.find('articles', {
            _locale: store.getters['configs/activeLang'],
            _sort: 'published_at:DESC',
            _start: 0,
            _limit: 5,
          });
          if (news[0]) app.$setdata({ type: 'all', content: news });
        }
      }

      const categories = await $strapi.find('categories', {
        _locale: store.getters['configs/activeLang'],
      });
      app.$setdata({ type: 'categories', content: categories });

      if (!store.state.content.banner && !store.state.content.social) {
        const global = await $strapi.find('global', {
          _locale: store.getters['configs/activeLang'],
        });
        store.commit('content/setGlobal', global);
      }

      // Set http header Last-Modified
      if (process.server) {
        if (matchingArticles[0]) {
          res?.setHeader('Last-Modified', `${new Date(matchingArticles[0].updated_at).toUTCString()}`);
        }
        if (matchingCategories[0]) {
          const data = articles[0] ? articles[0].published_at : matchingCategories[0].published_at;
          res?.setHeader('Last-Modified', `${new Date(data).toUTCString()}`);
        }
      }

      // Get currency rates
      if (!store.state.content.rate) {
        const rate: any = await $axios.$get('https://api.coincap.io/v2/assets?ids=bitcoin,ethereum,bitcoin-cash,dash');
        store.commit('content/setRate', rate.data);
      }

      return {
        article: matchingArticles[0],
        category: matchingCategories[0],
        articles,
        count: await $strapi.find('articles/count', {
          _locale: store.getters['configs/activeLang'],
          'categories.slug': params.slug,
        }),
      };
    },

    // Data of the component
    data: (): Data => ({
      articles: null,
      start: 0,
      offset: 9,
      isInfinite: false,
      infiniteId: +new Date(),
    }),

    // Computed hook of the component
    computed: mapGetters('configs', ['activeLang']),

    // Mounted hook of the component
    mounted() {
      this.isInfinite = !!(this.count && this.count !== this.articles?.length);
    },

    // Methods of the component
    methods: {
      async getMoreArticles($state: StateChanger) {
        this.start += this.offset;

        const tmpArticles = await this.$strapi.find('articles', {
          _locale: this.activeLang,
          _sort: 'published_at:DESC',
          _start: this.start,
          _limit: this.offset,
          'categories.slug': this.$route.params.slug,
        });

        this.articles = [...this.articles, ...tmpArticles];
        this.count && this.count !== this.articles?.length ? $state.loaded() : $state.complete();
      },
    },
  });
</script>

<style lang="scss" scoped>
  .post {
    &__title {
      text-transform: uppercase;
    }
  }
</style>
