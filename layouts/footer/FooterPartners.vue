<template lang="pug">
  //- Component template.
  .footer-partner__list(data-footer-partner-list)
    .footer-partner__company(data-footer-partner-company)
      a.footer-partner__link.footer-partner__company-ethereum.footer-partner__company-link(
        href="https://www.ethereum.org",
        rel="nofollow",
        target="_blank",
        data-footer-partner-company-item="ethereum")
        img.footer-partner__company-ethereum-image(
          src="/static/footer/partner/ethereum.svg",
          alt="Ethereum",
          draggable="false")

      .footer-partner__link.footer-partner__company-trueplay.footer-partner__company-link(
        data-footer-partner-company-item="trueplay")
        img.footer-partner__company-trueplay-image(
          src="/static/footer/partner/trueplay.svg",
          alt="TruePlay",
          draggable="false")

      .footer-partner__link.footer-partner__company-curacao.footer-partner__company-link(
        data-footer-partner-company-item="curacao")
        div(
          :id="'ceg-' + key",
          :data-ceg-seal-id="key",
          data-ceg-image-size="32",
          data-ceg-image-type="basic-small")

    .footer-partner__currency(data-footer-partner-currency)
      a.footer-partner__link.footer-partner__currency-link(
        v-for="currency in currencies",
        :key="currency",
        :href="authUrl",
        rel="nofollow",
        :class="`footer-partner__currency-${currency}`",
        @click="cacheWindowUrl(redirectUrl)",
        :data-footer-partner-currency-item="currency")
        img(
          :src="`/static/footer/partner/${currency}.svg`",
          :alt="currency",
          draggable="false")
</template>

<script lang="ts">
  import { mapGetters } from 'vuex';
  import { authUrl } from '@/constant/Auth';
  import { cacheWindowUrl } from '@/helpers/location';

  // Component data.
  interface Data {
    key: string;
    authUrl: string;
    currencies: string[];
  }
  // Component definition.
  export default {
    // Name of the component.
    name: 'FooterPartners',
    // Data of the component.
    data: (): Data => ({
      // Key to validate curacao license.
      key: '46399d31-9c70-4464-81eb-ca42db7f8f5f',
      authUrl,
      currencies: [
        'visa',
        'mir',
        'ethereum',
        'bitcoin',
        'tether',
        'dash',
        'yandex_money',
        'monero',
        'dogecoin',
        'neo',
        'cardano',
        'bitcoincash',
        'ripple',
        'nem',
        'stellar',
        'binance',
        'usdcoin',
        'b2bx',
        'eos',
        'gemini',
        'paxos'
      ]
    }),
    // Computed of the component.
    computed: {
      ...mapGetters('configs', ['isPrerender']),
      redirectUrl(): string {
        return window.location.origin + this.$router.resolve({ name: 'cashier' }).href;
      }
    },
    methods: {
      cacheWindowUrl
    },
    // Mounted hook of the component.
    mounted(): void {
      if (!this.isPrerender)
        // Load curacao license validator on main website.
        this.$loadScript(`https://${this.key}.curacao-egaming.com/ceg-seal.js`);
    }
  };
</script>

<style lang="scss" scoped>
  @use '~@stylize/sass-mixin' as *;

  .footer-partner {
    &__list {
      @include flex(column center center);
    }

    &__link {
      height: $footer-partner-item-image__height;
      @include flex(row center center);
    }

    &__company,
    &__currency {
      flex-wrap: wrap;
    }

    &__company {
      width: 100%;
      @include flex(row space-around center);

      &-link {
        width: auto;
        margin: $footer-partner-company-item__margin;

        @include media('>=xs') {
          width: $footer-partner-item-image__width--r10;
        }

        @include media('>=sm') {
          margin: $footer-partner-company-item__margin--r10;
        }

        @include media('>=md') {
          width: auto;
        }
      }

      &-ethereum-image {
        @include size(159px, 47px);
      }

      &-trueplay-image {
        @include size(84px, 28px);
      }

      @include media('>=sm') {
        width: auto;
      }

      @include media('>=md') {
        flex-grow: 0.4;
        flex-wrap: nowrap;
        justify-content: space-between;
      }
    }

    &__currency {
      padding: $footer-partner-currency__padding;
      @include flex(row center center);

      &-link {
        width: $footer-partner-item-image__width;
        margin: $footer-partner-currency-item__margin;

        @include media('>=360px') {
          width: $footer-partner-item-image__width--r10;
          margin: $footer-partner-currency-item__margin--r10;
        }
      }

      @include media('>=md') {
        &-visa {
          width: 136px;
        }

        &-ethereum {
          width: 129px;
        }

        &-mir {
          width: 88px;
        }

        &-bitcoin {
          width: 127px;
        }

        &-tether {
          width: 128px;
        }

        &-dash {
          width: 99px;
        }

        &-yandex-money {
          width: 120px;
        }

        &-monero {
          width: 130px;
        }

        &-dogecoin {
          width: 128px;
        }

        &-neo {
          width: 99px;
        }

        &-cardano {
          width: 121px;
        }

        &-bitcoincash {
          width: 140px;
        }

        &-ripple {
          width: 125px;
        }

        &-nem {
          width: 70px;
        }

        &-stellar {
          width: 155px;
        }

        &-binance {
          width: 130px;
        }

        &-usdcoin {
          width: 125px;
        }

        &-b2bx {
          width: 100px;
        }

        &-eos {
          width: 132px;
        }

        &-gemini {
          width: 110px;
        }

        &-paxos {
          width: 130px;
        }
      }
    }
  }
</style>
