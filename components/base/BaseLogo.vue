<template lang="pug">
  // Component template.
  RouterLink.base-logo(
    :to="{ name: 'home' }",
    data-base-logo)
    img.base-logo__image(
      src="@/assets/images/brand/logo.svg?inline",
      :alt="$t('website.logo.alt', [$t('website.name')])",
      :title="$t('website.logo.title', [$t('website.name')])",
      draggable="false",
      data-base-logo-image)

    img.base-logo__text(
      src="@/assets/images/brand/name.svg?inline",
      :alt="$t('website.logo.alt', [$t('website.name')])",
      :title="$t('website.logo.title', [$t('website.name')])",
      draggable="false",
      data-base-logo-text)
</template>

<script lang="ts">
  // Component definition.
  export default {
    // Name of the component.
    name: 'BaseLogo'
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
