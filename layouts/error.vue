<template lang="pug">
  // Component template
  .error
    .error__status
      | {{ error.statusCode }}
    h1.error__title
      | {{ error.name ? `${error.name}: ${error.original}` : error.message }}
    NuxtLink.error__link(:to="localePath('/')")
      | {{ $t('error.home') }}
</template>

<script lang="ts">
  export default {
    layout: 'error',
    name: 'error',
    props: ['error'],
  };
</script>

<style lang="scss" scoped>
  @import '~@stylize/sass-mixin';

  .error {
    text-align: center;
    color: $error__color;
    height: $error__height;
    padding: $error__padding;
    background: $error__background;
    background-position: $error__background-position;
    @include flex(column center center);

    @include media('h<sm') {
      background-position: $error__background-position--r10;
    }

    &__status {
      font: $error-status__font;
    }

    &__title {
      text-transform: uppercase;
    }

    &__link {
      color: $error-link__color;

      &:hover {
        color: $error-link__color--hover;
      }
    }
  }
</style>
