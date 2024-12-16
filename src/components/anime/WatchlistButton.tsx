import React from 'react';
import { Plus, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { useWatchlist } from '../../hooks/useWatchlist';
import type { Anime } from '../../types';

interface WatchlistButtonProps {
  anime: Anime;
  variant?: 'primary' | 'secondary';
}

export function WatchlistButton({ anime, variant = 'secondary' }: WatchlistButtonProps) {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(anime.id);

  const handleClick = () => {
    if (inWatchlist) {
      removeFromWatchlist(anime.id);
    } else {
      addToWatchlist(anime);
    }
  };

  return (
    <Button
      variant={variant}
      icon={inWatchlist ? Check : Plus}
      onClick={handleClick}
    >
      {inWatchlist ? 'Dans ma liste' : 'Ajouter à ma liste'}
    </Button>
  );
}