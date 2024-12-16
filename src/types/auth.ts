export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: {
    language: 'fr' | 'en';
    notifications: boolean;
    autoplay: boolean;
    defaultVideoQuality: 'SD' | 'HD' | 'FHD' | '4K';
  };
}

export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}