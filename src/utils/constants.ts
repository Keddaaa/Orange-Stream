export const VIDEO_QUALITIES = {
  SD: '480p',
  HD: '720p',
  FHD: '1080p',
  '4K': '2160p'
} as const;

export const STORAGE_KEYS = {
  WATCHLIST: 'watchlist',
  WATCH_PROGRESS: 'watchProgress',
  USER_PREFERENCES: 'userPreferences',
  AUTH: 'auth',
  NOTIFICATIONS: 'notifications'
} as const;

export const API_CONFIG = {
  BASE_URL: 'https://api.jikan.moe/v4',
  RATE_LIMIT_DELAY: 1000,
  TIMEOUT: 5000
} as const;

export const UI_CONFIG = {
  DEBOUNCE_DELAY: 300,
  MAX_TITLE_LENGTH: 30,
  MAX_SYNOPSIS_LENGTH: 150,
  ITEMS_PER_PAGE: 24
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erreur de connexion. Veuillez vérifier votre connexion internet.',
  API_ERROR: 'Une erreur est survenue lors de la communication avec le serveur.',
  AUTH_ERROR: 'Erreur d\'authentification. Veuillez vous reconnecter.',
  VALIDATION_ERROR: 'Veuillez vérifier les informations saisies.',
  UNKNOWN_ERROR: 'Une erreur inattendue est survenue.'
} as const;