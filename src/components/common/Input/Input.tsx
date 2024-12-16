import React from 'react';
import { cn } from '../../../utils/classNames';
import { LucideIcon } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  error?: string;
  label?: string;
}

export function Input({
  icon: Icon,
  error,
  label,
  className,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-200 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        )}
        <input
          className={cn(
            "w-full bg-gray-800 rounded-lg px-4 py-2 text-white",
            "focus:outline-none focus:ring-2 focus:ring-red-500",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            Icon && "pl-10",
            error && "ring-2 ring-red-500",
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}