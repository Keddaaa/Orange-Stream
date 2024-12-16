import React from 'react';
import { Play } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <Play className="h-8 w-8 text-orange-500" />
      <h1 className="text-2xl font-bold">
        <span className="text-orange-500">Orange</span>
        <span className="text-white">Stream</span>
      </h1>
    </div>
  );
}