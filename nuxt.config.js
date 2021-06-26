require('dotenv').config();
const axios = require('axios');

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  env: {
    API_URL: process.env.API_URL,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Fairspin Blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Fairspin Blog' },
      { name: 'msapplication-TileColor', content: '#171717' },
      { name: 'msapplication-TileImage', content: '/mstile-144x144.png' },
      { name: 'msapplication-square70x70logo', content: '/mstile-70x70.png' },
      { name: 'msapplication-square150x150logo', content: '/mstile-150x150.png' },
      { name: 'msapplication-wide310x310logo', content: '/mstile-310x310.png' },
      { name: 'msapplication-wide310x150logo', content: '/mstile-310x150.png' },
      { name: 'application-name', content: 'Fairspin' },
      { name: 'msapplication-config', content: '/browserconfig.xml' },
      { name: 'theme-color', content: '#171717' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
    link: [
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes: '120x120', href: '/favicon-120x120.png' },
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon-192x192.png' },
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-touch-icon-57x57.png' },
      { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-touch-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-touch-icon-72x72.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-touch-icon-76x76.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-touch-icon-114x114.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-touch-icon-120x120.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-touch-icon-144x144.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-touch-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon-180x180.png' },
      { rel: 'mask-icon', color: '#FFCE44', href: '/safari-pinned-tab.svg' },
      { rel: 'manifest', href: '/manifest.json' },
      // { rel: 'prefetch', href: '/font.css' },
    ],
    script: [{ src: '/beforeinstallprompt.js' }],
  },
  webfontloader: {
    custom: {
      families: ['Stolzl:400'],
      urls: ['/font.css'],
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // Variables in the project
    { rel: 'preload', src: '~/assets/font.css' },
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/ClickOutside.js', mode: 'client' },
    { src: '~/plugins/CopyProtect.js', mode: 'client' },
    { src: '~/plugins/i18n.js', mode: 'all' },
    { src: '~/plugins/StoreData.js', mode: 'all' },
    { src: '~/plugins/Strapi.js', mode: 'all' },
    { src: '~/plugins/LoadScript.js', mode: 'client' },
    { src: '~/plugins/VueAwesomeSwiper', mode: 'client' },
    { src: '~/plugins/VueInfiniteLoading.js', mode: 'client' },
    { src: '~/plugins/VueLazyHydration.js', mode: 'all' },
    { src: '~/plugins/VueMq.js', mode: 'all' },
    { src: '~/plugins/VueNumeralFilter.js', mode: 'client' },
    { src: '~/plugins/StarRating.js', mode: 'client' },
    { src: '~/directives/hidden', mode: 'client' },
    // {src: '~/plugins/webFontLoader.js', ssr: false}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/markdownit',
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
    '@nuxtjs/strapi',
    'nuxt-webfontloader',
    '@nuxtjs/svg',
    ['nuxt-lazy-load', { directiveOnly: true }],
    [
      'nuxt-i18n',
      {
        strategy: 'prefix_except_default',
        defaultlocale: 'en',
        differentDomains: false,
        domain: 'hardcore-pare-196c1f.netlify.app:443',
        // Params used for generate hreflang
        locales: [
          { code: 'ru', iso: 'ru' },
          { code: 'en', iso: 'en' },
        ],
      },
    ],
    [
      'nuxt-compress',
      {
        gzip: {
          cache: true,
        },
        brotli: {
          threshold: 10240,
        },
      },
    ],
  ],
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    locales: [
      { code: 'ru', iso: 'ru-RU', file: 'ru.json', dir: 'ltr' },
      { code: 'en', iso: 'en-US', file: 'en.json', dir: 'ltr' },
    ],
    lazy: true,
    langDir: 'lang/',
    baseUrl: process.env.API_URL,
    seo: true,
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        ru: require('./lang/ru.json'),
        en: require('./lang/en.json'),
      },
    },
  },

  // See https://github.com/markdown-it/markdown-it
  markdownit: {
    runtime: true,
    preset: 'default',
    linkify: true,
    breaks: true,
    injected: true,
    html: true,
    use: ['markdown-it-div', 'markdown-it-emoji', 'markdown-it-attrs'],
  },

  // See https://strapi.nuxtjs.org/
  strapi: {
    entities: [
      { name: 'articles' },
      { name: 'authors' },
      { name: 'categories' },
      { name: 'home' },
      { name: 'subscribe' },
    ],
    url: process.env.API_URL || 'https://admin.fairspin.info',
  },

  // See https://sitemap.nuxtjs.org/
  sitemap: async () => {
    const baseUrl = 'https://admin.fairspin.info';
    const articles = await axios.get(`${baseUrl}/articles?_locale=ru&_locale=en`);
    const categories = await axios.get(`${baseUrl}/categories?_locale=ru&_locale=en`);
    const authors = await axios.get(`${baseUrl}/authors?_locale=ru&_locale=en`);

    return {
      path: '/sitemap.xml',
      hostname: 'https://hardcore-pare-196c1f.netlify.app',
      gzip: true,
      trailingSlash: true,
      'nuxt-i18n': {
        locales: ['ru', 'en'],
        routesNameSeparator: '___',
      },
      exclude: ['/'],
      routes: [
        ...articles.data.map((item) => {
          return {
            url: `${item.locale === 'en' ? '' : '/' + item.locale}/${item.slug}`,
            lastmod: item.updated_at,
            changefreq: 'daily',
            priority: 0.8,
          };
        }),
        ...categories.data.map((item) => {
          return {
            url: `${item.locale === 'en' ? '' : '/' + item.locale}/${item.slug}`,
            lastmod: item.updated_at,
            changefreq: 'always',
            priority: 0.9,
          };
        }),
        ...authors.data.map((item) => {
          return {
            url: `${item.locale === 'en' ? '' : '/' + item.locale}/author/${item.slug}`,
            lastmod: item.updated_at,
            changefreq: 'daily',
            priority: 0.7,
          };
        }),
        { url: '/author/', lastmod: new Date(), changefreq: 'monthly', priority: 0.7 },
        { url: '/ru/author/', lastmod: new Date(), changefreq: 'monthly', priority: 0.7 },
        { url: '/ru/', lastmod: new Date(), changefreq: 'always', priority: 1 },
        { url: '/', lastmod: new Date(), changefreq: 'always', priority: 1 },
      ],
    };
  },

  styleResources: {
    scss: ['~/assets/scss/variables.scss'],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: process.env.API_URL,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: ['@/plugins/VueInfiniteLoading.js'],
    output: {
      filename: '[name].[hash:8].js',
      sourceMapFilename: '[name].[hash:8].map',
      chunkFilename: '[id].[hash:8].js',
    },
    extractCSS: {
      //allChunks: true,
    },
    optimization: {
      splitChunks: {
        name: true,
      },
    },
    splitChunks: {
      layouts: true,
    },
    babel: {
      plugins: [['@babel/plugin-proposal-private-methods', { loose: true }]],
    },
  },

  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'font', 'style'].includes(type);
      },
      shouldPrefetch: (file, type) => {
        return ['style', 'font'].includes(type);
      },
    },
  },

  router: {},
};
