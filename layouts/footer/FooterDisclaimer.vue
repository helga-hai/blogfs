<template lang="pug">
  //- Component template.
  .footer-disclaimer(data-footer-disclaimer)
    | {{ $t('layout.disclaimer') }}
</template>

<script lang="ts">
  // Component definition.
  export default {
    // Name of the component.
    name: 'FooterDisclaimer'
  };
</script>

<style lang="scss" scoped>
  .footer-disclaimer {
    font: $footer-disclaimer__font;
    color: $footer-disclaimer__color;
  }
</style>
