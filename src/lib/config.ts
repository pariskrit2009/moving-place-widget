export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  apiTimeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  apiAuthorizationToken: import.meta.env.VITE_API_AUTHORIZATION_KEY,
  appEnv: import.meta.env.VITE_APP_ENV || "development",
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  googlePlacesApiKey: import.meta.env.VITE_API_GOOGLE_PLACES_KEY,
} as const;
