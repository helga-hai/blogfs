<template lang="pug">
  // Component template.
  a.header-back-to-casino(href="http://fairspin.io/")
    BaseButton.header-back-to-casino__text(
      variant="primary",
      :loading="loading",
      @pointerup="loading = true")
      | Back to Casino
</template>

<script lang="ts">
  import BaseButton from '@/components/base/BaseButton.vue';

  // Component data.
  interface Data {
    loading: boolean;
  }

  // Component definition.
  export default {
    // Name of the component.
    name: 'HeaderBackToCasino',
    // Deps of the component.
    components: {
      BaseButton,
    },
    // Data of the component.
    data: (): Data => ({
      loading: false,
    }),
  };
</script>

<style lang="scss" scoped>
  @import '~@stylize/sass-mixin';

  .header-shortcut {
    $selector: &;

    &__content {
      width: 100%;
      position: relative;
    }

    &__list {
      @include absolute-cover;
    }

    &__item {
      width: auto;
      @include flex(row center);
    }

    &__link {
      position: relative;
      border-style: solid;
      white-space: nowrap;
      text-transform: uppercase;
      font: $header-shortcut-item__font;
      color: $header-shortcut-item__color;
      margin: $header-shortcut-item__margin;
      padding: $header-shortcut-item__padding;
      border-width: $header-shortcut-item__border-with;
      border-color: $header-shortcut-item__border-color;
      @include flex(row center center);

      @include media('>=sm') {
        padding: $header-shortcut-item__padding--r10;
      }

      @include media('>=md') {
        padding: $header-shortcut-item__padding--r20;
      }

      &:hover:not(&--active) {
        @include support-hover {
          border-bottom-color: $header-shortcut-item__border-color--hover;
        }
      }

      &--active {
        background: $header-shortcut-item__background--active;
        border-bottom-color: $header-shortcut-item__border-color--active;
      }

      &-badge {
        @include absolute(16px, 8px, null, null);
      }
    }

    &__text {
      position: relative;

      #{$selector}__badge {
        @include absolute(-11px 0);
      }
    }

    &__nav {
      &-prev,
      &-next {
        z-index: 1;
        cursor: pointer;
        @include absolute(0, 0, 0, 0);
        @include flex(column center center);

        @include before {
          z-index: 1;
          box-shadow: 0 0 15px 12px $n_color-10;
          @include absolute(0, 0, 0, 0);
        }
      }

      &-prev {
        right: auto;
        padding: 0 8px;

        @include before {
          right: auto;
        }

        @include after {
          transform: rotate(180deg);
        }
      }

      &-next {
        left: auto;
        padding: 0 8px;

        @include before {
          left: auto;
        }
      }

      &-disabled {
        display: none;
      }
    }
  }
</style>
