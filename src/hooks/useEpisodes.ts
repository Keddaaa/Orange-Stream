import { useState, useEffect } from 'react';
import { Episode } from '../types';

export function useEpisodes(animeId: string) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un appel API
    const fetchEpisodes = async () => {
      setIsLoading(true);
      // Pour la démo, on génère des épisodes fictifs
      const mockEpisodes = Array.from({ length: 12 }, (_, i) => ({
        id: `${animeId}-ep-${i + 1}`,
        number: i + 1,
        title: `Épisode ${i + 1}`,
        thumbnail: `https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&q=80`,
        duration: 24 * 60, // 24 minutes en secondes
        synopsis: `Synopsis de l'épisode ${i + 1}...`,
        airDate: new Date(2023, 0, i + 1).toISOString(),
      }));

      setEpisodes(mockEpisodes);
      setIsLoading(false);
    };

    fetchEpisodes();
  }, [animeId]);

  return { episodes, isLoading };
}