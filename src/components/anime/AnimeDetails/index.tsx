import React from 'react';
import { AnimeHeader } from './AnimeHeader';
import { AnimeInfo } from './AnimeInfo';
import { AnimeGenres } from './AnimeGenres';
import type { Anime } from '../../../types';

interface AnimeDetailsProps {
  anime: Anime;
  onClose: () => void;
}

export function AnimeDetails({ anime, onClose }: AnimeDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <AnimeHeader 
          coverImage={anime.coverImage} 
          title={anime.title} 
          onClose={onClose} 
        />

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{anime.title}</h2>
          <AnimeInfo anime={anime} />
          <AnimeGenres genres={anime.genres} />
        </div>
      </div>
    </div>
  );
}