import React from 'react';

interface AnimeGenresProps {
  genres: string[];
}

export function AnimeGenres({ genres }: AnimeGenresProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Genres</h3>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <span
            key={genre}
            className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm"
          >
            {genre}
          </span>
        ))}
      </div>
    </div>
  );
}