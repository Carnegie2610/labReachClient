'use client';

import { ThemeProvider, type ThemeProviderProps } from 'next-themes';

// This component will wrap all other global providers in the future.
export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    // Set defaultTheme to 'dark' to match your site's aesthetic.
    // enableSystem={false} is often better for apps where you want to force a theme.
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} {...props}>
      {children}
    </ThemeProvider>
  );
}