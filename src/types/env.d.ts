/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_API_BASE_URL: string
  readonly VITE_APP_ENV: string
  readonly VITE_APP_SENTRY_DSN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 