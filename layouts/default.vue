<template lang="pug">
  // Component template
  .layout(
    :class="classes",
    @keydown="keyup",
    @mousedown="mouseup")
    TheHeader.layout__header(@toggleSidebar="toggle")
    .layout__router
      .layout__content
        Nuxt
      TheBar(v-if="$mq === 'md' || $mq === 'lg'")

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
  import BaseLayout from '@/components/base/BaseLayout.vue';
  import TheHeader from './TheHeader.vue';
  import TheFooter from './TheFooter.vue';
  import TheBar from './TheBar.vue';

  interface Data {
    sidebar: boolean;
    classes: string[];
  }

  export default Vue.extend({
    name: 'App',
    components: {
      BaseLayout,
      TheHeader,
      TheFooter,
      TheBar,
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
    color: $app__color;
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
      margin: 0 auto;
      max-width: $app__max-width;
      @include flex(row);
      min-height: calc(100vh - #{$app-header-height});

      @include media('>=sm') {
        min-height: calc(100vh - #{$app-header-height--r10});
      }
    }

    &__content {
      width: $app-content__width;

      @include media('>=md') {
        width: $app-content__width--r10;
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

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.4s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-to,
  .fade-leave {
    opacity: 1;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 500;
  }

  video {
    width: 100%;
  }

  .iframe-wrap {
    position: relative;
    padding-bottom: 56.25%;
  }

  iframe {
    @include absolute(0 ull null 0);
    @include size(100%);
  }

  p,
  li,
  td,
  th {
    font: $default-p__font;

    @include media('>=sm') {
      font: $default-p__font--r10;
    }
  }

  p a,
  ul li a {
    color: unset;
    border-bottom: 1px solid $n_color-0_8;
    text-decoration: none;
    padding-top: 0.05rem;
    padding-bottom: 0.05rem;
    background: linear-gradient(to bottom, $n_color-0_8 0, $n_color-0_8 100%);
    background-position: 0 100%;
    background-repeat: repeat-x;
    background-size: 0 0;
    transition: background 0.4s ease-in-out, color 0.4s ease-in-out;
    //color: $default-p-a__color;

    &:hover {
      color: #181818;
      background-size: 0.625rem 3.125rem;
      //color: $default-p-a__color--hover;
    }
  }

  .iconsline p {
    @include flex(row flex-start center wrap);
  }

  .fullwidth table {
    width: 100%;
  }

  .bg table tr {
    background: $default-table-tr__background;
  }

  .table {
    &.noheader thead {
      display: none;
    }

    td {
      padding: $default-table-td__padding--r10;
    }

    th {
      text-transform: uppercase;
      padding: $default-table-td__padding--r10;
    }

    @include media('>=sm') {
      td,
      th {
        padding: $default-table-td__padding;
      }
    }
  }

  ::selection {
    background: #ffd55d;
    color: #181818;
  }
</style>
