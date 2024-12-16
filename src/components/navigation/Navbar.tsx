import React from 'react';
import { Logo } from './Logo';
import { NavMenu } from './NavMenu';
import { NavLinks } from './NavLinks';
import { Container } from '../layout/Container';

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-black/95 text-white z-50 px-6 py-4">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <Logo />
            <NavLinks />
          </div>
          <NavMenu />
        </div>
      </Container>
    </nav>
  );
}