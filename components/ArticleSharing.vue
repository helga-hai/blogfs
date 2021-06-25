<template lang="pug">
  // Component template
  .article-sharing__layout(:class="cssClass")
    .article-sharing__title
      | {{ $t('article.share') }}:

    button.article-sharing__link(@click="copyToClipboard")
      .article-sharing.article-sharing--telegram.article-sharing--medium(
        :class="{'article-sharing--check': check}")
        .article-sharing__icon.article-sharing__icon--solid(aria-hidden="true")
          span.article-sharing__icon.article-sharing__icon--link(v-html="RawLink")
          span.article-sharing__icon.article-sharing__icon--check(v-html="RawCheck")
          span.article-sharing__text {{ copyText }}

    a.article-sharing__link(
      :href="`https://facebook.com/sharer/sharer.php?u=${url}`",
      target="_blank",
      rel="noopener",
      aria-label="Facebook")
      .article-sharing.article-sharing--facebook.article-sharing--medium
        .article-sharing__icon.article-sharing__icon--solid(aria-hidden="true")
          span.article-sharing__icon(v-html="RawFb")
          span.article-sharing__text Facebook

    a.article-sharing__link(
      :href="`https://twitter.com/intent/tweet/?url=${url}`",
      target="_blank",
      rel="noopener",
      aria-label="Twitter")
      .article-sharing.article-sharing--twitter.article-sharing--medium
        .article-sharing__icon.article-sharing__icon--solid(aria-hidden="true")
          span.article-sharing__icon(v-html="RawTwitter")
          span.article-sharing__text Twitter

    button.article-sharing__link(
      @click="isShow = !isShow",
      v-show="!isShow")
      .article-sharing.article-sharing--vk.article-sharing--medium
        .article-sharing__icon.article-sharing__icon--solid(aria-hidden="true")
          span.article-sharing__icon(v-html="RawDots")

    button.article-sharing__link(
      @click="isShow = false",
      v-show="isShow && short")
      .article-sharing.article-sharing--vk.article-sharing--medium
        .article-sharing__icon.article-sharing__icon--solid(aria-hidden="true")
          span.article-sharing__icon(v-html="RawCross")

    span.article-sharing__more(v-show="isShow")
      .article-sharing__more-text
        | share

      a.article-sharing__link(
        :href="`https://telegram.me/share/url?url=${url}`",
        target="_blank",
        rel="noopener",
        aria-label="Telegram")
        .article-sharing.article-sharing--telegram.article-sharing--medium
          .article-sharing__icon.article-sharing__icon--solid(aria-hidden="true")
            span.article-sharing__icon(v-html="RawTelegram")
            span.article-sharing__text Telegram

      a.article-sharing__link(
        :href="`https://www.tumblr.com/widgets/share/tool?posttype=link&amp;content=${url}&amp;canonicalUrl=${url}&amp;shareSource=tumblr_share_button`",
        target="_blank",
        rel="noopener",
        aria-label="Tumblr")
        .article-sharing.article-sharing--tumblr.article-sharing--medium
          .article-sharing__icon.article-sharing__icon--solid(aria-hidden="true")
            span.article-sharing__icon(v-html="RawTumblr")
            span.article-sharing__text Tumblr

      a.article-sharing__link(
        :href="`mailto:?body=${url}`",
        target="_self",
        rel="noopener",
        aria-label="E-Mail")
        .article-sharing.article-sharing--email.article-sharing--medium
          .article-sharing__icon.article-sharing__icon--solid(aria-hidden="true")
            span.article-sharing__icon(v-html="RawEmail")
            span.article-sharing__text E-Mail

      a.article-sharing__link(
        :href="`https://pinterest.com/pin/create/button/?url=${url}&amp;media=${url}`",
        target="_blank",
        rel="noopener",
        aria-label="Pinterest")
        .article-sharing.article-sharing--pinterest.article-sharing--medium
          .article-sharing__icon.article-sharing__icon--solid(aria-hidden="true")
            span.article-sharing__icon(v-html="RawPinterest")
            span.article-sharing__text Pinterest

      a.article-sharing__link(
        :href="`https://www.linkedin.com/shareArticle?mini=true&url=${url}&source=${url}`",
        target="_blank",
        rel="noopener",
        aria-label="LinkedIn")
        .article-sharing.article-sharing--linkedin.article-sharing--medium
          .article-sharing__icon.article-sharing__icon--solid(aria-hidden="true")
            span.article-sharing__icon(v-html="RawLinkedin")
            span.article-sharing__text LinkedIn

      a.article-sharing__link(
        :href="`https://reddit.com/submit/?url=${url}&amp;resubmit=true`",
        target="_blank",
        rel="noopener",
        aria-label="Reddit")
        .article-sharing.article-sharing--reddit.article-sharing--medium
          .article-sharing__icon.article-sharing__icon--solid(aria-hidden="true")
            span.article-sharing__icon(v-html="RawReddit")
            span.article-sharing__text Reddit

      a.article-sharing__link(
        :href="`whatsapp://send?${url}`",
        target="_blank",
        rel="noopener",
        aria-label="WhatsApp")
        .article-sharing.article-sharing--whatsapp.article-sharing--medium
          .article-sharing__icon.article-sharing__icon--solid(aria-hidden="true")
            span.article-sharing__icon(v-html="RawWhatsapp")
            span.article-sharing__text WhatsApp

      a.article-sharing__link(
        :href="`http://vk.com/share.php?url=${url}`",
        target="_blank",
        rel="noopener",
        aria-label="VK")
        .article-sharing.article-sharing--vk.article-sharing--medium
          .article-sharing__icon.article-sharing__icon--solid(aria-hidden="true")
            span.article-sharing__icon(v-html="RawVk")
            span.article-sharing__text VK
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'nuxt-property-decorator';
  import { mapGetters } from 'vuex';
  import type { TranslateResult } from 'vue-i18n';
  // @ts-ignore
  import RawFb from '~/assets/images/bar/sharing-fb.svg?raw';
  // @ts-ignore
  import RawTwitter from '~/assets/images/bar/sharing-twitter.svg?raw';
  // @ts-ignore
  import RawTelegram from '~/assets/images/bar/sharing-telegram.svg?raw';
  // @ts-ignore
  import RawTumblr from '~/assets/images/bar/sharing-tumblr.svg?raw';
  // @ts-ignore
  import RawEmail from '~/assets/images/bar/sharing-email.svg?raw';
  // @ts-ignore
  import RawPinterest from '~/assets/images/bar/sharing-pinterest.svg?raw';
  // @ts-ignore
  import RawLinkedin from '~/assets/images/bar/sharing-linkedin.svg?raw';
  // @ts-ignore
  import RawReddit from '~/assets/images/bar/sharing-reddit.svg?raw';
  // @ts-ignore
  import RawWhatsapp from '~/assets/images/bar/sharing-whatsapp.svg?raw';
  // @ts-ignore
  import RawVk from '~/assets/images/bar/sharing-vk.svg?raw';
  // @ts-ignore
  import RawLink from '~/assets/images/bar/sharing-link.svg?raw';
  // @ts-ignore
  import RawDots from '~/assets/images/bar/sharing-dots.svg?raw';
  // @ts-ignore
  import RawClose from '~/assets/images/common/close-small.svg?raw';
  // @ts-ignore
  import RawCross from '~/assets/images/bar/sharing-cross.svg?raw';
  // @ts-ignore
  import RawCheck from '~/assets/images/bar/sharing-check.svg?raw';

  @Component({
    // Name of the component
    name: 'ArticleSharing',
    // Computeds of component
    computed: mapGetters('configs', ['activeLang']),
    // Data of the component
    data(): Record<string, any> {
      return {
        isShow: false,
        copyText: this.$t('copy.before'),
        check: false,
        RawFb,
        RawTwitter,
        RawTelegram,
        RawTumblr,
        RawEmail,
        RawPinterest,
        RawLinkedin,
        RawReddit,
        RawWhatsapp,
        RawVk,
        RawLink,
        RawDots,
        RawClose,
        RawCross,
        RawCheck,
      };
    },
  })
  export default class ArticleSharingComponent extends Vue {
    $router!: any;
    check!: boolean;
    activeLang!: any;
    copyText!: TranslateResult;
    isShow!: boolean;

    @Prop()
    short!: boolean;

    get url(): string {
      return `https://hardcore-pare-196c1f.netlify.app${this.activeLang !== 'en' ? '/ru' : ''}${this.$route.path}`;
    }

    copyToClipboard() {
      this.check = true;
      window.navigator.clipboard.writeText(this.url);
      this.copyText = this.$t('copy.after');
      setTimeout(() => (this.check = false), 2000);
    }

    get cssClass() {
      return {
        'article-sharing__layout--short': this.short,
        'article-sharing__layout--short-open': this.short && this.isShow,
      };
    }
  }
