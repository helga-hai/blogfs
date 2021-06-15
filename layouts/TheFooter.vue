<template lang="pug">
  // Component template
  footer.footer(data-footer)
    .footer__partners
      LazyHydrate(newer)
        FooterPartners

    .footer__legal
      .footer__company
        LazyHydrate(newer)
          FooterDisclaimer.footer__disclaimer
        client-only
          TheShortcut(v-if="prompt")

      LazyHydrate(newer)
        FooterCopyright.footer__copyright
</template>

<script lang="ts">
  import Vue from 'vue';
  import BaseLogo from '@/components/base/BaseLogo.vue';
  import TheShortcut from '@/layouts/TheShortcut.vue';
  import FooterPartners from './footer/FooterPartners.vue';
  import FooterDisclaimer from './footer/FooterDisclaimer.vue';
  import FooterCopyright from './footer/FooterCopyright.vue';

  interface Data {
    prompt: boolean;
  }

  interface GlobalThis extends Window {
    deferredPrompt?: any;
  }

  // Component definition.
  export default Vue.extend({
    // Name of the component
    name: 'TheFooter',
    // Deps of the component
    components: {
      BaseLogo,
      FooterPartners,
      FooterDisclaimer,
      FooterCopyright,
      TheShortcut,
    },
    // Data of the component
    data: (): Data => ({
      prompt: false,
    }),
    // Mounted hook of the component
    mounted(): void {
      const getPrompt = (): void => {
        this.prompt = !!(window as GlobalThis)?.deferredPrompt;
      };
      setTimeout(getPrompt, 5000);
    },
  });
</script>

<style lang="scss" scoped>
  @import '~@stylize/sass-mixin';

  .footer {
    margin: 0 auto;
    padding: $footer-layout__padding;
    max-width: $footer-layout__max-width;

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
      @include flex(column-reverse);

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
