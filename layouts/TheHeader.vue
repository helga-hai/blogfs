<template lang="pug">
  // Component template
  footer.footer(data-footer)
    .footer__top
      .footer__general
        .footer__general-block.footer__general-block--top
          .footer__general-logo
            BaseLogo(data-footer-logo)

    .footer__partners
      FooterPartners

    .footer__legal
      .footer__company
        FooterDisclaimer.footer__disclaimer
        //FooterGambling.footer__gambling
      FooterCopyright.footer__copyright
</template>

<script lang="ts">
  import BaseLogo from '@/components/base/BaseLogo.vue';
  import FooterPartners from './footer/FooterPartners.vue';
  import FooterDisclaimer from './footer/FooterDisclaimer.vue';
  import FooterCopyright from './footer/FooterCopyright.vue';

  // Component definition.
  export default {
    name: 'TheFooter',
    // Deps of the component
    components: {
      BaseLogo,
      FooterPartners,
      FooterDisclaimer,
      FooterCopyright,
    },
  };
</script>

<style lang="scss" scoped>
  @import '~@stylize/sass-mixin';

  .footer {
    margin: 0 auto;
    padding: $footer-layout__padding;
    max-width: $footer-layout__max-width;
    background: $footer-layout__background;

    &__top {
      @include flex(column space-between);

      @include media('>=md') {
        @include flex(row);
      }
    }

    &__general {
      flex: 1.4 0 0;

      &-block {
        flex-wrap: wrap;
        @include flex(row space-between center);

        &--top {
          @include media('>=md') {
            @include flex(column stretch flex-start);
          }
        }
      }

      &-grow {
        flex-grow: 1;
      }

      &-awards,
      &-socials {
        margin: $footer-layout-general__margin;
      }

      &-logo {
        @include flex(row);
      }

      &-logo,
      &-language,
      &-affiliates {
        margin: $footer-layout-general__margin--right;
      }

      &-socials {
        @include media('>=md') {
          margin: $footer-layout-general__margin--right;
        }
      }
    }

    &__navigation {
      flex: 1 0 0;
    }

    &__partners {
      margin: $footer-layout-partner__margin;
      padding: $footer-layout-partner__padding;

      @include media('>=md') {
        border-top: $footer-layout-partner__border;
        border-bottom: $footer-layout-partner__border;
      }
    }

    &__company {
      @include flex(column);

      @include media('>=md') {
        @include flex(row space-between);
      }
    }

    &__gambling {
      margin: $footer-layout-gambling__margin;

      @include media('>=md') {
        margin: $footer-layout-gambling__margin--r10;
      }
    }

    &__copyright {
      padding: $footer-layout-copyright__padding;

      @include media('>=md') {
        padding: $footer-layout-copyright__padding--r10;
      }
    }

    &__disclaimer {
      @include media('>=md') {
        max-width: $footer-layout-disclaimer__max-width;
      }
    }
  }
</style>
