import Vue from 'vue'
import vLuxon from 'vue-luxon'

export default function ({ app, store }) {
  store.commit('configs/lang', app.i18n.localeProperties.code);
  Vue.use(vLuxon, {
    output: {
      // Or app.i18n.localeProperties.code
      locale: store.getters['configs/activeLang'],
      format: {
        year: "numeric",
        month: "long",
        day: "numeric"
      }
    },
  });
  // beforeLanguageSwitch called right before setting a new locale
  app.i18n.onBeforeLanguageSwitch = (oldLocale, newLocale, isInitialSetup, context) => {
    store.commit('configs/lang', newLocale);
  };
}
