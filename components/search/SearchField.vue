<template lang="pug">
  //- Template for Vue component.
  .search-field(data-search-field)
    BaseInput.search-field__input(
      :value="term",
      :placeholder="$t('search.placeholder')",
      @input="$emit('input', $event)",
      @focus="$emit('showResults')",
      data-search-field-input)
      template(#badge-left="{ id }")
        label.search-field__badge(
          :for="id",
          @pointerup="$emit('openField', true)",
          data-search-field-badge)
          img.search-field__badge-image(
            alt="search"
            width="24",
            height="24",
            src="@/assets/images/common/search.svg",
            draggable="false")

    .search-field__close(
      v-if="$mq === 'xs' && close",
      @click="$emit('hideResults')",
      data-search-field-close)
      img.search-field__close-image(
        width="16",
        height="16",
        src="@/assets/images/common/close.svg",
        draggable="false")
</template>

<script lang="ts">
  import BaseInput from '@/components/base/BaseInput_v2.vue';

  // Single File Component.
  export default {
    // Name of the component.
    name: 'SearchField',
    // Deps of the component.
    components: { BaseInput },
    // Props of the component.
    props: {
      term: String,
      close: Boolean,
    },
  };
</script>

<style lang="scss" scoped>
  @use '~@stylize/sass-mixin' as *;

  .search-field {
    @include flex(row, flex-start);

    &__badge {
      padding: $search-field-badge__padding;
      @include flex(row, center, center);

      &-image {
        min-width: $search-field-badge__min-width;
      }
    }

    &__close {
      cursor: pointer;
      margin: $search-field-close__margin;
      min-width: $search-field-close__min-width;
      background: $search-field-close__background;
      border-radius: $search-field-close__border-radius;
      @include flex(row, center, center);

      &-image {
        opacity: 0.7;
        @include size($search-field-close-image__size);
      }
    }

    ::v-deep .base-input__control {
      white-space: nowrap;
      text-overflow: ellipsis;

      &::placeholder {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    ::v-deep .base-input__clear[style='visibility: hidden;'] {
      display: none;
    }
  }
</style>
