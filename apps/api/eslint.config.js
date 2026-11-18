// Same code style as the web app: no semicolons, single quotes, 2 spaces.
import stylistic from '@stylistic/eslint-plugin'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['node_modules'] },
  ...tseslint.configs.recommended,
  stylistic.configs.recommended,
  // Names starting with _ may stay unused (Express error handlers need 4 arguments).
  { rules: { '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }] } },
)
