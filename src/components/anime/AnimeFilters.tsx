import React from 'react';
import { Filter } from 'lucide-react';
import { cn } from '../../utils/classNames';

interface AnimeFiltersProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  filterStatus: string;
  onFilterChange: (value: string) => void;
  selectedGenre: string | null;
  onGenreChange: (value: string | null) => void;
  availableGenres: string[];
}

export function AnimeFilters({
  sortBy,
  onSortChange,
  filterStatus,
  onFilterChange,
  selectedGenre,
  onGenreChange,
  availableGenres,
}: AnimeFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center mb-6">
      <div className="flex items-center space-x-2">
        <Filter className="h-5 w-5 text-gray-400" />
        <span className="text-gray-400">Filtres:</span>
      </div>

      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className={cn(
          "bg-gray-800 rounded-lg px-4 py-2 text-sm",
          "focus:outline-none focus:ring-2 focus:ring-red-500",
          "border border-gray-700"
        )}
      >
        <option value="rating">Par note</option>
        <option value="year">Par année</option>
        <option value="title">Par titre</option>
      </select>

      <select
        value={filterStatus}
        onChange={(e) => onFilterChange(e.target.value)}
        className={cn(
          "bg-gray-800 rounded-lg px-4 py-2 text-sm",
          "focus:outline-none focus:ring-2 focus:ring-red-500",
          "border border-gray-700"
        )}
      >
        <option value="all">Tous les statuts</option>
        <option value="ongoing">En cours</option>
        <option value="completed">Terminé</option>
      </select>

      <select
        value={selectedGenre || ''}
        onChange={(e) => onGenreChange(e.target.value || null)}
        className={cn(
          "bg-gray-800 rounded-lg px-4 py-2 text-sm",
          "focus:outline-none focus:ring-2 focus:ring-red-500",
          "border border-gray-700"
        )}
      >
        <option value="">Tous les genres</option>
        {availableGenres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
}