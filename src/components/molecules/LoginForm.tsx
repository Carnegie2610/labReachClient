'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export function LoginForm() {
  const t = useTranslations('auth.LoginPage');
  const locale = useLocale();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    // ... (rest of the logic is fine)
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(t('loginError'));
      } else {
        router.push('/home');
      }
    } catch (err) {
      console.error(err);
      setError(t('LoginPage.loginError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // The form container background is defined in the auth layout.
    // We add our own background here for the form itself.
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm space-y-6 rounded-2xl bg-white/50 p-8 shadow-2xl backdrop-blur-sm dark:bg-primary/50 dark:backdrop-blur-sm"
    >
      <div className="text-center">
        {/* Title Text: Dark text on light bg, Light text on dark bg */}
        <h1 className="text-3xl font-bold text-primary dark:text-neutral">{t('title')}</h1>
        {/* Subtitle Text: Muted on light bg, a lighter muted on dark bg */}
        <p className="mt-2 text-muted dark:text-neutral/60">{t('subtitle')}</p>
      </div>

      {error && (
        <div className="rounded-md bg-red-500/10 p-4 ring-1 ring-inset ring-red-500/20">
          <p className="text-sm font-medium text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          {/* Label Text: Muted on light, lighter muted on dark */}
          <label htmlFor="email" className="text-sm font-medium text-muted dark:text-neutral/80">
            {t('emailLabel')}
          </label>
          {/* Input: Different backgrounds and text colors for each mode */}
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-transparent bg-neutral/80 p-3 text-primary shadow-sm ring-1 ring-inset ring-transparent transition focus:border-accent focus:bg-white focus:ring-accent dark:bg-primary/80 dark:text-neutral dark:focus:bg-primary dark:focus:ring-accent"
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium text-muted dark:text-neutral/80">
            {t('passwordLabel')}
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-transparent bg-neutral/80 p-3 text-primary shadow-sm ring-1 ring-inset ring-transparent transition focus:border-accent focus:bg-white focus:ring-accent dark:bg-primary/80 dark:text-neutral dark:focus:bg-primary dark:focus:ring-accent"
            required
            autoComplete="current-password"
          />
        </div>
      </div>

      <div className="flex flex-col space-y-4 pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center rounded-lg bg-accent px-5 py-3 text-base font-bold text-primary shadow-md transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
          {t('loginButton')}
        </button>
        <p className="text-center text-sm text-muted dark:text-neutral/60">
          {t('registerPrompt')}{' '}
          {/* Link: Use secondary color for high visibility */}
          <Link href={`/${locale}/register`} className="font-medium text-secondary hover:underline">
            {t('registerLink')}
          </Link>
        </p>
      </div>
    </form>
  );
}