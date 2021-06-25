<template lang="pug">
  // Component template
  .sidebar-navigation__list(data-sidebar-navigation-list)
    NuxtLink.sidebar-navigation__item.sidebar-navigation__item--border(
      v-for="shortcut in categories",
      :key="shortcut.id",
      :to="localePath(`/${shortcut.slug}`)",
      @click.native="$emit('close', $event)",
      active-class="sidebar-navigation__item--active",
      :data-sidebar-navigation-item="shortcut.title")
      | {{ shortcut.title }}

    .sidebar-navigation__group.sidebar-navigation__group-lang(
      :class="{ 'sidebar-navigation__group--active': group.lang }",
      data-sidebar-navigation-group="lang")
      span.sidebar-navigation__item.sidebar-navigation__group-toggle(
        :class="{ 'sidebar-navigation__group-toggle--active': group.lang }",
        @click="toggle('lang')",
        data-sidebar-navigation-group-toggle="lang")
        img(
          :src="`/country/${$i18n.locale}.svg`",
          :alt="$i18n.locale",
          draggable="false")
        span.sidebar-navigation__group-toggle-lang
          | {{ $i18n.locale }}

      LazyHydrate(on-interaction="click")
        TheLanguage.sidebar-navigation__group-content.sidebar-navigation__group-content-lang(
          v-if="group.lang",
          @click.native="$emit('close', $event)")
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapGetters, mapState } from 'vuex';
  // import TheLanguage from '../TheLanguage.vue';

  // Single File Component
  export default Vue.extend({
    // Name of the component
    name: 'SidebarNavigation',
    // Deps of the component
    components: {
      TheLanguage: () => import('../TheLanguage.vue'),
    },
    // Data of the component
    data: (): Record<string, any> => ({
      group: {
        lang: false,
      },
    }),
    // Computed hook of the component
    computed: {
      ...mapGetters('configs', ['activeLang']),
      ...mapState('content', ['categories']),
    },
    // Methods of the component
    methods: {
      toggle(val: string): void {
        this.group[val] = !this.group[val];
      },
    },
  });
</script>

<style lang="scss" scoped>
  @import '~@stylize/sass-mixin';

  .sidebar-navigation {
    &__item {
      display: block;
      cursor: pointer;
      position: relative;
      text-transform: uppercase;
      font: $sidebar-navigation-item__font;
      color: $sidebar-navigation-item__color;
      padding: $sidebar-navigation-item__padding;
      @include flex(row flex-start center);

      &--border {
        border-bottom: $sidebar-navigation-item__border;
      }

      &-badge {
        margin: $sidebar-navigation-item-badge__margin;
      }

      @include support-hover {
        &:hover {
          background-color: $sidebar-navigation-item__background--hover;
        }
      }
    }

    &__group {
      user-select: none;

      &-toggle {
        @include after {
          content: '';
          transition: transform 0.3s;
          transform: translate(-100%, -50%);
          background: $sidebar-navigation-item-arrow__background;
          @include absolute(50%, 0);
          @include size($sidebar-navigation-item-arrow__size);
        }

        &-lang {
          text-transform: uppercase;
          padding: $sidebar-navigation-lang-toggle__padding;
        }

        &--active {
          @include after {
            transform: translate(-100%, -50%) rotate(180deg);
          }
        }
      }

      &-content {
        padding: $sidebar-navigation-group-content__padding;

        &-lang {
          background: $sidebar-navigation-lang-content__background;
        }
      }

      &-item {
        display: block;
        font: $sidebar-navigation-sub-item__font;
        color: $sidebar-navigation-sub-item__color;
        padding: $sidebar-navigation-sub-item__padding;

        @include support-hover {
          &:hover {
            background-color: $sidebar-navigation-sub-item__background--hover;
          }
        }
      }
    }

    &__item,
    &__group-item {
      &--active {
        border-left: none;
        border-right: $sidebar-navigation-item__border--active;
      }
    }
  }
</style>
