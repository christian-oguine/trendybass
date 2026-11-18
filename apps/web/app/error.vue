<script setup lang="ts">
import type { NuxtError } from '#app'

// Shown for 404s and unexpected errors. Never shows stack traces or technical details.
const props = defineProps<{ error: NuxtError }>()

const { t } = useI18n()
const localePath = useLocalePath()

const notFound = computed(() => props.error.statusCode === 404)

useSeoMeta({
  title: () => notFound.value ? t('error.notFoundTitle') : t('error.genericTitle'),
  robots: 'noindex, nofollow',
})

function goHome() {
  clearError({ redirect: localePath('/') })
}
</script>

<template>
  <UApp>
    <main class="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center px-4 text-center">
      <p class="text-sm font-semibold text-muted">
        {{ error.statusCode }}
      </p>
      <h1 class="mt-2 font-display text-3xl">
        {{ notFound ? t('error.notFoundTitle') : t('error.genericTitle') }}
      </h1>
      <UButton
        class="mt-8"
        color="neutral"
        :label="t('error.backHome')"
        @click="goHome"
      />
    </main>
  </UApp>
</template>
