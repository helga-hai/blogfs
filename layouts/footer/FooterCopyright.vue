<template lang="pug">
  // Component template
  .footer-copyright(data-footer-copyright)
    | {{ `Copyright © ${year} Techcore Holding B.V. All rights reserved.` }}
</template>

<script lang="ts">
  // Component definition
  export default {
    // Name of the component
    name: 'FooterCopyright',
    // Computed of the component
    computed: {
      year(): number {
        return new Date().getFullYear();
      },
    },
  };
</script>

<style lang="scss" scoped>
  .footer-copyright {
    font: $footer-copyright__font;
    color: $footer-copyright__color;
  }
</style>
