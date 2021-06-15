<template lang="pug">
  // Component template.
  picture(v-if="srcset")
    source(
      sizes="(max-width: 500px) calc(100vw - 32px), (max-width: 850px) calc(100vw - 32px), 942px",
      :srcset="srcsetWebp",
      :alt="data.photo.alternativeText",
      type="image/webp")
    source(
      sizes="(max-width: 500px) calc(100vw - 32px), (max-width: 850px) calc(100vw - 32px), 942px",
      :srcset="srcset",
      :alt="data.photoWebp.alternativeText",
      :type="source.thumbnail.mime")
    img.article__image(
      :src="getStrapiMedia(data.photo.url)",
      :alt="data.photo.alternativeText")
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'nuxt-property-decorator';
  import {ImageFormat, ImageFormats, PrevImage, SimpleImageFormat} from '@/interface/ImageInterface';
  import { getStrapiMedia } from '~/utils/medias.js';

  @Component({
    // Name of the component
    name: 'MainPicture',
    // Methods of component
    methods: {
      getStrapiMedia,
    },
  })
  export default class BasePictureComponent extends Vue {
    @Prop()
    data!: PrevImage;

    @Prop()
    width!: string;

    @Prop()
    height!: string;

    get source(): ImageFormats {
      return this.data.photo.formats;
    }

    get sourceWebp(): ImageFormats {
      return this.data.photoWebp.formats;
    }

    get srcsetWebp(): string {
      const src: ImageFormats = this.sourceWebp;
      const lg: SimpleImageFormat | ImageFormat = src.large ? src.large : this.data.photoWebp;
      const med: SimpleImageFormat | ImageFormat = src.medium ? src.medium : lg;
      const sm: SimpleImageFormat = src.small ? src.small : src.thumbnail;

      return `${getStrapiMedia(sm.url)} ${sm.width}w,
              ${getStrapiMedia(med.url)} ${med.width}w,
              ${getStrapiMedia(lg.url)} ${lg.width}w`;
    }

    get srcset(): string {
      const src: ImageFormats = this.source;
      const lg: SimpleImageFormat | ImageFormat = src.large ? src.large : this.data.photo;
      const med: SimpleImageFormat | ImageFormat = src.medium ? src.medium : lg;
      const sm: SimpleImageFormat = src.small ? src.small : src.thumbnail;

      return `${getStrapiMedia(sm.url)} ${sm.width}w,
              ${getStrapiMedia(med.url)} ${med.width}w,
              ${getStrapiMedia(lg.url)} ${lg.width}w`;
    }
  }
</script>
