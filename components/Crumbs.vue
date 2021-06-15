<template lang="pug">
  // Component template
  .crumbs(data-sidebar)
    .crumbs__content
      ol.crumbs__list(
        vocab="http://schema.org/",
        typeof="BreadcrumbList")
        li.crumbs__item(
          property="itemListElement",
          typeof="ListItem")
          NuxtLink.crumbs__link(
            property="item",
            typeof="WebPage",
            :to="localePath('/')")
            span(property="name")
              | {{ $t('website.home') }}
            meta(
              property="position",
              :content="1")

        li.crumbs__item(
          v-if="crumb",
          property="itemListElement",
          typeof="ListItem")
          NuxtLink.crumbs__link(
            property="item",
            typeof="WebPage",
            :to="localePath(`/${crumb.path}`)")
            span(property="name")
              | {{ crumb.title }}
            meta(
              property="position",
              :content="2")
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'nuxt-property-decorator';

  interface Crumb {
    title: string;
    path: string;
  }

  @Component({
    // Name of the component
    name: 'Crumbs',
  })
  export default class CrumbsComponent extends Vue {
    @Prop()
    crumb!: Crumb;
  }
</script>

<style lang="scss" scoped>
  @use '~@stylize/sass-mixin' as *;

  .crumbs {
    margin: 0 auto;
    max-width: $app__max-width;

    &__list {
      list-style: none;
      position: relative;
      margin: $crumb-ol__margin;
      padding: $crumb-ol__padding;

      @include after('') {
        width: 100%;
        height: 1px;
        background: $color-18_7;
        @include absolute(auto 0 -8px 0);
      }
    }

    &__item {
      text-transform: uppercase;
      display: inline;

      @include after(' / ') {
        display: inline;
        font-size: 0.9em;
        padding: 0 0.0725em 0 0.15em;
        color: $crumb__color;
      }

      &:last-child {
        @include after('');
      }
    }

    &__link,
    &__link.nuxt-link-exact-active.nuxt-link-active {
      color: $crumb__color;
    }
  }
</style>
