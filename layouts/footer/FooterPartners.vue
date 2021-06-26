<template lang="pug">
  // Component template
  .footer-partner__list(data-footer-partner-list)
    .footer-partner__company(data-footer-partner-company)
      a.footer-partner__link.footer-partner__company-ethereum.footer-partner__company-link(
        href="https://www.ethereum.org",
        rel="nofollow",
        target="_blank",
        data-footer-partner-company-item="ethereum")
        img.footer-partner__company-ethereum-image(
          rel="noreferrer"
          src="@/assets/images/footer/partner/ethereum.svg",
          alt="Ethereum",
          draggable="false")

      .footer-partner__link.footer-partner__company-trueplay.footer-partner__company-link(
        data-footer-partner-company-item="trueplay")
        img.footer-partner__company-trueplay-image(
          rel="noreferrer"
          src="@/assets/images/footer/partner/trueplay.svg",
          alt="TruePlay",
          draggable="false")

    .footer-partner__currency(
      v-if="false",
      data-footer-partner-currency)
      .footer-partner__link.footer-partner__currency-link(
        v-for="currency in currencies",
        :key="currency",
        rel="nofollow",
        :class="`footer-partner__currency-${currency}`",
        :data-footer-partner-currency-item="currency")
        img(
          :src="require(`@/assets/images/footer/partner/${currency}.svg`)",
          :alt="currency",
          draggable="false")
</template>

<script lang="ts">
  import Vue from 'vue';

  // Component data
  interface Data {
    currencies: Array<string>;
  }

  // Component definition
  export default Vue.extend({
    // Name of the component.
    name: 'FooterPartners',
    // Data of the component
    data: (): Data => ({
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
        'paxos',
      ],
    }),
  });
</script>

<style lang="scss" scoped>
  @import '~@stylize/sass-mixin';

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
