import React from 'react';
import { ChevronRight } from 'lucide-react';
import { AnimeCard } from './AnimeCard';
import type { Anime } from '../types';

interface AnimeListProps {
  title: string;
  animes: Anime[];
}

export function AnimeList({ title, animes }: AnimeListProps) {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <button className="flex items-center text-gray-400 hover:text-white transition">
          <span>View All</span>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {animes.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </section>
  );
}