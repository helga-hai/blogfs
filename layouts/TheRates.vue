<template lang="pug">
  // Component template
  .rates(data-rates)
    .rates__content
      template(v-if="rates")
        .rates__currency(
          v-for="item in rates",
          :key="item.id")
          .rates__value.rates__value--img
            img(
              :src="require(`@/assets/images/currency/${item.id}.svg`)",
              draggable="false")
          .rates__value.rates__value--symbol
            | {{ item.symbol }}
          .rates__value.rates__value--price
            | {{ item.priceUsd | numeral('$0,0.00') }}
          .rates__value.rates__value--change(:class="[item.changePercent24Hr > 0 ? 'plus' : 'minus']")
            | ({{ item.changePercent24Hr | numeral('0.00') }}%)
</template>

<script lang="ts">
  import { Vue, Component } from 'nuxt-property-decorator';
  import BaseBlock from '@/components/base/BaseBlock.vue';
  import List from '@/components/List.vue';

  @Component({
    // Name of the component
    name: 'TheRates',
    // Deps of the component
    components: { BaseBlock, List },
    // Data of the component
    data() {
      return {
        rates: null,
      };
    },
  })
  export default class TheRatesClass extends Vue {
    $axios!: any;
    rates!: any;

    async getRates() {
      const response = await this.$axios.$get(
        'https://api.coincap.io/v2/assets?ids=bitcoin,ethereum,dash,bitcoin-cash'
      );
      this.rates = response.data;
    }

    mounted() {
      this.getRates();
      setInterval(() => {
        this.getRates();
      }, 4000);
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@stylize/sass-mixin';

  .rates {
    width: 100%;
    padding: $rates__padding;
    margin: $rates__margin;
    background: $rates__background;
    overflow: hidden;

    &__content {
      color: white;
      max-width: 960px;
      overflow: auto;
      @include flex(row space-evenly center);
      margin: $rates-content__margin;
      padding: $rates-content__padding;
    }

    &__currency {
      margin: 0 10px;
      @include flex(row center center);
    }

    &__value {
      font: $rates-value__font;
      margin: $rates-value__margin;

      img {
        @include size(22px);
      }

      &--price {
        font-weight: 700;
      }

      &--change {
        &.plus {
          color: #2dff29;
        }
        &.minus {
          color: #ff2929;
        }
      }
    }
  }
</style>
