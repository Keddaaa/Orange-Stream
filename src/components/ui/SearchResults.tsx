import React from 'react';
import { Play, Star } from 'lucide-react';
import type { Anime } from '../../types';
import { formatRating } from '../../utils/formatters';

interface SearchResultsProps {
  results: Anime[];
  isLoading: boolean;
  onClose: () => void;
  onSelect: () => void;
}

export function SearchResults({ results, isLoading, onClose, onSelect }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="absolute top-full mt-2 w-[300px] bg-gray-900 rounded-lg shadow-xl border border-gray-800 p-4">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start animate-pulse">
              <div className="w-16 h-20 bg-gray-800 rounded" />
              <div className="ml-3 flex-1">
                <div className="h-4 bg-gray-800 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-800 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!results.length) {
    return (
      <div className="absolute top-full mt-2 w-[300px] bg-gray-900 rounded-lg shadow-xl border border-gray-800 p-4 text-center text-gray-400">
        Aucun résultat trouvé
      </div>
    );
  }

  return (
    <div 
      className="absolute top-full mt-2 w-[300px] bg-gray-900 rounded-lg shadow-xl border border-gray-800 overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="max-h-[400px] overflow-y-auto">
        {results.map((anime) => (
          <div 
            key={anime.id}
            className="flex items-start p-3 hover:bg-gray-800 transition cursor-pointer"
            onClick={() => {
              onSelect();
              // Ici, vous pourriez ajouter la navigation vers la page de l'animé
            }}
          >
            <img 
              src={anime.coverImage} 
              alt={anime.title}
              className="w-16 h-20 object-cover rounded"
            />
            <div className="ml-3 flex-1">
              <h4 className="font-medium mb-1">{anime.title}</h4>
              <div className="flex items-center text-sm text-gray-400 mb-2">
                <Star className="h-3 w-3 text-yellow-400 mr-1" />
                <span>{formatRating(anime.rating)}</span>
                <span className="mx-2">•</span>
                <span>{anime.year}</span>
              </div>
              <button className="flex items-center text-sm text-red-500 hover:text-red-400">
                <Play className="h-4 w-4 mr-1" />
                Regarder
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}