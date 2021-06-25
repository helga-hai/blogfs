<template lang="pug">
  // Component template
  .subscribe
    .subscribe__bg
      img(
        width="100%",
        src="@/assets/images/bar/subscribe.svg")
    .subscribe__form
      .subscribe__form-title
        | {{ $store.state.content.subscribeTitle }}
      .subscribe__form-subtitle
        | {{ $store.state.content.subscribeSubtitle }}

      BaseInput.subscribe__form-input(
        :class="[isEmailValid()]",
        :value="email",
        :placeholder="$t('subscribe.placeholder')",
        @input="onInputEmail",
        data-subscribe-input)

      BaseButton.subscribe__form-submit(
        variant="primary",
        size="xs",
        :loading="loading",
        @click="onSubscribe()")
        | {{ $t('bar.subscribe') }}
</template>

<script lang="ts">
  import { Vue, Component } from 'nuxt-property-decorator';
  import BaseButton from '@/components/base/BaseButton.vue';
  import BaseInput from '@/components/base/BaseInput_v2.vue';
  import { getStrapiMedia } from '@/utils/medias.js';

  @Component({
    // Name of the component
    name: 'Subscribe',
    // Deps of the component
    components: { BaseButton, BaseInput },
    // Methods of the component
    methods: { getStrapiMedia },
  })
  export default class SubscribeClass extends Vue {
    $store!: any;
    $route!: any;
    $refs!: any;
    loading: boolean = false;
    email: string = '';
    reg: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;

    isEmailValid(): string {
      return this.email === '' ? '' : this.reg.test(this.email) ? 'has-success' : 'has-error';
    }

    onInputEmail(email: string): void {
      this.email = email;
    }

    async onSubscribe(): Promise<any> {
      if (this.isEmailValid() === 'has-success') {
        this.loading = true;
        const subscribe = await this.$strapi.find('subscribe', {
          _locale: this.$store.getters['configs/activeLang'],
        });
        const allEmails = subscribe.email.concat(`;${this.email}`);
        try {
          await this.$strapi.update('subtitle', subscribe.id, { email: allEmails });
        } catch (error) {
          console.log(error);
        }
        this.loading = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@stylize/sass-mixin';

  .subscribe {
    position: relative;

    &__bg {
      padding: 1px;
    }

    &__form {
      text-align: center;
      @include absolute(0 0 0 0);
      @include flex(column center center);
      padding: $subscribe-form__padding;

      &-title {
        margin: $subscribe-title__margin;
      }

      &-subtitle {
        font: $subscribe-subtitle__font;
        margin: $subscribe-subtitle__margin;
      }

      &-input {
        width: 80%;
        margin: $subscribe-input__margin;
        border: $subscribe-input__border;

        ::v-deep .base-input__control {
          min-height: $subscribe-input__min-height;
        }

        &.has-error {
          border: $subscribe-input__border--error;
          border-radius: $subscribe-input__border-radius;
        }
      }

      &-submit {
        width: 80%;
        text-transform: uppercase;
        margin: $subscribe-submit__margin;
      }
    }
  }
</style>
