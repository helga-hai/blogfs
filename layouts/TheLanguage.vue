<template lang="pug">
  // Component template
  .language__list(data-language-list)
    .language__item(
      v-for="locale in $i18n.locales",
      :key="locale.code",
      :class="{ 'language__item--active': locale.code === $i18n.locale }",
      @click="reloadLocale(locale.code)",
      :data-language-item="locale.code")
      img.language__item-flag(
        :src="`/country/${locale.code}.svg`",
        :alt="locale.code",
        draggable="false",
        data-language-item-flag)
      span.language__item-text(data-language-item-text)
        | {{ locale.code }}
</template>

<script lang="ts">
  import Vue from 'vue';
  // Single File Component
  export default Vue.extend({
    // Name of the component
    name: 'Language',
    // Methods oh the component
    methods: {
      reloadLocale(lang: string): void {
        window.location.href = this.switchLocalePath(lang);
      },
    },
  });
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
