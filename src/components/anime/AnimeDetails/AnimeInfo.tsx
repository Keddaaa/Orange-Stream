import React from 'react';
import { Clock, Calendar, Star } from 'lucide-react';
import type { Anime } from '../../../types';
import { formatRating } from '../../../utils/formatters';

interface AnimeInfoProps {
  anime: Anime;
}

export function AnimeInfo({ anime }: AnimeInfoProps) {
  return (
    <>
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center text-gray-300">
          <Star className="h-5 w-5 text-yellow-400 mr-1" />
          {formatRating(anime.rating)}
        </div>
        <div className="flex items-center text-gray-300">
          <Calendar className="h-5 w-5 mr-1" />
          {anime.year}
        </div>
        <div className="flex items-center text-gray-300">
          <Clock className="h-5 w-5 mr-1" />
          {anime.status === 'ongoing' ? 'En cours' : 'Terminé'}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Synopsis</h3>
        <p className="text-gray-300">{anime.synopsis}</p>
      </div>
    </>
  );
}