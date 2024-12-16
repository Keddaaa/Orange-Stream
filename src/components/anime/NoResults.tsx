import React from 'react';
import { SearchX } from 'lucide-react';

interface NoResultsProps {
  title?: string;
  message?: string;
}

export function NoResults({ 
  title = "Aucun résultat trouvé",
  message = "Essayez de modifier vos filtres ou d'effectuer une nouvelle recherche"
}: NoResultsProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <SearchX className="h-16 w-16 text-gray-600 mb-4" />
      <h3 className="text-xl font-semibold text-gray-400 mb-2">
        {title}
      </h3>
      <p className="text-gray-500 text-center">
        {message}
      </p>
    </div>
  );
}