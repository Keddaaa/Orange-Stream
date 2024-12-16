import { useState, useEffect, useCallback } from 'react';
import { Anime } from '../types';
import { searchAnime } from '../services/jikanApi';
import { useDebounce } from './common/useDebounce';
import { Cache } from '../utils/cache';

const searchCache = new Cache<Anime[]>(300); // Cache de 5 minutes

export function useAnimeSearch(query: string) {
  const [results, setResults] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const debouncedQuery = useDebounce(query, 300);

  const fetchResults = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    // Vérifier le cache
    const cachedResults = searchCache.get(searchQuery);
    if (cachedResults) {
      setResults(cachedResults);
      return;
    }

    try {
      setIsLoading(true);
      const data = await searchAnime(searchQuery);
      setResults(data);
      searchCache.set(searchQuery, data);
      setError(null);
    } catch (err) {
      setError('Erreur lors de la recherche');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResults(debouncedQuery);
  }, [debouncedQuery, fetchResults]);

  return { results, isLoading, error };
}