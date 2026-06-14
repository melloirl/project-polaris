export default defineNuxtConfig({
  compatibilityDate: '2026-06-11',

  modules: [
    '@nuxt/eslint',
  ],

  css: [
    '@fontsource/courier-prime/400.css',
    '@fontsource/courier-prime/700.css',
    '~/assets/scss/main.scss',
  ],

  devtools: {
    enabled: false,
  },

  typescript: {
    strict: true,
  },
})
