import { useLocalStorage } from './useLocalStorage';

interface UserPreferences {
  theme: 'light' | 'dark';
  autoplay: boolean;
  notifications: boolean;
  quality: 'SD' | 'HD' | 'FHD' | '4K';
  language: 'fr' | 'en';
  subtitles: boolean;
}

const defaultPreferences: UserPreferences = {
  theme: 'dark',
  autoplay: true,
  notifications: true,
  quality: 'HD',
  language: 'fr',
  subtitles: true,
};

export function useUserPreferences() {
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>(
    'userPreferences',
    defaultPreferences
  );

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...updates }));
  };

  return {
    preferences,
    updatePreferences,
  };
}