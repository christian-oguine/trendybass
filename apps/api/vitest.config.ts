import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    // Flow tests will share one database.
    fileParallelism: false,
    testTimeout: 20_000,
  },
})
