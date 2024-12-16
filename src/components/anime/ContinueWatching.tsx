import React from 'react';
import { Play } from 'lucide-react';
import { useWatchProgress } from '../../hooks/useWatchProgress';
import { formatDuration } from '../../utils/formatters';
import type { Anime } from '../../types';

interface ContinueWatchingProps {
  anime: Anime;
}

export function ContinueWatching({ anime }: ContinueWatchingProps) {
  const { getProgress } = useWatchProgress();
  const progress = getProgress(anime.id);

  if (!progress) return null;

  const progressPercentage = (progress.timestamp / (24 * 60)) * 100;

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-black/80 px-4 py-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-300">
          {formatDuration(Math.floor(progress.timestamp / 60))} restant
        </span>
        <button className="text-red-500 hover:text-red-400 flex items-center">
          <Play className="h-4 w-4 mr-1" />
          Continuer
        </button>
      </div>
      <div className="mt-1 h-1 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-red-500 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}