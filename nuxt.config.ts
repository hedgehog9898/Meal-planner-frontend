export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiHost: process.env.STRAPI_URL,
    },
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/strapi',
    'nuxt-primevue',
    '@nuxtjs/tailwindcss',
    '@vee-validate/nuxt'
  ],
  primevue: {
    usePrimeVue: true,
    options: {
      unstyled: false,
      ripple: true,
    },
    cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities',
  },
  css: [
    '~/assets/css/tailwind.css',
    'primevue/resources/themes/aura-light-green/theme.css',
    'primeicons/primeicons.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  veeValidate: {
    autoImports: false
  },
  strapi: {
    cookie: {
      path: '/',
      maxAge: 14 * 24 * 60 * 60,
      secure: process.env.NODE_ENV === 'production',
      sameSite: true
    }
  },
})