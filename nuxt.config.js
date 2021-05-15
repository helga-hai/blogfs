export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Fairspin Blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'msapplication-TileColor', content: '#171717' },
      { name: 'msapplication-TileImage', content: '/mstile-144x144.png' },
      { name: 'msapplication-square70x70logo', content: '/mstile-70x70.png' },
      { name: 'msapplication-square150x150logo', content: '/mstile-150x150.png' },
      { name: 'msapplication-wide310x310logo', content: '/mstile-310x310.png' },
      { name: 'msapplication-wide310x150logo', content: '/mstile-310x150.png' },
      { name: 'application-name', content: 'Fairspin' },
      { name: 'msapplication-config', content: '/browserconfig.xml' },
      { name: 'theme-color', content: '#171717' },
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
      { rel: 'prefetch', href: '/font.css' },
    ],
    script: [{ src: '/beforeinstallprompt.js' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // Variables in the project
    '~/assets/scss/variables.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/load-script.js', mode: 'client' },
    { src: '~/plugins/vue-mq.js', mode: 'all' },
    { src: '~/plugins/click-outside.js', mode: 'client' },
    { src: '~/plugins/VueAwesomeSwiper', mode: 'client' },
    { src: '~/directives/hidden', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  styleResources: {
    scss: ['~/assets/scss/variables.scss'],
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isServer, isClient }) {
      config.module.rules.push({
        test: /\.vue$/,
        loader: 'vue-svg-inline-loader',
        options: {
          /* ... */
        },
      });
    },
    output: {
      // path: path.resolve(__dirname, 'dist'),
      filename: '[name].[hash:8].js',
      sourceMapFilename: '[name].[hash:8].map',
      chunkFilename: '[id].[hash:8].js',
    },
    extractCSS: {
      allChunks: true,
    },
    optimization: {
      splitChunks: {
        name: true,
      },
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
};
