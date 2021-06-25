<template lang="pug">
  // Component template
  .preview(data-preview)
    img.preview__image(
      :alt="data.title",
      :src="getStrapiMedia(data.image.url)",
      draggable="false",
      data-preview-image)

    .preview__info
      h1.preview__title
        | {{ data.title }}
      .preview__description(v-html="$md.render(data.preview)")
      .preview__author
        .preview__author-name
</template>

<script lang="ts">
  import { PropType } from 'vue';
  import { getStrapiMedia } from '~/utils/medias';

  // Component definition
  export default {
    // Name of the component
    name: 'PreviewAuthor',
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

  .preview {
    text-align: left;
    padding: $preview-author__padding;
    @include flex(column center center);

    @include media('>=sm') {
      @include flex(row flex-start center);
    }

    &__image {
      min-width: 320px;
      object-fit: cover;
      border-radius: $preview-author-image__border-radius;
      @include size($preview-author__size);

      @include media('>=sm') {
        @include size($preview-author__size--r10);
      }
    }

    &__info {
      padding: $preview-author-info__padding;

      @include media('>=sm') {
        padding: $preview-author-info__padding--r10;
      }
    }

    &__title {
      text-transform: uppercase;
      color: $preview-author-title__color;
      font: $preview-author-title__font;
      margin: $preview-author-title__margin;

      @include media('>=sm') {
        font: $preview-author-title__font--r10;
      }
    }

    &__description {
      color: $preview-author-date__color;
      font: $preview-author-date__font;
    }

    &__author {
      color: $preview-author-date__color;
      font: $preview-author-date__font;
    }
  }
</style>
