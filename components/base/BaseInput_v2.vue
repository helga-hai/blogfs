<template lang="pug">
  //- Pug template for Vue.
  .base-input(
    :class="{ 'base-input--error': error }",
    :data-error="error",
    @click="$emit('click')",
    data-input)
    label.base-input__label(
      v-if="$slots.label",
      :class="{ 'base-input__label--error': error }",
      :for="uniqueId",
      data-input-label)
      slot(name="label")

    .base-input__field(
      :class=`{
        'base-input__field--error': error,
        'base-input__field--focus': isFocus
      }`,
      data-input-field)
      .base-input__badge(data-input-bagde-left)
        slot(
          name="badge-left",
          :id="uniqueId")

      .base-input__control-limiter
        input.base-input__control(
          data-input-control,
          ref="input",
          :id="uniqueId",
          :name="uniqueId",
          :class="{ 'base-input__control--clear': clear }",
          :type="type",
          :value="value",
          :disabled="disabled",
          :maxlength="maxlength",
          :minlength="minlength",
          :max="isNumber ? max : null",
          :min="isNumber ? min : null",
          :step="isNumber ? step : null",
          :placeholder="placeholder",
          :autofocus="autofocus",
          :autocomplete="autocomplete",
          @input="inputField($event)",
          @focus="focusField($event)",
          @blur="blurField($event)",
          @keypress="$emit('keypress', $event)")

      label.base-input__clear(
        v-if="clear",
        v-hidden="!value",
        :for="uniqueId",
        @click="clearField")
        img.base-input__clear-image(
          src="@/assets/images/common/close.svg?inline",
          draggable="false")

      .base-input__badge(data-input-bagde-right)
        slot(
          name="badge-right",
          :id="uniqueId")
</template>

<script lang="ts">
  import Vue from 'vue';
  import uniqueId from 'lodash/uniqueId';

  export default Vue.extend({
    // Name of the component.
    name: 'BaseInput',
    // Data of the component.
    data: (): any => ({
      isFocus: false,
    }),
    // Props of the component.
    props: {
      id: {
        type: String,
      },
      value: {
        type: [Number, String],
      },
      type: {
        type: String,
        default: 'text',
      },
      focus: {
        type: Boolean,
      },
      clear: {
        type: Boolean,
        default: true,
      },
      error: {
        type: Boolean,
        default: false,
      },
      placeholder: {
        type: String,
      },
      autofocus: {
        type: Boolean,
        default: false,
      },
      autocomplete: {
        type: String,
        default: 'off',
      },
      min: {
        type: Number,
      },
      max: {
        type: Number,
      },
      step: {
        type: Number,
      },
      maxlength: {
        type: [Number, String],
      },
      minlength: {
        type: [Number, String],
      },
      disabled: {
        type: Boolean,
      },
    },
    // Mounted hook of the component.
    mounted(): void {
      if (this.focus) {
        // Trigger focus on input.
        this.$refs.input.focus();
        // Change internal focus.
        this.isFocus = true;
      }
    },
    // Defined computed of the component.
    computed: {
      uniqueId(): string {
        return this.id || uniqueId('dynamic_field_');
      },
      isNumber(): boolean {
        return this.type === 'number';
      },
      isLabelShown(): boolean {
        return this.isFocus || this.error;
      },
    },
    // Defined methods of the component.
    methods: {
      inputField($event: Event): void {
        // Propagate event to parent.
        this.$emit('input', ($event.target as HTMLInputElement).value, $event);
      },
      focusField($event: Event): void {
        // Change internal focus.
        this.isFocus = true;
        // Propagate event to parent.
        this.$emit('focus', $event);
      },
      blurField($event: Event): void {
        // Change internal focus.
        this.isFocus = false;
        // Propagate event to parent.
        this.$emit('blur', $event);
      },
      clearField(): void {
        // Propagate event to parent.
        this.$emit('input', '');
      },
    },
    // Defined watchers of the component.
    watch: {
      focus(): void {
        // Change internal focus.
        this.isFocus = this.focus;
        // In case focus changed make corresponding changes to input.
        this.focus ? this.$refs.input.focus() : this.$refs.input.blur();
      },
    },
  });
</script>

<style lang="scss" scoped>
  @import '~@stylize/sass-mixin';

  .base-input {
    $block: &;
    width: 100%;
    overflow: hidden;
    position: relative;

    &--error {
      &::v-deep .base-frame__highlight {
        &:before,
        &:after {
          border-color: $input_v2__border-color--error;
        }
      }
    }

    &__label {
      font: $input_v2-label__font;
      color: $input_v2-label__color;
      padding: $input_v2-label__padding;

      &--error {
        color: $input_v2-label__color--error;

        &:after {
          border-color: $input_v2-field__border-color--error;
        }
      }
    }

    &__field {
      width: 100%;
      position: relative;
      border-radius: 4px;
      border: $input_v2-field__border;
      padding: $input_v2-field__padding;
      background: $input_v2-field__background;
      transition: background-color 0.7s;
      @include flex(row, flex-start, center);

      &--error {
        border-color: $input_v2-field__border-color--error;
        background: $input_v2-field__background--error;
      }
    }

    &__control {
      width: 133%;
      border: none;
      flex: 1 0 0;
      font: $input_v2-field-control__font;
      color: $input_v2-field-control__color;
      padding: $input_v2-field-control__padding;
      transform-origin: left;
      transform: $input_v2-field-control__transform;
      background: $input_v2-field-control__background;
      min-height: $input_v2-field-control__min-height;

      @include media('>=xs') {
        width: 100%;
        font: $input_v2-field-control__font--r10;
        transform: $input_v2-field-control__transform--r10;
      }

      &-limiter {
        width: 100%;
        overflow: hidden;
        max-width: 100%;
      }

      &:not(output):-moz-ui-invalid {
        box-shadow: 0 0 0 0 transparent !important;
      }

      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        appearance: none;
        margin: 0;
      }

      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        transition-delay: 9999s;
      }
    }

    &__clear {
      cursor: pointer;
      position: relative;
      visibility: hidden;
      box-sizing: content-box;
      padding: $input_v2-field-clear__padding;
      min-width: $input_v2-field-clear__size;
      @include size($input_v2-field-clear__size);
      @include flex(row, center, center);

      &:after {
        content: '';
        transform: translate(-50%, -50%);
        background: $input_v2-field-clear__background;
        border-radius: $input_v2-field-clear__border-radius;
        @include size($input_v2-field-clear__size);
        @include absolute($top: 50%, $left: 50%);
      }

      &-image {
        max-width: $input_v2-field-clear-image__size;
      }
    }
  }
</style>
