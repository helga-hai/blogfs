<template lang="pug">
  // Component template
  a.back-to-casino(href="http://fairspin.io/")
    BaseButton.back-to-casino__text(
      variant="primary",
      :loading="loading",
      @click="loading = true")
      | {{ $t('layout.backbutton') }}
</template>

<script lang="ts">
  import BaseButton from '@/components/base/BaseButton.vue';

  // Component data
  interface Data {
    loading: boolean;
  }

  // Component definition
  export default {
    // Name of the component
    name: 'BackToCasino',
    // Deps of the component
    components: {
      BaseButton,
    },
    // Data of the component
    data: (): Data => ({
      loading: false,
    }),
  };
</script>
