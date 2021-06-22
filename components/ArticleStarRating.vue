<template lang="pug">
  // Component template
  .article-star-rating
    client-only
      star-rating.article-star-rating__stars(
        @rating-selected="setRating",
        v-model="rating",
        v-bind:star-size="size",
        v-bind:increment="1",
        v-bind:read-only="readonly",
        v-bind:show-rating="false",
        v-bind:round-start-rating="false")
      .article-star-rating__detail
        .article-star-rating__vote
          span {{ rating }}
          | /{{ votes }} {{ $t('star.votes') }}
        .article-star-rating__done(v-if="save")
          | {{ $t('star.done') }}
</template>

<script lang="ts">
  import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator';
  import type { ArticleInterface } from '~/interface/ArticleInterface';

  @Component({
    // Name of the component
    name: 'ArticleStarRating',
  })
  export default class ArticleStarRatingComponent extends Vue {
    save: boolean = false;
    rating: number = 0;

    @Prop()
    article!: ArticleInterface;

    @Prop({ default: false })
    readonly!: boolean;

    @Prop({ default: 20 })
    size!: number;

    @Watch('article')
    onArticleChanged() {
      setTimeout(() => {
        this.rating = this.ratingCalc;
        this.save = false;
      }, 2000);
    }

    async setRating(rating: number): Promise<any> {
      localStorage.setItem(`rate_${this.article.id}`, '1');
      this.$emit('checkRate');
      const arr: number[] = JSON.parse(this.article.rate);
      arr.push(rating);
      await this.$strapi.update('articles', this.article.id, { rate: JSON.stringify(arr) });
      this.rating = rating;
      this.$emit('articleUpdate');
      this.save = true;
    }

    get ratingCalc(): number {
      const arr: number[] = JSON.parse(this.article.rate);
      const rate: number = arr.reduce((part: number, a: number): number => part + a, 0);
      const num: number = rate / arr.length;
      return Math.round(num * 100) / 100 || 0;
    }

    get votes(): number {
      const arr = JSON.parse(this.article.rate);
      return arr.length;
    }

    mounted() {
      this.rating = this.ratingCalc;
    }
  }
</script>

<style lang="scss" scoped>
  @use '~@stylize/sass-mixin' as *;

  .article-star-rating {
    @include flex(row flex-start center);

    &__detail {
      @include flex(row center center);
    }

    &__vote {
      font-size: 12px;
      font-weight: 100;
      margin-left: 8px;

      @include media('>=sm') {
        font-size: 14px;
      }

      span {
        font-weight: 400;
      }
    }
    &__done {
      font-weight: 100;
      font-size: 12px;
      color: #181818;
      background: $n_color-0_8;
      margin-left: 12px;
      padding: 2px 6px;
      border-radius: 8px;
    }
  }
</style>
