export default ({ $strapi, app, error }) => {
  $strapi.hook('error', (httpError) => {
    error({ statusCode: httpError.response.status, message: `${httpError.name}: ${httpError.original}` });
    app.$toast.error(httpError.message);
  });
};
