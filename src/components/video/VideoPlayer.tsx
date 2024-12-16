import React from 'react';
import { Play, Pause, Volume2, Volume1, VolumeX, Maximize, Minimize } from 'lucide-react';
import { useVideoPlayer } from '../../hooks/useVideoPlayer';
import { formatDuration } from '../../utils/formatters';

interface VideoPlayerProps {
  animeId: string;
  episodeId: string;
  title: string;
}

export function VideoPlayer({ animeId, episodeId, title }: VideoPlayerProps) {
  const {
    isPlaying,
    volume,
    quality,
    currentTime,
    duration,
    isFullscreen,
    togglePlay,
    setVolume,
    setQuality,
    seek,
    toggleFullscreen,
  } = useVideoPlayer(animeId, episodeId);

  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div className="relative bg-black aspect-video">
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onClick={togglePlay}
          className="p-4 rounded-full bg-red-500 hover:bg-red-600 transition"
        >
          {isPlaying ? (
            <Pause className="h-8 w-8" />
          ) : (
            <Play className="h-8 w-8" />
          )}
        </button>
      </div>

      {/* Contrôles */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
        {/* Barre de progression */}
        <div className="relative h-1 bg-gray-600 rounded-full mb-4">
          <div
            className="absolute h-full bg-red-500 rounded-full"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={(e) => seek(Number(e.target.value))}
            className="absolute w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={togglePlay}>
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </button>

            <div className="flex items-center space-x-2">
              <button onClick={() => setVolume(volume === 0 ? 1 : 0)}>
                <VolumeIcon className="h-5 w-5" />
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-20"
              />
            </div>

            <div className="text-sm">
              {formatDuration(Math.floor(currentTime / 60))} / {formatDuration(Math.floor(duration / 60))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value as any)}
              className="bg-transparent border border-gray-600 rounded px-2 py-1 text-sm"
            >
              <option value="SD">SD</option>
              <option value="HD">HD</option>
              <option value="FHD">1080p</option>
              <option value="4K">4K</option>
            </select>

            <button onClick={toggleFullscreen}>
              {isFullscreen ? (
                <Minimize className="h-5 w-5" />
              ) : (
                <Maximize className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}