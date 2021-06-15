<template lang="pug">
  // Component template.
  .base-block(
    :class="[...cssCut, ...cssClasses]",
    data-base-block)
    slot
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'nuxt-property-decorator';

  @Component({
    // Name of the component
    name: 'BaseBlock',
  })
  export default class BaseBlockComponent extends Vue {
    @Prop({ default: 'medium' })
    cutSize!: string;

    @Prop({ default: null })
    cutSide!: string | string[];

    @Prop({ default: 'default' })
    variant!: string;

    @Prop()
    shadow!: boolean;

    get cssClasses() {
      return {
        'base-block--shadow': this.shadow,
        ['base-block__' + this.variant]: this.variant,
        ['base-block--' + this.cutSize]: this.cutSize,
      };
    }

    get cssCut() {
      const list = Array.isArray(this.cutSide) ? this.cutSide : [this.cutSide];
      return this.cutSide ? list.map((i) => `base-block--${i}`) : [];
    }
  }
</script>

<style lang="scss" scoped>
  @use '~@stylize/sass-mixin' as *;

  .base-block {
    $selector: &;
    position: relative;
    background: $base-block__background;

    &--shadow {
      box-shadow: $base-block__box-shadow;
    }

    @mixin corner-after($border-width, $border-color, $cutSide) {
      @include after('') {
        @include absolute($cutSide);
        border-style: solid;
        border-width: $border-width;
        border-color: $border-color;
      }
    }

    @mixin corner-before($border-width, $border-color, $cutSide) {
      @include before('') {
        @include absolute($cutSide);
        border-style: solid;
        border-width: $border-width;
        border-color: $border-color;
      }
    }

    &__default {
      &#{$selector}--small {
        &#{$selector}--top-right {
          clip-path: $base-block__clip--sm--2;
        }
        &#{$selector}--bottom-right {
          clip-path: $base-block__clip--sm--3;
        }
        &#{$selector}--bottom-left {
          clip-path: $base-block__clip--sm--4;
        }
        &#{$selector}--top-right#{$selector}--bottom-left {
          clip-path: $base-block__clip--sm--2-4;
        }
      }

      &#{$selector}--medium {
        &#{$selector}--top-right {
          clip-path: $base-block__clip--md--2;
        }
        &#{$selector}--bottom-right {
          clip-path: $base-block__clip--md--3;
        }
        &#{$selector}--bottom-left {
          clip-path: $base-block__clip--md--4;
        }
        &#{$selector}--top-right#{$selector}--bottom-left {
          clip-path: $base-block__clip--md--2-4;
        }
      }

      &#{$selector}--large {
        &#{$selector}--top-right {
          clip-path: $base-block__clip--lg--2;
        }
        &#{$selector}--bottom-right {
          clip-path: $base-block__clip--lg--3;
        }
        &#{$selector}--bottom-left {
          clip-path: $base-block__clip--lg--4;
        }
        &#{$selector}--top-right#{$selector}--bottom-left {
          clip-path: $base-block__clip--lg--2-4;
        }
      }
    }

    &__secondary {
      border: $base-block-secondary__border;

      &#{$selector}--small {
        &#{$selector}--top-right {
          clip-path: $base-block__clip--sm--2;
          @include corner-after(0 8px 8px 0, $base-block-secondary__border-color--2, -1px -1px);
        }
        &#{$selector}--bottom-right {
          clip-path: $base-block__clip--sm--3;
          @include corner-after(0 0 8px 8px, $base-block-secondary__border-color--3, auto -1px -1px);
        }
        &#{$selector}--bottom-left {
          clip-path: $base-block__clip--sm--4;
          @include corner-after(8px 0 0 8px, $base-block-secondary__border-color--4, auto auto -1px -1px);
        }
        &#{$selector}--top-right#{$selector}--bottom-left {
          clip-path: $base-block__clip--sm--2-4;
          @include corner-before(0 8px 8px 0, $base-block-secondary__border-color--2, -1px -1px);
          @include corner-after(8px 0 0 8px, $base-block-secondary__border-color--4, auto auto -1px -1px);
        }
      }

      &#{$selector}--medium {
        &#{$selector}--top-right {
          clip-path: $base-block__clip--md--2;
          @include corner-after(0 16px 16px 0, $base-block-secondary__border-color--2, -1px -1px);
        }
        &#{$selector}--bottom-right {
          clip-path: $base-block__clip--md--3;
          @include corner-after(0 0 16px 16px, $base-block-secondary__border-color--3, auto -1px -1px);
        }
        &#{$selector}--bottom-left {
          clip-path: $base-block__clip--md--4;
          @include corner-after(16px 0 0 16px, $base-block-secondary__border-color--4, auto auto -1px -1px);
        }
        &#{$selector}--top-right#{$selector}--bottom-left {
          clip-path: $base-block__clip--md--2-4;
          @include corner-before(0 16px 16px 0, $base-block-secondary__border-color--2, -1px -1px);
          @include corner-after(16px 0 0 16px, $base-block-secondary__border-color--4, auto auto -1px -1px);
        }
      }

      &#{$selector}--large {
        &#{$selector}--top-right {
          clip-path: $base-block__clip--lg--2;
          @include corner-after(0 24px 24px 0, $base-block-secondary__border-color--2, -1px -1px);
        }
        &#{$selector}--bottom-right {
          clip-path: $base-block__clip--lg--3;
          @include corner-after(0 0 24px 24px, $base-block-secondary__border-color--3, auto -1px -1px);
        }
        &#{$selector}--bottom-left {
          clip-path: $base-block__clip--lg--4;
          @include corner-after(24px 0 0 24px, $base-block-secondary__border-color--4, auto auto -1px -1px);
        }
        &#{$selector}--top-right#{$selector}--bottom-left {
          clip-path: $base-block__clip--lg--2-4;
          @include corner-before(0 24px 24px 0, $base-block-secondary__border-color--2, -1px -1px);
          @include corner-after(24px 0 0 24px, $base-block-secondary__border-color--4, auto auto -1px -1px);
        }
      }
    }

    &__primary {
      border: $base-block-primary__border;
      box-shadow: $base-block-primary__box-shadow;

      &:after,
      &:before {
        filter: blur(1px);
      }

      &#{$selector}--shadow {
        filter: $base-block-primary__filter;
      }

      &#{$selector}--small {
        &#{$selector}--top-right {
          clip-path: $base-block__clip--sm--2;
          @include corner-after(0 8px 8px 0, $base-block-primary__border-color--2, -1px -1px);
        }
        &#{$selector}--bottom-right {
          clip-path: $base-block__clip--sm--3;
          @include corner-after(0 0 8px 8px, $base-block-primary__border-color--3, auto -1px -1px);
        }
        &#{$selector}--bottom-left {
          clip-path: $base-block__clip--sm--4;
          @include corner-after(8px 0 0 8px, $base-block-primary__border-color--4, auto auto -1px -1px);
        }
        &#{$selector}--top-right#{$selector}--bottom-left {
          clip-path: $base-block__clip--sm--2-4;
          @include corner-before(0 8px 8px 0, $base-block-primary__border-color--2, -1px -1px);
          @include corner-after(8px 0 0 8px, $base-block-primary__border-color--4, auto auto -1px -1px);
        }
      }

      &#{$selector}--medium {
        &#{$selector}--top-right {
          clip-path: $base-block__clip--md--2;
          @include corner-after(0 16px 16px 0, $base-block-primary__border-color--2, -1px -1px);
        }
        &#{$selector}--bottom-right {
          clip-path: $base-block__clip--md--3;
          @include corner-after(0 0 16px 16px, $base-block-primary__border-color--3, auto -1px -1px);
        }
        &#{$selector}--bottom-left {
          clip-path: $base-block__clip--md--4;
          @include corner-after(16px 0 0 16px, $base-block-primary__border-color--4, auto auto -1px -1px);
        }
        &#{$selector}--top-right#{$selector}--bottom-left {
          clip-path: $base-block__clip--md--2-4;
          @include corner-before(0 16px 16px 0, $base-block-primary__border-color--2, -1px -1px);
          @include corner-after(16px 0 0 16px, $base-block-primary__border-color--4, auto auto -1px -1px);
        }
      }

      &#{$selector}--large {
        &#{$selector}--top-right {
          clip-path: $base-block__clip--lg--2;
          @include corner-after(0 24px 24px 0, $base-block-primary__border-color--2, -1px -1px);
        }
        &#{$selector}--bottom-right {
          clip-path: $base-block__clip--lg--3;
          @include corner-after(0 0 24px 24px, $base-block-primary__border-color--3, auto -1px -1px);
        }
        &#{$selector}--bottom-left {
          clip-path: $base-block__clip--lg--4;
          @include corner-after(24px 0 0 24px, $base-block-primary__border-color--4, auto auto -1px -1px);
        }
        &#{$selector}--top-right#{$selector}--bottom-left {
          clip-path: $base-block__clip--lg--2-4;
          @include corner-before(0 24px 24px 0, $base-block-primary__border-color--2, -1px -1px);
          @include corner-after(24px 0 0 24px, $base-block-primary__border-color--4, auto auto -1px -1px);
        }
      }
    }
  }
</style>
