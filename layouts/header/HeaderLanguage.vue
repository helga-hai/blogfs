<template lang="pug">
  //- Component template.
  .footer-language(
    v-click-outside="outside",
    data-footer-language)
    .footer-language__toggle(
      @click="toggle",
      data-footer-language-toggle)
      img.footer-language__toggle-flag(
        :src="`/static/country/${activeLang}.svg`",
        loading="lazy",
        draggable="false",
        data-footer-language-toggle-flag)

      .footer-language__toggle-text(data-footer-language-toggle-text)
        | {{ activeLang }}

      .footer-language__toggle-arrow(
        :class="{ 'footer-language__toggle-arrow--active': isActive }",
        data-footer-language-toggle-arrow)

    transition(name="fade")
      Language.footer-language__list(
        v-show="isActive",
        data-footer-language-list)
</template>

<script lang="ts">
  import { mapGetters } from 'vuex';
  import Language from '../TheLanguage.vue';

  // Component data.
  interface Data {
    // Determine whether list is opened.
    isActive: boolean;
  }

  // Component definition.
  export default {
    // Name of the component.
    name: 'FooterLanguage',
    // Deps of the component.
    components: { Language },
    // Data of the component.
    data: (): Data => ({
      isActive: false
    }),
    // Computed of the component.
    computed: mapGetters('configs', ['activeLang']),
    // Methods of the component.
    methods: {
      toggle(): void {
        this.isActive = !this.isActive;
      },
      outside(): void {
        this.isActive = false;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @use '~@stylize/sass-mixin' as *;

  .footer-language {
    position: relative;

    &__toggle {
      cursor: pointer;
      user-select: none;
      text-transform: uppercase;
      @include flex(row flex-start center);

      &-text {
        font: $footer-language-toggle__font;
        color: $footer-language-toggle__color;
        padding: $footer-language-toggle__padding;
      }

      &-flag {
        @include size($footer-language-toggle-flag__size);
      }

      &-arrow {
        transform: rotate(0deg);
        background: $footer-language-toggle-arrow__background;
        @include size($footer-language-toggle-arrow__size);

        &--active {
          transform: rotate(180deg);
          transition: transform 0.3s;
        }
      }
    }

    &__list {
      z-index: 10;
      margin: $footer-language-list__margin;
      background: $footer-language-list__background;
      border-radius: $footer-language-list__border-radius;
      @include absolute($footer-language-list__position);

      &::v-deep .language__item {
        width: $footer-language-item__width;
        padding: $footer-language-item__padding;

        @include support-hover {
          &:hover {
            background: $footer-language-item__background--hover;
          }
        }
      }
    }
  }
</style>
