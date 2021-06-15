<template lang="pug">
  // Component template
  .card(data-card)
    NuxtLink.card__image(:to="localePath(`/${data.slug}`)")
      picture(v-if="data.prevImage && data.prevImage.photoWebp")
        source(
          :srcset="`${getStrapiMedia(data.prevImage.photoWebp.formats.small.url)} ${data.prevImage.photoWebp.formats.small.width}w`",
          :type="data.prevImage.photoWebp.formats.small.mime")
        source(
          :srcset="` ${getStrapiMedia(data.prevImage.photo.formats.small.url)} ${data.prevImage.photo.formats.small.width}w`",
          :type="data.prevImage.photo.formats.small.mime")
        img.card__image-inner(
          :class="{ loading: !loading }",
          :src="getStrapiMedia(data.prevImage.photo.formats.small.url)",
          data-preview-image)
    .card__info
      client-only
        .card__date
          | {{ data.published_at | luxon }}
      NuxtLink.card__title(:to="localePath(`/${data.slug}`)")
        | {{ data.title }}
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
    // Methods of the component
    methods: {
      getStrapiMedia,
    },
  })
  export default class CategoryComponent extends Vue {
    loading: boolean = false;

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
      color: $card-date__color;
      font: $card-date__font;
    }

    &:hover {
      #{$selector}__title {
        color: $card-title__color--hover;
      }
      #{$selector}__image {
        opacity: 0.8;
      }
    }
  }
</style>
