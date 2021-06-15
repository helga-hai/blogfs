<template lang="pug">
  // Component template
  .category
    .category__content(v-if="category")
      BaseTitle
        | {{ category.title }}
      template(v-if="category.description")
        .category__description(v-html="$md.render(category.description)")
      .category__catalog
        Catalogue(:items="articles")
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'nuxt-property-decorator';
  import type { MetaInfo } from 'vue-meta';
  import { getStrapiMedia } from '~/utils/medias';
  import { getMetaTags } from '~/utils/seo';
  import BaseTitle from '~/components/base/BaseTitle.vue';
  import Catalogue from '~/components/Catalogue.vue';
  import type { CategoryInterface } from '~/interface/CategoryInterface';
  import type { ArticleInterface } from '~/interface/ArticleInterface';

  @Component({
    // Name of the component
    name: 'Category',
    // Deps of the component
    components: { BaseTitle, Catalogue },
    // Methods of the component
    methods: {
      getStrapiMedia,
    },
  })
  export default class CategoryComponent extends Vue {
    @Prop()
    articles!: ArticleInterface[];

    @Prop()
    category!: CategoryInterface;

    // Head hook of the component
    head(): MetaInfo {
      const fullSeo = {
        metaTitle: this.category.seo.metaTitle,
        metaDescription: this.category.seo.metaDescription,
        shareImage: this.category.seo.sharedImage.media,
        preventIndexing: this.category.preventIndexing,
      };
      const data: MetaInfo = {
        title: fullSeo.metaTitle,
        meta: getMetaTags(fullSeo),
      };
      if (this.category.structuredData) {
        // @ts-ignore
        data.script = [{ type: 'application/ld+json', json: this.category.structuredData }];
      }
      return data;
    }
  }
</script>

<style lang="scss" scoped>
  @use '~@stylize/sass-mixin' as *;

  .category {
    text-align: center;

    &__title {
      text-align: center;
      text-transform: uppercase;
    }

    &__description {
      text-align: left;
      padding: $category-description__padding;
    }

    &__catalog {
      margin: $category-catalog__margin;
    }
  }
</style>
