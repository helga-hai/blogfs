<template lang="pug">
  // Component template.
  button.base-button(
    type="button",
    :name="id",
    :class="cssClasses",
    :disabled="disabled",
    :data-base-button="variant",
    v-on="$listeners")
    .base-button__loader(v-if="loading")
      BaseLoader(:variant="variant")
    .base-button__content(v-hidden="loading")
      slot
</template>

<script lang="ts">
  import Vue from 'vue';
  import BaseLoader from '@/components/base/BaseLoader.vue';
  import type { PropType } from 'vue';

  // Component definition.
  export default Vue.extend({
    // Name of the component.
    name: 'BaseButton',
    // Deps of the component.
    components: { BaseLoader },
    // Props of the component.
    props: {
      // Unique ID.
      id: {
        type: String as PropType<string>,
      },
      // Button size.
      size: {
        type: String as PropType<string>,
        default: 'sm',
      },
      // Button variant.
      variant: {
        type: String as PropType<string>,
        default: 'secondary',
      },
      // Determine whether disabled.
      disabled: {
        type: Boolean as PropType<boolean>,
      },
      // Determine whether loading.
      loading: {
        type: Boolean as PropType<boolean>,
      },
    },
    // Computed of the component.
    computed: {
      // Get CSS classes based on props.
      cssClasses(): Record<string, string | boolean> {
        return {
          ['base-button--disabled']: this.disabled,
          ['base-button--' + this.size]: this.size,
          ['base-button--' + this.variant]: this.variant,
        };
      },
    },
  });
</script>

<style lang="scss" scoped>
  @import '~@stylize/sass-mixin';

  .base-button {
    cursor: pointer;
    user-select: none;
    position: relative;
    padding: $base-button__padding;
    @include flex(row center center);

    &[disabled] {
      cursor: not-allowed;
    }

    &--xs {
      font: $base-button__font--xs;
      min-height: $base-button__min-height--xs;
      border-radius: $base-button__border-radius--sm;
    }

    &--sm {
      font: $base-button__font--sm;
      min-height: $base-button__min-height--sm;
      border-radius: $base-button__border-radius--sm;
    }

    &--lg {
      font: $base-button__font--lg;
      min-height: $base-button__min-height--lg;
      border-radius: $base-button__border-radius--lg;
    }

    &--primary {
      color: $base-button-primary__color;
      border: $base-button-primary__border;
      background: $base-button-primary__background;

      &[disabled] {
        color: $base-button-primary__color--disabled;
        border: $base-button-primary__border--disabled;
        box-shadow: $base-button-primary__shadow--disabled;
        background: $base-button-primary__background--disabled;
      }

      &:active:not([disabled]) {
        color: $base-button-primary__color--active;
        border: $base-button-primary__border--active;
        box-shadow: $base-button-primary__shadow--active;
        background: $base-button-primary__background--active;
      }

      @include support-hover {
        &:hover:not([disabled]) {
          border: $base-button-primary__border--hover;
          box-shadow: $base-button-primary__shadow--hover;
          background: $base-button-primary__background--hover;
        }
      }
    }

    &--secondary {
      color: $base-button-secondary__color;
      border: $base-button-secondary__border;
      background: $base-button-secondary__background;

      &[disabled] {
        color: $base-button-secondary__color--disabled;
        border: $base-button-secondary__border--disabled;
        background: $base-button-secondary__background--disabled;
      }

      &:active:not([disabled]) {
        color: $base-button-secondary__color--active;
        border: $base-button-secondary__border--active;
        background: $base-button-secondary__background--active;
      }

      @include support-hover {
        &:hover:not([disabled]) {
          color: $base-button-secondary__color--hover;
          border: $base-button-secondary__border--hover;
          background: $base-button-secondary__background--hover;
        }
      }
    }

    &--inline {
      color: $base-button-inline__color;
      background: none;
      border: none;

      &[disabled] {
        color: $base-button-inline__color--disabled;
      }

      &:active:not([disabled]) {
        color: $base-button-inline__color--active;
        text-shadow: $base-button-inline__text-shadow--active;
      }

      @include support-hover {
        &:hover:not([disabled]) {
          text-shadow: $base-button-inline__text-shadow--hover;
        }
      }
    }

    &__loader {
      position: absolute;
    }
  }
</style>
