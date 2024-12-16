import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/classNames';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  icon?: LucideIcon;
  onClick?: () => void;
  className?: string;
}

export function Button({ 
  children, 
  variant = 'primary', 
  icon: Icon, 
  onClick,
  className = ''
}: ButtonProps) {
  const baseStyles = "flex items-center space-x-2 px-6 py-3 rounded-lg transition duration-200";
  const variants = {
    primary: "bg-orange-600 text-white hover:bg-orange-700",
    secondary: "bg-gray-800 text-white hover:bg-gray-700"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {Icon && <Icon className="h-5 w-5" />}
      <span>{children}</span>
    </button>
  );
}