import React from 'react';
import { Search, Bell, User } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-black/95 text-white z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-12">
          <h1 className="text-2xl font-bold text-red-500">AnimeStream</h1>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-red-500 transition">Home</a>
            <a href="#" className="hover:text-red-500 transition">Browse</a>
            <a href="#" className="hover:text-red-500 transition">My List</a>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="search"
              placeholder="Search anime..."
              className="bg-gray-800 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-[200px]"
            />
          </div>
          <button className="hover:text-red-500 transition">
            <Bell className="h-5 w-5" />
          </button>
          <button className="hover:text-red-500 transition">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}