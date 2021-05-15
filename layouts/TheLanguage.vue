<template lang="pug">
  // Component template.
  .language__list(data-language-list)
    a.language__item(
      v-for="lang in langs",
      :key="lang",
      :class="{ 'language__item--active': lang === activeLang }",
      :href="getLanguageHref(lang)",
      @click.prevent="changeLang(lang)",
      :data-language-item="lang")
      img.language__item-flag(
        :src="`/static/country/${lang}.svg`",
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
      ...mapState('router', ['current'])
    },
    // Methods of the component
    methods: {
      changeLang(lang: string): void {
        axios.get(`/changeActiveLanguage.do?lang=${lang}`).then((): void => {
          window.location.href = this.getLanguageHref(lang);
        });
      },
      getLanguageHref(lang: string): string {
        return isDefaultLang(lang)
          ? this.current?.fullPath
          : `/${lang}${this.current?.fullPath}`;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @use '~@stylize/sass-mixin' as *;

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
