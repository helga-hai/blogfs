<template lang="pug">
  // Component template.
  .base-overlay(data-base-overlay)
    slot
</template>

<script lang="ts">
  // Component definition.
  export default {
    // Name of the component.
    name: 'BaseOverlay',
  };
</script>

<style lang="scss" scoped>
  @import '~@stylize/sass-mixin';

  .base-overlay {
    background: $base-overlay__background;
    @include fixed($base-overlay__position);
  }
</style>
