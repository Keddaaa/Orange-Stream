import React from 'react';
import { Navbar } from '../navigation/Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      {children}
    </div>
  );
}