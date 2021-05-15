<template lang="pug">
  // Component template.
  .footer-disclaimer(data-footer-disclaimer)
    | This site is maintained and operated by the payment processor Fabeltra Ltd., a company incorporated and existing under the laws of Cyprus with company registration number HE399178, with its registered office at Boumpoulinas, 1-3 Bouboulina building, 4th floor, flat/office 42, 1060, Nicosia, Cyprus, and the license holder Techcore Holding B.V., a company incorporated and existing under the laws of Curacao with company registration number 151612, with its registered office at Fransche Bloemweg 4, Willemstad, Curaçao. The license is provided by Curaçao eGaming.
</template>

<script lang="ts">
  // Component definition.
  export default {
    // Name of the component.
    name: 'FooterDisclaimer',
  };
</script>

<style lang="scss" scoped>
  .footer-disclaimer {
    font: $footer-disclaimer__font;
    color: $footer-disclaimer__color;
  }
</style>
