<template lang="pug">
  // Component template
  .layout(
    :class="classes",
    @keydown="keyup",
    @mousedown="mouseup")
    TheHeader.layout__header(@toggleSidebar="toggle")
    .layout__router
      Nuxt

    transition(name="fade")
      BaseOverlay.layout__overlay(v-if="$store.state.layout.overlay")

    transition(name="slide")
      TheSidebar.layout__sidebar(
        v-if="sidebar",
        @close="toggle",
        v-click-outside="toggle")

    TheFooter
</template>

<script lang="ts">
  import Vue from 'vue';
  import TheHeader from './TheHeader.vue';
  import TheFooter from './TheFooter.vue';

  interface Data {
    sidebar: boolean;
    classes: string[];
  }

  export default Vue.extend({
    name: 'App',
    components: {
      TheHeader,
      TheFooter,
      TheSidebar: (): any => import('@/layouts/TheSidebar.vue'),
      BaseOverlay: (): any => import('@/components/base/BaseOverlay.vue'),
    },
    data: (): Data => ({
      sidebar: false,
      classes: [],
    }),
    methods: {
      toggle(): void {
        this.sidebar = !this.sidebar;
        this.overlay();
      },
      overlay(): void {
        if (this.sidebar) {
          this.$store.dispatch('layout/showOverlay');
        } else {
          this.$store.dispatch('layout/hideOverlay');
        }
      },
      keyup(): void {
        this.classes = ['using-keyboard'];
      },
      mouseup(): void {
        this.classes = ['using-mouse'];
      },
    },
  });
</script>

<style lang="scss">
  @import '~@stylize/sass-mixin';

  html,
  body {
    margin: 0;
  }

  html {
    @include size(100%);
  }

  body {
    min-height: 100%;
    background: $app__background;
  }

  .layout {
    position: relative;
    background: $app__background;

    :focus {
      box-shadow: none;
    }

    &.using-keyboard :focus,
    &:not(.using-mouse) :focus {
      outline: 0;
    }

    &__router {
      display: flex;
      flex-direction: column;
      position: relative;
      min-height: calc(100vh - #{$app-header-height});

      @include media('>=sm') {
        min-height: calc(100vh - #{$app-header-height--r10});
      }

      &-view {
        flex-grow: 1;
      }
    }

    &__sidebar {
      position: fixed;
      top: 0;
      bottom: 0;
      right: auto;
      left: 0;
      z-index: 11003;
    }

    &__overlay {
      z-index: 11002;
    }

    svg {
      width: auto;
      height: auto;
    }
  }

  * {
    &,
    &:before,
    &:after {
      box-sizing: border-box;
      font-family: 'Stolzl', Arial, sans-serif;
    }
  }

  *:focus {
    outline: none;
  }

  a,
  a:visited {
    text-decoration: none;
  }

  .opacity {
    &-leave-active,
    &-enter-active {
      transition: opacity 0.3s ease-out;
    }

    &-enter,
    &-leave-to {
      opacity: 0;
    }

    &-leave,
    &-enter-to {
      opacity: 1;
    }
  }

  .slide-leave-active,
  .slide-enter-active {
    transition: 0.4s ease-in-out;
  }

  .slide-enter,
  .slide-leave-to {
    transform: translateX(-100%);
  }

  .slide-leave,
  .slide-enter-to {
    transform: translateX(0);
  }
</style>
