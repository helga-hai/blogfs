<template lang="pug">
  // Component template
  .social-home
    .social-home__links
      .social-home__title
        | {{ $t('bar.social.title') }}:
      a.social-home__link(
        v-for="item in $store.state.content.social",
        :key="item.id",
        :href="item.url",
        rel="noreferrer"
        target="_blank")
        .social-home__img
          img(
            :alt="`${item.title}`",
            :width="item.icon.width",
            :height="item.icon.height",
            :src="getStrapiMedia(item.icon.url)",
            draggable="false")
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue';
  import { getStrapiMedia } from '~/utils/medias';

  // Component definition
  export default Vue.extend({
    // Name of the component
    name: 'SocialHome',
    // Methods of the component
    methods: {
      getStrapiMedia,
    },
  });
</script>

<style lang="scss" scoped>
  @use '~@stylize/sass-mixin' as *;

  .social-home {
    text-align: left;
    overflow: hidden;
    background: $home-social__background;

    &__links {
      overflow: auto;
      @include flex(row flex-start center);
      padding: $home-social-links__padding;
    }

    &__link {
      margin: $home-social-link__margin;
    }

    &__title {
      white-space: nowrap;
      text-transform: uppercase;
      margin: $home-social-title__margin;
    }
  }
</style>
