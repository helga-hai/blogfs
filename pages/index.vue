<template lang="pug">
  // Component template
  .home
    BaseTitle
      | {{ home.title }}
    Preview(:data="previewArticle")
    template(v-if="$mq !== 'xs'")
      .home__catalog
        Catalogue(:items="articles")
      BaseButton.home__more(
        v-if="hasMore",
        variant="primary",
        :loading="loading",
        @click="loading = true; getMoreArticles()")
        | {{ $t('home.more') }}
    template(v-else)
      template(v-if="$store.state.content.banner")
        a.home__banner(
          :href="$store.state.content.banner.url",
          target="_blank")
          img.home__banner-image(
            alt="Fairspin banner",
            :src="getStrapiMedia($store.state.content.banner.source.url)",
            draggable="false",
            data-preview-image)
      template(v-if="$store.state.content.bannerVideo")
        video.bar__video(
          @click="playVideo",
          muted,
          autoplay,
          ref="bannervideo",
          width="100%")
          source(
            :src="getStrapiMedia($store.state.content.bannerVideo.source.url)",
            :type="$store.state.content.bannerVideo.source.mime")
      .home__catalog
        Catalogue(:items="articles.slice(0, 4)")
      .home__social
        .home__social-links
          .home__social-title
            | {{ $t('bar.social.title') }}:
          a.home__social-link(
            v-for="item in $store.state.content.social",
            :key="item.id",
            :href="item.url",
            target="_blank")
            .home__social-img
              img(
                :alt="`${item.title}`",
                :width="item.icon.width",
                :height="item.icon.height",
                :src="getStrapiMedia(item.icon.url)",
                draggable="false")
      .home__catalog
        Catalogue(:items="articles.slice(4, 8)")
      .fb-like
        iframe(
          title="fb like",
          src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Ffairspin.info&width=174&layout=button_count&action=like&size=large&share=true&height=46&appId=2095251617409719",
          width="100%",
          height="100",
          style="border: none; overflow: hidden; padding: 12px; background: url(https://admin.fairspin.info/uploads/like_fb_min_1023506bb9.jpg) bottom center",
          scrolling="no",
          frameborder="0",
          allowfullscreen="true",
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share")
      .home__catalog
        Catalogue(:items="articles.slice(8)")

      BaseButton.home__more(
        v-if="hasMore",
        variant="primary",
        :loading="loading",
        @click="loading = true; getMoreArticles()")
        | {{ $t('home.more') }}

      .home__news
        .home__news-title
          | {{ $t('bar.news.title') }}
        BaseBlock.bar__news-content(
          cutSize="medium",
          variant="primary",
          :cutSide="['top-right', 'bottom-left']")
          List(:items="news")

      .home__subscribe
        Subscribe
</template>

<script lang="ts">
  import { Vue, Component } from 'nuxt-property-decorator';
  import { mapGetters } from 'vuex';
  import type { Context } from '@nuxt/types';
  import type { MetaInfo } from 'vue-meta';
  import BaseButton from '@/components/base/BaseButton.vue';
  import BaseTitle from '@/components/base/BaseTitle.vue';
  import BaseBlock from '@/components/base/BaseBlock.vue';
  import Preview from '@/components/Preview.vue';
  import Catalogue from '@/components/Catalogue.vue';
  import List from '@/components/List.vue';
  import Subscribe from '@/components/Subscribe.vue';
  import { getStrapiMedia } from '~/utils/medias';
  import { getMetaTags } from '~/utils/seo';

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
        homeArticle = home.article;
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

      if (!store.state.content.banner && !store.state.content.social) {
        const global = await $strapi.find('global', {
          _locale: store.getters['configs/activeLang'],
        });
        store.commit('content/setGlobal', global);
      }

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
      BaseBlock,
      BaseButton,
      BaseTitle,
      Preview,
      List,
      Catalogue,
      Subscribe,
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
    $refs!: any;

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

    get news() {
      return this.$store.state.content.news.all;
    }

    playVideo(): void {
      this.$refs.bannervideo.play();
    }

    mounted(): void {
      this.start = this.home.article ? 15 : 16;
    }
  }
</script>

<style lang="scss" scoped>
  @use '~@stylize/sass-mixin' as *;

  .home {
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

    &__banner-image {
      border-radius: 8px;
      max-width: calc(100% - 24px);
    }

    &__social {
      text-align: left;

      &-links {
        @include flex(row flex-start center);
      }
    }

    &__social {
      overflow: hidden;
      background: $home-social__background;

      &-links {
        overflow: auto;
        padding: $home-social-links__padding;
      }

      &-link {
        margin: $home-social-link__margin;
      }

      &-title {
        white-space: nowrap;
        text-transform: uppercase;
        margin: $home-social-title__margin;
      }
    }

    .fb-like {
      filter: grayscale(0.9);
      width: 100%;
      color: white;
      background: #818181;
      height: 100px;
      overflow: hidden;
    }

    &__news {
      width: calc(100vw - 24px);
      margin: 24px auto 0;

      &-title {
        text-transform: uppercase;
        text-align: left;
        margin: 16px 0;
      }

      ::v-deep .card-horizontal__title {
        font: $home-news-title__font;
      }
    }

    &__subscribe {
      max-width: 350px;
      margin: 24px auto 0;
    }
  }
</style>
