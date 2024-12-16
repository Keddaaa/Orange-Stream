import React from 'react';

interface AnimeHeaderProps {
  coverImage: string;
  title: string;
  onClose: () => void;
}

export function AnimeHeader({ coverImage, title, onClose }: AnimeHeaderProps) {
  return (
    <div className="relative">
      <img
        src={coverImage}
        alt={title}
        className="w-full h-64 object-cover rounded-t-lg"
      />
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black/75 transition"
      >
        ×
      </button>
    </div>
  );
}