'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { PasswordField } from '@/components/molecules/PasswordField';
import { SocialButton } from '@/components/molecules/SocialButton';
import { Button } from '@/components/atoms/Button';


const GoogleIcon = () => (
    <svg height="20" width="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path><path d="M1 1h22v22H1z" fill="none"></path></svg>
);
const roles = ['student', 'instructor', 'technician'];

export function RegistrationForm() {
  const t = useTranslations('auth.Register');

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('student');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError(null);
    setIsLoading(true);
    console.log({ email, password, role: selectedRole, agreedToTerms });
    // TODO: Implement actual registration logic (e.g., call NextAuth signIn or API route)
    setTimeout(() => setIsLoading(false), 2000);
  };
  
  const handleGoogleSignIn = () => {
    // TODO: Implement NextAuth Google sign-in
    console.log("Signing in with Google...");
  }

  return (
    <div className="w-full max-w-md space-y-6">
      {/* --- ASSET: Your Logo goes here --- */}
      <Image
        src="/images/lab/LRLOGO.PNG" // Replace with your logo path
        width={150}
        height={50}
        alt="LabReach Logo"
        className="mx-auto" // Or adjust as needed
      />

      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground">{t('title')}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-foreground">{t('emailLabel')}</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('emailPlaceholder')} required className="w-full rounded-md border border-border bg-transparent p-3 text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-ring"/>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">{t('roleLabel')}</label>
          <div className="grid grid-cols-3 gap-2 rounded-lg bg-background p-1 ring-1 ring-border">
            {roles.map((role) => (
              <button key={role} type="button" onClick={() => setSelectedRole(role)} className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${selectedRole === role ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/10'}`}>
                {t(role)}
              </button>
            ))}
          </div>
        </div>
        
        <PasswordField id="password" label={t('passwordLabel')} placeholder={t('passwordPlaceholder')} value={password} onChange={(e) => setPassword(e.target.value)} required />
        <PasswordField id="confirmPassword" label={t('confirmPasswordLabel')} placeholder={t('confirmPasswordPlaceholder')} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

        {error && <p className="text-sm text-red-500">{error}</p>}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button type="button" onClick={() => setAgreedToTerms(!agreedToTerms)} className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${agreedToTerms ? 'border-primary bg-primary' : 'border-border'}`}>
              {agreedToTerms && <Check className="h-4 w-4 text-primary-foreground" />}
            </button>
            <label htmlFor="terms" className="ml-2 block text-sm text-muted-foreground">
              {t('agreeText')}{' '}
              <Link href="/terms" className="font-medium text-secondary hover:underline">
                {t('termsLink')}
              </Link>
            </label>
          </div>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {t('createAccountButton')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
      
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border"></span></div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">{t('signUpWith')}</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <SocialButton providerName="Google" icon={<GoogleIcon />} onClick={handleGoogleSignIn} />
      </div>

    </div>
  );
}