import React from 'react';
import { Clock, Calendar, Star } from 'lucide-react';
import type { Anime } from '../../types';
import { formatRating } from '../../utils/formatters';

interface AnimeDetailsProps {
  anime: Anime;
  onClose: () => void;
}

export function AnimeDetails({ anime, onClose }: AnimeDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={anime.coverImage}
            alt={anime.title}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black/75 transition"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{anime.title}</h2>
          
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

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Genres</h3>
            <div className="flex flex-wrap gap-2">
              {anime.genres.map((genre) => (
                <span
                  key={genre}
                  className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}