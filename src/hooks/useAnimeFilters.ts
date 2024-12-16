import { useState, useCallback } from 'react';
import type { Anime } from '../types';

type SortOption = 'rating' | 'year' | 'title';
type FilterOption = 'all' | 'ongoing' | 'completed';

function sortAnimes(animes: Anime[], sortBy: SortOption): Anime[] {
  return [...animes].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'year':
        return b.year - a.year;
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });
}

export function useAnimeFilters(initialAnimes: Anime[]) {
  const [sortBy, setSortBy] = useState<SortOption>('rating');
  const [filterStatus, setFilterStatus] = useState<FilterOption>('all');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const filteredAndSortedAnimes = useCallback(() => {
    let result = [...initialAnimes];

    // Filtrer par statut
    if (filterStatus !== 'all') {
      result = result.filter(anime => anime.status === filterStatus);
    }

    // Filtrer par genre
    if (selectedGenre) {
      result = result.filter(anime => anime.genres.includes(selectedGenre));
    }

    // Trier
    return sortAnimes(result, sortBy);
  }, [initialAnimes, sortBy, filterStatus, selectedGenre]);

  return {
    sortBy,
    setSortBy,
    filterStatus,
    setFilterStatus,
    selectedGenre,
    setSelectedGenre,
    filteredAndSortedAnimes,
  };
}