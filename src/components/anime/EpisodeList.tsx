import React from 'react';
import { Play, Clock } from 'lucide-react';
import { useEpisodes } from '../../hooks/useEpisodes';
import { useWatchProgress } from '../../hooks/useWatchProgress';
import { formatDuration } from '../../utils/formatters';
import type { Episode } from '../../types';

interface EpisodeListProps {
  animeId: string;
}

export function EpisodeList({ animeId }: EpisodeListProps) {
  const { episodes, isLoading } = useEpisodes(animeId);
  const { getProgress } = useWatchProgress();

  if (isLoading) {
    return (
      <div className="animate-pulse">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-24 bg-gray-800 rounded-lg mb-4" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {episodes.map((episode) => (
        <EpisodeCard
          key={episode.id}
          episode={episode}
          progress={getProgress(episode.id)}
        />
      ))}
    </div>
  );
}

interface EpisodeCardProps {
  episode: Episode;
  progress?: { timestamp: number };
}

function EpisodeCard({ episode, progress }: EpisodeCardProps) {
  const progressPercentage = progress 
    ? (progress.timestamp / episode.duration) * 100 
    : 0;

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition">
      <div className="flex">
        <div className="relative w-48 h-28">
          <img
            src={episode.thumbnail}
            alt={episode.title}
            className="w-full h-full object-cover"
          />
          {progress && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
              <div 
                className="h-full bg-red-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          )}
        </div>
        
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium">
                Episode {episode.number} - {episode.title}
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                {episode.synopsis}
              </p>
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <Clock className="h-4 w-4 mr-1" />
              {formatDuration(Math.floor(episode.duration / 60))}
            </div>
          </div>
          
          <button className="mt-2 flex items-center text-red-500 hover:text-red-400">
            <Play className="h-4 w-4 mr-1" />
            {progress ? 'Continuer' : 'Regarder'}
          </button>
        </div>
      </div>
    </div>
  );
}