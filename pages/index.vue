<template lang="pug">
  // Component template
  .main
    LazyHydrate(never)
      BaseTitle
        | {{ home.title }}
    Preview(:data="previewArticle")
    template(v-if="$mq !== 'xs'")
      .main__catalog
        Catalogue(:items="articles")
      BaseButton.main__more(
        v-if="hasMore",
        variant="primary",
        :loading="loading",
        @click="loading = true; getMoreArticles()")
        | {{ $t('home.more') }}
    template(v-else)
      .main__catalog
        Catalogue(:items="articles.slice(0, 4)")
</template>

<script lang="ts">
  import { Vue, Component } from 'nuxt-property-decorator';
  import { mapGetters } from 'vuex';
  // import BaseButton from '@/components/base/BaseButton.vue';
  // import BaseTitle from '@/components/base/BaseTitle.vue';
  // import Preview from '@/components/Preview.vue';
  // import Catalogue from '@/components/Catalogue.vue';
  import type { Context } from '@nuxt/types';
  import type { MetaInfo } from 'vue-meta';
  import { getMetaTags } from '~/utils/seo';
  import { getStrapiMedia } from '~/utils/medias';

  @Component({
    // Name of the component
    name: 'Home',
    // Async Data of the component
    async asyncData({ $strapi, $axios, store, res, error, app }: Context) {
      const home = await $strapi.find('home', {
        _locale: store.getters['configs/activeLang'],
      });

      let homeArticle, lastArticle, articles, lastPublished;

      if (home.article) {
        homeArticle = await $strapi.findOne('articles', home.article.id);
        homeArticle = homeArticle[0];
        articles = await $strapi.find('articles', {
          _locale: store.getters['configs/activeLang'],
          _limit: 15,
          _sort: 'published_at:DESC',
          id_ne: home.article.id,
        });

        app.$setdata({ type: 'all', content: articles });
        lastPublished = articles[0].published_at;
      } else {
        articles = await $strapi.find('articles', {
          _locale: store.getters['configs/activeLang'],
          _limit: 16,
          _sort: 'published_at:DESC',
        });

        app.$setdata({ type: 'all', content: articles });
        lastPublished = articles[0].published_at;
        lastArticle = articles[0];
        articles.shift();
      }

      if (!home && !articles) {
        error({ statusCode: 404, message: 'Page not found' });
        return;
      }
      const count = await $strapi.find('articles/count', {
        _locale: store.getters['configs/activeLang'],
      });

      const categories = await $strapi.find('categories', {
        _locale: store.getters['configs/activeLang'],
      });
      app.$setdata({ type: 'categories', content: categories });
      store.commit('content/isCategory', false);

      // Set http header Last-Modified
      if (process.server) {
        res?.setHeader('Last-Modified', `${new Date(lastPublished).toUTCString()}`);
      }

      // Get currency rates
      if (!store.state.content.rate) {
        const rate: any = await $axios.$get('https://api.coincap.io/v2/assets?ids=bitcoin,ethereum,bitcoin-cash,dash');
        store.commit('content/setRate', rate.data);
      }

      const previewArticle = homeArticle || lastArticle;

      return { home, articles, previewArticle, count };
    },
    // Deps of the component
    components: {
      BaseTitle: () => import('@/components/base/BaseTitle.vue'),
      Preview: () => import('@/components/Preview.vue'),
      Catalogue: () => import('@/components/Catalogue.vue'),
      BaseButton: () => import('@/components/base/BaseButton.vue')
    },
    // Computeds of component
    computed: {
      ...mapGetters('configs', ['activeLang']),
    },
    // Methods of the component
    methods: {
      getStrapiMedia,
    },
  })
  export default class HomeComponent extends Vue {
    home!: any;
    loading: boolean = false;
    activeLang!: string;
    articles!: any;
    offset: number = 6;
    start!: number;
    count!: number;

    head(): MetaInfo {
      const fullSeo = {
        metaTitle: this.home.seo.metaTitle,
        metaDescription: this.home.seo.metaDescription,
        shareImage: this.home.seo.sharedImage.media,
        preventIndexing: this.home.preventIndexing,
      };
      const data: MetaInfo = {
        title: fullSeo.metaTitle,
        meta: getMetaTags(fullSeo),
      };
      if (this.home.structuredData) {
        // @ts-ignore
        data.script = [{ type: 'application/ld+json', json: this.home.structuredData }];
      }
      return data;
    }

    get hasMore(): boolean {
      return !!(this.count && this.count !== this.articles.length + 1);
    }

    async getMoreArticles(): Promise<any> {
      const tmpArticles = await this.$strapi.find('articles', {
        _locale: this.activeLang,
        _sort: 'published_at:DESC',
        _start: this.start,
        _limit: this.offset,
      });
      this.articles = [...this.articles, ...tmpArticles];
      this.start += this.offset;
      this.loading = false;
    }

    mounted(): void {
      this.start = this.home.article ? 15 : 16;
    }
  }
</script>

<style lang="scss" scoped>
  @use '~@stylize/sass-mixin' as *;

  .main {
    text-align: center;

    &__catalog {
      width: 100%;
      margin-top: 20px;
      @include flex(row);
    }

    &__more {
      text-transform: uppercase;
      margin: 12px auto 8px;
    }
  }
</style>
