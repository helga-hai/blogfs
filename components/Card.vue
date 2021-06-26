<template lang="pug">
  // Component template
  .card(data-card)
    NuxtLink.card__image(:to="localePath(`/${data.slug}`)")
      .card__categories
        .card__categories-title(
          v-for="item in data.categories",
          :key="item.id")
          | {{ item.title }}

      picture(v-if="data.prevImage && data.prevImage.photoWebp")
        source(
          :srcset="`${getStrapiMedia(data.prevImage.photoWebp.formats.small.url)} ${data.prevImage.photoWebp.formats.small.width}w`",
          :type="data.prevImage.photoWebp.formats.small.mime")
        source(
          :srcset="` ${getStrapiMedia(data.prevImage.photo.formats.small.url)} ${data.prevImage.photo.formats.small.width}w`",
          :type="data.prevImage.photo.formats.small.mime")
        img.card__image-inner(
          :alt="`${data.prevImage.alt}`",
          :class="{ loading: !loading }",
          :src="getStrapiMedia(data.prevImage.photo.formats.small.url)",
          data-preview-image)
    .card__info
      client-only
        .card__date
          | {{ data.published_at | luxon }}
      NuxtLink.card__title(:to="localePath(`/${data.slug}`)")
        | {{ data.title }}

      .card__footer
        ArticleStarRating.card__star-rating(
          :article="data",
          :size="16",
          :readonly="true")
        .card__authors
          .card__author(v-for="author in data.authors")
            | {{ $t('card.by') }} {{ author.title }}
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'nuxt-property-decorator';
  import type { ArticleInterface } from '@/interface/ArticleInterface';
  import { getStrapiMedia } from '~/utils/medias';

  @Component({
    // Name of the component
    name: 'Card',
    // Deps of hte component
    components: {
      ArticleStarRating: () => import('@/components/ArticleStarRating.vue'),
    },
    // Methods of the component
    methods: {
      getStrapiMedia,
    },
  })
  export default class CategoryComponent extends Vue {
    loading: boolean = true;

    @Prop()
    data!: ArticleInterface;

    mounted(): void {
      this.loading = true;
    }
  }
</script>

<style lang="scss" scoped>
  @use '~@stylize/sass-mixin' as *;

  .card {
    $selector: &;
    text-align: left;
    @include flex(column center center);

    &__image {
      width: 100%;
      height: 200px;
      overflow: hidden;
      border-radius: $card-image__border-radius;

      &-inner {
        object-fit: cover;
        width: 100%;
        height: 100%;
        border-radius: $card-image__border-radius;

        &.loading {
          filter: blur(14px);
        }
      }
    }

    &__image {
      position: relative;
    }

    &__categories {
      @include absolute(4px 8px);
      @include flex(column flex-end flex-end);

      &-title {
        display: block;
        text-align: right;
        color: $card-categories-title__color;
        font: $card-categories-title__font;
        padding: $card-categories-title__padding;
        background: $card-categories-title__background;
        border-radius: $card-categories-title__border-radius;
        margin: $card-categories-title__margin;
      }
    }

    &__info {
      width: 100%;
      padding: $card-info__padding;
    }

    &__date {
      color: $card-date__color;
      font: $card-date__font;
    }

    &__title {
      display: inline-block;
      color: $card-title__color;
      font: $card-title__font;
      margin: $card-title__margin;
    }

    &__author {
      text-align: right;
      color: $card-date__color;
      font: $card-date__font;
    }

    &:hover {
      #{$selector}__title {
        color: $card-title__color--hover;
      }
    }

    &__star-rating {
      ::v-deep .article-star-rating__detail {
        display: none;
      }
    }

    &__footer {
      @include flex(row space-between center);
    }
  }
</style>
