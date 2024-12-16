import React from 'react';

const links = [
  { href: '#', label: 'Accueil' },
  { href: '#', label: 'Parcourir' },
  { href: '#', label: 'Ma Liste' },
];

export function NavLinks() {
  return (
    <div className="hidden md:flex space-x-6">
      {links.map(link => (
        <a 
          key={link.label} 
          href={link.href} 
          className="hover:text-red-500 transition"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}