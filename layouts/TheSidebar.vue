<template lang="pug">
  // Component template
  aside.sidebar(data-sidebar)
    .sidebar__block.sidebar__block--border
      .sidebar__header
        BaseLogo.sidebar__logo(
          @click.native="$emit('close')"
          data-sidebar-logo)
        BaseClose.sidebar__close(
          @close="$emit('close')",
          data-sidebar-close)
      BackToCasino.sidebar__back
    BaseScroll.sidebar__scroll(data-sidebar-scroll)
      Navigation.sidebar__navigation(
        data-sidebar-navigation,
        @close="$emit('close')")
</template>

<script lang="ts">
  import BaseLogo from '@/components/base/BaseLogo.vue';
  import BaseClose from '@/components/base/BaseClose.vue';
  import BaseScroll from '@/components/base/BaseScroll.vue';
  import Navigation from './sidebar/SidebarNavigation.vue';
  import BackToCasino from './common/BackToCasino.vue';

  // Component definition
  export default {
    // Name of the component
    name: 'TheSidebar',
    // Deps of the component
    components: {
      BaseLogo,
      BaseClose,
      BaseScroll,
      Navigation,
      BackToCasino,
    },
  };
</script>

<style lang="scss" scoped>
  @import '~@stylize/sass-mixin';

  .sidebar {
    width: $sidebar__width;
    box-shadow: $sidebar__shadow;
    background: $sidebar__background;

    &__block {
      padding: $sidebar-block__padding;

      &--border {
        border-bottom: $sidebar-block__border;
      }
    }

    &__close {
      margin: $sidebar-close__margin;
    }

    &__header {
      padding: $sidebar-header__padding;
      @include flex(row space-between center);
    }

    &__auth {
      padding: $sidebar-auth__padding;
      @include flex(row center center);
    }

    &__guest {
      flex-grow: 1;

      &::v-deep {
        .auth-guest__link:first-child {
          margin: 0;
        }

        .auth-guest__link,
        .auth-guest__link-inner {
          flex-grow: 1;
        }

        .auth-guest__text {
          padding: 0;
        }
      }
    }

    &__wallet {
      min-width: $sidebar-wallet__min-width;
      background: $sidebar-wallet__background;

      &::v-deep {
        .auth-wallet__content {
          max-width: 50%;
        }
      }
    }

    &__catalogue {
      padding: $sidebar-catalogue__padding;
    }

    &__scroll {
      @include absolute($sidebar-scroll__offset, 0, 0, 0);
    }

    &__back ::v-deep .back-to-casino__text {
      margin: 0 0 16px 0;
    }
  }
</style>
