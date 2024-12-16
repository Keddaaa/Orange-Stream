import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Loader } from 'lucide-react';
import { useAnimeSearch } from '../../hooks/useAnimeSearch';
import { SearchResults } from './SearchResults';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { results, isLoading } = useAnimeSearch(query);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div className="relative">
        {isLoading ? (
          <Loader className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 animate-spin" />
        ) : (
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        )}
        <input
          type="search"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Rechercher un animé..."
          className="bg-gray-800 rounded-full pl-10 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-[300px]"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && query && (
        <SearchResults 
          results={results}
          isLoading={isLoading}
          onClose={() => setIsOpen(false)}
          onSelect={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}