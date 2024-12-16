import { useState, useEffect } from 'react';
import { Anime } from '../types';
import { getTopAnime } from '../services/jikanApi';

export function useRecommendations(genres?: string[], excludeIds: string[] = []) {
  const [recommendations, setRecommendations] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setIsLoading(true);
        setError(null);

        let animes = await getTopAnime();

        // Filtrer par genres si spécifiés
        if (genres && genres.length > 0) {
          animes = animes.filter(anime =>
            anime.genres.some(genre => genres.includes(genre))
          );
        }

        // Exclure les IDs spécifiés
        if (excludeIds.length > 0) {
          animes = animes.filter(anime => !excludeIds.includes(anime.id));
        }

        // Limiter à 6 recommandations
        setRecommendations(animes.slice(0, 6));
      } catch (err) {
        setError('Erreur lors du chargement des recommandations');
        console.error('Error fetching recommendations:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecommendations();
  }, [genres, excludeIds]);

  return { recommendations, isLoading, error };
}