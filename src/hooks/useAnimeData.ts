import { useState, useEffect } from 'react';
import { Anime } from '../types';
import * as jikanApi from '../services/jikanApi';

export function useAnimeData() {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await jikanApi.getTopAnime();
        setAnimes(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching anime data:', err);
        setError('Une erreur inattendue est survenue');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { animes, isLoading, error };
}