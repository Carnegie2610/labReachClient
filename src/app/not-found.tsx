import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function NotFoundPage() {
  const t = useTranslations('common.NotFound');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-extrabold text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground">{t('title')}</h2>
      <p className="mt-2 text-muted-foreground">{t('description')}</p>
      <Link href="/">
        <button className="mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          {t('button')}
        </button>
      </Link>
    </div>
  );
}