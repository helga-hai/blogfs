<template lang="pug">
  // Component template
  .author
    .author__content(v-if="author")
      .autor__single(
        v-for="item in author",
        :key="item.id")
        PreviewAuthor(:data="item")
        .author__catalog
          Catalogue(
            v-if="$route.params.slug",
            :items="item.articles")
</template>

<script lang="ts">
  import orderBy from 'lodash/orderBy';
  import Catalogue from '@/components/Catalogue.vue';
  import PreviewAuthor from '@/components/PreviewAuthor.vue';
  import { Context } from '@nuxt/types';

  // Component definition
  export default {
    // Name of the component
    name: 'Author',
    // Deps of the component
    components: { PreviewAuthor, Catalogue },
    // Async Data of the component
    async asyncData({ $strapi, $axios, app, params, res, store, error }: Context) {
      store.commit('content/isCategory', false);

      const author = params.slug
        ? await $strapi.find('authors', {
          _locale: app.i18n?.localeProperties?.code,
          slug_contains: params.slug,
        })
        : await $strapi.find('authors', {
          _locale: app.i18n?.localeProperties?.code,
        });

      if (!author[0]) {
        error({ statusCode: 404, message: 'Author not found' });
        return;
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

      if (author[0].articles) {
        author[0].articles = orderBy(author[0].articles, 'published_at', 'desc');
        app.$setdata({ type: params.slug, content: author[0].articles });
      }

      if (!store.state.content.banner && !store.state.content.social) {
        const global = await $strapi.find('global', {
          _locale: store.getters['configs/activeLang'],
        });
        store.commit('content/setGlobal', global);
      }

      // Set http header Last-Modified
      if (process.server) {
        const date = author[0].articles[0] ? author[0].articles[0].published_at : author[0].published_at;
        res?.setHeader('Last-Modified', `${new Date(date).toUTCString()}`);
      }

      // Get currency rates
      if (!store.state.content.rate) {
        const rate: any = await $axios.$get('https://api.coincap.io/v2/assets?ids=bitcoin,ethereum,bitcoin-cash,dash');
        store.commit('content/setRate', rate.data);
      }

      return {
        author,
      };
    },
  };
</script>

<style lang="scss" scoped>
  @use '~@stylize/sass-mixin' as *;

  .author__catalog {
    margin: $author-catalog__margin;

    @include media('>=sm') {
      margin: $author-catalog__margin--r10;
    }
  }
</style>
