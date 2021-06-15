<template lang="pug">
  // Component template
  button.shortcut(
    @pointerup="promptInstall",
    data-shortcut)
    .shortcut__content
      .shortcut__text(data-shortcut-text)
        | {{ $t('footer.shortcut') }}
      img.shortcut__image(
        v-if="os",
        :src="require(`@/assets/images/shortcut/${os}.svg`)",
        :draggable="false",
        data-shortcut-image)
</template>

<script lang="ts">
  import Vue from 'vue';

  // Component data
  interface Data {
    os: string;
  }

  // Component definition
  export default Vue.extend({
    // Name of the component
    name: 'TheShortcut',
    // Data of the component
    data: (): Data => ({
      os: '',
    }),
    // Mounted hook of the component
    mounted(): void {
      if (navigator.appVersion.includes('Win')) {
        this.os = 'windows';
      } else if (navigator.appVersion.includes('Mac')) {
        this.os = 'mac';
      } else if (navigator.userAgent.includes('Android')) {
        this.os = 'android';
      } else if (navigator.userAgent.includes('like Mac')) {
        this.os = 'ios';
      }
    },
    // Methods of the component
    methods: {
      async promptInstall(): Promise<void> {
        // Show the install prompt
        const promptEvent = (window as any).deferredPrompt;
        if (!promptEvent) {
          console.log("The deferred prompt isn't available.");
          // The deferred prompt isn't available
          return;
        }
        // Show the install prompt
        promptEvent.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await promptEvent.userChoice;
        // Optionally, send analytics event with outcome of user choice
        console.log(`User response to the install prompt: ${outcome}`);
        // We've used the prompt, and can't use it again, throw it away
        (window as any).deferredPrompt = null;
      },
    },
  });
</script>

<style lang="scss" scoped>
  @import '~@stylize/sass-mixin';

  .shortcut {
    border: none;
    background: none;
    cursor: pointer;

    &__content {
      color: #ffffff;
      @include flex(row center center);
    }

    &__image {
      margin: 8px;
    }

    &__text {
      text-align: right;
    }
  }
</style>
