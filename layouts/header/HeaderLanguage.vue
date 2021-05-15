<template lang="pug">
  //- Component template.
  .header-language(
    v-click-outside="outside",
    data-footer-language)
    .header-language__toggle(
      @click="toggle",
      data-footer-language-toggle)
      img.header-language__toggle-flag(
        :src="`/country/${activeLang}.svg`",
        loading="lazy",
        draggable="false",
        data-footer-language-toggle-flag)

      .header-language__toggle-text(data-footer-language-toggle-text)
        | {{ activeLang }}

      .header-language__toggle-arrow(
        :class="{ 'header-language__toggle-arrow--active': isActive }",
        data-footer-language-toggle-arrow)

    transition(name="fade")
      Language.header-language__list(
        v-show="isActive",
        data-footer-language-list)
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapGetters } from 'vuex';
  import Language from '../TheLanguage.vue';

  // Component data.
  interface Data {
    // Determine whether list is opened.
    isActive: boolean;
  }

  // Component definition.
  export default Vue.extend({
    // Name of the component.
    name: 'HeaderLanguage',
    // Deps of the component.
    components: { Language },
    // Data of the component.
    data: (): Data => ({
      isActive: false,
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
      },
    },
  });
</script>

<style lang="scss" scoped>
  @import '~@stylize/sass-mixin';

  .header-language {
    display: none;
    position: relative;

    @include media('>=md') {
      //display: flex;
    }

    &__toggle {
      cursor: pointer;
      user-select: none;
      text-transform: uppercase;
      @include flex(row flex-start center);

      &-text {
        font: $header-language-toggle__font;
        color: $header-language-toggle__color;
        padding: $header-language-toggle__padding;
      }

      &-flag {
        @include size($header-language-toggle-flag__size);
      }

      &-arrow {
        transform: rotate(0deg);
        background: $header-language-toggle-arrow__background;
        @include size($header-language-toggle-arrow__size);

        &--active {
          transform: rotate(180deg);
          transition: transform 0.3s;
        }
      }
    }

    &__list {
      z-index: 10;
      width: 100%;
      margin: $header-language-list__margin;
      background: $header-language-list__background;
      border-radius: $header-language-list__border-radius;
      @include absolute($header-language-list__position);

      &::v-deep .header-language__item {
        width: $header-language-item__width;
        padding: $header-language-item__padding;

        @include support-hover {
          &:hover {
            background: $header-language-item__background--hover;
          }
        }
      }
    }
  }
</style>
