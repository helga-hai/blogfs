<template lang="pug">
  // Component template.
  NuxtLink.base-logo(
    :to="localePath('/')",
    data-base-logo)
    img.base-logo__image(
      :src="require('@/assets/images/brand/logo.svg?inline')",
      draggable="false",
      data-base-logo-image)

    img.base-logo__text(
      :src="require('@/assets/images/brand/name.svg?inline')",
      draggable="false",
      data-base-logo-text)
</template>

<script lang="ts">
  // Component definition.
  export default {
    // Name of the component.
    name: 'BaseLogo',
  };
</script>

<style lang="scss" scoped>
  @use '~@stylize/sass-mixin' as *;

  .base-logo {
    @include flex(row center center);

    &__image {
      @include size($base-logo__size);
    }

    &__text {
      padding: $base-logo__padding;
    }
  }
</style>
