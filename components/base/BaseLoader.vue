<template lang="pug">
  // Component template
  .base-loader
    .base-loader__dot(
      :class="cssClasses",
      :key="index",
      v-for="index in dots")
</template>

<script lang="ts">
  import Vue from 'vue';
  import type { PropType } from 'vue';

  // Single File Component.
  export default Vue.extend({
    // Name f te component.
    name: 'BaseLoader',
    // Props of the component.
    props: {
      dots: {
        type: Number as PropType<number>,
        default: 3,
      },
      variant: {
        type: String as PropType<string>,
        default: 'secondary',
      },
    },
    // Computed of the component.
    computed: {
      // Get CSS classes based on props.
      cssClasses(): string {
        return `base-loader__dot--${this.variant}`;
      },
    },
  });
</script>

<style lang="scss" scoped>
  @use '~@stylize/sass-mixin' as *;

  @keyframes dot-keyframes {
    0% {
      opacity: 0.4;
      transform: scale(1, 1);
    }

    50% {
      opacity: 1;
      transform: scale(1.2, 1.2);
    }

    100% {
      opacity: 0.4;
      transform: scale(1, 1);
    }
  }

  .base-loader {
    text-align: center;

    &__dot {
      display: inline-block;
      animation: dot-keyframes 1.5s infinite ease-in-out;
      border-radius: $base-loader-dot__border-radius;
      margin: $base-loader-dot__margin;
      @include size($base-loader-dot__size);

      &:nth-child(2) {
        animation-delay: 0.5s;
      }

      &:nth-child(3) {
        animation-delay: 1s;
      }

      &--primary {
        background-color: $base-loader-primary__color;
      }

      &--secondary {
        background-color: $base-loader-secondary__color;
      }
    }
  }
</style>
