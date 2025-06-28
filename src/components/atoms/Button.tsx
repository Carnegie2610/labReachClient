// src/components/atoms/Button.tsx
import { clsx } from 'clsx';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  isLoading?: boolean;
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function Button({ className, variant = 'primary', isLoading = false, children, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        variant === 'secondary' && 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading && <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>}
      {children}
    </button>
  );
}