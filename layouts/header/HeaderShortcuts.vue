<template lang="pug">
  // Component template.
  .header-shortcut__content
    Swiper.header-shortcut__list(
      ref="swiper",
      :options="swiperOptions",
      data-header-shortcut-list)
      SwiperSlide.header-shortcut__item
        RouterLink.header-shortcut__link(
          :to="{ name: 'casino' }",
          active-class="header-shortcut__link--active",
          data-header-shortcut-item="casino")
          span.header-shortcut__text
            | {{ $t('navigation.shortcut.casino') }}

      SwiperSlide.header-shortcut__item
        RouterLink.header-shortcut__link(
          :to="{ name: 'live' }",
          active-class="header-shortcut__link--active",
          data-header-shortcut-item="live")
          span.header-shortcut__text
            | {{ $t('navigation.shortcut.live') }}

      SwiperSlide.header-shortcut__item
        RouterLink.header-shortcut__link(
          :to="{ name: 'v-sport' }",
          active-class="header-shortcut__link--active",
          data-header-shortcut-item="vsport")
          span.header-shortcut__text
            | {{ $t('navigation.shortcut.vsport') }}

      SwiperSlide.header-shortcut__item
        RouterLink.header-shortcut__link(
          :to="{ name: 'mini' }",
          active-class="header-shortcut__link--active",
          data-header-shortcut-item="mini")
          span.header-shortcut__text
            | {{ $t('navigation.shortcut.mini') }}
            BaseBadge.header-shortcut__badge(variant="primary")
              | new

      SwiperSlide.header-shortcut__item
        RouterLink.header-shortcut__link(
          :to="{ name: 'promo-bonus' }",
          active-class="header-shortcut__link--active",
          data-header-shortcut-item="promo")
          span.header-shortcut__text
            | {{ $t('navigation.shortcut.offers') }}

      template(#button-prev)
        .header-shortcut__nav-prev

      template(#button-next)
        .header-shortcut__nav-next
</template>

<script lang="ts">
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
  import SwiperMixin from '@/mixins/SwiperMixin';
  import BaseBadge from '@/components/base/BaseBadge.vue';
  import type { SwiperOptions } from 'swiper';

  // Component data.
  interface Data {
    swiperOptions: SwiperOptions;
  }

  // Component definition.
  export default {
    // Name of the component.
    name: 'HeaderShortcuts',
    // Mixins of the component.
    mixins: [SwiperMixin],
    // Deps of the component.
    components: {
      BaseBadge,
      Swiper,
      SwiperSlide
    },
    // Data of the component.
    data: (): Data => ({
      swiperOptions: {
        navigation: {
          nextEl: '.header-shortcut__nav-next',
          prevEl: '.header-shortcut__nav-prev',
          disabledClass: 'header-shortcut__nav-disabled'
        }
      }
    })
  };
</script>

<style lang="scss" scoped>
  @use '~@stylize/sass-mixin' as *;

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
