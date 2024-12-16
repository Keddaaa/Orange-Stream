import React from 'react';
import { AnimeCard } from './AnimeCard';
import { SkeletonCard } from '../ui/SkeletonCard';
import { generateUniqueId } from '../../utils/uniqueId';
import type { Anime } from '../../types';

interface AnimeGridProps {
  animes: Anime[];
  loading?: boolean;
  sectionId: string;
}

export function AnimeGrid({ animes, loading = false, sectionId }: AnimeGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {loading
        ? Array.from({ length: 12 }).map(() => (
            <SkeletonCard 
              key={generateUniqueId(sectionId, 'skeleton')} 
            />
          ))
        : animes.map((anime) => (
            <AnimeCard 
              key={generateUniqueId(sectionId, `anime-${anime.id}`)} 
              anime={anime} 
            />
          ))}
    </div>
  );
}