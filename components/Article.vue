<template lang="pug">
  // Component template
  .article
    .article__content(v-if="article")
      .article__header
        .article__author(
          v-for="item in article.authors",
          :key="item.id")
          img.article__author-image(:src="getStrapiMedia(item.image.url)")
          NuxtLink.article__author-name(:to="localePath(`/author/${item.slug}`)")
            | {{ item.title }}

        .article__categories
          .article__categories-title(
            v-for="item in article.categories",
            :key="item.id")
            | {{ item.title }}

      .article__title
        | {{ article.title }}
      .article__date
        | {{ article.published_at | luxon }}

      MainPicture(
        :data="article.prevImage",
        v-if="article.prevImage.photoWebp")

      .article__text(v-html="$md.render(article.text)")

      .article__related(v-if="article.relatedPosts")
        h2.article__related-intro
          | {{ article.relatedTitle }}
        Catalogue(:items="article.relatedPosts")
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'nuxt-property-decorator';
  import type { MetaInfo } from 'vue-meta';
  import { getStrapiMedia } from '~/utils/medias.js';
  import { getMetaTags } from '~/utils/seo.js';
  import Preview from '~/components/Preview.vue';
  import BaseTitle from '~/components/base/BaseTitle.vue';
  import Catalogue from '~/components/Catalogue.vue';
  import MainPicture from '~/components/picture/MainPicture.vue';
  import type { ArticleInterface } from '~/interface/ArticleInterface';
  import type { CategoryInterface } from '~/interface/CategoryInterface';

  @Component({
    // Name of the component
    name: 'Article',
    // Deps of the component
    components: { Catalogue, Preview, BaseTitle, MainPicture },
    // Methods of the component
    methods: {
      getStrapiMedia,
    },
  })
  export default class CategoryComponent extends Vue {
    @Prop()
    article!: ArticleInterface;

    @Prop()
    category!: CategoryInterface;

    // Head hook of the component
    head(): MetaInfo {
      const fullSeo = {
        metaTitle: this.article.seo.metaTitle,
        metaDescription: this.article.seo.metaDescription,
        shareImage: this.article.seo.sharedImage.media,
        preventIndexing: this.article.preventIndexing,
      };
      const data: MetaInfo = {
        title: fullSeo.metaTitle,
        meta: getMetaTags(fullSeo),
      };
      if (this.article.structuredData) {
        // @ts-ignore
        data.script = [{ type: 'application/ld+json', json: this.article.structuredData }];
      }
      return data;
    }
  }
</script>

<style lang="scss" scoped>
  @use '~@stylize/sass-mixin' as *;

  .article {
    padding: $article__padding;
    margin: $article__margin;

    @include media('>=sm') {
      margin: $article__margin--r10;
    }

    &__title {
      text-align: center;
      text-transform: uppercase;
      color: $article-title__color;
      font: $article-title__font;

      @include media('>=sm') {
        text-align: left;
        font: $article-title__font--r10;
      }
    }

    &__date {
      text-align: left;
      color: $article-date__color;
      font: $article-date__font;
      margin: $article-date__margin;

      @include media('>=sm') {
        font: $article-date__font--r10;
        margin: $article-date__margin--r10;
      }
    }

    &__author {
      margin: $article-author__margin;
      @include flex(row flex-start center);

      &-image {
        margin: $article-author-image__margin;
        width: $article-author-image__width;
        border-radius: $article-author-image__border-radius;
      }

      &-name {
        color: $article-author-name__color;
        font: $article-author-name__font;
      }
    }

    &__image,
    ::v-deep &__image {
      width: 100%;
      border-radius: $article-author-image__border-radius;
      margin: $article-image__margin;
    }

    &__related {
      border-top: $article-related__border-top;
      margin: $article-related__margin;
      padding: $article-related__padding;

      &-intro {
        font-weight: 400;
      }
    }

    &__header {
      @include flex(row space-between center);
    }

    &__categories {
      @include flex(column flex-end flex-end);

      &-title {
        display: block;
        text-align: right;
        color: $article-categories__color;
        font: $article-categories__font;
        padding: $article-categories__padding;
      }
    }

    .article__text {

      ::v-deep img {
        width: 100%;
        border-radius: $article-img__border-radius;
      }

      ::v-deep blockquote {
        margin-left: 0;
        border-left: $article-blockquote__border-left;
        padding: $article-blockquote__padding;
      }
    }

    ::v-deep .space {
      padding: 20px;
    }

  }
</style>
