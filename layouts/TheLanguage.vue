<template lang="pug">
  // Component template.
  .language__list(data-language-list)
    a.language__item(
      v-for="lang in langs",
      :key="lang",
      :class="{ 'language__item--active': lang === activeLang }",
      :data-language-item="lang")
      img.language__item-flag(
        :src="`/country/${lang}.svg`",
        :alt="lang",
        draggable="false",
        data-language-item-flag)
      span.language__item-text(data-language-item-text)
        | {{ lang }}
</template>

<script lang="ts">
  import axios from 'axios';
  import { mapGetters, mapState } from 'vuex';
  import { isDefaultLang } from '@/constant/Locale';

  // Single File Component
  export default {
    // Name of the component
    name: 'Language',
    // Computed of the component
    computed: {
      ...mapGetters('configs', ['activeLang']),
      ...mapState('configs', ['langs']),
    },
  };
</script>

<style lang="scss" scoped>
  @import '~@stylize/sass-mixin';

  .language {
    &__item {
      cursor: pointer;
      text-transform: uppercase;
      font: $language-item__font;
      color: $language-item__color;
      padding: $language-item__padding;
      @include flex(row flex-start center);

      @include support-hover {
        &:hover {
          color: $language-item__color--hover;
        }
      }

      &-text {
        padding: $language-item-text__padding;
      }

      &-flag {
        @include size($language-item-flag__size);
      }

      &--active {
        position: relative;

        @include after {
          margin: $language-item-mark__margin;
          min-width: $language-item-mark__size;
          background: $language-item-mark__background;
          @include size($language-item-mark__size);
        }
      }
    }
  }
</style>
