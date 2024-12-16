export const VIDEO_QUALITIES = {
  SD: '480p',
  HD: '720p',
  FHD: '1080p',
  '4K': '2160p'
} as const;

export const SAVE_PROGRESS_INTERVAL = 5000; // 5 seconds

export const MAX_SYNOPSIS_LENGTH = 150;
export const MAX_TITLE_LENGTH = 30;

export const STORAGE_KEYS = {
  WATCHLIST: 'watchlist',
  WATCH_PROGRESS: 'watchProgress',
  USER_PREFERENCES: 'userPreferences'
} as const;