export default defineNuxtConfig({
  compatibilityDate: '2026-06-11',

  modules: [
    '@nuxt/eslint',
  ],

  css: [
    '~/assets/scss/main.scss',
  ],

  devtools: {
    enabled: true,
  },

  typescript: {
    strict: true,
  },
})
