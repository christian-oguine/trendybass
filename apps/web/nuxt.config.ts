// https://nuxt.com/docs/api/configuration/nuxt-config
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://trendybass.com'

export default defineNuxtConfig({

  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    'nuxt-security',
  ],
  devtools: { enabled: true },

  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
      meta: [
        { name: 'theme-color', content: '#FAFAF7' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  // SEO: one source of truth for the site URL, used by sitemaps, canonical URLs and hreflang.
  site: {
    url: siteUrl,
    name: 'Trendybass',
    defaultLocale: 'en',
  },

  // Light only until the design phase adds a dark version.
  colorMode: {
    preference: 'light',
    fallback: 'light',
    storageKey: 'trendybass-color-mode',
  },

  // /api/** goes to the API (apps/api). In production Caddy does this before Nuxt;
  // the rule still serves server-side rendering, which calls the API from inside Nuxt.
  routeRules: {
    // The API has its own rate limits per person and action.
    '/api/**': { proxy: `${process.env.API_URL || 'http://127.0.0.1:4001'}/api/**`, security: { rateLimiter: false } },
  },

  compatibilityDate: '2026-11-01',

  typescript: {
    strict: true,
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  // Every language has its own URL folder. English first; nl, fr, de later (README section 12).
  i18n: {
    baseUrl: siteUrl,
    strategy: 'prefix',
    defaultLocale: 'en',
    locales: [
      { code: 'en', language: 'en', name: 'English', file: 'en.json' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'trendybass_locale',
      redirectOn: 'root',
    },
  },

  // Icons are bundled with the app. No requests to the Iconify API (privacy, CSP, speed).
  icon: {
    serverBundle: { collections: ['lucide'], externalizeIconsJson: true },
    clientBundle: { scan: { globInclude: ['**/*.{vue,ts}'], globExclude: ['node_modules', 'dist', 'build', 'coverage', 'test', 'tests', '.*'] } },
    fallbackToApi: false,
  },

  // Image sizes per screen. "xs" (phones) is not in @nuxt/image's defaults.
  image: {
    screens: { 'xs': 430, 'sm': 640, 'md': 768, 'lg': 1024, 'xl': 1280, '2xl': 1536 },
    domains: [new URL(siteUrl).host],
  },

  // Security headers (CSP with nonces, HSTS, frame protection) and basic rate limiting.
  security: {
    nonce: true,
    headers: {
      contentSecurityPolicy: {
        'img-src': ['\'self\'', 'data:', 'blob:'],
      },
    },
  },
})
