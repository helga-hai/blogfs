<template lang="pug">
  // Component template
  .article
    .article__content(v-if="article")
      .article__header
        .article__authors
          .article__author(
            v-for="item in article.authors",
            :key="item.id")
            img.article__author-image(:src="getStrapiMedia(item.image.formats.thumbnail.url)")
            .article__author-text
              NuxtLink.article__author-description(:to="localePath(`/author/${item.slug}`)")
                span.article__author-description-article {{ $t('author.by') }}
                | {{ item.title }}
              .article__date
                span.article__author-description-article {{ $t('author.on') }}
                | {{ article.published_at | luxon }}

        ArticleSharing(:short="true")

      .article__title
        | {{ article.title }}

      .article__title-after
        .article__left
          .article__date
            | {{ Math.ceil(timeToRead.minutes) }} {{ $t('article.minread') }}
          ArticleStarRating(
            :readonly="readonly",
            :article="updatedArticle || article",
            @checkRate="checkRate",
            @articleUpdate="articleUpdate")

        .article__categories
          .article__categories-title(
            v-for="item in article.categories",
            :key="item.id")
            | {{ item.title }}

      MainPicture(
        :data="article.prevImage",
        v-if="article.prevImage.photoWebp")

      .article__text(v-html="$md.render(article.text)")

      ArticleSharing

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
  import ArticleStarRating from '~/components/ArticleStarRating.vue';
  import type { ArticleInterface } from '~/interface/ArticleInterface';
  import type { CategoryInterface } from '~/interface/CategoryInterface';
  const readingTime = require('reading-time');

  @Component({
    // Name of the component
    name: 'Article',
    // Deps of the component
    components: {
      Catalogue,
      Preview,
      BaseTitle,
      MainPicture,
      ArticleStarRating,
      ArticleSharing: (): any => import('~/components/ArticleSharing.vue'),
    },
    // Methods of the component
    methods: {
      getStrapiMedia,
      readingTime,
    },
  })
  export default class CategoryComponent extends Vue {
    updatedArticle: ArticleInterface | null = null;
    readonly: boolean = false;

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

    get timeToRead(): Record<string, any> {
      return readingTime(this.article.text);
    }

    async articleUpdate(): Promise<any> {
      this.updatedArticle = await this.$strapi.findOne('articles', this.article.id);
    }

    checkRate(): void {
      if (localStorage.getItem(`rate_${this.article.id}`)) {
        this.readonly = true;
      }
    }

    mounted(): void {
      this.checkRate();
    }
  }
</script>

<style lang="scss" scoped>
  @use '~@stylize/sass-mixin' as *;

  .article {
    $selector: &;
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

      &-after {
        margin-top: 4px;
        @include flex(row space-between center);
      }
    }

    &__date {
      text-align: left;
      font: $article-date__font;
      margin: $article-date__margin;

      @include media('>=sm') {
        font: $article-date__font--r10;
        margin: $article-date__margin--r10;
      }
    }

    &__authors {
      display: flex;
    }

    &__author {
      margin: $article-author__margin;
      @include flex(row flex-start center);

      &-image {
        display: none;

        @include media('>=sm') {
          display: block;
          margin: $article-author-image__margin;
          width: $article-author-image__width;
          border-radius: $article-author-image__border-radius;
        }
      }

      &-description {
        color: $article-author-description__color;
        font: $article-author-description__font;

        &-article {
          font-size: 12px;
        }
      }
    }

    &__categories {
      @include flex(column flex-end flex-end);
      border-radius: 8px;
      padding: 4px;

      &-title {
        display: block;
        text-align: right;
        color: $article-categories__color;
        font: $article-categories__font;
        padding: $article-categories__padding;
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
      margin: $article-header__margin;
      @include flex(row space-between center);
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
