<template lang="pug">
  // Component template.
  .base-layout(data-layout)
    .base-layout__content
      slot
</template>

<script lang="ts">
  // Component definition.
  export default {
    // Name of the component.
    name: 'BaseLayout',
  };
</script>

<style lang="scss" scoped>
  @use '~@stylize/sass-mixin' as *;

  .base-layout {
    z-index: $base-layout__z-index;

    &,
    &__content {
      @include flex(column);
    }

    &__content {
      flex-grow: 1;
      margin: $base-layout__margin;

      @include media('>=sm') {
        margin: $base-layout__margin--r10;
      }

      @include media('>=md') {
        margin: $base-layout__margin--r20;
      }
    }
  }
</style>
