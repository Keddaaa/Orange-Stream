import { useState, useCallback } from 'react';
import * as jikanApi from '../../services/api/jikanApi';
import { Cache } from '../../utils/cache';
import type { Anime } from '../../types';

const animeCache = new Cache<Anime[]>(300); // Cache de 5 minutes

export function useAnimeApi() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWithCache = useCallback(async <T>(
    key: string,
    fetchFn: () => Promise<T>
  ): Promise<T> => {
    const cached = animeCache.get(key);
    if (cached) return cached as T;

    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchFn();
      animeCache.set(key, data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getTopAnime = useCallback((page = 1) => {
    return fetchWithCache(`top-${page}`, () => jikanApi.getTopAnime(page));
  }, [fetchWithCache]);

  const getSeasonalAnime = useCallback((page = 1) => {
    return fetchWithCache(`seasonal-${page}`, () => jikanApi.getSeasonalAnime(page));
  }, [fetchWithCache]);

  const searchAnime = useCallback((query: string, page = 1) => {
    return fetchWithCache(
      `search-${query}-${page}`,
      () => jikanApi.searchAnime(query, page)
    );
  }, [fetchWithCache]);

  return {
    isLoading,
    error,
    getTopAnime,
    getSeasonalAnime,
    searchAnime,
  };
}