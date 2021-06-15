export default ({ store, app }, inject) => {
  // Inject $setdata(data) in Vue, context and store.
  inject('setdata', ({ type, content }) => {
    if (type === 'categories') {
      store.dispatch('content/setCategories', { content });
    } else if (!store.state.content.news[type]) {
      if (content.length) store.dispatch('content/setNews', { type, content });
    }
  });
};
