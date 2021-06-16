export default ({ $strapi, app, error }) => {
  // console.log($strapi, app, error, strapi_Strapi.callHook)
  $strapi.hook('error', (httpError) => {
    console.log('httpError::',httpError)
    error({ statusCode: httpError.response.status, message: `${httpError.name}: ${httpError.original}` });
    app.$toast.error(httpError.message);
  });
};
