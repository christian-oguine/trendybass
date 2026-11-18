// Texts missing in a later language fall back to English, so a page never shows raw keys.
export default defineI18nConfig(() => ({
  fallbackLocale: 'en',
  missingWarn: false,
  fallbackWarn: false,
}))
