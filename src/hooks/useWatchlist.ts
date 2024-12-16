import { useLocalStorage } from './useLocalStorage';
import type { Anime } from '../types';

export function useWatchlist() {
  const [watchlist, setWatchlist] = useLocalStorage<Anime[]>('watchlist', []);

  const addToWatchlist = (anime: Anime) => {
    setWatchlist([...watchlist, anime]);
  };

  const removeFromWatchlist = (animeId: string) => {
    setWatchlist(watchlist.filter(anime => anime.id !== animeId));
  };

  const isInWatchlist = (animeId: string) => {
    return watchlist.some(anime => anime.id === animeId);
  };

  return { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist };
}