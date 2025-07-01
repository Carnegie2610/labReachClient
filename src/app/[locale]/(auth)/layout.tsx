import { ReactNode } from 'react';
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    // This layout creates the centered container for your login/register forms.
    // Notice it has no Header or Footer.
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      {children} {/* This will be your login/register page.tsx content */}
    </main>
  );
}