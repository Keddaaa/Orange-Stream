import React from 'react';
import { WatchlistButton } from '../anime/WatchlistButton';
import { Share2 } from 'lucide-react';
import type { Anime, Episode } from '../../types';

interface VideoInfoProps {
  anime: Anime;
  episode: Episode;
}

export function VideoInfo({ anime, episode }: VideoInfoProps) {
  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">{anime.title}</h1>
          <h2 className="text-xl text-gray-300 mb-4">
            Episode {episode.number} - {episode.title}
          </h2>
          <p className="text-gray-400">{episode.synopsis}</p>
        </div>
        <div className="flex space-x-2">
          <WatchlistButton anime={anime} />
          <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-center space-x-4 text-sm text-gray-400">
        <span>{anime.year}</span>
        <span>•</span>
        <span>{anime.genres.join(', ')}</span>
        <span>•</span>
        <span>Note : {anime.rating}/10</span>
      </div>
    </div>
  );
}