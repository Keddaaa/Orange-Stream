import React from 'react';
import { Play, Star } from 'lucide-react';
import type { Anime } from '../../types';

interface AnimeCardProps {
  anime: Anime;
}

export function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <div className="group relative rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <img
        src={anime.coverImage}
        alt={anime.title}
        className="w-full aspect-[3/4] object-cover"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 p-4 w-full">
          <h3 className="text-white font-semibold mb-2">{anime.title}</h3>
          <div className="flex items-center space-x-2 mb-2">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-white text-sm">{anime.rating}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {anime.genres.slice(0, 2).map((genre) => (
              <span key={genre} className="text-xs bg-orange-600/80 text-white px-2 py-1 rounded">
                {genre}
              </span>
            ))}
          </div>
          <button className="w-full bg-orange-600 text-white py-2 rounded flex items-center justify-center space-x-2 hover:bg-orange-700 transition">
            <Play className="h-4 w-4" />
            <span>Regarder</span>
          </button>
        </div>
      </div>
    </div>
  );
}