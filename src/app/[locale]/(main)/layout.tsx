import Header from '@/components/organisms/Header'; // Your main header
import Footer from '@/components/organisms/Footer'; // Your main footer
import { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {/* 
        This <main> tag provides the primary content area for your main pages.
        The background color is applied here, NOT in the root layout's body tag.
      */}
      <main className="flex-grow bg-background text-foreground">
        {children} {/* This will be your page.tsx content */}
      </main>
      <Footer />
    </div>
  );
}