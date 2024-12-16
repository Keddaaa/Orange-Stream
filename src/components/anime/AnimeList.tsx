import React, { useEffect, useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { AnimeGrid } from './AnimeGrid';
import { AnimeFilters } from './AnimeFilters';
import { NoResults } from './NoResults';
import { useAnimeFilters } from '../../hooks/useAnimeFilters';
import { resetSectionCounters } from '../../utils/uniqueId';
import type { Anime } from '../../types';

interface AnimeListProps {
  title: string;
  animes: Anime[];
  loading?: boolean;
  onViewAll?: () => void;
}

export function AnimeList({ title, animes, loading = false, onViewAll }: AnimeListProps) {
  const sectionId = `section-${title.toLowerCase().replace(/\s+/g, '-')}`;

  const {
    sortBy,
    setSortBy,
    filterStatus,
    setFilterStatus,
    selectedGenre,
    setSelectedGenre,
    filteredAndSortedAnimes,
  } = useAnimeFilters(animes);

  const displayedAnimes = filteredAndSortedAnimes();
  const hasResults = displayedAnimes.length > 0;

  // Extraire tous les genres uniques
  const availableGenres = useMemo(() => {
    const genres = new Set<string>();
    animes.forEach(anime => {
      anime.genres.forEach(genre => genres.add(genre));
    });
    return Array.from(genres).sort();
  }, [animes]);

  // Reset counters for this section when the component unmounts
  useEffect(() => {
    return () => {
      resetSectionCounters(sectionId);
    };
  }, [sectionId]);

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        {onViewAll && (
          <button 
            onClick={onViewAll}
            className="flex items-center text-gray-400 hover:text-white transition"
          >
            <span>Voir tout</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>

      <AnimeFilters
        sortBy={sortBy}
        onSortChange={(value) => setSortBy(value as any)}
        filterStatus={filterStatus}
        onFilterChange={(value) => setFilterStatus(value as any)}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
        availableGenres={availableGenres}
      />
      
      {hasResults ? (
        <AnimeGrid 
          animes={displayedAnimes} 
          loading={loading} 
          sectionId={sectionId}
        />
      ) : (
        <NoResults />
      )}
    </section>
  );
}