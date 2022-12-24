// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/main.scss"],
  runtimeConfig: {
    // Private keys are only available on the server
    apiSecret: process.env.NUXT_RAPID_API_KEY,
    // Public keys that are exposed to the client
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      apiHost: process.env.NUXT_PUBLIC_API_HOST,
    },
  },
});
