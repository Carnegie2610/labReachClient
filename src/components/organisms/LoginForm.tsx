'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { PasswordField } from '@/components/molecules/PasswordField';
import { SocialButton } from '@/components/molecules/SocialButton';
import { CheckboxField } from '@/components/molecules/CheckboxField';
import { Button } from '@/components/atoms/Button';
import { useLocale } from 'next-intl';

// Placeholder for Google Icon - same as before
const GoogleIcon = () => (
    <svg height="20" width="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path><path d="M1 1h22v22H1z" fill="none"></path></svg>
);

export function LoginForm() {
  const router = useRouter();
  const t = useTranslations('auth.Login');
  const locale = useLocale();

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simple credential check
      if (email === 'Test@gmail.com' && password === 'test1234') {
        // Simulate successful login
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.push(`/${locale}/reservation`);
      } else {
        // Simulate failed login
        await new Promise(resolve => setTimeout(resolve, 1000));
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Add error message display here if needed
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement NextAuth Google sign-in
    console.log("Signing in with Google...");
  };

  return (
    <div className="w-full max-w-sm space-y-8">
      {/* --- ASSET: Your Logo goes here --- */}
      <Image
        src="/images/lab/LRLOGO.PNG" // Use the same logo path
        width={180}
        height={90}
        alt="LabReach Accessible Electronics Logo"
        className="mx-auto"
      />

      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground">{t('title')}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-foreground">{t('emailLabel')}</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('emailPlaceholder')} required className="w-full rounded-md border border-border bg-transparent p-3 text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-ring"/>
        </div>

        <PasswordField id="password" label={t('passwordLabel')} placeholder={t('passwordPlaceholder')} value={password} onChange={(e) => setPassword(e.target.value)} required />

        <div className="flex items-center justify-between">
          <CheckboxField id="remember" label={t('rememberMe')} checked={rememberMe} onChange={setRememberMe} />
          <Button type="submit" variant="primary" disabled={isLoading} className="px-8">
            {t('signInButton')}
          </Button>
        </div>
      </form>
      
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border"></span></div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">{t('signInWith')}</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <SocialButton providerName="Google" icon={<GoogleIcon/>} onClick={handleGoogleSignIn} />
      </div>
    </div>
  );
}