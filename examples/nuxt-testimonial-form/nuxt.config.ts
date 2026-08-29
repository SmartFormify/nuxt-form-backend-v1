export default defineNuxtConfig({
  compatibilityDate: '2026-08-29',
  css: ['~/assets/style.css'],
  runtimeConfig: {
    public: {
      smartFormifyEndpoint:
        process.env.NUXT_PUBLIC_SMART_FORMIFY_ENDPOINT || ''
    }
  }
})
