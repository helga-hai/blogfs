<template lang="pug">
  // Component template.
  h1.base-title
    slot
</template>

<script lang="ts">
  // Component definition.
  export default {
    // Name of the component.
    name: 'BaseTitle',
  };
</script>

<style lang="scss" scoped>
  @use '~@stylize/sass-mixin' as *;

  .base-title {
    text-transform: uppercase;
    color: $base-title__color;
    font: $base-title__font;
    margin: $base-title__margin;

    @include media('>=sm') {
      font: $base-title__font--r10;
      margin: $base-title__margin--r10;
    }

    &:before,
    &:after {
      content: '—';
      padding: 4px;
      color: $base-title__color--pseudo;
    }
  }
</style>
