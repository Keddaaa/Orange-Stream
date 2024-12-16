import { useState, useEffect } from 'react';
import { useWatchProgress } from './useWatchProgress';

interface VideoPlayerState {
  isPlaying: boolean;
  volume: number;
  quality: 'SD' | 'HD' | 'FHD' | '4K';
  currentTime: number;
  duration: number;
  isFullscreen: boolean;
}

export function useVideoPlayer(animeId: string, episodeId: string) {
  const [state, setState] = useState<VideoPlayerState>({
    isPlaying: false,
    volume: 1,
    quality: 'HD',
    currentTime: 0,
    duration: 0,
    isFullscreen: false,
  });

  const { saveProgress } = useWatchProgress();

  const togglePlay = () => {
    setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const setVolume = (volume: number) => {
    setState(prev => ({ ...prev, volume: Math.max(0, Math.min(1, volume)) }));
  };

  const setQuality = (quality: VideoPlayerState['quality']) => {
    setState(prev => ({ ...prev, quality }));
  };

  const seek = (time: number) => {
    setState(prev => ({ ...prev, currentTime: Math.max(0, Math.min(time, prev.duration)) }));
  };

  const toggleFullscreen = () => {
    setState(prev => ({ ...prev, isFullscreen: !prev.isFullscreen }));
  };

  // Sauvegarder la progression toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      if (state.isPlaying) {
        saveProgress(animeId, episodeId, state.currentTime);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [animeId, episodeId, state.isPlaying, state.currentTime, saveProgress]);

  return {
    ...state,
    togglePlay,
    setVolume,
    setQuality,
    seek,
    toggleFullscreen,
  };
}