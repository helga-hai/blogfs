<template lang="pug">
  // Component template.
  .base-close(@click="$emit('close', $event)", data-base-close)
    .base-close__graphic
      img(
        src="@/assets/images/common/close-small.svg",
        svg-inline,
        draggable="false")
</template>

<script lang="ts">
  // Component definition.
  export default {
    // Name of the component.
    name: 'BaseClose'
  };
</script>

<style lang="scss" scoped>
  @import '~@stylize/sass-mixin';

  .base-close {
    padding: $base-close__padding;

    &__graphic {
      cursor: pointer;
      background: $base-close__background;
      @include size($base-close__size);
      @include flex(column center center);

      ::v-deep path {
        stroke: $base-close__color;
      }

      @include support-hover {
        &:hover {
          box-shadow: $base-close__box-shadow--hover;
          background: $base-close__background--hover;
        }
      }
    }
  }
</style>
