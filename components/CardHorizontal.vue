<template lang="pug">
  // Component template
  NuxtLink.card-horizontal(
    :to="localePath(`/${data.slug}`)",
    data-card-horizontal)
    picture(v-if="data.prevImage.photoWebp")
      source(
        :srcset="`${getStrapiMedia(data.prevImage.photoWebp.formats.thumbnail.url)} ${data.prevImage.photoWebp.formats.thumbnail.width}w`",
        :type="data.prevImage.photoWebp.formats.thumbnail.mime")
      source(
        :srcset="`${getStrapiMedia(data.prevImage.photo.formats.thumbnail.url)} ${data.prevImage.photo.formats.thumbnail.width}w`",
        :type="data.prevImage.photo.formats.thumbnail.mime")
      img.card-horizontal__image(
        :src="getStrapiMedia(data.prevImage.photo.url)",
        data-preview-image)

    .card-horizontal__info
      .card-horizontal__title
        | {{ data.title }}
</template>

<script lang="ts">
  import type { PropType } from 'vue';
  import { getStrapiMedia } from '~/utils/medias';

  // Component definition
  export default {
    // Name of the component
    name: 'CardHorizontal',
    // Props of the component
    props: {
      data: Object as PropType<Record<string, any>>,
    },
    // Methods of the component
    methods: {
      getStrapiMedia,
    },
  };
</script>

<style lang="scss" scoped>
  @use '~@stylize/sass-mixin' as *;

  .card-horizontal {
    $selector: &;
    text-align: left;
    width: $card-horizontal__width;
    padding: $card-horizontal__padding;
    @include flex(row flex-start center);

    &__image {
      object-fit: cover;
      border-radius: $card-horizontal-image__border-radius;
      @include size($card-horizontal__size);

      @include media('>=sm') {
        @include size($card-horizontal__size--r10);
      }
    }

    &__info {
      padding: $card-horizontal-info__padding;
    }

    &__title {
      display: inline-block;
      color: $card-horizontal-title__color;
      font: $card-horizontal-title__font;
      margin: $card-horizontal-title__margin;
      opacity: 0.9;
    }

    &.nuxt-link-exact-active {
      background-color: $card-horizontal__background-color--hover;
    }

    &:hover {
      background-color: $card-horizontal__background-color--hover;

      #{$selector}__title {
        opacity: 1;
      }
    }
  }
</style>
