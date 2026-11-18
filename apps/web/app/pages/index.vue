<script setup lang="ts">
// Placeholder home page until the design phase. Server-rendered, with title and description.
const { t } = useI18n()

useSeoMeta({
  title: () => t('home.title'),
  description: () => t('home.description'),
})
</script>

<template>
  <main class="mx-auto flex min-h-dvh max-w-2xl flex-col items-center justify-center px-4 text-center">
    <h1 class="font-display text-4xl sm:text-5xl">
      Trendybass
    </h1>
    <p class="mt-4 text-lg text-muted">
      {{ t('home.tagline') }}
    </p>
  </main>
</template>