</script>

<style lang="scss" scoped>
  @use '~@stylize/sass-mixin' as *;

  .article-sharing {
    $selector: &;
    font-size: $article-sharing__font-size;
    padding: $article-sharing__padding;
    background: $article-sharing__background;

    &:hover {
      background: $article-sharing__background--hover;
    }

    &__title {
      padding: $article-sharing-title__padding;
      display: inline;
    }

    &__layout {
      margin: $article-sharing-layout__margin;

      &--short {
        min-width: $article-sharing-layout-short__width;
        position: relative;
        margin: $article-sharing-layout-short__margin;

        #{$selector} {
          font-size: $article-sharing-short__font-size;
          background: $article-sharing-short__background;

          &:hover {
            background: none;
          }

          &__text,
          &__title {
            display: none;
          }

          &__more {
            display: block;
            @include absolute(34px null null 0);
            width: $article-sharing-more__width;
            background: $article-sharing-more__background;
            box-shadow: $article-sharing-more__box-shadow;

            &-text {
              @include absolute(33px -19px);
              transform: rotate(-90deg);
              font-weight: 100;
              letter-spacing: 4px;
              display: block;
              text-transform: uppercase;
            }
          }

          &__icon ::v-deep svg {
            fill: $article-sharing-short__color;
          }
        }

        &-open {
          box-shadow: $article-sharing-layout-short-open__box-shadow;
        }
      }
    }

    &__link {
      border: none;
      padding: unset;
      cursor: pointer;
      background: none;
      text-decoration: none;
      display: inline-block;
      color: $article-sharing__color;
      margin: $article-sharing__margin;
    }

    &__icon {
      display: inline-block;

      &--check {
        display: none;
      }
      ::v-deep svg {
        vertical-align: top;
        @include size(1em);
        fill: $article-sharing__color;
      }

      #{$selector}__text {
        margin-left: $article-sharing-icon-svg__msrgin-left;
      }
    }

    &__more-text {
      display: none;
    }

    &--check {
      #{$selector}__icon--link {
        display: none;
      }
      #{$selector}__icon--check {
        display: inline;
      }
    }
  }
</style>
