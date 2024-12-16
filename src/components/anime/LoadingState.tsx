import React from 'react';

export function LoadingState() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-gray-800 rounded-lg aspect-[3/4]" />
          <div className="mt-2 space-y-2">
            <div className="h-4 bg-gray-800 rounded w-3/4" />
            <div className="h-4 bg-gray-800 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}