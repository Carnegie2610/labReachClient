'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

const roles = ['student', 'instructor', 'technician'] as const;
type Role = typeof roles[number];

export function RegisterForm() {
  const t = useTranslations('auth.RegisterPage');
  const locale = useLocale();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState(''); // Changed from username for Supabase Auth
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role>('student');
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    // const result = await registerUser({
    //   email,
    //   password,
    //   fullName,
    //   role: selectedRole,
    // });

    setIsLoading(false);

    // if (result.error) {
    //   setError(result.error);
    // } else if (result.success) {
    //   setSuccess(result.success);
    // }
  };

  // If registration is successful, show a success message instead of the form.
  if (success) {
    return (
      <div className="w-full max-w-sm space-y-6 rounded-2xl bg-white/50 p-8 text-center shadow-2xl backdrop-blur-sm dark:bg-primary/50 dark:backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-primary dark:text-neutral">Registration Successful!</h2>
        <p className="text-muted dark:text-neutral/80">{success}</p>
        <Link href={`/${locale}/login`} className="block w-full rounded-lg bg-accent px-5 py-3 text-base font-bold text-primary shadow-md transition hover:opacity-90">
          Proceed to Login
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm space-y-4 rounded-2xl bg-white/50 p-8 shadow-2xl backdrop-blur-sm dark:bg-primary/50 dark:backdrop-blur-sm"
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary dark:text-neutral">{t('title')}</h1>
        <p className="mt-2 text-muted dark:text-neutral/60">{t('subtitle')}</p>
      </div>
      
      {error && (
         <div className="rounded-md bg-red-500/10 p-4 ring-1 ring-inset ring-red-500/20">
          <p className="text-sm font-medium text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Inputs */}
      <div className="space-y-4">
        <div>
          <label htmlFor="fullName" className="text-sm font-medium text-muted dark:text-neutral/80">
            {t('usernameLabel')}
          </label>
          <input id="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required autoComplete="name"
            className="mt-1 block w-full rounded-md border-transparent bg-neutral/80 p-3 text-primary shadow-sm ring-1 ring-inset ring-transparent transition focus:border-accent focus:bg-white focus:ring-accent dark:bg-primary/80 dark:text-neutral dark:focus:bg-primary dark:focus:ring-accent" />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-muted dark:text-neutral/80">
            Email Address
          </label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email"
            className="mt-1 block w-full rounded-md border-transparent bg-neutral/80 p-3 text-primary shadow-sm ring-1 ring-inset ring-transparent transition focus:border-accent focus:bg-white focus:ring-accent dark:bg-primary/80 dark:text-neutral dark:focus:bg-primary dark:focus:ring-accent" />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium text-muted dark:text-neutral/80">
            {t('passwordLabel')}
          </label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="new-password"
            className="mt-1 block w-full rounded-md border-transparent bg-neutral/80 p-3 text-primary shadow-sm ring-1 ring-inset ring-transparent transition focus:border-accent focus:bg-white focus:ring-accent dark:bg-primary/80 dark:text-neutral dark:focus:bg-primary dark:focus:ring-accent" />
        </div>
      </div>

      {/* Role Selection */}
      <div>
        <label className="text-sm font-medium text-muted dark:text-neutral/80">
          {t('roleLabel')}
        </label>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {roles.map((role) => (
            <label key={role} className={`flex cursor-pointer items-center justify-center space-x-2 rounded-md p-2 text-center ring-1 ring-inset transition ${selectedRole === role ? 'bg-secondary/20 ring-secondary text-primary dark:text-neutral' : 'ring-muted/50 hover:bg-neutral/50 dark:text-neutral/80 dark:hover:bg-primary'}`}>
              <input type="radio" name="role" value={role} checked={selectedRole === role} onChange={() => setSelectedRole(role)} className="sr-only"/>
              <span className="text-sm font-medium capitalize">{t(role)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col space-y-4 pt-2">
        <button type="submit" disabled={isLoading}
          className="flex w-full items-center justify-center rounded-lg bg-accent px-5 py-3 text-base font-bold text-primary shadow-md transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:cursor-not-allowed disabled:opacity-60">
          {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
          {t('registerButton')}
        </button>
        <p className="text-center text-sm text-muted dark:text-neutral/60">
          {t('loginPrompt')}{' '}
          <Link href={`/${locale}/login`} className="font-medium text-secondary hover:underline">
            {t('loginLink')}
          </Link>
        </p>
      </div>
    </form>
  );
}