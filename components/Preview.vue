<template lang="pug">
  // Component template
  .preview(data-preview v-if="data")
    .preview__image
      picture(v-if="data.prevImage")
        source(
          :srcset="`${getStrapiMedia(data.prevImage.photoWebp.formats.small.url)} ${data.prevImage.photoWebp.formats.small.width}w`",
          :type="data.prevImage.photoWebp.formats.small.mime")
        source(
          :srcset="` ${getStrapiMedia(data.prevImage.photo.formats.small.url)} ${data.prevImage.photo.formats.small.width}w`",
          :type="data.prevImage.photo.formats.small.mime")
        img.preview__image-inner(
          :class="{ loading: !loading }",
          :src="getStrapiMedia(data.prevImage.photo.url)",
          data-preview-image)

    .preview__info
      client-only
        .preview__date
          | {{ data.published_at | luxon }}
      NuxtLink.preview__title(:to="localePath(`/${data.slug}`)")
        | {{ data.title }}
      .preview__description
        | {{ data.preview }}
      .preview__author
        .preview__author-name(v-for="item in data.authors")
          | {{ $t('preview.by') }} {{ item.title }}
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'nuxt-property-decorator';
  import { getStrapiMedia } from '~/utils/medias';
  import { ArticleInterface } from '~/interface/ArticleInterface';

  @Component({
    // Name of the component
    name: 'Preview',
    // Methods of the component
    methods: {
      getStrapiMedia,
    },
  })
  export default class PreviewComponent extends Vue {
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

  .preview {
    text-align: left;
    padding: $preview__padding;
    @include flex(column center center);

    @include media('>=sm') {
      padding: $preview__padding--r10;
      @include flex(row flex-start center);
    }

    &__image {
      min-width: 296px;
      overflow: hidden;
      border-radius: $preview-image__border-radius;

      &-inner {
        object-fit: cover;
        width: 100%;
        height: 100%;
        border-radius: $preview-image__border-radius;
        @include size($preview__size);

        &.loading {
          filter: blur(14px);
        }
      }

      @include media('>=sm') {
        min-width: 400px;
        @include size($preview__size--r10);
      }
    }

    &__info {
      padding: $preview-info__padding;

      @include media('>=sm') {
        padding: $preview-info__padding--r10;
      }
    }

    &__date {
      color: $preview-date__color;
      font: $preview-date__font;
    }

    &__title {
      display: inline-block;
      color: $preview-title__color;
      font: $preview-title__font;
      margin: $preview-title__margin;

      @include media('>=sm') {
        font: $preview-title__font--r10;
      }
    }

    &__description {
      color: $preview-description__color;
      font: $preview-description__font;
    }

    &__author {
      color: $preview-date__color;
      font: $preview-date__font;
    }
  }
</style>
