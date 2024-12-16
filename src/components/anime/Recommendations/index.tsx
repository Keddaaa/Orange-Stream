import React from 'react';
import { useAnimeData } from '../../../hooks/useAnimeData';
import { AnimeGrid } from '../AnimeGrid';
import { LoadingState } from '../LoadingState';
import { ErrorState } from '../ErrorState';

interface RecommendationsProps {
  genres?: string[];
  excludeIds?: string[];
}

export function Recommendations({ genres, excludeIds = [] }: RecommendationsProps) {
  const { topAnime, isLoading, error } = useAnimeData();

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  let recommendations = topAnime;

  // Filtrer par genres si spécifiés
  if (genres && genres.length > 0) {
    recommendations = recommendations.filter(anime =>
      anime.genres.some(genre => genres.includes(genre))
    );
  }

  // Exclure les IDs spécifiés
  if (excludeIds.length > 0) {
    recommendations = recommendations.filter(anime => !excludeIds.includes(anime.id));
  }

  // Limiter à 6 recommandations
  recommendations = recommendations.slice(0, 6);

  return (
    <section className="py-8">
      <h2 className="text-2xl font-semibold text-white mb-6">
        Recommandations pour vous
      </h2>
      <AnimeGrid animes={recommendations} sectionId="recommendations" />
    </section>
  );
}