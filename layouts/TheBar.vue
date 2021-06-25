<template lang="pug">
  // Component template
  aside.bar(data-sidebar)
    .bar__content
      template(v-if="$store.state.content.banner")
        a.bar__section(
          :href="$store.state.content.banner.url",
          target="_blank")
          img.bar__image(
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
      .bar__section
        .bar__news(v-if="news")
          .bar__title
            | {{ $t('bar.news.title') }}
          BaseBlock.bar__news-content(
            cutSize="medium",
            variant="primary",
            :cutSide="['top-right', 'bottom-left']")
            List(:items="news")
      .bar__section
        .bar__title
          | {{ $t('bar.social.title') }}
        .bar__socials
          a.bar__social(
            v-for="item in $store.state.content.social",
            :key="item.id",
            :href="item.url",
            target="_blank")
            .bar__social-img
              img(
                :src="getStrapiMedia(item.icon.url)",
                draggable="false")
            .bar__social-title
              | {{ item.title }}
      .bar__section
        Subscribe

</template>

<script lang="ts">
  import { Vue, Component } from 'nuxt-property-decorator';
  import BaseBlock from '@/components/base/BaseBlock.vue';
  import { getStrapiMedia } from '@/utils/medias.js';
  import List from '@/components/List.vue';
  import Subscribe from '@/components/Subscribe.vue';

  @Component({
    // Name of the component
    name: 'TheBar',
    // Deps of the component
    components: { BaseBlock, List },
    // Methods of the component
    methods: { getStrapiMedia },
  })
  export default class TheBarClass extends Vue {
    $store!: any;
    $route!: any;
    $refs!: any;
    loading: boolean = false;

    get news() {
      const isAuthor = this.$route.path.includes('/author/');
      return this.$store.state.content.isCategory || isAuthor
        ? this.$store.state.content.news[this.$route.params.slug]
        : this.$store.state.content.news.all;
    }

    playVideo(): void {
      this.$refs.bannervideo.play();
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@stylize/sass-mixin';

  .bar {
    width: $bar__width;

    &__content {
      position: sticky;
      top: 60px;
      padding: $bar__padding;
    }

    &__image {
      width: 100%;
      border-radius: 8px;
    }

    &__section {
      margin: $bar-news__margin;
    }

    &__title {
      text-transform: uppercase;
      margin: $bar-title__margin;
    }

    &__socials {
      display: flex;
      flex-wrap: wrap;
    }

    &__social {
      @include flex(row flex-start center);
      margin: 4px 0;
      flex: 50%;

      &-img {
        width: 40px;
        margin: 0 8px 0 0;
        text-align: center;
      }

      &-title {
        color: $bar-social-title__color;
        font: $bar-social-title__font;
      }

      &:hover {
        .bar__social-title {
          color: $bar-social-title__color--hover;
        }
      }
    }

    &__video {
      cursor: url("https://admin.fairspin.info/uploads/play_button_35_df5c678d22.png"), auto;
    }
  }
</style>
