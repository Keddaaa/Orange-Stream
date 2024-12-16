import React from 'react';
import { SearchBar } from '../ui/SearchBar';
import { AuthButtons } from '../auth/AuthButtons';
import { UserMenu } from '../auth/UserMenu';
import { useAuth } from '../../hooks/useAuth';

export function NavMenu() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex items-center space-x-6">
      <SearchBar />
      {isAuthenticated ? <UserMenu /> : <AuthButtons />}
    </div>
  );
}