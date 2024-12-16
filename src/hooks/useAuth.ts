import { useState, useCallback } from 'react';
import { useLocalStorage } from './common/useLocalStorage';
import { STORAGE_KEYS } from '../utils/constants';
import type { UserProfile } from '../types/auth';

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export function useAuth() {
  const [user, setUser] = useLocalStorage<UserProfile | null>(STORAGE_KEYS.AUTH, null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newUser: UserProfile = {
        id: Date.now().toString(),
        name: data.username,
        email: data.email,
        preferences: {
          language: 'fr',
          notifications: true,
          autoplay: true,
          defaultVideoQuality: 'HD',
        },
      };

      setUser(newUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [setUser]);

  const login = useCallback(async (data: LoginData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Pour la démo, on accepte n'importe quel email/mot de passe
      const user: UserProfile = {
        id: Date.now().toString(),
        name: data.email.split('@')[0],
        email: data.email,
        preferences: {
          language: 'fr',
          notifications: true,
          autoplay: true,
          defaultVideoQuality: 'HD',
        },
      };

      setUser(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [setUser]);

  const logout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    register,
    login,
    logout,
  };
}