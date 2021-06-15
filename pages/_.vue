<template lang="pug">
  .error
    | Error
</template>

<script>
  export default {
    // Name of the component
    name: 'NotFound',
    // Async Data hook of the component
    async asyncData({ error }) {
      error({ statusCode: 404, message: 'Not found' });
    },
  };
</script>

<style scoped></style>
