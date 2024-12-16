import React from 'react';
import { useWatchlist } from '../../../hooks/useWatchlist';
import { AnimeGrid } from '../AnimeGrid';
import { NoResults } from '../NoResults';

export function WatchList() {
  const { watchlist } = useWatchlist();

  if (watchlist.length === 0) {
    return (
      <NoResults 
        title="Votre liste est vide"
        message="Ajoutez des animés à votre liste pour les retrouver facilement"
      />
    );
  }

  return (
    <section className="py-8">
      <h2 className="text-2xl font-semibold text-white mb-6">Ma Liste</h2>
      <AnimeGrid animes={watchlist} sectionId="watchlist" />
    </section>
  );
}