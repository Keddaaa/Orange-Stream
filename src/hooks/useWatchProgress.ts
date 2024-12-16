import { useLocalStorage } from './useLocalStorage';

interface WatchProgress {
  animeId: string;
  episodeId: string;
  timestamp: number;
  lastWatched: string;
}

export function useWatchProgress() {
  const [progress, setProgress] = useLocalStorage<Record<string, WatchProgress>>('watchProgress', {});

  const saveProgress = (animeId: string, episodeId: string, timestamp: number) => {
    setProgress({
      ...progress,
      [animeId]: {
        animeId,
        episodeId,
        timestamp,
        lastWatched: new Date().toISOString(),
      },
    });
  };

  const getProgress = (animeId: string) => {
    return progress[animeId];
  };

  const clearProgress = (animeId: string) => {
    const { [animeId]: _, ...rest } = progress;
    setProgress(rest);
  };

  return { progress, saveProgress, getProgress, clearProgress };
}