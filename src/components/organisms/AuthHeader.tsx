import Link from 'next/link';
import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import LanguageSwitcher from '@/components/molecules/languageSwitcher';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';
import { Button } from '@/components/atoms/Button';
import {ThemeProvider} from '@/context/ThemeContext';
// The component will accept a 'variant' to know which page it's on.
type AuthHeaderProps = {
  variant: 'login' | 'register';
};

export async function AuthHeader({ variant }: AuthHeaderProps) {
  const t = await getTranslations('auth.AuthHeader');
  const locale = await getLocale();

  // Determine the correct text and link based on the variant
  const promptText = variant === 'login' ? t('login_prompt') : t('register_prompt');
  const actionText = variant === 'login' ? t('login_action') : t('register_action');
  const actionHref = variant === 'login' ? `/${locale}/register` : `/${locale}/login`;

  return (
    <ThemeProvider>
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        
        {/* Left Side: Logo */}
        <Link href={`/${locale}/`} aria-label="Back to homepage">
          {/* 
            ASSET: Your Logo
            Note: The path from your local machine is translated to a public web path.
            '/home/milkovic/.../public/images/lab/LOGOBLACK.png' becomes '/images/lab/LOGOBLACK.png'
          */}
          <Image
            src="/images/lab/LOGOBLACK.png"
            width={40}
            height={40}
            alt="LabReach Logo"
            className="h-8 w-auto" // Control size with Tailwind classes
          />
        </Link>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-4">
          <p className="hidden text-sm text-muted-foreground sm:block">
            {promptText}
          </p>
          
          {/* 
            ASSETS: Your LanguageSwitcher and ThemeToggle components 
            are seamlessly integrated here.
          */}
         

          <Link href={actionHref}>
            <Button variant="primary"> {/* Or your primary button variant */}
              {actionText}
            </Button>
          </Link>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
    </ThemeProvider>
  );
}