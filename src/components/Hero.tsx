import React from 'react';
import { Play, Plus } from 'lucide-react';
import { Button } from '../ui/Button';

export function Hero() {
  return (
    <div className="relative h-[80vh] w-full">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80"
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      </div>
      
      <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-6xl font-bold text-white mb-4">
            Découvrez des <span className="text-orange-500">animés</span> passionnants
          </h1>
          <p className="text-lg text-gray-200 mb-8">
            Plongez dans un monde d'aventures extraordinaires avec notre sélection d'animés soigneusement choisis pour vous.
          </p>
          <div className="flex space-x-4">
            <Button icon={Play}>Commencer</Button>
            <Button icon={Plus} variant="secondary">Ma Liste</Button>
          </div>
        </div>
      </div>
    </div>
  );
}